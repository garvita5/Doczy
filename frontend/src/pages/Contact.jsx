import React from "react";
import { assets } from "../assets/assets";

const Contact = () => {
  return (
    <div>
      <div className="text-center pt-10 text-2xl text-gray-500">
        <p>
          CONTACT <span className="text-gray-700 font-medium">US</span>
        </p>
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-10 justify-center mb-28 text-sm ">
        <img
          className="w-full max-w-[360px]"
          src={assets.contact_image}
          alt=""
        />

        <div className="flex flex-col justify-center items-start gap-6">
          <p className="font-semibold text-lg text-gray-600">Our OFFICE</p>
          <p className="text-gray-500">
            512,DLF Phase-2 <br /> Gurugram
          </p>
          <p className="text-gray-500">
            TEL :(+91) 9090909090 <br /> Email: doczy@gmail.com{" "}
          </p>
          <p className="font-semibold text-lg text-gray-600">
            CAREERS AT PRESCRIPTO
          </p>
          <p className="text-gray-500">
            Learn more about our teams and job openings.
          </p>
          <button className="border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-400">
            Explore Jobs
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
