"use client";
import React, { useEffect, useState } from "react";

const FirstChildAboutUs = () => {
  const [aboutUs, setAboutUs] = useState<string>("");

  useEffect(() => {
    const _data = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/getConfig`
      );

      switch (response.status) {
        case 200:
          const data = await response.json();

          setAboutUs(data?.aboutUs);

          break;

        default:
          break;
      }
    };
    _data();
  }, []);

  return <div>{aboutUs}</div>;
};

export default FirstChildAboutUs;
