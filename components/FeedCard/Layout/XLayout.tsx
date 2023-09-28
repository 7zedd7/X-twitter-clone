import { userCurrentUser } from "@/hooks/user";
import React, { useCallback, useMemo } from "react";
import { BiHomeCircle } from "react-icons/bi";
import { BsPeople, BsPerson } from "react-icons/bs";
import { CiCircleMore } from "react-icons/ci";
import { FaXTwitter } from "react-icons/fa6";
import { FiBookmark } from "react-icons/fi";
import { HiOutlineMail } from "react-icons/hi";
import { IoNotificationsOutline } from "react-icons/io5";
import { RiFileListLine, RiSearchLine } from "react-icons/ri";
import Image from "next/image";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import toast from "react-hot-toast";
import { graphqlclient } from "@/clients/api";
import { verifyUserGoogleTokenQuery } from "@/graphql/query/user";
import { useQueryClient } from "@tanstack/react-query";
import { RxDotsHorizontal } from "react-icons/rx"
import Link from "next/link";


interface XSidebarbutton {
    title: string;
    icon: React.ReactNode;
    link: string
}



interface XLayoutProps {
    children: React.ReactNode;
}

const XLayout: React.FC<XLayoutProps> = (props) => {
    const { user } = userCurrentUser();

    const queryClient = useQueryClient();

    const sidebarMenuItems: XSidebarbutton[] = useMemo (
        () => [
        {
            title: "Home",
            icon: <BiHomeCircle />,
            link:"/"
        },
        {
            title: "Explore",
            icon: <RiSearchLine />,
            link:"/"
        },
        {
            title: "Notifications",
            icon: <IoNotificationsOutline />,
            link:"/"
        },
        {
            title: "Messages",
            icon: <HiOutlineMail />,
            link:"/"
        },
        {
            title: "Lists",
            icon: <RiFileListLine />,
            link:"/"
        },
        {
            title: "Bookmarks",
            icon: <FiBookmark />,
            link:"/"
        },
        {
            title: "Communities",
            icon: <BsPeople />,
            link:"/"
        },
        {
            title: "Verified",
            icon: <FaXTwitter />,
            link:"/"
        },
        {
            title: "Profile",
            icon: <BsPerson />,
            link:`/${user?.id}`
        },
        {
            title: "More ",
            icon: <CiCircleMore />,
            link:"/"
        },
    ],[user?.id])

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
            <div className="grid grid-cols-12 h-screen w-screen sm:px-60">
                <div className="lg:col-span-3 md:col-span-2 sm:col-span-2 col-span-2 flex sm:justify-end pr-7 relative">
                    <div className="fixed">
                        <div className="text-3xl h-fit hover:bg-[#181919] rounded-full p-3 cursor-pointer transition-all w-fit">
                            <FaXTwitter />
                        </div>
                        <div className="mt-3 text-2xl  pr-0 w-full">
                        <ul>
                        {sidebarMenuItems.map((item) => (
                                <li
                                    key={item.title}
                                >
                                    <Link href={item.link} className={`flex gap-5 text-3xl hover:bg-[#181919] rounded-full cursor-pointer transition-all px-4 py-2.5 w-fit mt-2 `}>
                                    <span>{item.icon}</span>
                                    <span className="hidden sm:inline text-lg">{item.title}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                            <div className="pl-2">
                                <button className="hidden sm:block bg-[#1d9bf0] text-lg p-3 mt-6 font-bold rounded-full w-60  hover:bg-[#1A8CD8] transition-all">
                                    Post
                                </button>
                                {/* <button className="block sm:hidden bg-[#1d9bf0] font-semibold text-lg py-2 px-4 rounded-full w-full">
                            <FaXTwitter />
                            </button> */}
                                <div className="">
                                    {user && (
                                        <div className="fixed bottom-5 flex gap-2 items-center hover:bg-[#181919] cursor-pointer transition-all w-64 px-3 py-2 rounded-full">
                                            {user && user.profileImageURL && (
                                                // eslint-disable-next-line @next/next/no-img-element
                                                <img
                                                    className="rounded-full"
                                                    src={user?.profileImageURL}
                                                    alt="user-image"
                                                    height={40}
                                                    width={40}
                                                />
                                            )}
                                            <div className="hidden sm:block">
                                                <h3 className="text-xl">
                                                    {user?.firstName} {user?.lastName}
                                                </h3>
                                            </div>
                                            <div className="ml-auto text-lg">
                                            <RxDotsHorizontal />
                                            </div>
                                        </div>
                                    )}
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="lg:col-span-5 md:col-span-9 sm:col-span-10 col-span-10 border-r-[0.2px] border-l-[0.2px] border-[#2F3336]">
                    {props.children}
                </div>
                <div className="lg:col-span-3 md:col-span-0 sm:col-span-0 col-span-0 p-5">
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
};

export default XLayout;

