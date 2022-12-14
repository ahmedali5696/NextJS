import { useSelector } from "react-redux";
import Spinner from "../Spinner";
import LeftExpCard from "./LeftExpCard";
import RightExpCard from "./RightExpCard";
import SectionHeader from "./SectionHeader";

export default function Experiances() {
  const { isLoading } = useSelector(state => state.data)
  const { experiances } = useSelector(state => state.data.data)
  const myExperiances = typeof experiances === 'object' ? Object.values(experiances) : experiances || []


  return (
    <section id="experiance" className="skills mx-6 mb-28">
      <SectionHeader
        heading="Experiance & Education"
        desc="My Education and all Places i worked in"
      />

      {isLoading ?
        <Spinner /> :
        <div className="container mx-auto">
          <div className="flex flex-col md:grid grid-cols-9 p-2 main-text-color">
            {myExperiances.map(exp => {
              if (exp) {
                if (exp.id % 2 === 1) {
                  return (
                    <LeftExpCard key={exp.id}
                      pos={exp.title}
                      company={exp.company}
                      date={`${exp.date.from} - ${exp.date.to}`}
                      desc={exp.description}
                    />)
                } else if (exp.id % 2 === 0) {
                  return (
                    <RightExpCard key={exp.id}
                      pos={exp.title}
                      company={exp.company}
                      date={`${exp.date.from} - ${exp.date.to}`}
                      desc={exp.description}
                    />)
                }

              }
            })}
          </div>
        </div>
      }
    </section>

  )
}
