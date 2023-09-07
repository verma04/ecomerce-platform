import Otp from "@/components/auth/Otp";
import React from "react";

import { useRouter } from "next/router";
const page = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const { id } = router.query;

  return <Otp id={id} />;
};

export default page;
