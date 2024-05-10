import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App.js";
import ChatLogin from "./components/ChatLogin.jsx";
import ErrorPage from "./components/ErrorPage.jsx";
import ChatPage from "./components/ChatPage.js";
import SignupPage from "./components/SignupPage.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <ChatLogin />,
            },
            {
                path: "/chat",
                element: <ChatPage />,
            },
            {
                path: "/signup",
                element: <SignupPage />,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <RouterProvider router={router} />
);
