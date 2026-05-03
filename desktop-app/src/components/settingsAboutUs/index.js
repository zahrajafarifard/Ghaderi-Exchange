import React, { useState, useEffect } from "react";

const SettingsAboutUs = () => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [whatsApp, setWhatsApp] = useState("");
  const [telegram, setTelegram] = useState("");
  const [instagram, setInstagram] = useState("");
  const [workHours, setWorkHours] = useState("");
  const [aboutUs, setAboutUs] = useState("");
  const [fax, setFax] = useState("");

  useEffect(() => {
    let _response, _data;
    const fetchData = async () => {
      try {
        _response = await fetch(`${process.env.REACT_APP_URL}/api/getConfig`);
        if (!_response.ok) {
          throw new Error("err occurred...");
        }
        _data = await _response.json();

        setAddress(_data.address);
        setAboutUs(_data.aboutUs);
        setPhone(_data.phone);
        setFax(_data.fax);
        setEmail(_data.email);
        setWhatsApp(_data.whatsApp);
        setTelegram(_data.telegram);
        setInstagram(_data.instagram);
        setWorkHours(_data.workHours);
      } catch (error) {
        console.log(error);

        switch (_response.status) {
          case 404:
            console.log("404...");
            break;
          case 500:
            console.log("500...");
            break;
          default:
            console.log("error occured...");
            break;
        }
      }
    };
    fetchData();
  }, []);
  const submitHandlr = async () => {
    setIsUpdating(true);
    let _response;
    try {
      _response = await fetch(
        `${process.env.REACT_APP_URL}/admin/registerConfig`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            secretKey: process.env.REACT_APP_SECRET_KEY,
          },
          body: JSON.stringify({
            address,
            phone,
            fax,
            email,
            whatsApp,
            telegram,
            instagram,
            workHours,
            aboutUs,
          }),
        }
      );

      if (!_response.ok) {
        setIsUpdating(false);
        throw new Error("err occurred...");
      }
      setIsUpdating(false);
    } catch (error) {
      console.log(error);
      setIsUpdating(false);

      switch (_response.status) {
        case 404:
          console.log("404...");
          break;
        case 500:
          console.log("500...");
          break;
        default:
          console.log("error occured...");
          break;
      }
    }
  };
  return (
    <div>
      <div className="">
        <div className="w-fit mx-auto">
          <div
            style={{ direction: "rtl" }}
            className="text-right pr-1 mt-2 pb-1 my-auto text-sm font-bold text-gray-700"
          >
            آدرس صرافی :
          </div>
          <div>
            <textarea
              className="rounded-lg py-2 px-3"
              style={{ direction: "rtl" }}
              rows={3}
              cols={55}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
        </div>
        <div
          style={{ direction: "rtl" }}
          className=" grid grid-cols-2  w-fit mx-auto my-2 "
        >
          <div className=" my-auto text-sm font-bold text-red-700">تلفن</div>
          <div>
            <input
              style={{ direction: "ltr" }}
              className="rounded-md py-1"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        </div>
        <div
          style={{ direction: "rtl" }}
          className=" grid grid-cols-2  w-fit mx-auto my-2 "
        >
          <div className=" my-auto text-sm font-bold text-gray-700">فکس</div>
          <div>
            <input
              style={{ direction: "ltr" }}
              className="rounded-md py-1"
              value={fax}
              onChange={(e) => setFax(e.target.value)}
            />
          </div>
        </div>
        <div
          style={{ direction: "rtl" }}
          className=" grid grid-cols-2 w-fit mx-auto "
        >
          <div className=" my-auto text-sm font-bold text-red-700">ایمیل</div>
          <div>
            <input
              style={{ direction: "ltr" }}
              className="rounded-md py-1"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div
          style={{ direction: "rtl" }}
          className=" grid grid-cols-2 w-fit mx-auto my-2"
        >
          <div className=" my-auto text-sm font-bold text-gray-700">
            شماره واتس اپ
          </div>
          <div>
            <input
              style={{ direction: "ltr" }}
              className="rounded-md py-1"
              value={whatsApp}
              onChange={(e) => setWhatsApp(e.target.value)}
            />
          </div>
        </div>
        <div
          style={{ direction: "rtl" }}
          className="grid grid-cols-2  w-fit mx-auto "
        >
          <div className=" my-auto text-sm font-bold text-red-700">تلگرام</div>
          <div>
            <input
              style={{ direction: "ltr" }}
              className="rounded-md py-1"
              value={telegram}
              onChange={(e) => setTelegram(e.target.value)}
            />
          </div>
        </div>
        <div
          style={{ direction: "rtl" }}
          className=" grid grid-cols-2 w-fit mx-auto my-2"
        >
          <div className=" my-auto text-sm font-bold text-gray-700">
            اینستاگرام
          </div>
          <div>
            <input
              style={{ direction: "ltr" }}
              className="rounded-md py-1"
              value={instagram}
              onChange={(e) => setInstagram(e.target.value)}
            />
          </div>
        </div>
        <div style={{ direction: "rtl" }} className=" w-fit mx-auto my-2 ">
          <div className=" text-right my-auto text-sm font-bold pr-1 mt-2 pb-1 text-red-700">
            ساعات کاری
          </div>
          <div>
            <textarea
              className="rounded-lg py-2 px-3"
              rows={1}
              cols={55}
              value={workHours}
              onChange={(e) => setWorkHours(e.target.value)}
            />
          </div>
        </div>
        <div style={{ direction: "rtl" }} className="  w-fit mx-auto my-1">
          <div className=" text-right my-auto text-sm font-bold pr-1 mt-2 pb-1 text-gray-700 ">
            درباره ی ما :{" "}
          </div>
          <div>
            <textarea
              className="rounded-lg py-2 px-3"
              style={{ direction: "rtl" }}
              rows={5}
              cols={55}
              value={aboutUs}
              onChange={(e) => setAboutUs(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div>
        <button
          onClick={submitHandlr}
          style={{ direction: "rtl" }}
          className={`px-2  py-1  text-[14px] shadow-md  shadow-red-900 rounded-xl  font-bold bg-black text-red-700
          ${isUpdating && "animate-pulse"}
          `}
        >
          {isUpdating ? "در حال ذخیره اطلاعات ..." : " ثبت اطلاعات"}
        </button>
      </div>
    </div>
  );
};

export default SettingsAboutUs;
