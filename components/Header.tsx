import React from "react";
import Image from "next/image";
import logo from "../images/Reddit-Logo.png";
import signinLogo from "../images/Reddit-icon.svg";
import {
  MagnifyingGlassIcon,
  ChevronDownIcon,
  HomeIcon,
  Bars3Icon,
} from "@heroicons/react/24/solid";
import {
  BellIcon,
  ChatBubbleOvalLeftIcon,
  GlobeAmericasIcon,
  PlusIcon,
  SparklesIcon,
  MegaphoneIcon,
  VideoCameraIcon,
} from "@heroicons/react/24/outline";
import { signIn, signOut, useSession } from "next-auth/react";

function Header() {
  const { data: session } = useSession();
  return (
    <div className=" sticky top-0 z-50 flex bg-white px-4 py-2 shadow-sm items-center">
      <div className="relative h-10 w-20 flex-shrink-0 cursor-pointer">
        <Image objectFit="contain" layout="fill" src={logo} />
      </div>

      <div className="mx-7 flex items-center xl:min-w-[300px]">
        <HomeIcon className="h-5 w-5" />
        <p className=" ml-2 hidden flex-1 lg:inline">Home</p>
        <ChevronDownIcon className="h-5 w-5" />
      </div>
      {/* Search Box */}
      <form className="flex flex-1 items-center space-x-2 border-gray-200 rounded-sm border bg-gray-100 px-3 py-1 ">
        <MagnifyingGlassIcon className="h-6 w-6 text-gray-400" />
        <input
          className="flex-1 bg-transparent outline-none"
          type="text"
          placeholder="Search Reddit"
        ></input>
        <button type="submit" hidden />
      </form>
      <div className=" items-center space-x-2 text-gray-500 mx-5 hidden lg:inline-flex">
        <SparklesIcon className="icon" />
        <GlobeAmericasIcon className="icon" />
        <VideoCameraIcon className="icon" />
        <hr className="h-10 border border-gray-100" />
        <ChatBubbleOvalLeftIcon className="icon" />
        <BellIcon className="icon" />
        <PlusIcon className="icon" />
        <MegaphoneIcon className="icon" />
      </div>
      <div className="ml-5 flex items-center lg:hidden">
        <Bars3Icon className="icon" />
      </div>
      {/* Sign In/ Sign Out Button */}
      {session ? (
        <div
          onClick={() => signOut()}
          className="hidden lg:flex items-center cursor-pointer space-x-2 border-gray-100 p-2"
        >
          <div className="relative h-5 w-5 flex-shrink-0">
            <Image objectFit="contain" src={signinLogo} layout="fill" alt="" />
          </div>
          <div>
            <p className="truncate">{session.user?.name}</p>
            <p className="text-gray-400">Karma 1,000</p>
          </div>
          <ChevronDownIcon className="h-5 flex-shrink-0 text-gray-400" />
        </div>
      ) : (
        <div
          onClick={() => signIn()}
          className="hidden lg:flex items-center cursor-pointer space-x-2 border-gray-100 p-2"
        >
          <div className="relative h-5 w-5 flex-shrink-0">
            <Image objectFit="contain" src={signinLogo} layout="fill" alt="" />
          </div>
          <p className="text-gray-400"> Sign In</p>
        </div>
      )}
    </div>
  );
}

export default Header;
