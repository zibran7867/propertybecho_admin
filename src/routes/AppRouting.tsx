import { lazy } from "react";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import { Routing } from "./routing";



const PublicLayout = lazy(() => import("../layout/PublicLayout"));
const MainLayout = lazy(() => import("../layout/MainLayout"));

const Login = lazy(() => import("../pages/Account/Login"));
const ForgotPassword = lazy(() => import("../pages/Account/ForgotPassword"));

const Dashboard = lazy(() => import("../pages/Dashboard/Dashboard"));
const AddressManagement = lazy(() => import("../pages/Area_Management/AreaManagement"));
const BuilderManagement = lazy(() => import("../pages/Builder_Management/BuilderManagement"));

const ErrorPage = lazy(() => import("../pages/Account/ErrorPage"));
const NotFound = lazy(() => import("../pages/Account/NotFound"));


const privateRoute = (Element: any, props?: any) => {
  return <ProtectedRoute element={props ? <Element {...props} /> : <Element />} />;
};

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to={Routing.Login} />,
  },
  {
    path: Routing.Login,
    element: (<PublicLayout><Login /></PublicLayout>),
  },
  {
    path: Routing.ForgotPassword,
    element: (<PublicLayout><ForgotPassword /></PublicLayout>),
  },
  {
    path: Routing.Dashboard,
    element: <MainLayout>{privateRoute(Dashboard)}</MainLayout>,
  },
  {
    path: Routing.Area_Management,
    element: <MainLayout>{privateRoute(AddressManagement)}</MainLayout>,
  },
  {
    path: Routing.Builder_Management,
    element: <MainLayout>{privateRoute(BuilderManagement)}</MainLayout>,
  },
  {
    path: Routing.ErrorPage,
    element: (<PublicLayout><ErrorPage /></PublicLayout>),
  },
  {
    path: "*",
    element: (<PublicLayout><NotFound /></PublicLayout>),
  },
]);

const AppRouting = () => {
  return <RouterProvider router={routes} />;
};

export default AppRouting;
