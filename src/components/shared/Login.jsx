import { GoogleLogin, GoogleLogout } from "react-google-login";
import { useState, useEffect } from "react";
import axios from "axios";
import Input from "./form/Input";

const clientId = process.env.REACT_APP_CLIENTID;

const Login = (props) => {
  const [showLoginButton, setShowLoginButton] = useState(true);
  const [showLogoutButton, setShowLogoutButton] = useState(false);

  // Google Auth START
  const onSuccess = (res) => {
    console.log("Login Success! Current user: ", res);
    window.localStorage.setItem("accessToken", res.accessToken);
    props.setuserProfile(res.profileObj);
    props.setIsLogedin(true);
    setShowLoginButton(false);
    setShowLogoutButton(true);
  };

  const onFailure = (res) => {
    console.log("Login Failed! res:", res);
  };

  const onLogoutSuccess = (res) => {
    console.log("Logout Success!");
    props.setIsLogedin(false);
    window.localStorage.removeItem("accessToken");
    setShowLoginButton(true);
    setShowLogoutButton(false);
  };

  // Google Auth ENDS

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const emailChangeHandeler = (e) => {
    setEmail(e.target.value);
  };
  const passwordChangeHandeler = (e) => {
    setPassword(e.target.value);
  };

  const loginFunctionality = () => {
    axios
      .post("https://todo-node-api.vercel.app/api/login", {
        username: email,
        //username: "amit.verma@infobeans.com",
        //password: "Ib@123456",
        password: password,
      })
      .then(function (response) {
        console.log(response.data, "Response:");
        window.localStorage.setItem("accessToken", response.data.token);
        props.setIsLogedin(true);
        setShowLoginButton(false);
        setShowLogoutButton(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  console.log(showLoginButton);
  return (
    <>
      {showLogoutButton ? (
        <span class="button-google">
          <GoogleLogout
            clientId={clientId}
            buttonText="Logout"
            onLogoutSuccess={onLogoutSuccess}
          />
        </span>
      ) : null}

      <div className="login-form">
        {showLoginButton ? (
          <div>
            <Input
              type="text"
              placeholder="Please enter email"
              onChange={emailChangeHandeler}
            />
            <Input
              type="password"
              placeholder="Please enter password"
              onChange={passwordChangeHandeler}
            />
            <button onClick={loginFunctionality} className="button primary">
              Login
            </button>
            OR
            <div class="button-google">
              <GoogleLogin
                clientId={clientId}
                buttonText="Login with your Gmail"
                onSuccess={onSuccess}
                onFailure={onFailure}
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
