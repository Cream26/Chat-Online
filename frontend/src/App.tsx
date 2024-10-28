import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Auth from "./pages/auth/Auth";
import Chat from "./pages/chat/Chat";
import Profile from "./pages/profile/Profile";
import { ReactNode, useEffect, useState } from "react";
import { useAppStore } from "@/store";
import { API } from "@/lib/api";
import { GET_USER_INFO } from "@/utils/constants";
interface RouteProps {
  children: ReactNode;
}
// 私有路由
const PrivateRoute = ({ children }: RouteProps) => {
  const { userinfo } = useAppStore();
  const isAuthenticated = !!userinfo;
  return isAuthenticated ? children : <Navigate to="/auth" />;
};
// 鉴权路由
const AuthRoute = ({ children }: RouteProps) => {
  const { userinfo } = useAppStore();
  const isAuthenticated = !!userinfo;
  return isAuthenticated ? <Navigate to="/chat" /> : children;
};
const App = () => {
  const { userinfo, setUserinfo } = useAppStore();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getUserData = async () => {
      try {
        const res = await API.get(GET_USER_INFO, { withCredentials: true });
        if (res.status === 200) {
          setUserinfo(res.data);
        } else {
          setUserinfo(null);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    if (!userinfo) {
      getUserData();
    } else {
      setLoading(false);
    }
  }, [userinfo, setUserinfo]);
  if (loading) return <div>loading...</div>;
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/auth"
          element={
            <AuthRoute>
              <Auth />
            </AuthRoute>
          }
        />
        <Route
          path="/chat"
          element={
            <PrivateRoute>
              <Chat />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/auth" />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
