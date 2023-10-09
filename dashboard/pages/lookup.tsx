import LookUp from "@/components/auth/login/LookUp";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

const Lookup = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const email = searchParams.get("email");

  React.useEffect(() => {
    if (!email) {
      router.push("/");
    }
  }, [email]);

  return <LookUp />;
};

export default Lookup;
