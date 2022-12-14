
export default function ErrorAlert({ msg, close, bg }) {

  return (
    <div className=" flex  w-full fixed z-50 top-0 left-0 text-center px-5 ">
      <div className={`flex gap-5 justify-between shadow-md mt-4 py-3 px-4 ${bg} text-white rounded-2xl mx-auto`}>
        <p>{msg}</p>
        <p className=" text-black cursor-pointer" onClick={close} >x</p>
      </div>
    </div>
  );
}