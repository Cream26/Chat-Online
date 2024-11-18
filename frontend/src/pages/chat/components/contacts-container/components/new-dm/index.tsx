import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FaPlus } from "react-icons/fa";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { API } from "@/lib/api";
import { SEARCH_CONTACTS_ROUTE } from "@/utils/constants";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { UserInfo } from "@/types/Auth";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { HOST } from "@/utils/constants";
import { getColor } from "@/lib/utils";
import { useAppStore } from "@/store/index";

const NewDM = () => {
  const {setSelectedChatType, setSelectedChatData} = useAppStore();
  const [openNewContactModal, setOpenNewContactModal] = useState(false);
  const [searchedContacts, setSearchedContacts] = useState<UserInfo[]>([]);

  const SearchContacts = async (searchTerm: any) => {
    try {
      if (searchTerm.length > 0) {
        const res = await API.post(
          SEARCH_CONTACTS_ROUTE,
          { searchTerm },
          { withCredentials: true }
        );
        if (res.status === 200) {
          setSearchedContacts(res.data.contacts);
        }
      } else {
        setSearchedContacts([]);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const selectNewContact = (contact: UserInfo) => {
    setOpenNewContactModal(false);
    setSelectedChatType("contact");
    setSelectedChatData(contact);
    setSearchedContacts([]);
    
  };
  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <FaPlus
              className="text-neutral-400 font-light text-opacity-90 text-start hover:text-neutral-100 cursor-pointer transition-all duration-300"
              onClick={() => setOpenNewContactModal(true)}
            />
          </TooltipTrigger>
          <TooltipContent className="bg-[#1c1b1e] border-none mb-2 p-3 text-white ">
            Select new Contact
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <Dialog open={openNewContactModal} onOpenChange={setOpenNewContactModal}>
        <DialogContent className="bg-[#181920] border-none text-white w-[400px] h-[400px] flex flex-col ">
          <DialogHeader>
            <DialogTitle>Please Select a contact</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div>
            <Input
              placeholder="Search Contacts"
              className="bg-[#2c2e3b] rounded-lg p-6 text-white border-none"
              onChange={(e) => {
                SearchContacts(e.target.value);
              }}
            />
          </div>
          <ScrollArea className="h-[200px] overflow-auto">
            {searchedContacts.length > 0 ? (
              <div className="flex flex-col gap-5">
                {searchedContacts.map((contact) => (
                  <div
                    key={contact.id}
                    className="flex gap-3 items-center cursor-pointer"
                    onClick={() => selectNewContact(contact)}
                  >
                    <div className="w-12 h-12 relative">
                      <Avatar className="w-12 h-12 rounded-full overflow-hidden">
                        {contact?.image ? (
                          <AvatarImage
                            src={`${HOST}/${contact?.image}`}
                            alt="profile"
                            className="object-cover h-full w-full rounded-full bg-black"
                          />
                        ) : (
                          <div
                            className={`uppercase w-12 h-12 text-lg border-[1px] flex justify-center items-center rounded-full ${getColor(
                              contact?.color ?? 0
                            )} `}
                          >
                            {contact?.firstName
                              ? contact?.firstName.split("").shift()
                              : contact?.email?.split("").shift()}
                          </div>
                        )}
                      </Avatar>
                    </div>
                    <div className="flex flex-col">
                      <span>
                        {contact?.firstName && contact?.lastName
                          ? `${contact.firstName} ${contact.lastName}`
                          : contact.email}
                      </span>
                      <span className="text-xs">{contact.email}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-20">
                <div className="text-opacity-80 text-white flex flex-col gap-5 items-center lg:text-2xl text-xl transition-all duration-300 text-center">
                  <h1 className="poppins-medium">
                    Hi<span className="text-purple-500">!</span> Search new{" "}
                    <span className="text-purple-500">Contact</span>
                  </h1>
                </div>
              </div>
            )}
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default NewDM;
