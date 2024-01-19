import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Home from "../Pages/Home";
import ErrorHandler from "../components/Ui/ErrorHandler";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* root layout */}
      <Route
        path="/"
        element={<Home />}
        errorElement={<ErrorHandler />}
      ></Route>

      {/* 404 */}
      <Route
        path="*"
        element={<ErrorHandler statusCode={404} title="Not Found" />}
      />
    </>
  )
);
