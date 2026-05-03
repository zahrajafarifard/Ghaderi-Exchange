import Image from "next/image";
import Link from "next/link";

import icon1 from "@/public/images/paypal.svg";
import icon2 from "@/public/images/western.svg";
import icon3 from "@/public/images/SWIFT.svg";
import banner from "@/public/images/banner.png";

import { Hamrah } from "@/app/layout";

const Banner: React.FC = () => {
  return (
    <div className="w-full mx-auto bg-[#F6F6F6]">
      <div className="w-[90%] mx-auto flex flex-row screen660:flex-col-reverse ">
        <div className="w-1/2 screen660:w-[95%] screen660:pb-24">
          <Image
            src={banner}
            className="w-full h-full object-contain"
            alt="بنر"
          />
        </div>
        <div className="w-1/2 mt-28 screen1200:mt-20 screen850:mt-14 screen660:w-[95%] screen660:mt-14">
          <h1
            className={`text-right text-[64px] ${Hamrah.className} 
              screen1200:text-[54px]
              screen980:text-[44px] 
              screen850:text-4xl
              screen660:text-[55px]
              screen550:text-[45px]
              screen450:text-[40px]
              screen400:text-[34px]
              screen350:text-[30px] `}
          >
            شــرکــت تــضــامـــنـــی
          </h1>
          <h1
            className={`text-right text-[64px] ${Hamrah.className} 
              screen1200:text-[54px]
              screen980:text-[44px]
              screen850:text-4xl
              screen660:text-[55px]
              screen660:leading-[95px]
              screen550:text-[45px]
              screen450:text-[40px]
              screen400:text-[34px]
              screen400:leading-[52px]
              screen350:text-[30px] `}
          >
            فــرهــاد قــــادری و شـــرکــــاء
          </h1>
          <h3
            className="text-right text-2xl leading-[42px] -tracking-[0.24px] text-[#777E90] mt-4
            screen1200:text-[22px]
            screen980:text-xl
            screen850:text-lg 
            screen750:text-base           
            screen660:text-[22px]
            screen550:text-xl
            screen550:leading-[32px]
            screen450:text-base
            screen400:text-sm
            screen400:leading-[32px] "
          >
            با مجوز رسمی از بانک مرکزی جمهوری اسلامی ایران
          </h3>
          <h3
            className="text-right text-2xl leading-[42px] -tracking-[0.24px] text-[#777E90] mb-4
             screen1200:text-[22px]
             screen980:text-xl
             screen850:text-lg
             screen750:text-base 
             screen660:text-[22px]
              screen660:leading-[45px]
              screen550:text-xl
              screen550:leading-[42px]
              screen450:text-base
              screen450:leading-[32px]
              screen400:text-sm "
          >
            شماره مجوز : 12545
          </h3>
          <Link href="#prices">
            <div
              className="w-fit border border-[#33B446] text-[#33B446] bg-transparent rounded-full font-bold leading-4 py-4 px-6 
              ml-auto cursor-pointer transition duration-300 
              screen980:text-sm 
              screen980:py-3 
              screen980:px-4
              screen850:py-2 
              screen850:px-3
              screen660:px-6
              screen660:py-3
              screen660:text-base
              screen550:text-sm
              hover:border-[#258333]
              hover:text-[#258333]
              active:border-[#258333]
              active:text-[#258333] "
            >
              همین الان شروع کنید
            </div>
          </Link>

          <div
            className="flex flex-row-reverse w-fit space-x-8 space-x-reverse ml-auto pt-12 pb-40 
              screen980:pb-32 
              screen980:pt-8 
              screen980:space-x-4 
              screen980:space-x-reverse
              screen660:mx-auto
              screen660:pb-16
              screen450:space-x-3
              screen450:space-x-reverse "
          >
            <Image
              src={icon1}
              alt="PayPal"
              width={148}
              height={42}
              className="screen980:w-28 screen850:w-20 screen660:w-24 screen450:w-20"
            />
            <Image
              src={icon2}
              alt="Western Union"
              width={148}
              height={32}
              className="screen980:w-28 screen850:w-20 screen660:w-24 screen450:w-20"
            />
            <Image
              src={icon3}
              alt="SWIFT"
              width={130}
              height={40}
              className="screen980:w-28 screen850:w-20 screen660:w-24 screen450:w-20"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
