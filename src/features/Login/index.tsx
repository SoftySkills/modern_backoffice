import LoginLeftSide from "../../components/LoginLeftSide/LoginLeftSide";
import LoginRightSide from "../../components/LoginRightSide/LoginRightSide";

const Login = () => {
  return (
    <div className="flex justify-between h-screen ">
      <LoginLeftSide />
      <LoginRightSide />
    </div>
  );
};

export default Login;
