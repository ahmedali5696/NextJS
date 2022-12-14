import { useSelector } from "react-redux";

import SectionHeader from "./SectionHeader";
import CertfCard from "./CertfCard";
import Spinner from "../Spinner";

export default function Certfications() {
  const { isLoading } = useSelector(state => state.data)
  const { certf } = useSelector(state => state.data.data)
  const myCertfications = typeof certf === 'object' ? Object.values(certf) : certf || []


  return (
    <section id="certifications" className="skills mx-6 mb-28">
      <SectionHeader
        heading="Certfication"
        desc="All course's certfications i got it"
      />
      <div className="lg:px-20">
        {isLoading ?
          <Spinner /> :
          myCertfications.reverse().map(cert => (
            cert &&
            <CertfCard key={cert.id}
              name={cert.certfName}
              by={cert.institute}
              date={cert.date}
              site={cert.site}
              link={cert.link}
            />
          ))}
      </div>
    </section>

  )
}
