import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/HomePage";
import Login from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardLayout from "./layout/DashboardLayout";
import HomePage from "./pages/HomePage";
import BooksPage from "./pages/BooksPage";
import AuthLayout from "./layout/AuthLayout";


export const router = createBrowserRouter([
    {
        path: "/dashboard",
        element: <DashboardLayout />,
        children: [
            {
                path: "home",
                element: <HomePage />
            },
            {
                path: "books",
                element: <BooksPage />
            }
        ]
    }, {
        path: '/auth',
        element: <AuthLayout />,
        children: [
            {
                path: 'login',
                element: <Login />
            },
            {
                path: 'register',
                element: <RegisterPage />
            }
        ]
    }
])

export default router