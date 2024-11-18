import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { useAppStore } from "@/store";
import { getColor } from "@/lib/utils";
import { HOST, LOGOUT_ROUTE } from "@/utils/constants";
import { useNavigate } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FiEdit2 } from "react-icons/fi";
import { IoPowerSharp } from "react-icons/io5";
import { API } from "@/lib/api";
const ProfileInfo = () => {
  const navigate = useNavigate();
  const { userinfo,setUserinfo } = useAppStore();
  const Logout = async () => {
    try {
      const res = await API.post(LOGOUT_ROUTE, {}, { withCredentials: true });
      if (res.status === 200) {
        navigate("/auth");
        setUserinfo(null);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="absolute bottom-0 h-16 flex items-center justify-between px-10 w-full bg-[#212b33]">
      <div className="flex gap-3 items-center justify-center">
        <div className="w-12 h-12 relative">
          <Avatar className="w-12 h-12 rounded-full overflow-hidden">
            {userinfo?.image ? (
              <AvatarImage
                src={`${HOST}/${userinfo?.image}`}
                alt="profile"
                className="object-cover h-full w-full rounded-full bg-black"
              />
            ) : (
              <div
                className={`uppercase w-12 h-12 text-lg border-[1px] flex justify-center items-center rounded-full ${getColor(
                  userinfo?.color ?? 0
                )} `}
              >
                {userinfo?.firstName
                  ? userinfo?.firstName.split("").shift()
                  : userinfo?.email?.split("").shift()}
              </div>
            )}
          </Avatar>
        </div>
        <div>
          {userinfo?.firstName && userinfo?.lastName
            ? `${userinfo.firstName} ${userinfo.lastName}`
            : ""}
        </div>
      </div>
      <div className="flex gap-5">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <FiEdit2
                className="text-purple-500 text-xl font-medium"
                onClick={() => {
                  navigate("/profile");
                }}
              />
            </TooltipTrigger>
            <TooltipContent className="bg-[#1c1b1e] border-none text-white">
              Edit Profile
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <IoPowerSharp
                className="text-red-500 text-xl font-medium"
                onClick={Logout}
              />
            </TooltipTrigger>
            <TooltipContent className="bg-[#1c1b1e] border-none text-white">
              Logout
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default ProfileInfo;
