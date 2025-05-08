import { useForm, type SubmitHandler } from "react-hook-form";
import type { IInputs, Ilogin } from "../Inputs";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useActionState, useState } from "react";
import eyeIcon from "../../public/assets/images/icon-show-password.svg";
import eyeOn from "../../public/assets/images/icon-hide-password.svg";
import { useUser } from "../context/UserProvider";
import { Link, useNavigate } from "react-router-dom";
const schema: yup.ObjectSchema<Ilogin> = yup.object({
  email: yup.string().email("Invalid email form").required("email is required"),
  password: yup.string().required("password is required"),
});
export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Ilogin>({
    resolver: yupResolver(schema),
  });
  const showPassword = () => {
    if (type == "password") {
      setIcon(eyeOn);
      setType("text");
    } else {
      setIcon(eyeIcon);
      setType("password");
    }
  };
  const navigate = useNavigate();
  const { newUser } = useUser();
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(eyeIcon);
  const [error, setError] = useState("");

  const onSubmit: SubmitHandler<Ilogin> = (data) => {
    if (data.email == newUser.email && data.password == newUser.password) {
      navigate("/home");
    } else {
      setError("Password or Email is Incorrect!");
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="container w-[343px] bg-white rounded-[12px] py-[24px] px-[20px] mb-[168px] mt-[168px]">
        <h2 className="text-[#201F24] text-[32px] font-bold leading-[120%]">
          Login
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
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
              className="w-[303px] rounded-[8px] py-[12px] px-[20px] bg-white outline-none border-[1px] border-[#98908B]"
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
              Password
            </label>
            <input
              type={type}
              id="password"
              {...register("password")}
              className="w-[303px] rounded-[8px] py-[12px] px-[20px] bg-white outline-none border-[1px] border-[#98908B]"
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
            <p className="text-red-600 text-[14px] font-normal text-center mt-[10px]">
              {error}
            </p>
          </div>
          <div className="button flex justify-center mt-[32px]">
            <button
              type="submit"
              className="text-white text-[14px] font-bold leading-[150%] w-[303px] py-[16px] bg-signup rounded-[8px]"
            >
              Login
            </button>
          </div>
        </form>
        <div className="signin mt-[32px] flex justify-center">
          <p className="text-[#696868] text-[14px] font-normal leading-[150%]">
            Need to create an account?
            <Link
              to={"/signup"}
              className="underline text-[#201F24] text-[14px] font-bold leading-[150%]"
            >
              Sing Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
