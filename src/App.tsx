import { Outlet, useRoutes } from "react-router-dom"

import ResearchRoutes from "./pages/research/research-routes"
import AppLayout from "./layout"
import Homepage from "./pages/home-page"
import ThankYouPage from "./components/ThankYouPage";


const AppRoutes = () => {
  return useRoutes([
    {
      path: "/",
      element: <AppLayout />,
      children: [
        ...ResearchRoutes,
        {
          index: true,
          element: <Homepage />
        },
        {
          path: "thank-you",
          element: <ThankYouPage />
        }

      ]
    }
  ]);
};

function App() {
  return (
    <>
      <AppRoutes />
      <Outlet />
    </>
  )
}

export default App