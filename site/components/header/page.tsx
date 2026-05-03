"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

import NavLink from "../shared/navLink/page";
import logo from "@/public/images/logo-header.svg";
import insta from "@/public/images/instagram.svg";
import telegramIcon from "@/public/images/telegram.svg";

const Header: React.FC = () => {
  const [instagram, setInstagram] = useState<string>("");
  const [telegram, setTelegram] = useState<string>("");

  useEffect(() => {
    const _data = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/getConfig`
      );

      switch (response.status) {
        case 200:
          const data = await response.json();
          setInstagram(data?.instagram);
          setTelegram(data?.telegram);

          break;

        default:
          break;
      }
    };
    _data();
  }, []);
  return (
    <div className="w-[90%] mx-auto flex flex-row-reverse justify-between py-4 screen800:w-[95%] screen660:justify-center">
      <Link href="/">
        <Image
          src={logo}
          alt="لوگو صرافی قادری"
          width={144}
          height={80}
          className="screen980:w-32 my-auto screen800:w-28 screen660:hidden"
        />
      </Link>
      <div
        className="flex flex-row-reverse space-x-10 space-x-reverse justify-center items-center screen660:w-full
          screen1200:space-x-3 screen1200:space-x-reverse screen400:space-x-0 screen400:space-x-reverse"
      >
        <NavLink href="/">صفحه اصلی</NavLink>
        <NavLink href="/about-us">درباره ما</NavLink>
        <NavLink href="/contact-us">تماس با ما</NavLink>
      </div>
      <div className="flex flex-row space-x-5 my-auto screen800:space-x-2 screen660:hidden ">
        <Link
          href={`https://www.instagram.com/${instagram}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src={insta}
            alt="اینستاگرام"
            width={32}
            height={32}
            style={{ width: "auto", height: "auto" }}
          />
        </Link>

        <Link
          href={`https://t.me/${telegram}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src={telegramIcon}
            alt="تلگرام"
            width={32}
            height={32}
            style={{ width: "auto", height: "auto" }}
          />
        </Link>
      </div>
    </div>
  );
};

export default Header;
