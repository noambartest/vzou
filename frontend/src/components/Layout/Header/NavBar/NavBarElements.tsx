import { Popover } from "@headlessui/react";

import NavBarElementLink from "./NavBarElementLink";

import { RoutePaths } from "../../../../Routes/RoutePaths";
import { useAppSelector } from "../../../../store/hooks";
import { selectAuthentication } from "../../../../store/reducers/auth-reducer";


function NavBarElements() {
  const authSlice = useAppSelector(selectAuthentication);

  if (!authSlice.isLoggedIn) {
    // you can add navbar elements in the header for not logged in users here:
    return <></>;
  }

  return (
    <Popover.Group
      as="nav"
      className="hidden space-x-10 md:flex"
    >
      {/* <NavBarElementDropDown title={"Solutions"} items={solutions} />
      <NavBarElementLink title={"Docs"} link="#"></NavBarElementLink> */}
      {/* every role */}
      <>
        <NavBarElementLink
          title="Profile"
          link={RoutePaths.PROFILE}
        />
      </>
      {authSlice.user?.role === "Lecturer" ? (
        // lecturer
        <>
          <NavBarElementLink
            title="Reports"
            link={RoutePaths.REPORTS}
          />
          <NavBarElementLink
            title="Feedback"
            link={RoutePaths.ALL_FEEDBACKS}
          />
          <NavBarElementLink
            title="Register Lecturer"
            link={RoutePaths.REGISTER_LECTURER}
          />
        </>
      ) : (
        // not lecturer
        <NavBarElementLink
          title="Add Feedback"
          link={RoutePaths.POST_FEEDBACK}
        />
      )}
    </Popover.Group>
  );
}

export default NavBarElements;
