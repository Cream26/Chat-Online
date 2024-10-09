import { useState } from "react";
import Picture from "./assets/StockSnap_7ULJ7GRFDB.jpg";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const App = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex items-center justify-center min-h-screen h-screen bg-gray-400">
      <div className="flex w-[900px] p-2 rounded-lg shadow-2xl h-[600px]">
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center space-y-4">
          <div className="relative w-2/3">
            <MdOutlineEmail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <Input 
              type="text" 
              className="pl-10"
              placeholder="Email" 
            />
          </div>
          <div className="relative w-2/3">
            <RiLockPasswordLine className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <Input
              type={showPassword ? "text" : "password"}
              className="pl-10"
              placeholder="Password"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
            </button>
          </div>
          <Button className="w-2/3">登录</Button>
        </div>
        <div className="w-1/2 hidden md:block">
          <img src={Picture} className="h-full w-auto rounded-lg" />
        </div>
      </div>
    </div>
  );
};

export default App;
