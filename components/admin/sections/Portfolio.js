import Image from "next/image";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

import SectionHeader from "../../sections/SectionHeader"
import useAddData from "../../../hooks/useAddData";
import useUploadImg from "../../../hooks/useUploadImg";
import useValidate from "../../../hooks/useValidate";
import useRemoveData from "../../../hooks/useRemoveData";
import Spinner from "../../Spinner";

export default function Portfolio() {
  const { isLoading } = useSelector(state => state.data)
  const { portfolio } = useSelector(state => state.data.data)
  const myPortfolio = typeof portfolio === 'object' ? Object.values(portfolio) : portfolio || []

  const [addNewItem] = useAddData()
  const { uploadImg } = useUploadImg()
  const { removeItem } = useRemoveData()
  const [emptyFieldMsg, checkEmptyFields, clearForm] = useValidate()


  function submitHandler(e) {
    e.preventDefault()

    const id = portfolio?.length || 0
    const allInputs = e.target
    const name = e.target[0].value
    const description = e.target[1].value
    const codeLink = e.target[2].value
    const liveLink = e.target[3].value
    const projectImg = e.target[4]?.files[0]

    if (!checkEmptyFields(allInputs)) {
      uploadImg('portfolio', projectImg)
        .then(imgUrl => addNewItem('portfolio', {
          name,
          description,
          codeLink,
          liveLink,
          img: imgUrl
        }, id))


      clearForm(allInputs)
    }
  }

  return (
    <section id="portfolio" className="dash-section">
      <SectionHeader
        heading="Portfolio"
        desc="Put and remove your projects"
      />

      <p className="text-red-500 mb-2">{emptyFieldMsg}</p>

      <form onSubmit={submitHandler}>
        <div className="input-group main-text-color">
          <label htmlFor="project-name">Project Name <span className="text-red-500">*</span></label>
          <input type="text" name="project-name" id="project-name" />
        </div>
        <div className="input-group main-text-color">
          <label htmlFor="project-descr">Description <span className="text-red-500">*</span></label>
          <input type="text" name="project-descr" id="project-descr" />
        </div>
        <div className="input-group main-text-color">
          <label htmlFor="code">Code link <span className="text-red-500">*</span></label>
          <input type="url" placeholder="https://example.com" name="code" id="code" />
        </div>
        <div className="input-group main-text-color">
          <label htmlFor="live">Live Link <span className="text-red-500">*</span></label>
          <input type="url" placeholder="https://example.com" name="live" id="live" />
        </div>
        <div className="input-group main-text-color">
          <label htmlFor="project-img">Project Img <span className="text-red-500">*</span></label>
          <input type="file" name="project-img" id="project-img" accept="image/*" />
        </div>
        <button type="submit" className="admin-btn">Submit</button>
      </form>

      <ul className="border rounded-md p-2 mt-5 grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-1">
        {isLoading ?
          <Spinner /> :
          myPortfolio.reverse().map(project => (
            project &&
            <li key={project.id} className="flex gap-3 p-1 items-center main-bg shadow-md mb-2 main-text-color">
              <Image src={project.img} alt="Project Image" width={60} height={60} />
              <p>{project.name}</p>
              <FontAwesomeIcon onClick={() => removeItem('portfolio', project.id)} icon={faCircleXmark} className="text-red-600 ml-auto mr-2 cursor-pointer" />
            </li>
          ))
        }
      </ul>
    </section>

  );
}