import { Button, Checkbox, Input, message } from "antd";
import logo from "../../assets/imgs/logo.png";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Controller, useForm } from "react-hook-form";
import { handleLogin } from "../../api/handleLogin";

export default function LoginRightSide() {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<{ email: string; password: string }>();

  const onSubmit = async (data: { email: string; password: string }) => {
    try {
      const { email, password } = data;
      await handleLogin(email, password);
    } catch (err) {
      if (err) message.error("Invalid Credentials");
    } finally {
      reset();
    }
  };

  return (
    <div className="w-[55%] mt-[12rem] flex justify-center  ">
      <div className="w-9/12 flex flex-col  gap-14 items-center ">
        <img src={logo} alt="logo of softy education" className="w-[32rem] " />
        <h2 className="text-[3.6rem] font-medium text-center ">
          Sign in to your account
        </h2>
        <form
          className="w-full flex flex-col gap-10"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col gap-3">
            <div className="flex flex-col items-start gap-2 relative w-full">
              <label htmlFor="input" className="text-[1.8rem] text-black-1 ">
                Email
              </label>
              <Controller
                name="email"
                control={control}
                rules={{
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                }}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="text"
                    placeholder="Username or email address..."
                    className="w-full  p-5 border font-light text-[1.4rem]   border-gray-200 rounded-full placeholder:text-[1.4rem] pl-8 placeholder:text-gray-500 placeholder:font-extralight outline-2 transition-all duration-300 focus:outline-color-blue-1 "
                  />
                )}
              />

              {errors?.email?.message && (
                <p className="text-red-600 pl-6 text-[1.3rem]">
                  {errors?.email?.message as string}
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col items-start gap-2 relative w-full">
              <label htmlFor="input" className="text-[1.8rem] text-black-1 ">
                Password
              </label>
              <Controller
                name="password"
                control={control}
                rules={{ required: "Password is required" }}
                render={({ field }) => (
                  <>
                    <Input
                      {...field}
                      placeholder="Password"
                      className="w-full  p-5 border font-light text-[1.4rem]   border-gray-200 rounded-full placeholder:text-[1.4rem] pl-8 placeholder:text-gray-500 placeholder:font-extralight outline-2 transition-all duration-300 focus:outline-color-blue-1"
                      type={passwordVisible ? "text" : "password"}
                    />
                    {passwordVisible ? (
                      <FaEye
                        onClick={() =>
                          setPasswordVisible((prevState) => !prevState)
                        }
                        className="z-[999] absolute right-10 top-[55%] text-[2.2rem] fill-color-blue-3 cursor-pointer"
                      />
                    ) : (
                      <FaEyeSlash
                        onClick={() =>
                          setPasswordVisible((prevState) => !prevState)
                        }
                        className="z-[999] absolute right-10 top-[55%] text-[2.2rem] fill-color-blue-3 cursor-pointer "
                      />
                    )}
                  </>
                )}
              />
              {errors?.password?.message && (
                <p className="text-red-600 pl-6 text-[1.3rem]">
                  {errors?.password?.message as string}
                </p>
              )}
            </div>
          </div>
          <div className="flex justify-between w-full flex-wrap gap-6">
            <Checkbox className="flex items-center gap-2">
              <p className=" text-gray-500 text-[1.5rem] ">Remember me</p>
            </Checkbox>
            <div className="flex justify-center items-center">
              <Button
                htmlType="submit"
                className=" !py-7 rounded-full text-[1.6rem]  px-20 bg-color-blue-1  text-white "
              >
                Login
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
