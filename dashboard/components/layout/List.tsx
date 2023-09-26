import AdsSvg from "@/svg/AdsSvg";
import CategorySvg from "@/svg/CategorySvg";
import CouponSvg from "@/svg/CouponSvg";
import HomeSvg from "@/svg/HomeSvg";
import OrderSvg from "@/svg/OrderSvg";
import PaymentSvg from "@/svg/Payment";
import ProductSvg from "@/svg/ProductSvg";

const data = [
  {
    category: "",
    list: [
      {
        name: "Home",
        svg: <HomeSvg />,
        url: "/dashboard",
      },
    ],
  },
  {
    category: "Manage Business",
    list: [
      {
        name: "Category",
        svg: <CategorySvg />,
        url: "/categories",
      },
      {
        name: "Product",
        svg: <ProductSvg />,
        url: "/product",
      },
      {
        name: "Inventory",
        svg: <OrderSvg />,
        url: "/ware-house",
      },
      {
        name: "Orders",
        svg: <OrderSvg />,
        url: "/orders",
      },

      {
        name: "Payments",
        svg: <PaymentSvg />,
        url: "/payments",
      },
    ],
  },

  {
    category: "Media",
    list: [
      {
        name: "Media",
        svg: <AdsSvg />,
        url: "/media",
      },
    ],
  },
  {
    category: "Boost Sale",
    list: [
      {
        name: "Advertisement",
        svg: <AdsSvg />,
        url: "/ads",
      },
      {
        name: "Promotions",
        svg: <CouponSvg />,
        url: "/promotions",
      },
    ],
  },
];

export default data;
