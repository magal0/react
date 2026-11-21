
import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "./pages/Layout";
import Loading from "./pages/Loading";

// Lazy Components
const BigHome = lazy(() => import("./components/Home/Home"));
const BigMenu = lazy(() => import("./components/Menu/Menu"));
const BigContact = lazy(() => import("./components/Contact/Contact"));
const BigAbout = lazy(() => import("./components/About/About"));
const BigPortfolio = lazy(() => import("./components/Portfolio/Portfolio"));

const Reservations = lazy(() => import("./pages/Reservations"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Router
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
        path: "menu",
        element: <BigMenu />,
      },
      {
        path: "contact",
        element: <BigContact />,
      },
      {
        path: "about",
        element: <BigAbout />,
      },
      {
        path: "portfolio",
        element: <BigPortfolio />,
      },
      {
        path: "reservations",
        element: <Reservations />,
      },
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
