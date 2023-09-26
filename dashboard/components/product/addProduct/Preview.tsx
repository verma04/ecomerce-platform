import { addSellerProduct } from "@/grapqhl/actions/product";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";

const Preview = ({
  productInformation,
  inventory,
  variantGenerated,
  variant,
  img,
}) => {
  const router = useRouter();
  const [add, { data, loading, error }] = addSellerProduct();

  const submit = () => {
    const data = {
      productInformation: JSON.stringify(productInformation),
      inventory: JSON.stringify(inventory),
      variantGenerated: JSON.stringify(variantGenerated),
      variant: JSON.stringify(variant),
      img: JSON.stringify(img),
    };
    add({
      variables: data,
    });
  };
  if (data && data?.addSellerProduct) {
    router.push("/product");
  }
  return <Button onClick={submit}>add</Button>;
};

export default Preview;
