import Image from "next/image";
import { faCodepen, faFacebook, faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faMobileScreenButton } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import SocialLinks from "./SocialLinks";
import egypt from "../public/egypt.png"
import { useSelector } from "react-redux";

export default function About() {
  const { profile } = useSelector(state => state.data.data)


  return (
    <main id="about" className="grid grid-cols-1 sm:grid-cols-3 mx-6 mb-28 gap-x-10">
      <div className=" sm:col-start-1 sm:col-end-3 mb-7 pb-5 border-b-[1px] sm:border-0">
        <h3 className="mb-2 heading">About me</h3>
        <p className="p-main-style mb-3">Front-end Developer with React, I love working so much and I always look forward to<br/> gaining knowledge. I have worked on many projects with CSS frameworks, JS and React. </p>
        <p className="p-main-style">I always strive to learn, gain experiences and participate in the most difficult<br/> work and make it a challenge for me and give him the best of what I have.</p>
        {/* <p className="p-main-style">
          {profile[0].about}
        </p> */}
      </div>
      <div>
        <div className="mb-6">
          <h4 className="p-main-style mb-2 font-medium">Location</h4>
          <p className=" font-medium flex gap-2 text-[18px] h-5 items-center heading-black">
            <Image src={egypt} alt="Egypt Flag" width={20} height={20} /> Cairo, Egypt</p>
        </div>

        <SocialLinks />
      </div>
    </main>
  );
}