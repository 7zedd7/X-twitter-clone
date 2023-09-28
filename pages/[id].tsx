import { useRouter } from 'next/router'
import FeedCard from '@/components/FeedCard';
import XLayout from '@/components/FeedCard/Layout/XLayout';
import { Tweet, User } from '@/gql/graphql';
import { userCurrentUser } from '@/hooks/user';
import type { GetServerSideProps, NextPage } from 'next'
import Image from 'next/image';
import { BiArrowBack } from 'react-icons/bi'
import { Content } from 'next/font/google';
import { graphqlclient } from '@/clients/api';
import { getUserByIdQuery } from '@/graphql/query/user';
import { GraphQLClient } from 'graphql-request';

interface ServerProps {
    userInfo?: User
}

const UserProfilePage: NextPage<ServerProps> = (props) => {

    const router = useRouter();



    return (
        <div>
            <XLayout>
                <div>
                <nav className='flex items-center px-3 pt-1 hover: cursor-pointer gap-8'>
                    <BiArrowBack className="text-lg" />
                    <div>
                        <h1 className="text-xl font-bold">Zeel Patel</h1>
                        <h1 className="text-xs pt-1 text-[#70757A]">{props.userInfo?.tweets?.length} posts</h1>
                    </div>
                </nav>
                <div className='p-4 border-b border-[#2F3336]'>
                    {props.userInfo?.profileImageURL && (
                        <Image
                        // className="rounded-full w-24 h-auto object-cover border shadow-md mb-9 "
                            className='rounded-full w-32 border-4 object-cover shadow-2xl border-black hover: cursor-pointer '
                            src={props.userInfo?.profileImageURL}
                            alt="X-profileImage"
                            width={200}
                            height={200}
                        />)
                    }
                    <h1 className="text-xl font-bold mt-5">Zeel Patel</h1>
                </div>
                <div>
                    {props.userInfo?.tweets?.map (tweet => <FeedCard data={tweet as Tweet} key={tweet?.id}/>)}
                </div>
                </div>
            </XLayout>
        </div>
    );
};

export const getServerSideProps: GetServerSideProps<ServerProps> =async (context) => {
    const id = context.query.id as string | undefined;
    
    if(!id) return {notFound: true , props: { userInfo: undefined }}

    const userInfo = await graphqlclient.request(getUserByIdQuery, {id})

    if(!userInfo?.getUserById)  return {notFound: true}

    return {
        props:{
            userInfo: userInfo.getUserById as User,
        },
    };
};

export default UserProfilePage;