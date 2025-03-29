import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <div className="md:mx-10 ">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        {/*--------left section -------- */}
        <div>
          <img className="mb-5 w-40" src={assets.logo} />
          <p className="w-full md:w-2/3 text-gray-600 leading-6">
            Doczy is a seamless doctor appointment booking platform that
            connects patients with verified healthcare professionals. It offers
            easy scheduling, digital prescriptions, and teleconsultation options
            for hassle-free medical care.
          </p>
        </div>
        {/*--------center section -------- */}
        <div>
          <p className="text-base mb-3 font-medium">COMPANY</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li
              onClick={() => {
                navigate("/");
                scrollTo(0, 0);
              }}
              className="cursor-pointer hover:underline"
            >
              Home
            </li>
            <li
              onClick={() => {
                navigate("/about");
                scrollTo(0, 0);
              }}
              className="cursor-pointer hover:underline"
            >
              About us
            </li>
            <li
              onClick={() => {
                navigate("/contact");
                scrollTo(0, 0);
              }}
              className="cursor-pointer hover:underline"
            >
              Contact us
            </li>
            <li
              onClick={() => {
                navigate("/privacy-policy");
                scrollTo(0, 0);
              }}
              className="cursor-pointer hover:underline"
            >
              Privacy policy
            </li>
          </ul>
        </div>
        {/*--------right section -------- */}
        <div>
          <p className="text-base mb-3 font-medium">GET IN TOUCH</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>+91 9090909090</li>
            <li>doczy@gmail.com</li>
          </ul>
        </div>
      </div>
      {/*--------copyright text------ */}
      <div>
        <hr />
        <p className="py-5 text-sm text-center">
          Copyright2025 &#169; Doczy- All Right Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
