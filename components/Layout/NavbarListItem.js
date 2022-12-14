import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";


export default function NavbarListItem({ item, icon }) {

  return (
    <li className={`${item === 'home' ? 'active' : ''} font-medium gap-4 py-1.5 px-1.5 mb-3 flex items-center group hover:bg-slate-50 dark:hover:bg-neutral-800 whitespace-nowrap`}>
      <FontAwesomeIcon className=" group-hover:text-green-600 h-5 w-5" icon={icon} size="xl" />
      <a href={`#${item}`}>{item}</a>
      <FontAwesomeIcon className=" group-hover:text-green-600 ml-auto" icon={faAngleRight} size="sm" />
    </li>
  );
}