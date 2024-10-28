import { useAppStore } from "@/store"
const Profile = () => {
  const { userinfo } = useAppStore()
  return (
    <div>Profile
      <div>{userinfo?.id}</div>
    </div>
  )
}

export default Profile