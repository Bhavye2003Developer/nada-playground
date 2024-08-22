import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Platform from "./components/Platform";

export default () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Platform />,
    },
  ]);

  return <RouterProvider router={router} />;
};
