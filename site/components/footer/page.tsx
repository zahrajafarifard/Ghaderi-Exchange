"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import logo from "@/public/images/logo-header.svg";
import insta from "@/public/images/instagram.svg";
import telegramIcon from "@/public/images/telegram.svg";

const Footer = () => {
  const pathname = usePathname();

  const [address, setAddress] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [workHour, setWorkHour] = useState<string>("");
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
          setPhone(data?.phone);
          setAddress(data?.address);
          setEmail(data?.email);
          setWorkHour(data?.workHours);
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
    <>
      <div
        className={`border-t border-b border-[#E5E5E5]
        ${pathname.includes("about-us") && "border-t-0"}`}
      >
        <div
          style={{ direction: "rtl" }}
          className="w-[90%] mx-auto grid grid-cols-4 py-24  screen1100:grid-cols-3
            screen800:grid-cols-1
            screen800:py-12"
        >
          <Image
            src={logo}
            className="mx-auto screen1100:hidden screen800:flex "
            width={140}
            height={83}
            alt="لگو صرافی قادری"
            style={{ width: "auto", height: "auto" }}
          />
          <div className="mx-auto  screen800:py-9">
            <h3 className="text-[#2d2d2d] text-[24px] font-bold leading-8 mb-8 screen1250:text-xl screen800:text-center">
              با ما در ارتباط باشید
            </h3>
            <h4
              style={{ direction: "ltr" }}
              className="text-[#2d2d2d] text-right screen1250:text-sm screen800:text-center"
            >
              {phone}
            </h4>
            <h4 className="text-[#2d2d2d] capitalize my-3 screen1250:text-sm screen800:text-center">
              {email}
            </h4>
            <h4 className="text-[#2d2d2d] screen1250:text-sm screen800:text-center">
              {workHour}
            </h4>
          </div>

          <div className="screen800:mx-auto">
            <h3 className="text-[#2d2d2d] text-[24px] font-bold leading-8 mb-8 screen1250:text-xl screen800:text-center">
              آدرس ما
            </h3>
            <h4 className="text-[#777E90] w-2/3 screen1600:w-[80%] screen1350:w-full screen1250:text-sm screen800:text-center">
              {address}
            </h4>
            <Link href={"/contact-us"}>
              <div className="border-[2px] border-[#E5E5E5] rounded-[90px] p-1 w-fit mt-4 screen800:mx-auto ">
                <div className="rounded-[100px] bg-[#3772FF]  hover:bg-[#003ED1] active:bg-[#003ED1] text-white py-2 px-6 font-bold text-sm">
                  نمایش روی نقشه
                </div>
              </div>
            </Link>
          </div>
          <div className="mx-auto  screen800:pt-9">
            <h3 className="text-[#2d2d2d] text-[24px] font-bold leading-8 mb-8 screen1250:text-xl">
              شبکه های اجتماعی
            </h3>
            <div className="flex flex-row space-x-6 space-x-reverse screen800:justify-center">
              <Link
                href={`https://t.me/${telegram}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src={telegramIcon}
                  width={34}
                  height={34}
                  alt="تلگرام صرافی قادری"
                  style={{ width: "auto", height: "auto" }}
                />
              </Link>
              <Link
                href={`https://www.instagram.com/${instagram}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src={insta}
                  width={34}
                  height={34}
                  alt="اینستاگرام صرافی قادری"
                  style={{ width: "auto", height: "auto" }}
                />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div
        style={{ direction: "rtl" }}
        className="text-[#777E90] text-center py-4 screen1200:text-sm screen800:px-4"
      >
        کلیه حقوق مادی و معنوی این سایت متعلق به صرافی قادری می باشد و کپی از آن
        پیگرد قانونی دارد.
        <br className="hidden screen800:grid" />
        <span className="text-[#33B446] ">
          طراحی شده توسط شرکت
          <Link href="https://telmis.ir" className="cursor-pointer">
            <span className="underline font-semibold underline-offset-4">
               تلمیس
            </span>
          </Link>
        </span>
      </div>
    </>
  );
};

export default Footer;
