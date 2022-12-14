import { faCodepen, faFacebook, faGithub, faLinkedin, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faMobileScreenButton } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function SocialLinks() {
  const socialItems = [
    {
      icon: faLinkedin,
      link: 'https://www.linkedin.com/in/ahmedali5696',
      desc: "in/ahmedali5696"
    },
    {
      icon: faGithub,
      link: 'https://www.github.com/ahmedali5696',
      desc: "@ahmedali5696"
    },
    {
      icon: faFacebook,
      link: 'https://www.facebook.com/ahmedali9656',
      desc: '/ahmedali5696'
    },
    {
      icon: faWhatsapp,
      link: 'https://wa.me/+201155247573',
      desc: '+201155247573'
    },
    {
      icon: faEnvelope,
      link: 'mailto:ahmedali5696@outlook.com',
      desc: 'ahmedali5696@outlook.com'
    }
  ]

  return (
    <div>
      <h4 className="p-main-style mb-2 font-medium">Links & Contacts</h4>
      {socialItems.map(item =>
        <div key={item.desc}>
          <FontAwesomeIcon className="mr-2 p-main-style" icon={item.icon} />
          <a className="text-green-600 break-words" href={item.link} target="_blank" rel="noreferrer">{item.desc}</a>
        </div>
      )}
    </div>
  );
}