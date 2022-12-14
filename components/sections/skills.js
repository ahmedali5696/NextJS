import Image from "next/image";
import { useSelector } from "react-redux";

import Spinner from "../Spinner";
import SectionHeader from "./SectionHeader";

export default function Skills() {
  const { skills } = useSelector(state => state.data.data)
  const { isLoading } = useSelector(state => state.data)
  const mySkills = typeof skills === 'object' ? Object.values(skills) : skills || []


  return (
    <section id="skills" className="skills mx-6 mb-28">
      <SectionHeader
        heading="Skills"
        desc="The techniques and tools i have "
      />

      <div className="grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))] gap-4 lg:px-32">
        {isLoading ? <Spinner /> :
          mySkills.map((skill) => (
            skill &&
            <div key={skill.id} className="group rounded-md p-1.5 flex shadow-[0_1px_18px_-13px] main-bg hover:bg-green-600 transition-all items-center gap-2 border">
              <Image src={skill.img} alt="React Logo" width={30} height={30} />
              <p className="main-text-color group-hover:text-slate-50 ">{skill.name}</p>
            </div>)
          )}
      </div>
    </section>
  );
}