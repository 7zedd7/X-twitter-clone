import React, { useCallback, useState } from "react";
import Image from "next/image";
import { FaXTwitter } from "react-icons/fa6";
import { BiHomeCircle } from "react-icons/bi";
import { RiSearchLine,RiFileListLine } from "react-icons/ri";
import { IoNotificationsOutline,IoImageOutline } from "react-icons/io5";
import { HiOutlineMail , HiOutlineLocationMarker } from "react-icons/hi";
import { FiBookmark } from "react-icons/fi";
import { BsPeople , BsPerson , BsEmojiSmile } from "react-icons/bs";
import { CiCircleMore } from "react-icons/ci";
import { HiOutlineGif } from "react-icons/hi2"
import { RiListRadio } from "react-icons/ri"
import { LuCalendarClock } from "react-icons/lu"

import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { list } from "postcss";
import FeedCard from "@/components/FeedCard";
import toast from "react-hot-toast";
import { graphqlclient } from "@/clients/api";
import { verifyUserGoogleTokenQuery } from "@/graphql/query/user";
import { userCurrentUser } from "@/hooks/user";
import { useQueryClient } from "@tanstack/react-query";
import { useCreateTweet, useGetAllTweets } from "@/hooks/tweet";
import { Maybe, Tweet, User } from "@/gql/graphql";
// import { GrImage } from "react-icons/gr"
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
    title: "Explore",
    icon: <RiSearchLine />,
  },
  {
    title: "Notifications",
    icon: <IoNotificationsOutline />,
  },
  {
    title: "Messages",
    icon: <HiOutlineMail />,
  },
  {
    title: "Lists",
    icon: <RiFileListLine />,
  },
  {
    title: "Bookmarks",
    icon: <FiBookmark />,
  },
  {
    title: "Communities",
    icon: <BsPeople />,
  },
  {
    title: "Verified",
    icon: <FaXTwitter />,
  },
  {
    title: "Profile",
    icon: <BsPerson />,
  },
  {
    title: "More ",
    icon: <CiCircleMore />,
  },
];

export default function Home() {
  const { user } = userCurrentUser();
  const { tweets = [] } = useGetAllTweets()
  const { mutate  } = useCreateTweet()

  const queryClient = useQueryClient();

  const [content , setContent] = useState('')

  const handleSelectImage = useCallback(() =>{
    const input  = document.createElement('input')
    input.setAttribute("type","file")
    input.setAttribute("accept","image/*")
    input.click();
  },[])
  
  const handleCreateTweet = useCallback(() => {
    mutate({
      content,
    })
  },[content, mutate])

  const handleLoginWithGooogle = useCallback(
    async (cred: CredentialResponse) => {
      const googleToken = cred.credential;
      if (!googleToken) return toast.error("Google Token not found ");

      const { verifyGoogleToken } = await graphqlclient.request(
        verifyUserGoogleTokenQuery,
        { token: googleToken }
      );

      toast.success("Verified Success");
      console.log(verifyGoogleToken);

      if (verifyGoogleToken)
        window.localStorage.setItem("X_twitter", verifyGoogleToken);

      await queryClient.invalidateQueries(["current-user"]);
    },
    [queryClient]
  );

  return (
    <div>
      <div className="grid grid-cols-12 h-screen w-screen px-60">
        <div className="col-span-3 ml-20 relative">
          <div className="text-3xl h-fit hover:bg-[#181919] rounded-full p-3 cursor-pointer transition-all w-fit">
            <FaXTwitter />
          </div>
          <div className="mt-3 text-2xl  pr-0 w-full">
            <ul>
              {sidebarMenuItems.map((item) => (
                <li
                  className={`flex gap-5 text-3xl hover:bg-[#181919] rounded-full cursor-pointer transition-all px-4 py-2.5 w-fit mt-2 `}
                  key={item.title}
                >
                  <span>{item.icon}</span>
                  <span className="text-lg">{item.title}</span>
                </li>
              ))}
              <div className="pl-2">
              <button className="bg-[#1d9bf0] text-lg p-3 mt-6 font-bold rounded-full w-60  hover:bg-[#1A8CD8] transition-all">
                Post
              </button>
            </div>
            <div className="absolute bottom-5 flex gap-2 items-center  bg-[#181919] px-3 py-2 rounded-full">
            {user && user.profileImageURL && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
              className="rounded-full"
                src={user?.profileImageURL}
                alt="user-image"
                height={50}
                width={50}
              />
            )}
            <div>
            <h3 className="text-xl">{user?.firstName} {user?.lastName}</h3>
            </div>
          </div>
            </ul>
          </div>

        </div>
        <div className="col-span-5 border-r-[0.2px] border-l-[0.2px] border-[#2F3336]">
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
                        <HiOutlineGif />             
                        <RiListRadio />
                        <BsEmojiSmile />
                        <LuCalendarClock />
                        <HiOutlineLocationMarker />
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
            tweets?.map((tweet: Tweet | null) => tweet ? <FeedCard key={tweet.id} data={tweet as Tweet} /> : null)
          }
    
        </div>
        <div className="col-span-3 p-5">
          {!user && (
            <div className="p-5 bg-slate-900 rounded-lg">
              <h1 className="my-2 text-xl">New To X?</h1>
              <GoogleLogin onSuccess={handleLoginWithGooogle} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
