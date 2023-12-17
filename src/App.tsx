import "./App.css";

import { CircularProgress } from "@mui/material";

import Header from "./components/Layout/Header/Header";
import AppRouter from "./Routes/AppRouter";
import { useAuthMeQuery } from "./store/reducers/auth-reducer-api";


function App() {
  let skip = true;
  const token = localStorage.getItem("accessToken");
  if (token) {
    skip = false;
  }
  const { isLoading } = useAuthMeQuery(null, { skip });
  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-screen flex-col space-y-5">
          <CircularProgress
            color="success"
            size={100}
          />
          <b className="text-2xl text-lime-600">App is Loading ...</b>
        </div>
      ) : (
        <div className="App">
          <Header />
          <AppRouter />
        </div>
      )}
    </>
  );
}

export default App;
