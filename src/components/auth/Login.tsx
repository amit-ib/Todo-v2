import React from "react";
import Button from "../shared/form/Button";
import { useForm, SubmitHandler } from "react-hook-form";
import instance from "../../axiosConfig";

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
    instance
      .post(`/login`, {
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
              <span className="error">
                {errors.email?.type === "required" && "Please enter email"}
              </span>
              <input
                {...register("password", { required: true })}
                type="password"
                placeholder="Please enter password"
              />
              <span className="error">
                {errors.password?.type === "required" &&
                  "Please enter password"}
              </span>
              <Button
                type="submit"
                label="Login"
                varient="primary"
                size="block"
              />
            </form>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Login;
