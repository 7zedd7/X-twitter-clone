
import React from "react";
import Image from "next/image";
import { FaXTwitter } from "react-icons/fa6";
import { BiHomeCircle } from "react-icons/bi";
import { RiSearchLine } from "react-icons/ri"
import { IoNotificationsOutline } from "react-icons/io5"
import { HiOutlineMail } from "react-icons/hi"
import { RiFileListLine } from "react-icons/ri"
import { FiBookmark } from "react-icons/fi"
import { BsPeople } from "react-icons/bs"
import { BsPerson } from "react-icons/bs"
import { CiCircleMore } from "react-icons/ci"


import { list } from "postcss";
import FeedCard from "@/components/FeedCard";



interface XSidebarbutton {
  title: string;
  icon: React.ReactNode;
}

const sidebarMenuItems: Array<XSidebarbutton> = [
  {
    title: "Home",
    icon: <BiHomeCircle />,
  },
  {
    title : "Explore",
    icon : <RiSearchLine />,
  },
  {
    title : "Notifications",
    icon : <IoNotificationsOutline />,
  },
  {
    title : "Messages",
    icon : <HiOutlineMail />,
  },
  {
    title : "Lists",
    icon : <RiFileListLine />,
  },
  {
    title : "Bookmarks",
    icon : <FiBookmark />,
  },
  {
    title : "Communities",
    icon : <BsPeople />,
  },
  {
    title : "Verified",
    icon : <FaXTwitter />,
  },
  {
    title : "Profile",
    icon : <BsPerson />,
  },
  {
    title : "More ",
    icon : <CiCircleMore />,
  }
];

export default function Home() {
  return (
    <div >
      <div className="grid grid-cols-12 h-screen w-screen px-60">
        <div className="col-span-3 ml-20 ">
          <div className="text-3xl h-fit hover:bg-[#181919] rounded-full p-3 cursor-pointer transition-all w-fit">
            <FaXTwitter />
          </div>
          <div className="mt-3 text-2xl  pr-0 w-full">
            <ul>
              {sidebarMenuItems.map((item) => (
                <li className={`flex gap-5 text-3xl hover:bg-[#181919] rounded-full cursor-pointer transition-all px-4 py-2.5 w-fit mt-2 `} key={item.title}>
                  <span>{item.icon}</span>
                  <span className="text-lg">{item.title}</span>
                </li>
              ))}
            </ul>
            <div className="pl-2">
            <button className="bg-[#1d9bf0] text-lg p-3 mt-6 font-bold rounded-full w-60  hover:bg-[#1A8CD8] transition-all" >Post</button>
            </div>
          </div>
        </div>
        <div className="col-span-5 border-r-[0.2px] border-l-[0.2px] border-[#2F3336]">
        <FeedCard/>
        <FeedCard/>
        <FeedCard/>
        <FeedCard/>
        <FeedCard/>
        <FeedCard/>
        <FeedCard/>
        <FeedCard/>
        <FeedCard/>
        <FeedCard/>
        <FeedCard/>
        <FeedCard/>
        </div>
        <div className="col-span-3"></div>
      </div>
    </div>
  );
}
