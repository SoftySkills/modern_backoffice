import { Button, Drawer, Input, Select, Spin, Upload, UploadProps } from "antd";

import { CgClose } from "react-icons/cg";
import { BiPhone, BiUser } from "react-icons/bi";
import { TfiEmail } from "react-icons/tfi";
import { Controller, useForm } from "react-hook-form";
import { getPublicUrl } from "../../api/getPublicUrl";
import { useEffect, useState } from "react";
import { COURSES } from "../../constants/Courses";
import { MdCastForEducation } from "react-icons/md";

import AddNewUserIcon from "../../assets/icons/AddNewUser.svg";
import ImportAvatar from "../../assets/icons/importAvatar.svg";
import UploadIcon from "../../assets/icons/uploadIcon.svg";
import { useToggleDrawer } from "../../hooks/usetoggleDrawer";
import { uploadFile } from "../../api/uploadFIle";
import { TUNISIA_REGIONS } from "../../constants/regions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editStudent } from "../../api/editStudent";
import { StudentDataType } from "../../types";

const { Dragger } = Upload;

const EditDrawer = ({ data }: { data: StudentDataType }) => {
  const [avatar, setAvatar] = useState<string | null>(data?.avatar || null);
  const [isLoadingUpload, setIsLoadingUplaod] = useState<boolean>(false);
  const [editDrawer, setEditDrawer] = useState(false);

  const toggleDrawer = useToggleDrawer();

  const uploadProps: UploadProps = {
    name: "file",
    multiple: false,
    async onChange(info) {
      const { status } = info.file;
      setIsLoadingUplaod(true);

      if (status === "done") {
        const file = info.file.originFileObj;

        const filePath = await uploadFile(file);
        if (!filePath) return;
        const fileUrl = getPublicUrl(filePath);
        setAvatar(fileUrl);
      }
      setIsLoadingUplaod(false);
    },
    customRequest: ({ onSuccess }) => {
      setTimeout(() => {
        onSuccess?.("ok");
      }, 0);
    },
  };

  const queryCLient = useQueryClient();

  const { mutate: editStudentApi } = useMutation({
    mutationFn: editStudent,
    onSuccess: () => {
      queryCLient.invalidateQueries({
        queryKey: ["students"],
      });
    },
  });

  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<Partial<StudentDataType>>({
    defaultValues: {
      name: data?.name,
      email: data?.email,
      phone_number: data?.phone_number,
      region: data?.region,
      course_enrolled: data?.course_enrolled,
    },
  });

  const onClose = () => {
    toggleDrawer(false, "showDrawerEdit");
  };

  const onSubmit = (updatedData: Partial<StudentDataType>) => {
    if (avatar) updatedData.avatar = avatar;
    editStudentApi({ ...updatedData, id: data?.id });
    reset();
    onClose();
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const showDrawerParam = queryParams.get("showDrawerEdit");

    if (
      showDrawerParam?.split("-")[0] === "true" &&
      showDrawerParam?.split("-")[1] === String(data?.id)
    ) {
      setEditDrawer(true);
    } else {
      setEditDrawer(false);
    }
  }, [location.search]);

  return (
    <Drawer
      title="Basic Drawer"
      onClose={onClose}
      open={editDrawer}
      width={500}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div
          onClick={onClose}
          className="bg-slate-200 absolute top-10 right-10  p-3 rounded-full transition-all duration-200 cursor-pointer hover:opacity-80"
        >
          <CgClose />
        </div>

        <div className="flex items-center gap-4 py-6 px-10">
          <img src={AddNewUserIcon} alt="add user icon" />
          <div className="flex flex-col ">
            <p className="text-[1.6rem]">Edit Student</p>
            <p className="text-[1.4rem] font-extralight w-11/12">
              Choose a username and complete all user details.
            </p>
          </div>
        </div>
        <hr />
        <div className="flex items-center gap-4 py-6 px-10">
          <img
            src={avatar || ImportAvatar}
            alt="import avatar icon"
            className="w-32 h-32 rounded-[50%] object-cover"
          />
          <div className="flex flex-col gap-4 w-10/12">
            <p className="text-[1.6rem]">Importer l’image de profil</p>
            <Dragger
              {...uploadProps}
              className="bg-color-blue-4 rounded-3xl "
              showUploadList={false}
            >
              <div className="flex  items-center gap-5 ">
                {isLoadingUpload ? (
                  <Spin />
                ) : (
                  <img src={UploadIcon} alt="upload icon" />
                )}

                <p className="text-[1.4rem] font-extralight w-8/12">
                  <strong>Click to upload</strong> or drag and drop SVG, PNG,
                  JPG or GIF
                </p>
              </div>
            </Dragger>
          </div>
        </div>
        <hr />

        <div className="mt-6 flex flex-col">
          <div
            className="p-2 pl-6 text-color-blue-2 text-[1.6rem]"
            style={{
              background:
                "linear-gradient(90.09deg, rgba(255, 255, 255, 0.43) 6.16%, rgba(68, 143, 237, 0.43) 70.73%, rgba(8, 111, 233, 0.6) 99.98%)",
            }}
          >
            Information
          </div>

          {/* Name Field */}
          <div className="mt-6 px-6 py-4 flex flex-col gap-4">
            <label htmlFor="name" className="text-gray-700">
              Name
            </label>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  prefix={<BiUser />}
                  placeholder="Enter user Name"
                />
              )}
            />
            {errors.name && (
              <p className="text-red-500 text-[1.2rem]">
                {errors.name.message as string}
              </p>
            )}
          </div>

          {/* Email Address Field */}
          <div className="px-6 py-4 flex flex-col gap-4">
            <label htmlFor="email" className="text-gray-700">
              Email Address
            </label>
            <Controller
              name="email"
              control={control}
              rules={{
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email format",
                },
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  prefix={<TfiEmail />}
                  placeholder="Enter email address"
                />
              )}
            />
            {errors.email && (
              <p className="text-red-500 text-[1.2rem]">
                {errors.email.message as string}
              </p>
            )}
          </div>

          {/* Region Field */}
          <div className="px-6 py-4 flex flex-col gap-4">
            <label htmlFor="region" className="text-gray-700">
              Region
            </label>
            <Controller
              name="region"
              control={control}
              render={({ field }) => (
                <Select {...field} placeholder="Choose region">
                  {TUNISIA_REGIONS.map((region, index) => (
                    <option key={index} value={region}>
                      {region}
                    </option>
                  ))}
                </Select>
              )}
            />
            {errors.region && (
              <p className="text-red-500 text-[1.2rem]">
                {errors.region.message as string}
              </p>
            )}
          </div>

          {/* Phone Number Field */}
          <div className="px-6 py-4 flex flex-col gap-4">
            <label htmlFor="phone_number" className="text-gray-700">
              Phone Number
            </label>
            <Controller
              name="phone_number"
              control={control}
              rules={{
                pattern: {
                  value: /^\d{8}$/,
                  message: "Phone number must be 8 digits",
                },
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  prefix={<BiPhone />}
                  placeholder="50 222 800"
                />
              )}
            />
            {errors.phone_number && (
              <p className="text-red-500 text-[1.2rem]">
                {errors.phone_number.message as string}
              </p>
            )}
          </div>

          <div className="px-6 py-4 flex flex-col gap-4">
            <label htmlFor="course_enrolled" className="text-gray-700">
              Courses
            </label>
            <Controller
              name="course_enrolled"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  prefix={<MdCastForEducation />}
                  placeholder="Select Course"
                  mode="multiple"
                >
                  {COURSES.map((course, index) => (
                    <option key={index} value={course}>
                      {course}
                    </option>
                  ))}
                </Select>
              )}
            />
            {errors.course_enrolled && (
              <p className="text-red-500 text-[1.2rem]">
                {errors.course_enrolled.message as string}
              </p>
            )}
          </div>
        </div>
        <Button
          type="primary"
          className="py-8 text-[1.6rem] absolute bottom-20 w-10/12 left-1/2 -translate-x-1/2 !bg-blue-700 transition-all duration-200 hover:opacity-80"
          htmlType="submit"
        >
          Edit
        </Button>
      </form>
    </Drawer>
  );
};

export default EditDrawer;
