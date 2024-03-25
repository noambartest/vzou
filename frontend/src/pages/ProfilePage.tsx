import { LockOpenIcon, PencilIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";

import AuthCard from "../components/Auth/AuthCard";
import FormButton from "../components/Auth/FormButton";
import FloatUpContainer from "../components/UI/FloatUpContainer";
import RoutePaths from "../Routes/RoutePaths";
import { useAppSelector } from "../store/hooks";
import { ProfileLime500 } from "../utils/logos";


function ProfilePage() {
  const user = useAppSelector((state) => state.auth.user!);

  return (
    <>
      <FloatUpContainer>
        <AuthCard title="Profile">
          <div className="bg-white p-3 shadow-sm rounded-sm">
            <div className="text-gray-700 rows-1 break-after-column">
              <div className="grid md:grid-cols-1 text-sm">
                <div className="grid grid-cols-2">
                  <div className="px-4 py-2 font-semibold">First Name</div>
                  <div className="px-4 py-2">{user.firstName}</div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="px-4 py-2 font-semibold">Last Name</div>
                  <div className="px-4 py-2">{user.lastName}</div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="px-4 py-2 font-semibold">Email</div>
                  <div className="px-4 py-2">
                    <a
                      className="text-blue-800"
                      href="mailto:jane@example.com"
                    >
                      {user.email}
                    </a>
                  </div>
                </div>

                {user.role !== "Lecturer" && (
                  <>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Birthyear</div>
                      <div className="px-4 py-2">{user.birthYear}</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Gender</div>
                      <div className="px-4 py-2">{user.gender}</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">2FA</div>
                      <div className="px-4 py-2">{user.is2FA ? "Enabled" : "Disabled"}</div>
                    </div>
                  </>
                )}
              </div>
              <div className="w-80 flex flex-col gap-2">
                <Link to={RoutePaths.EDIT_PROFILE}>
                  <FormButton
                    type="button"
                    title="Edit profile"
                    onClick={() => {}}
                    icon={
                      <PencilIcon
                        className="h-5 w-5 text-lime-600 group-hover:text-lime-500"
                        aria-hidden="true"
                      />
                    }
                  />
                </Link>
                <Link to={RoutePaths.CHANGE_PASSWORD}>
                  <FormButton
                    type="button"
                    title="Change password"
                    icon={
                      <LockOpenIcon
                        className="h-5 w-5 text-lime-600 group-hover:text-lime-500"
                        aria-hidden="true"
                      />
                    }
                  />
                </Link>
              </div>
            </div>
          </div>
        </AuthCard>
      </FloatUpContainer>
      <FloatUpContainer>
        <div className="flex items-center justify-center px-2 sm:px-4 lg:px-8 ">
          <img
            className="h-64"
            src={ProfileLime500}
            alt="Vzou"
          />
        </div>
      </FloatUpContainer>
    </>
  );
}

export default ProfilePage;
