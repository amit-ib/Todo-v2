import React from "react";
import Button from "./shared/form/Button";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";

interface loginForm {
  email: string;
  password: string;
}

const LoginForm = (props: any) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginForm>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<loginForm> = (data) => {
    props.loginFunctionality(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("email", { required: true })} />
      {errors.email?.type === "required" && "Please enter email"}
      <input {...register("password", { required: true })} type="string" />
      <Button type="submit" label="Login" className="button primary" />
    </form>
  );
};

export default LoginForm;
