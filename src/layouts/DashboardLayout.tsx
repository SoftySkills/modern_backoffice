import { Button } from "antd";
import logo from "../assets/imgs/logo.png";
import { CgLogOut } from "react-icons/cg";
import { handleLogout } from "../api/handleLogout";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex">
      <div className=" z-[100] fixed left-0 top-0 h-full w-2/12">
        <img src={logo} alt="logo" />
      </div>
      <div className=" h-full w-2/12" />

      <div className="w-10/12 flex flex-col h-full">
        <div className="h-[7vh] w-10/12 fixed top-0 right-0 shadow-lg">
          <Button
            icon={<CgLogOut />}
            className="absolute top-6 right-10 h-[3rem] !w-[3rem] "
            onClick={handleLogout}
          />
        </div>
        <div className="h-[7vh]  " />

        <div className="h-[93vh] overflow-auto">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
