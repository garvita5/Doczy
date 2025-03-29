import React from "react";
import { assets } from "../assets/assets.js";

const Header = () => {
  return (
    <div className="flex flex-col md:flex-row flex-wrap bg-primary rounded-lg px-6 md:px-10 lg:px-15">
      {/* ------left side------ */}
      <div className="md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[7vw] md:mb-[30px] max-md:items-center">
        <p className="text-2xl md:text-3xl lg:text-4xl text-white font-semibold leading-tight md:leading-tight lg:leading-tight mb-2">
          Book Appointment <br />
          With Trusted Doctors
        </p>
        <div className="flex flex-col md:flex-row items-center gap-3 text-white text-sm font-light mb-4 ">
          <img className="w-28" src={assets.group_profiles} />
          <p>
            Simply browse through our extensive list of trusted doctors,
            schedule your appointment hassle-free.
          </p>
        </div>
        <a
          href="#speciality"
          className="inline-flex items-center gap-2 bg-white rounded-full px-8 py-3 text-gray-600  text-xs md:text-sm m-auto md:m-0 hover:scale-105 transition-all duration-300"
        >
          Book Appointment <img className="w-3" src={assets.arrow_icon} />
        </a>
      </div>
      {/* ------right side------*/}
      <div className="md:w-1/2 relative">
        <img
          className="w-full md:absolute bottom-0 h-auto rounded-lg"
          src={assets.header_img}
        />
      </div>
    </div>
  );
};

export default Header;
