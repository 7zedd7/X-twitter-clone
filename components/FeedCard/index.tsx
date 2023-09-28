import React from "react";
import Image from "next/image";
import { BiMessageRounded } from "react-icons/bi"
import { FaRetweet } from "react-icons/fa6"
import { BsHeart } from "react-icons/bs"
import { BiBarChart } from "react-icons/bi"
import { PiUploadSimpleLight } from "react-icons/pi" 
import { Tweet } from "@/gql/graphql";
import Link from "next/link";

interface FeedCardProps {
    data: Tweet
}

const FeedCard: React.FC<FeedCardProps> = (props) => {
    const {data} = props
    return (
        <div className="border border-l-0 border-r-0 border-b-0 border-[#2F3336] p-5 hover:bg-[#080808] transition-all cursor-pointer">
            <div className="grid grid-cols-12 gap-3">
                <div className="col-span-1">
                    {data.author?.profileImageURL && <Image
                        className="rounded-full"
                        src={data.author.profileImageURL}
                        alt="user-image"
                        height={50}
                        width={50}
                    />}
                </div>
                <div className="col-span-11">
                    <h5>
                        <Link href={`/${data.author?.id}`}>{data.author?.firstName} {data.author?.lastName}</Link>
                    </h5>
                    <p>
                        {data.content}
                    </p>
                    <div className="flex justify-between mt-5 text-[18.75px]">
                        <div>
                            <BiMessageRounded />
                        </div>
                        <div>
                            <FaRetweet />
                        </div>
                        <div>
                            <BsHeart />
                        </div>
                        <div>
                            <BiBarChart/>
                        </div>
                        <div>
                            <PiUploadSimpleLight/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeedCard;
