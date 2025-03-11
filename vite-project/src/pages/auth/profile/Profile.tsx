import React from "react";
import { useProfile } from "@/pages/api/server/auth/profile/query";

const Profile = () => {
  const { data: user } = useProfile();
  console.log(user);
  return <div>{user.name}</div>;
};

export default Profile;
