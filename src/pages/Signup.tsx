import { useForm, type SubmitHandler } from "react-hook-form";
import type { IInputs } from "../Inputs";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import eyeIcon from "../../public/assets/images/icon-show-password.svg";
import { useEffect, useState } from "react";
import eyeOn from "../../public/assets/images/icon-hide-password.svg";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserProvider";
const schema: yup.ObjectSchema<IInputs> = yup.object({
  name: yup.string().required("name is required"),
  email: yup.string().email("Invalid email form").required("email is required"),
  password: yup.string().required("password is required"),
});

export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IInputs>({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(eyeIcon);
  const { setNewUser } = useUser();
  const showPassword = () => {
    if (type == "password") {
      setIcon(eyeOn);
      setType("text");
    } else {
      setIcon(eyeIcon);
      setType("password");
    }
  };
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setNewUser(JSON.parse(storedUser));
    }
  }, []);
  const onSubmit: SubmitHandler<IInputs> = (data) => {
    event?.preventDefault();
    window.scrollTo(0, 0);
    localStorage.setItem("user", JSON.stringify(data));
    navigate("/login");
  };

  return (
    <div className="py-[115.62px] px-[16px] flex justify-center">
      <div className="container px-[20px] py-[24px] w-[303px] rounded-[12px] bg-white">
        <h1 className="text-[#201F24] text-[32px] font-bold leading-[120%]">
          Sing Up
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="name flex flex-col mt-[32px] gap-[4px]">
            <label
              htmlFor="name"
              className="text-[#696868] text-[12px] font-bold leading-[150%]"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              {...register("name")}
              className="w-[263px] rounded-[8px] py-[12px] px-[20px] bg-white outline-none border-[1px] border-[#98908B]"
            />
            <p className="text-red-600 tex-[14px] font-normal leading-[150%]">
              {errors.name?.message}
            </p>
          </div>
          <div className="email flex flex-col mt-[32px] gap-[4px]">
            <label
              htmlFor="email"
              className="text-[#696868] text-[12px] font-bold leading-[150%]"
            >
              Email
            </label>
            <input
              type="text"
              id="email"
              {...register("email")}
              className="w-[263px] rounded-[8px] py-[12px] px-[20px] bg-white outline-none border-[1px] border-[#98908B]"
            />
            <p className="text-red-600 tex-[14px] font-normal leading-[150%]">
              {errors.email?.message}
            </p>
          </div>
          <div className="password flex flex-col mt-[32px] gap-[4px] relative">
            <label
              htmlFor="password"
              className="text-[#696868] text-[12px] font-bold leading-[150%]"
            >
              Create Password
            </label>
            <input
              type={type}
              id="password"
              {...register("password")}
              className="w-[263px] rounded-[8px] py-[12px] px-[20px] bg-white outline-none border-[1px] border-[#98908B]"
            />
            <p className="text-red-600 tex-[14px] font-normal leading-[150%]">
              {errors.password?.message}
            </p>
            <img
              src={icon}
              alt="eye icon "
              onClick={showPassword}
              className="w-[16px] h-[16px] absolute top-10 right-4"
            />
            <p className="text-[#696868] text-[12px] font-normal leading-[150%] text-right">
              Passwords must be at least 8 characters
            </p>
          </div>
          <div className="button flex justify-center mt-[32px]">
            <button
              type="submit"
              className="text-white text-[14px] font-bold leading-[150%] w-[271px] py-[16px] bg-signup rounded-[8px]"
            >
              Create Account
            </button>
          </div>
        </form>
        <div className="signin mt-[32px] flex justify-center">
          <p className="text-[#696868] text-[14px] font-normal leading-[150%]">
            Already have an account?
            <Link
              to={"/login"}
              className="underline text-[#201F24] text-[14px] font-bold leading-[150%]"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
