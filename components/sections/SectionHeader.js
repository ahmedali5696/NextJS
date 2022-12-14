export default function SectionHeader({heading, desc}) {

  return (
    <header className=" text-center mb-8">
      <h3 className="heading heading-black uppercase">{heading}</h3>
      <p className="main-text-color font-light">{desc}</p>
    </header>
  );
}