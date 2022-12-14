import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";

import useValidate from "../../../hooks/useValidate";
import useAddData from "../../../hooks/useAddData";
import useRemoveData from "../../../hooks/useRemoveData";

import SectionHeader from "../../sections/SectionHeader"
import Spinner from "../../Spinner";

export default function Certifications() {
  const { isLoading } = useSelector(state => state.data)
  const { certf } = useSelector(state => state.data.data)
  const myCertf = typeof certf === 'object' ? Object.values(certf) : certf || []

  const [addNewItem] = useAddData()
  const { removeItem } = useRemoveData()
  const [emptyFieldMsg, checkEmptyFields, clearForm] = useValidate()


  function addItemHandler(e) {
    e.preventDefault()

    const id = certf?.length || 0
    const allInputs = e.target
    const certfName = e.target[0].value
    const institute = e.target[1].value
    const site = e.target[2].value
    const date = e.target[3].value
    const link = e.target[4].value

    if (!checkEmptyFields(allInputs)) {

      addNewItem('certf', {
        certfName,
        institute,
        site,
        date,
        link
      }, id)
      clearForm(allInputs)
    }
  }

  return (
    <section id="certifications" className="dash-section">
      <SectionHeader
        heading="certifications"
        desc="Put and remove your all Certifications"
      />

      <p className="text-red-500 mb-2">{emptyFieldMsg}</p>

      <form onSubmit={addItemHandler}>
        <div className="input-group main-text-color">
          <label htmlFor="certificate">Certificate Name <span className="text-red-500">*</span></label>
          <input type="text" name="certificate" id="certificate" />
        </div>
        <div className="input-group main-text-color">
          <label htmlFor="by">By <span className="text-red-500">*</span></label>
          <input type="text" name="by" id="by" />
        </div>
        <div className="input-group main-text-color">
          <label htmlFor="site">Site Name <span className="text-red-500">*</span></label>
          <input type="text" name="site" id="site" />
        </div>
        <div className="input-group main-text-color">
          <label htmlFor="date">Date <span className="text-red-500">*</span></label>
          <input type="text" placeholder="Apr, 2020" name="date" id="date" />
        </div>
        <div className="input-group main-text-color">
          <label htmlFor="cert-link">Cert Link <span className="text-red-500">*</span></label>
          <input type="url" placeholder="https://example.com" name="cert-link" id="cert-link" />
        </div>
        <button type="submit" className="admin-btn">Submit</button>
      </form>

      <ul className="border rounded-md p-2 mt-5">
        {isLoading ?
          <Spinner /> :
          myCertf.reverse().map(cer => (
            cer &&
            <li key={cer.id} className="flex gap-3 p-1 items-center main-bg main-text-color shadow-md mb-2">
              <p>{cer.certfName}</p>
              <FontAwesomeIcon onClick={() => removeItem('certf', cer.id)} icon={faCircleXmark} className="text-red-600 ml-auto mr-2 cursor-pointer" />
            </li>
          ))
        }
      </ul>
    </section>

  );
}