import { useState } from "react";
import Picture from "./assets/StockSnap_7ULJ7GRFDB.jpg";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";

const App = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex items-center justify-center min-h-screen h-screen bg-gray-400">
      <div className="flex w-[1000px] p-2 rounded-lg shadow-2xl h-[600px]">
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center space-y-4">
          <label className="input input-info flex items-center gap-2 w-2/3">
            <MdOutlineEmail />
            <input type="text" className="grow" placeholder="Email" />
          </label>

          <label className="input input-info flex items-center gap-2 w-2/3">
            <RiLockPasswordLine />
            <input
              type={showPassword ? "text" : "password"}
              className="grow"
              placeholder="Password"
            />
            <button
              type="button"
              className="p-1"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
            </button>
          </label>
          <button className="btn w-2/3">登录</button>
        </div>
        <div className="w-1/2 hidden md:block">
          <img src={Picture} className="h-full w-auto rounded-lg" />
        </div>
      </div>
    </div>
  );
};

export default App;
