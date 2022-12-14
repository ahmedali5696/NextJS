import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default function Spinner() {
  return (
    <div className="spinner text-center m-auto text-green-600">
      <FontAwesomeIcon icon={faCircleNotch} size="3x" className="fa-spin" />
    </div>
  );
}