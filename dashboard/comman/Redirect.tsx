"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Redirect = ({ to }: any) => {
  const router = useRouter();

  useEffect(() => {
    router.push(to);
  }, []);

  return null;
};

export default Redirect;
