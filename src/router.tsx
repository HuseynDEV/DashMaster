import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardLayout from "./layout/DashboardLayout";
import HomePage from "./pages/HomePage";
import BooksPage from "./pages/BooksPage";
import AuthLayout from "./layout/AuthLayout";
import CreateBook from "./pages/CreateBook";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <Navigate to='/dashboard/home' />
    },
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
            },
            {
                path: "books/create",
                element: <CreateBook />
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