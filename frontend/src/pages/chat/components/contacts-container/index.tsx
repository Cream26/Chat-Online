import ProfileInfo from "./components/profile-info";

const ContactsContainer = () => {
  return (
    <div className="relative md:w-[35vw] lg:w-[30vw]  xl:w-[20vw] bg-[#1b1c24] border-r-2 border-[#2f303b] w-full">
      <div className="pt-3">
        <Logo />
      </div>
      <div className="my-5">
        <div className="flex items-center justify-between pr-10">
          <Title text="Direct Message" />
        </div>
      </div>
      <div className="my-5">
        <div className="flex items-center justify-between pr-10">
          <Title text="Channels" />
        </div>
      </div>
      <ProfileInfo />
    </div>
  );
};

export default ContactsContainer;

const Logo = () => {
  return (
    <div className="flex p-5 justify-start items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 2048 2048"
      >
        <path
          fill="currentColor"
          d="M768 1024H640V896h128zm512 0h-128V896h128zm512-128v256h-128v320q0 40-15 75t-41 61t-61 41t-75 15h-264l-440 376v-376H448q-40 0-75-15t-61-41t-41-61t-15-75v-320H128V896h128V704q0-40 15-75t41-61t61-41t75-15h448V303q-29-17-46-47t-18-64q0-27 10-50t27-40t41-28t50-10q27 0 50 10t40 27t28 41t10 50q0 34-17 64t-47 47v209h448q40 0 75 15t61 41t41 61t15 75v192zm-256-192q0-26-19-45t-45-19H448q-26 0-45 19t-19 45v768q0 26 19 45t45 19h448v226l264-226h312q26 0 45-19t19-45zm-851 462q55 55 126 84t149 30q78 0 149-29t126-85l90 91q-73 73-167 112t-198 39q-103 0-197-39t-168-112z"
        />
      </svg>
      <h1 className="text-white poppins-medium text-2xl ml-2">Syncronus</h1>
    </div>
  );
};
interface TitleProps {
  text: string;
}
const Title: React.FC<TitleProps> = ({text}) =>{
  return (
    <h6 className="uppercase tracking-widest text-neutral-400 pl-10 font-light text-opacity-90 text-sm">{text}</h6>
  )
}
