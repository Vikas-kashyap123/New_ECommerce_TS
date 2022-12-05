import React from "react";
import { BsFillTelephoneFill } from "react-icons/bs";
import { MdOutlineLocalPostOffice } from "react-icons/md";
import { FaFlagUsa } from "react-icons/fa";
import Input from "./Input/Input";
import Button from "./Button/Button";

function Contact() {
  return (
    <div className="mt-4 space-y-4 font-sans bg-white md:pt-16 text-gray-light md:flex">
      <div className="pt-12 space-y-6 px-14 md:w-1/2 ">
        <h1 className="text-3xl font-bold md:text-6xl ">Say Hello.</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
          tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
        </p>
        <div className="w-14 p-0.5 bg-primary-dark"></div>
        <div className="flex gap-2">
          <FaFlagUsa className="text-primary-default" />
          <h2>212 7th St SE, Washington, DC 20003, USA</h2>
        </div>
        <div className="flex gap-2">
          <MdOutlineLocalPostOffice className="text-primary-default" />
          <h2>info@example.com</h2>
        </div>
        <div className="flex gap-2 text-align-center">
          <BsFillTelephoneFill className="text-primary-default" />
          <h2>123-456-7890/91</h2>
        </div>
      </div>
      <div className="mx-6 bg-white border-2 border-gray-400 md:w-1/2 mb-14">
        <div className="mx-4 mb-10 space-y-4">
          <h1 className="text-2xl font-bold py-7">Ask your Queries</h1>
          <Input placeholder="Your Email" />
          <Input placeholder="Subject" />
          <textarea
            className="relative block w-full h-12 pl-3 text-gray-800 bg-white border appearance-none focus:z-10 focus-outline-none"
            placeholder="Message"
            type="message"
            length="10"
          />
          <Button>SEND MESSAGE</Button>
        </div>
      </div>
    </div>
  );
}

export default Contact;
