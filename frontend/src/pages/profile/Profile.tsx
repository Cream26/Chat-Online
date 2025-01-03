import { useAppStore } from "@/store";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { getColor, colors } from "@/lib/utils";
import { FaTrash, FaPlus } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { API } from "@/lib/api";
import {
  HOST,
  ADD_PROFILE_IMAGE_ROUTE,
  UPDATE_PROFILE_ROUTE,
  REMOVE_PROFILE_IMAGE_ROUTE,
} from "@/utils/constants";
import { UserInfo } from "@/types/Auth";

const Profile = () => {
  const navigate = useNavigate();
  const { userinfo, setUserinfo } = useAppStore();
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [image, setImage] = useState<string | null>(null);
  const [hovered, setHovered] = useState<boolean>(false);
  const [selectedColor, setSelectedColor] = useState<number>(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (userinfo?.profileSetup) {
      setFirstName(userinfo.firstName ?? "");
      setLastName(userinfo.lastName ?? "");
      setSelectedColor(userinfo.color ?? 0);
    }
    if (userinfo?.image) {
      setImage(`${HOST}/${userinfo.image}`);
    }
  }, [userinfo]);

  const validateProfile = () => {
    if (!firstName) {
      toast.error("First Name is required");
      return false;
    }
    if (!lastName) {
      toast.error("Last Name is required");
      return false;
    }
    return true;
  };

  const saveChanges = async () => {
    if (validateProfile()) {
      try {
        const res = await API.post(
          UPDATE_PROFILE_ROUTE,
          {
            firstName,
            lastName,
            color: setSelectedColor,
          },
          { withCredentials: true }
        );
        if (res.status === 200 && res.data) {
          setUserinfo({ ...res.data });
          toast.success("Profile updated successfully");
          navigate("/chat");
        }
      } catch (error) {
        toast.error("Internal server error");
      }
    }
  };

  const handleNavigate = () => {
    if (userinfo?.profileSetup) {
      navigate("/chat");
    } else {
      toast.error("Please complete your profile setup");
    }
  };

  const handleFileInputClick = () => {
    fileInputRef.current?.click();
  };
  //改变头像
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("profile-image", file);
      const res = await API.post(ADD_PROFILE_IMAGE_ROUTE, formData, {
        withCredentials: true,
      });
      if (res.status === 200 && res.data.image) {
        const updatedUserinfo = { ...userinfo, image: res.data.image };
        setUserinfo(updatedUserinfo as UserInfo);
        toast.success("Image uploaded successfully");
      }
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageRemove = async () => {
    try {
      const res = await API.delete(REMOVE_PROFILE_IMAGE_ROUTE, {
        withCredentials: true,
      });
      if (res.status === 200) {
        const updatedUserinfo = { ...userinfo, image: null };
        setUserinfo(updatedUserinfo as UserInfo);
        setImage(null);
        toast.success("Image removed successfully");
      }
    } catch (error) {
      toast.error("Internal server");
    }
  };
  return (
    <div className="h-[100vh] bg-slate-600 flex justify-center items-center flex-col gap-10">
      <div className="flex flex-col gap-10 w-[80vw] md:w-max">
        <div onClick={handleNavigate}>
          <IoArrowBack className="text-4xl text-white/90 lg:text-6xl cursor-pointer" />
        </div>
        <div className="grid grid-cols-2">
          <div
            className="h-32 w-32 md:w-48 md:h-48 relative flex items-center justify-center"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <Avatar className="w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden">
              {image ? (
                <AvatarImage
                  src={image}
                  alt="profile"
                  className="object-cover h-full w-full bg-black"
                />
              ) : (
                <div
                  className={`w-32 h-32 md:w-48 md:h-48 text-5xl border-[1px] flex justify-center items-center rounded-full ${getColor(
                    selectedColor
                  )} `}
                >
                  {firstName
                    ? firstName.split("").shift()
                    : userinfo?.email?.split("").shift()}
                </div>
              )}
            </Avatar>
            {hovered && (
              <div
                className="absolute inset-0 flex items-center justify-center bg-black/50 ring-fuchsia-100 rounded-full"
                onClick={image ? handleImageRemove : handleFileInputClick}
              >
                {image ? (
                  <FaTrash className="text-white text-3xl cursor-pointer" />
                ) : (
                  <FaPlus className="text-white text-3xl cursor-pointer" />
                )}
              </div>
            )}
            <Input
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={handleImageChange}
              name="profile-image"
              accept=".jpg,.jpeg,.png,.svg,.webp"
            />
          </div>
          <div className="flex min-w-32 md:min-w-64 flex-col gap-5 text-white items-center justify-center">
            <div className="w-full">
              <Input
                placeholder="Email"
                type="email"
                disabled
                value={userinfo?.email}
                className="rounded-lg p-6 bg-[#2c2e3b] border-none "
              />
            </div>
            <div className="w-full">
              <Input
                placeholder="FirstName"
                type="text"
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
                className="rounded-lg p-6 bg-[#2c2e3b] border-none "
              />
            </div>
            <div className="w-full">
              <Input
                placeholder="LastName"
                type="text"
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
                className="rounded-lg p-6 bg-[#2c2e3b] border-none "
              />
            </div>
            <div className="w-full flex gap-5">
              {colors.map((color, index) => (
                <div
                  key={index}
                  className={`w-8 h-8 rounded-full ${color} cursor-pointer transition-all duration-300
                  ${
                    selectedColor === index
                      ? "outline outline-white/50 outline-1"
                      : ""
                  }`}
                  onClick={() => setSelectedColor(index)}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="w-full">
          <Button
            onClick={saveChanges}
            className="w-full p-6 bg-fuchsia-700 hover:bg-purple-900 rounded-lg transition-all duration-300"
          >
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
