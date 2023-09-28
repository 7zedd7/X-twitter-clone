import React, { useCallback, useState } from "react";


import { IoNotificationsOutline, IoImageOutline } from "react-icons/io5";
import { HiOutlineMail, HiOutlineLocationMarker } from "react-icons/hi";

import { BsPeople, BsPerson, BsEmojiSmile } from "react-icons/bs";
import { CiCircleMore } from "react-icons/ci";
import { HiOutlineGif } from "react-icons/hi2"
import { RiListRadio } from "react-icons/ri"
import { LuCalendarClock } from "react-icons/lu"
import Image from "next/image";
import { useCreateTweet, useGetAllTweets } from "@/hooks/tweet";
import { Maybe, Tweet, User } from "@/gql/graphql";
import XLayout from "@/components/FeedCard/Layout/XLayout";
import FeedCard from "@/components/FeedCard";
import { userCurrentUser } from "@/hooks/user";
import { list } from "postcss";
import { GetServerSideProps } from "next";
import { graphqlclient } from "@/clients/api";
import { getAllTweetsQuery } from "@/graphql/query/tweet";

// import { FaXTwitter } from "react-icons/fa6";
// import { BiHomeCircle } from "react-icons/bi";
// import toast from "react-hot-toast";
// import { graphqlclient } from "@/clients/api";
// import { verifyUserGoogleTokenQuery } from "@/graphql/query/user";
// import { FiBookmark } from "react-icons/fi";
// import { useQueryClient } from "@tanstack/react-query";
// import { RiSearchLine,RiFileListLine } from "react-icons/ri";
// import { GrImage } from "react-icons/gr"

interface HomeProps{
    tweets?: Tweet[];
}

export default function Home(props: HomeProps) {

    const { mutate } = useCreateTweet()

    const { user } = userCurrentUser();

    const [content, setContent] = useState('')

    const handleSelectImage = useCallback(() => {
        const input = document.createElement('input')
        input.setAttribute("type", "file")
        input.setAttribute("accept", "image/*")
        input.click();
    }, [])

    const handleCreateTweet = useCallback(() => {
        mutate({
            content,
        })
    }, [content, mutate])

    return (
        <div>
            <XLayout>
                <div>
                    <div className="border border-l-0 border-r-0 border-b-0 border-[#2F3336] p-5 hover:bg-[#080808] transition-all cursor-pointer">
                        <div className="grid grid-cols-12 gap-3">
                            <div className="col-span-1">
                                {user?.profileImageURL && (
                                    <Image
                                        className="rounded-full"
                                        src={user?.profileImageURL}
                                        alt="user-image"
                                        height={50}
                                        width={50}
                                    />
                                )}
                            </div>
                            <div className="col-span-11">
                                <textarea
                                    value={content}
                                    onChange={e => setContent(e.target.value)}
                                    className="resize-none border w-full bg-transparent border-0 text-xl px-3 border-b border-[#2F3336]" placeholder="What is happening?" rows={3}></textarea>
                                <div className="flex justify-between gap-5 pt-3">
                                    <div className="flex gap-5 text-xl text-[#1D9BF0]">
                                        <IoImageOutline onClick={handleSelectImage} />
                                        <HiOutlineGif className="sm:hidden"/>
                                        <RiListRadio className="max-xl:hidden"/>
                                        <BsEmojiSmile />
                                        <LuCalendarClock className="max-2xl:hidden" />
                                        <HiOutlineLocationMarker className="max-xl:hidden"/>
                                    </div>
                                    <div className="self-end">
                                        <button onClick={handleCreateTweet} className="bg-[#1d9bf0] text-sm  font-semibold py-2  px-4 rounded-full ">Post</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {
                    props.tweets?.map((tweet: Tweet | null) => tweet ? <FeedCard key={tweet.id} data={tweet as Tweet} /> : null)
                }
            </XLayout>
        </div>
    );
}

export const getServerSideProps: GetServerSideProps<HomeProps> =async (context) => {
    const allTweets = await graphqlclient.request(getAllTweetsQuery);
    return {
        props: {
            tweets: allTweets.getAllTweets as Tweet[],
        }
    }
}
