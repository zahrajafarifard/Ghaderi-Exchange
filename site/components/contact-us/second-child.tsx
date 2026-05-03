"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

import icon1 from "@/public/images/Symbol.svg";
import icon2 from "@/public/images/Symbol (1).svg";
import icon3 from "@/public/images/Symbol (2).svg";
import icon4 from "@/public/images/Symbol (3).svg";

const contactInfo = [
  {
    id: 1,
    icon: icon1,
    alt: "ساعت کاری",
    title: "ساعت کاری ما",
  },
  {
    id: 2,
    icon: icon2,
    alt: "ایمیل",
    title: "آدرس ایمیل",
  },
  {
    id: 3,
    icon: icon3,
    alt: "شماره تماس",
    title: "شماره تماس",
  },
  {
    id: 4,
    icon: icon4,
    alt: "آدرس",
    title: "آدرس ما",
    // description:
  },
];

const SecondChild = () => {
  const [address, setAddress] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [workHour, setWorkHour] = useState<string>("");

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

          break;

        default:
          break;
      }
    };
    _data();
  }, []);

  return (
    <div
      id="contact-us"
      style={{ direction: "rtl" }}
      className="my-24 w-[80%] mx-auto grid grid-cols-4 gap-7 screen1600:gap-3 
      screen1350:grid-cols-2
      screen1350:w-[65%]
      screen1350:gap-7
      screen1050:w-[75%]
      screen850:w-[80%]
      screen850:gap-5
      screen750:w-[90%]
      screen750:gap-4
      screen660:grid-cols-1
      screen660:w-2/3
      screen550:w-[90%] "
    >
      {contactInfo?.map((item) => (
        <div
          key={item?.id}
          className="bg-[#F6F6F6] rounded-[30px] pt-16 pb-12 text-center borderscreen1600:pt-10 screen1600:pb-8"
        >
          <div className="bg-[#33B446] rounded-full w-12 h-12 flex justify-center items-center mx-auto">
            <Image src={item.icon} alt={item.alt} width={20} height={20} />
          </div>
          <h3 className="text-[#2D2D2D] text-xl font-semibold py-5">
            {item.title}
          </h3>
          <p
            style={{ direction: "ltr" }}
            className="text-[#92939E] leading-[202%] px-6 
            screen1600:px-3 screen1350:px-6 screen750:px-4"
          >
            {item.id === 1
              ? workHour
              : item.id === 2
              ? email
              : item.id === 3
              ? phone
              : address}
          </p>
        </div>
      ))}
    </div>
  );
};

export default SecondChild;
