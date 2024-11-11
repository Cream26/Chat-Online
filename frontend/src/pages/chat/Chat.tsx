import { useAppStore } from "@/store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import ContactsContainer from "./components/contacts-container";
import ChatContainer from "./components/chat-container";
import EmptyChatContainer from "./components/empty-chat-container";

const Chat = () => {
  const { userinfo } = useAppStore();
  const navigate = useNavigate();
  useEffect(() => {
    if (userinfo && !userinfo.profileSetup) {
      toast.error("Please complete your profile setup");
      navigate("/profile");
    }
  }, [userinfo, navigate]);
  return (
    <div className="flex h-[100vh] text-white overflow-hidden ">
      <ContactsContainer />
      <EmptyChatContainer />
      <ChatContainer />
    </div>
  );
};

export default Chat;
