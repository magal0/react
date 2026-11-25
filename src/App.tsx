
  import { lazy, Suspense } from "react";
  import { createBrowserRouter, RouterProvider } from "react-router-dom";

  import Layout from "./pages/Layout";
  import Loading from "./pages/Loading";

  const BigHome = lazy(() => import("./components/Home/Home"));
  const BigContact = lazy(() => import("./components/Contact/Contact"));
  const NotFound = lazy(() => import("./pages/NotFound"));

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <BigHome />,
        },
        {
          path: "contact",
          element: <BigContact />,
        }
      ],
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  function App() {
    return (
      <Suspense fallback={<Loading />}>
        <RouterProvider router={router} />
      </Suspense>
    );
  }

  export default App;
