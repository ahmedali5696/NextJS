import { useSelector } from "react-redux";
import Spinner from "../Spinner";
import ProjectCard from "./Projectcard";
import SectionHeader from "./SectionHeader";

export default function Portfolio() {
  const { isLoading } = useSelector(state => state.data)
  const { portfolio } = useSelector(state => state.data.data)
  const myPortfolio = typeof portfolio === 'object' ? Object.values(portfolio) : portfolio || []


  return (
    <section id="portfolio" className="skills mx-6 mb-28">
      <SectionHeader
        heading="Portfolio"
        desc="My all project live previewe"
      />
      <div className="grid grid-cols-[repeat(auto-fit,minmax(185px,1fr))] gap-4 lg:px-20 xl:px-32">
        {isLoading ?
          <Spinner /> :
          myPortfolio.map(project => (
            project &&
            <ProjectCard key={project.id}
              img={project.img}
              heading={project.name}
              desc={project.description}
              code={project.codeLink}
              live={project.liveLink}
            />
          ))}
      </div>
    </section>
  )
}