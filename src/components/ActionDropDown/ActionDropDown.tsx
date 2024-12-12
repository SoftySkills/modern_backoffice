import { Dropdown, Modal } from "antd";
import actionIcon from "../../assets/icons/action.svg";
import editIcon from "../../assets/icons/edit.svg";
import deleteIcon from "../../assets/icons/trash.svg";
import { useToggleDrawer } from "../../hooks/usetoggleDrawer";
import { useState } from "react";
import EditDrawer from "../Drawer/EditDrawer";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteStudent } from "../../api/deleteStudent";
import { StudentDataType } from "../../types";

const ActionDropDown = ({ data }: { data: StudentDataType }) => {
  const toggleDrawer = useToggleDrawer();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const queryClient = useQueryClient();

  const { mutate: deleteStudentApi } = useMutation({
    mutationFn: deleteStudent,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["students"],
      });
    },
  });

  const handleEdit = () => {
    toggleDrawer(true, "showDrawerEdit", data?.id);
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleDelete = () => {
    deleteStudentApi(data?.id);
    handleModalClose();
  };

  const items = [
    {
      key: "1",
      label: (
        <div className="flex items-center gap-6 " onClick={handleEdit}>
          <img src={editIcon} alt="edit" />
          <p className="text-gray-700">Edit</p>
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <div className="flex items-center gap-6" onClick={handleModalOpen}>
          <img src={deleteIcon} alt="delete" />
          <p className="text-gray-700">Delete</p>
        </div>
      ),
    },
  ];
  return (
    <>
      <Dropdown menu={{ items }} trigger={["click"]} placement="bottomRight">
        <div className="flex justify-center">
          <img src={actionIcon} alt="Action" className="cursor-pointer" />
        </div>
      </Dropdown>

      <Modal
        title="Delete User!"
        open={isModalOpen}
        onCancel={handleModalClose}
        onOk={handleDelete}
        className=""
        okButtonProps={{
          className: "w-5/12 h-16 !bg-blue-700 hover:opacity-80",
        }}
        cancelButtonProps={{
          className: "w-5/12 h-16",
        }}
        okText="Delete"
        cancelText="Cancel"
      >
        <div className="bg-white absolute -top-[4rem] right-[50%] translate-x-1/2 rounded-[50%] w-32 h-32 flex justify-center items-center ">
          <img src={deleteIcon} alt="img icon" className="w-20" />
        </div>
        <p className="my-16  text-center text-[1.6rem] text-gray-600 font-extralight">
          Are you sure you want to delete this user? This action cannot be
          undone..
        </p>
        <hr className="" />
      </Modal>
      <EditDrawer data={data} />
    </>
  );
};

export default ActionDropDown;
