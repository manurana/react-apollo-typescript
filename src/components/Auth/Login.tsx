// https://github.com/typescript-cheatsheets/react-typescript-cheatsheet/blob/master/README.md#import-react
import React from "react";
import { Button } from "react-bootstrap";

// https://www.pluralsight.com/guides/typescript-building-react-components
// https://stackoverflow.com/a/14639219
// https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html#callback-types
// https://github.com/microsoft/TypeScript-React-Starter/blob/master/src/components/Hello.tsx

export interface Props {
  loginHandler: () => void;
}

const Login: React.FC<Props> = ({ loginHandler }) => (
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
