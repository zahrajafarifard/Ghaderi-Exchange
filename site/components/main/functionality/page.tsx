import React from "react";
import Image from "next/image";

import line from "@/public/images/connect line.svg";
import icon1 from "@/public/images/icon-1.svg";
import icon2 from "@/public/images/icon-2.svg";
import icon3 from "@/public/images/icon-3.svg";
import icon4 from "@/public/images/icon-4.svg";

const steps = [
  {
    icon: icon1,
    step: "مرحله ۱",
    title: "ورود به وب‌سایت",
    description:
      "با دسترسی آسان و رابط کاربری ساده، می‌توانید در کمترین زمان به نرخ‌های لحظه‌ای ارز و سکه دسترسی پیدا کنید.",
  },
  {
    icon: icon2,
    step: "مرحله ۲",
    title: "بررسی نرخ ارز و سکه",
    description:
      "تمامی نرخ‌ها به‌صورت لحظه‌ای به‌روزرسانی می‌شوند تا تصمیم‌گیری شما سریع‌تر و دقیق‌تر انجام شود.",
  },
  {
    icon: icon3,
    step: "مرحله ۳",
    title: "مراجعه حضوری به شعبه",
    description:
      "پس از انتخاب ارز یا سکه، می‌توانید برای تکمیل فرآیند خرید یا فروش به‌صورت حضوری به شعبه صرافی مراجعه کنید.",
  },
  {
    icon: icon4,
    step: "مرحله ۴",
    title: "دریافت وجه یا ارز",
    description:
      "پس از تأیید تراکنش، مبلغ موردنظر را دریافت یا به حساب شما واریز می‌شود.",
  },
];

const Functionality = () => {
  return (
    <div className="bg-[#F6F6F6] py-24">
      <h2
        className="text-[#2D2D2D] text-[48px] font-bold text-center tracking-[0.96px] leading-[56px] mb-4
        screen1200:text-[40px]
        screen750:text-[32px]
        screen400:tracking-normal "
      >
        نحوه کار صرافی قادری
      </h2>
      <h4
        className="text-[#777E90] text-xl tracking-[0.2px] leading-[28px] text-center w-1/3 mx-auto
        screen1350:w-[40%]
        screen1200:text-lg
        screen980:w-[55%]
        screen750:text-base
        screen750:w-2/3
        screen550:w-full
        screen550:px-10
        screen450:px-6 "
      >
        سریع، آسان و امن؛ تجربه‌ای متفاوت در تبادل ارزهای خارجی و خریدوفروش سکه،
        همراه با نرخ لحظه‌ای
      </h4>

      <div
        style={{ direction: "rtl" }}
        className="grid grid-cols-7 w-[90%] mx-auto gap-0 items-center   mt-12
        screen1350:grid-cols-4
        screen1100:grid-cols-2
        screen1100:gap-5
        screen550:grid-cols-1 "
      >
        {steps.map((item, index) => (
          <React.Fragment key={index}>
            <div className="flex flex-col justify-center items-center  w-[110%] screen1350:w-full">
              <Image src={item?.icon} width={96} height={96} alt="ایکن" />
              <span className="text-[#777E90] text-sm font-bold my-1">
                {item.step}
              </span>
              <span className="text-[#2D2D2D] text-xl font-bold">
                {item.title}
              </span>
              <span className="px-2 text-center text-[#777E90] mt-1">
                {item.description}
              </span>
            </div>
            {index !== steps.length - 1 && (
              <Image
                src={line}
                className="w-fit  mx-auto screen1440:w-32 screen1350:hidden"
                alt="خط اتصال"
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Functionality;
