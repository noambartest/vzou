// const btnColor:string = "text-lime-500";
import { Link } from "react-router-dom";

import { RoutePaths } from "../../../../Routes/RoutePaths";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { logout } from "../../../../store/reducers/auth-reducer";


function NavBarElementsRight() {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const userFirstName = useAppSelector((state) => state.auth.user?.firstName);
  const logOutHandler = () => {
    localStorage.removeItem("accessToken");
    dispatch(logout());
  };
  return (
    <div className="hidden items-center justify-end md:flex md:flex-1 lg:w-0">
      {!isLoggedIn && (
        <>
          <Link
            to={RoutePaths.LOGIN}
            className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900"
          >
            Sign in
          </Link>
          <Link
            to={RoutePaths.REGISTER}
            className="ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-lime-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-lime-600"
          >
            Sign up
          </Link>
        </>
      )}
      {isLoggedIn && (
        <>
          <div className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900">
            Welcome {userFirstName}
          </div>

          <div
            onClick={logOutHandler}
            className="ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-lime-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-lime-600 cursor-pointer"
          >
            Log Out
          </div>
        </>
      )}
    </div>
  );
}

export default NavBarElementsRight;
