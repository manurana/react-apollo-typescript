import React from "react";

import { getOnlineUsers_online_users_user } from "../../__generated__/getOnlineUsers";

interface Props {
  key: number;
  index: number;
  user: getOnlineUsers_online_users_user;
}

const OnlineUser: React.FC<Props> = ({ user }) => {
  return (
    <div className="userInfo">
      <div className="userImg">
        <i className="far fa-user" />
      </div>
      <div className="userName">{user.name}</div>
    </div>
  );
};

export default OnlineUser;
