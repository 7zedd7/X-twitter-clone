import React from "react";
import Image from "next/image";
import { BiMessageRounded } from "react-icons/bi"
import { FaRetweet } from "react-icons/fa6"
import { BsHeart } from "react-icons/bs"
import { BiBarChart } from "react-icons/bi"
import { PiUploadSimpleLight } from "react-icons/pi" 

const FeedCard: React.FC = () => {
    return (
        <div className="border border-l-0 border-r-0 border-b-0 border-[#2F3336] p-5 hover:bg-[#080808] transition-all cursor-pointer">
            <div className="grid grid-cols-12 gap-3">
                <div className="col-span-1">
                    <Image
                        src={"https://avatars.githubusercontent.com/u/104027755?v=4"}
                        alt="user-image"
                        height={50}
                        width={50}
                    />
                </div>
                <div className="col-span-11">
                    <h5>Zeel Patel</h5>
                    <p>
                        If you’re a developer, you need to install @dailydotdev right now.
                        It’s a Chrome extension that brings you the best dev articles from
                        around the web in a new tab. It’s like a treasure chest of knowledge
                        and it is constantly updated. Don’t miss it: daily.dev daily.dev
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
