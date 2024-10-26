import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Vite from "../../../public/vite.svg";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Email, Password, ConfirmPassword } from "@/types/auth";
import { Button } from "@/components/ui/button";
import BackGround from "@/assets/StockSnap_1STVFMTBJY.jpg";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { toast } from "sonner";
import { API } from "@/lib/api";
import { SIGNUP_ROUTE, LOGIN_ROUTE } from "@/utils/constants";
import { useNavigate } from "react-router-dom";
const Auth = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<Email>("");
  const [password, setPassword] = useState<Password>("");
  const [confirmPassword, setConfirmPassword] = useState<ConfirmPassword>("");
  //密码的显示与隐藏
  const [showPassword, setShowPassword] = useState(false);

  const validateForm = (isSignUp: boolean) => {
    if (!email.length) {
      toast.error("Email is required");
      return false;
    }
    if (!password.length) {
      toast.error("Password is required");
      return false;
    }
    if (isSignUp && password !== confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    }
    return true;
  };
  const handleLogin = async () => {
    if (validateForm(false)) {
      const res = await API.post(
        LOGIN_ROUTE,
        { email, password },
        { withCredentials: true }
      );
      if(res.data.user.id) {
        if(res.data.user.profileSetup) {
          navigate("/chat");
        } else {
          navigate("/profile");
        }
      }
    }
  };
  const handleSignUp = async () => {
    if (validateForm(true)) {
      //withCredentials: true 表示允许跨域请求携带cookie
      const res = await API.post(
        SIGNUP_ROUTE,
        { email, password },
        { withCredentials: true }
      );
      if (res.status === 201) {
        navigate("/profile");
      }
    }
  };
  return (
    <div className="h-[100vh] w-[100vw] flex items-center justify-center">
      <div className="min-h-[600px] h-[80vh] border-white text-opacity-90 rounded-3xl shadow-2xl w-[80vw] md:w-[90vw] lg:w-[70vw] xl:w-[60vw] grid lg:grid-cols-2 ">
        <div className="flex flex-col items-center justify-center gap-10">
          <div className="flex flex-col items-center justify-center">
            <div className="flex items-center justify-center">
              <h1 className="text-5xl font-bold md:text-6xl">Welcome</h1>
              <img src={Vite} alt="Vite" className="w-[80px]" />
            </div>
            <p className="font-medium text-center">
              Fill in the details to get started with the best chat app
            </p>
          </div>
          <div className="flex items-center justify-center w-full">
            <Tabs className="w-3/4" defaultValue="login">
              <TabsList className="w-full rounded-none bg-transparent">
                <TabsTrigger
                  value={"login"}
                  className="date-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full date-[state=active]:text-black date-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300 "
                >
                  Login
                </TabsTrigger>
                <TabsTrigger
                  value={"signUp"}
                  className="date-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full date-[state=active]:text-black date-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300"
                >
                  SignUp
                </TabsTrigger>
              </TabsList>
              <TabsContent
                value="login"
                className="flex flex-col gap-5 mt-10 relative"
              >
                <Input
                  placeholder="Email"
                  type="email"
                  className="rounded-full p-6"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></Input>
                <Input
                  placeholder="Password"
                  type={showPassword ? "text" : "password"}
                  className="rounded-full p-6"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></Input>
                <Button
                  type="button"
                  className="bg-white shadow-none hover:bg-white absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                </Button>
                <Button className="rounded-full p-6" onClick={handleLogin}>
                  Login
                </Button>
              </TabsContent>
              <TabsContent
                value="signUp"
                className="flex flex-col gap-5 relative"
              >
                <Input
                  placeholder="Email"
                  type="email"
                  className="rounded-full p-6"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></Input>
                <Input
                  placeholder="Password"
                  type="password"
                  className="rounded-full p-6"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></Input>
                <Input
                  placeholder="Confirm Password"
                  type="password"
                  className="rounded-full p-6"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                ></Input>
                <Button className="rounded-full p-6" onClick={handleSignUp}>
                  SignUp
                </Button>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        <div className="hidden lg:flex justify-center items-center">
          <img src={BackGround} alt="" className="h-[65vh] rounded-3xl" />
        </div>
      </div>
    </div>
  );
};

export default Auth;
