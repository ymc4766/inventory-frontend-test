import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AuthUser = ({ children }) => {
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo && !userInfo?.token) {
      navigate("/login");
    }
  }, [navigate, userInfo]);

  return <>{children}</>;
};

export default AuthUser;
