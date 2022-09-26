import React from "react";
import axios from "axios";
import Button from "./form/Button";
import { useForm, SubmitHandler } from "react-hook-form";

interface Props {
  isLogedin: Boolean;
  setIsLogedin: Function;
}

interface ResponseType {
  token: string;
  userData: {
    name: string;
  };
}

interface loginDataType {
  email: string;
  password: string;
}

const Login = (props: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginDataType>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onLoginSuccess = (res: ResponseType) => {
    window.localStorage.setItem("accessToken", res.token);
    window.localStorage.setItem("userName", res.userData.name);
    props.setIsLogedin(true);
  };

  const onSubmit: SubmitHandler<loginDataType> = (data) => {
    axios
      .post(`${process.env.REACT_APP_LOGIN_API}/login`, {
        username: data.email,
        password: data.password,
      })
      .then(function (response) {
        let userData = { token: response.data.token, userData: response.data };
        onLoginSuccess(userData);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <>
      <div className="login-form">
        {!props.isLogedin ? (
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                {...register("email", { required: true })}
                placeholder="Please enter email"
              />
              {errors.email?.type === "required" && "Please enter email"}
              <input
                {...register("password", { required: true })}
                type="string"
                placeholder="Please enter password"
              />
              <Button type="submit" label="Login" className="button primary" />
            </form>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Login;
