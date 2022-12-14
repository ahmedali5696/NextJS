import { faCodepen, faFacebook, faGithub, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Footer() {

  return (
    <footer className="mt-auto py-3 px-6 flex md:justify-between flex-col md:flex-row main-text-color">
      <div className="social flex gap-3 justify-center">
        <a className="hover:text-[#0077b5]" href="https://www.linkedin.com/in/ahmedali5696" target="_blank" rel="noreferrer" ><FontAwesomeIcon size="lg" icon={faLinkedinIn} /></a>
        <a className="hover:text-[#6e5494]" href="https://www.github.com/ahmedali5696" target="_blank" rel="noreferrer" ><FontAwesomeIcon size="lg" icon={faGithub} /></a>
        <a className="hover:text-[#ff3c41]" href="https://www.codepen.io/ahmedali56" target="_blank" rel="noreferrer" ><FontAwesomeIcon size="lg" icon={faCodepen} /></a>
        <a className="hover:text-[#1877f2]" href="https://www.facebook.com/ahmedali9656" target="_blank" rel="noreferrer" ><FontAwesomeIcon size="lg" icon={faFacebook} /></a>
      </div>
      <p className="text-center md:text-right">
        Copyright © 2018
        <span className=" text-green-600"> Ahmed Ali</span>
      </p>
    </footer>
  );
}