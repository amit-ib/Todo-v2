import { GoogleLogin, GoogleLogout } from "react-google-login";
import { useState, useEffect } from "react";

const clientId =
  "900579528323-mam6vmpqms78uujugfmfhqbuhrv0f5n6.apps.googleusercontent.com";

const Login = (props) => {
  const [showLoginButton, setShowLoginButton] = useState(true);
  const [showLogoutButton, setShowLogoutButton] = useState(false);

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

  return (
    <div class="button-login">
      {showLoginButton ? (
        <GoogleLogin
          clientId={clientId}
          buttonText="Login with your Gmail"
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={"single_host_origin"}
          isSignedIn={true}
        />
      ) : null}

      {showLogoutButton ? (
        <GoogleLogout
          clientId={clientId}
          buttonText="Logout"
          onLogoutSuccess={onLogoutSuccess}
        />
      ) : null}
    </div>
  );
};

export default Login;
