
export default function CertfCard({name, by, date, site, link}) {

  return (
    <div className="flex max-[640px]:flex-col rounded-lg p-3 mb-3 p-main-style md:gap-4 shadow-[0_1px_18px_-13px_#000] main-bg group hover:bg-green-600 hover:text-slate-50 transition-all justify-start">
      <p className=" max-[640px]:mb-4">{name}</p>
      <h4 className=" font-medium">{by}</h4>
      <p className=" font-light">
        <a className=" group-hover:text-slate-50 text-green-600" href={link} target="_blank" rel="noreferrer">{site} | </a> {date}
        </p>
    </div>
  );
}