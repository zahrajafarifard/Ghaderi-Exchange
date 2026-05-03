import React from "react";
import Image from "next/image";

import icon from "@/public/images/sym.svg";

const ThirdChild = () => {
  return (
    <div
      className="grid grid-cols-2 gap-x-12 w-[80%] mx-auto mb-24 screen1250:gap-x-8 screen900:gap-x-4
      screen900:grid-cols-1
      screen660:w-[90%]"
    >
      <div className="h-full rounded-[12px] overflow-hidden screen1350:h-3/4 my-auto screen900:h-[400px] screen450:h-[300px]">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d286.08792303005!2d51.376785316538!3d35.78236757903325!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f8e040b1f5a750d%3A0x7315c04bc178f38e!2sAprin%20Exchange!5e0!3m2!1sen!2sde!4v1741084231134!5m2!1sen!2sde"
          className="w-full rounded-[12px] h-full mx-auto my-auto "
        ></iframe>
      </div>
      <div className="py-12 pr-12 screen1250:pr-8 screen900:pr-0">
        <h3 className="text-[#2D2D2D] text-[28px] mb-8 text-right">
          ارسال پیام
        </h3>
        <div className="flex flex-row space-x-5 screen1250:space-x-2">
          <input
            className="rounded-[30px] p-4 bg-[#f6f6f6] w-full outline-none screen550:text-sm"
            placeholder="شماره تماس"
            dir="rtl"
          />
          <input
            className="rounded-[30px] p-4 bg-[#f6f6f6] w-full outline-none screen550:text-sm"
            placeholder="نام و نام خانوادگی"
            dir="rtl"
          />
        </div>
        <textarea
          rows={5}
          className="rounded-[30px] p-4 bg-[#f6f6f6] w-full my-5 outline-none screen550:text-sm"
          placeholder="پیام خود را وارد کنید....."
          dir="rtl"
        />

        <button className="bg-[#33B446] hover:bg-[#258333] active:bg-[#258333] rounded-[30px] mr-auto flex flex-row space-x-5 px-12 py-4 screen900:ml-auto screen900:mr-0">
          <span className="text-white font-bold leading-4 tracking-[-0.42px] my-auto">
            ارسال پیام
          </span>
          <Image
            src={icon}
            width={10}
            height={10}
            alt="ارسال پیام"
            className="my-auto"
          />
        </button>
      </div>
    </div>
  );
};

export default ThirdChild;
