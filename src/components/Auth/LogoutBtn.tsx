import React from "react";
import { Button } from "react-bootstrap";

type LogoutHandler = () => any;

interface LogoutBtnProps {
  logoutHandler: LogoutHandler;
}

const LogoutBtn: React.FC<LogoutBtnProps> = ({ logoutHandler }) => (
  <Button
    id="qsLogoutBtn"
    variant="primary"
    className="btn-margin logoutBtn"
    onClick={logoutHandler}
  >
    Log Out
  </Button>
);

export default LogoutBtn;
