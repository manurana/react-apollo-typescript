import * as React from "react";
import { Button } from "react-bootstrap";

// https://www.pluralsight.com/guides/typescript-building-react-components
// https://stackoverflow.com/a/14639219

type LoginHandler = () => any;

interface LoginProps {
  loginHandler: LoginHandler;
}

const Login: React.FC<LoginProps> = ({ loginHandler }) => (
  <div className="overlay">
    <div className="overlay-content">
      <div className="overlay-heading">Welcome to the GraphQL tutorial app</div>
      <div className="overlay-message">Please login to continue</div>
      <div className="overlay-action">
        <Button
          id="qsLoginBtn"
          variant="primary"
          className="btn-margin loginBtn"
          onClick={loginHandler}
        >
          Log In
        </Button>
      </div>
    </div>
  </div>
);

export default Login;
