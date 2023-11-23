//@ts-nocheck
import { useGetUser } from "@/grapqhl/actions/auth";
import { useRouter } from "next/navigation";
import Loading from "../loading/Loading";
import SidebarDrawer from "../layout/SidebarLayout";
import Kyc from "../kyc";

export default (WrappedComponent: any, options = { ssr: false }) => {
  function WithAuth(props: any) {
    const router = useRouter();
    const { data: { getUser } = {}, loading, error } = useGetUser();

    if (loading) {
      return <Loading />;
    }
    if (!loading && (!getUser || error) && typeof window !== "undefined") {
      localStorage.removeItem("key");
      return router.push("/login");
    }

    if (getUser) {
      if (getUser.kyc === false) {
        return (
          <>
            <Kyc />
          </>
        );
      }
    }

    // TODO: Send a message to login page

    // if (getUser) {
    //   if (role && !role.includes(getUser.role)) {
    //     return <Error />;
    //   }
    return (
      <>
        <SidebarDrawer>
          <WrappedComponent {...props} />
        </SidebarDrawer>
      </>
    );
  }

  return WithAuth;
};
