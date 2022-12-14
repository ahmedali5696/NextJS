import { faArrowRightLong, faCode } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";

export default function ProjectCard({ img, heading, desc, code, live }) {

  return (
    <div className=" rounded-md relative overflow-hidden group shadow-md">
      <div className="w-full h-full">
        <Image className="rounded-md" src={img} width={500} height={500} style={{width: "100%", height: "100%"}} alt="Project Image" />
      </div>
      <div className=" -translate-x-full group-hover:translate-x-0 transition-all duration-300 absolute flex flex-col top-0 w-full h-full p-3 bg-[rgb(22,163,74,0.8)] rounded-md text-slate-50">
        <h4 className=" font-semibold text-lg border-b-2 border-white inline-block mb-1">{heading}</h4>
        <p className="text-gray-200 font-light">{desc}</p>
        <div className="flex flex-col mt-auto">
          <a className=" text-lg mt-auto relative" href={live} target="_blank" rel="noreferrer">
            View
            <FontAwesomeIcon className="ml-2" icon={faArrowRightLong} />
          </a>
          <a className=" text-lg mt-auto relative" href={code} target="_blank" rel="noreferrer">
            Source
            <FontAwesomeIcon className="ml-2" icon={faCode} />
          </a>
        </div>
      </div>
    </div>
  );
}