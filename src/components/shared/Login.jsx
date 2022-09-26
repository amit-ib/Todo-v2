import { GoogleLogin, GoogleLogout } from "react-google-login";
import { useState, useEffect } from "react";
import axios from "axios";
import LoginForm from "../LoginForm";

const clientId = process.env.REACT_APP_CLIENTID;

const Login = (props) => {
  const [showLoginButton, setShowLoginButton] = useState(true);
  const [showLogoutButton, setShowLogoutButton] = useState(false);

  useEffect(() => {
    if (props.isLogedin) {
      setShowLoginButton(false);
      setShowLogoutButton(true);
    } else {
      setShowLoginButton(true);
      setShowLogoutButton(false);
    }
  }, [props.isLogedin]);

  const onLoginSuccess = (res) => {
    console.log(res, "RES");
    window.localStorage.setItem("accessToken", res.token);
    window.localStorage.setItem("userName", res.userData.name);
    props.setIsLogedin(true);
  };
  // Google Auth START
  const onGoogleAuthSuccess = (res) => {
    let userData = { token: res.accessToken, userData: res.profileObj };
    onLoginSuccess(userData);
  };

  const onGoogleAuthFailure = (res) => {
    console.log("Login Failed! res:", res);
  };
  // Google Auth ENDS

  const onLogoutSuccess = () => {
    props.setIsLogedin(false);
    window.localStorage.removeItem("accessToken");
  };

  const loginApiAuth = (data) => {
    axios
      .post("https://todo-node-api.vercel.app/api/login", {
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
  console.log(showLoginButton, showLogoutButton);
  return (
    <>
      {showLogoutButton ? (
        <span class="button-google">
          <GoogleLogout
            clientId={clientId}
            buttonText="Logout"
            onLogoutSuccess={onLogoutSuccess}
            className="button-logout"
          />
        </span>
      ) : null}

      <div className="login-form">
        {showLoginButton ? (
          <div>
            <LoginForm loginFunctionality={(data) => loginApiAuth(data)} />
            OR
            <div class="button-google">
              <GoogleLogin
                clientId={clientId}
                buttonText="Login with your Gmail"
                onSuccess={onGoogleAuthSuccess}
                onFailure={onGoogleAuthFailure}
                cookiePolicy={"single_host_origin"}
                isSignedIn={true}
              />
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Login;
