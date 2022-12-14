export default function LeftExpCard({ company, pos, date, desc }) {

  return (
    <div className="flex flex-row-reverse md:contents">
      <div className="main-bg col-start-1 col-end-5 p-4 rounded-xl my-4 max-[768px]:mr-auto md:ml-auto border">
        <h4 className=" font-semibold text-lg mb-1 heading">{pos}</h4>
        <p className="leading-tight text-green-600">{company}</p>
        <p className="leading-tight font-light">{date}</p>
        <p className="leading-tight font-light">{desc}</p>
      </div>
      <div className="col-start-5 col-end-6 md:mx-auto relative mr-10">
        <div className="h-full w-6 flex items-center justify-center">
          <div className="h-full w-1 bg-black dark:bg-gray-100 pointer-events-none"></div>
        </div>
        <div className="w-6 h-6 absolute top-1/2 -mt-3 rounded-full bg-gray-600 shadow"></div>
      </div>
    </div>
  )
}