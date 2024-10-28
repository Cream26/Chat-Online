import { useAppStore } from "@/store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Chat = () => {
  const { userinfo } = useAppStore();
  const navigate = useNavigate();
  useEffect(() => {
    if (userinfo && !userinfo.profileSetup) {
      toast.error("Please complete your profile setup");
      navigate("/profile");
    }
  }, [userinfo, navigate]);
  return <div>Chat</div>;
};

export default Chat;
