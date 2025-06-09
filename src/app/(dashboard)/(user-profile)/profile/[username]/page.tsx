"use client";

import { useParams } from "next/navigation";
import React from "react";

const UserDetails = () => {
  const { username } = useParams();

  return <div>page {decodeURIComponent(username as string)}</div>;
};

export default UserDetails;
