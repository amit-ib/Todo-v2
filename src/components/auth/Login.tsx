import { useEffect, useState } from "react";
import Button from "../shared/form/Button";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { loginTodoAction } from "../../store";
import { useDispatch } from "react-redux";
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

const Login = () => {
  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
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

  useEffect(() => {
    checkAuth();
  });

  const checkAuth = () => {
    const token = window.localStorage.getItem("accessToken");
    dispatch(loginTodoAction(!!token));
  };

  const onLoginSuccess = (res: ResponseType) => {
    window.localStorage.setItem("accessToken", res.token);
    window.localStorage.setItem("userName", res.userData.name);
  };

  const onSubmit: SubmitHandler<loginDataType> = async (data) => {
    setLoading(true);
    await axios
      .post(`${process.env.REACT_APP_BASE_URL}/login`, {
        username: data.email,
        password: data.password,
      })
      .then(function (response) {
        let userData = { token: response.data.token, userData: response.data };
        onLoginSuccess(userData);
      })
      .catch(function (error) {
        console.log(error);
        setShowError(true);
      });
    setLoading(false);
  };

  return (
    <>
      <div className="login-form">
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              disabled={loading}
              {...register("email", { required: true })}
              placeholder="Please enter email"
            />
            <span className="error">
              {errors.email?.type === "required" && "Please enter email"}
            </span>
            <input
              disabled={loading}
              {...register("password", { required: true })}
              type="password"
              placeholder="Please enter password"
            />
            <span className="error">
              {errors.password?.type === "required" && "Please enter password"}
            </span>
            {showError && (
              <div className="error center">Invalid Credentials</div>
            )}
            <Button
              disabled={loading}
              loading={loading}
              type="submit"
              label="Login"
              varient="primary"
              size="block"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
