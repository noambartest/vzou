import AuthWrapper from "../components/Auth/AuthWrapper";
import RegisterLecturerForm from "../components/Auth/RegisterLecturerForm";
import { registerImgLime500 } from "../utils/logos";


function RegisterLecturerPage() {
  return (
    <AuthWrapper
      cardTitle="Create new Lecturer account"
      cardContent={<RegisterLecturerForm />}
      imgContent={
        <div className="flex items-center justify-center py- px-2 sm:px-4 lg:px-8 ">
          <img
            className="h-64"
            src={registerImgLime500}
            alt="Vzou"
          />
        </div>
      }
    />
  );
}

export default RegisterLecturerPage;
