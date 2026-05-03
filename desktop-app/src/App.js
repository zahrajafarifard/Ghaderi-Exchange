// import "./App.css";

// import Main from "./components/Main";

// function App() {
//   return (
//     <div className="App bg-[#c0c0c0] rounded-3xl IRANSansWeb">
//       <Main />
//     </div>
//   );
// }

// export default App;

import "./App.css";

import React from "react";
import { Routes, Route } from "react-router-dom";

import Main from "./components/Main";
import Menu from "./components/menu";

import Logo from "./assets/image/Logo.svg";
// import SettingsIPs from "./components/settingsIPs";
import SettingsAboutUs from "./components/settingsAboutUs";

function App() {
  return (
    <div className="App bg-[#c0c0c0] rounded-3xl IRANSansWeb ">
      <header>
        <Menu />
      </header>
      <Routes>
        <Route exact path="/" element={<Main />} />
        <Route exact path="/settings-about-us" element={<SettingsAboutUs />} />
      </Routes>
      <footer>
        <div
          style={{ webkitAppRegion: "drag" }}
          className="flex flex-row-reverse justify-between text-xs font-bold  px-5 pt-8 pb-2 text-gray-800"
        >
          <div style={{ direction: "rtl" }}>
            کلیه حقوق مادی و معنوی این برنامه متعلق به شرکت تلمیس می باشد و کپی
            از آن پیگرد قانونی دارد .
          </div>
          <div className="grid">
            <span className="flex flex-row-reverse">
              <span>طراحی شده توسط شرکت</span>
              <img className="w-12 h-4 mx-auto " src={Logo} />
            </span>
            <small className="-mt-[3px] -mb-2">V.3.12.20</small>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
