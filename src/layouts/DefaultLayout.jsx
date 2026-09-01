import { Outlet } from "react-router-dom";
import AppHeader from "../components/AppHeader";
import AppFooter from "../components/AppFooter";

export default function DefaultLayout() {
  return (
    <>
      <AppHeader />

      <main>
        <div className="container">
          <Outlet />
        </div>
      </main>
      
      <AppFooter />
    </>
  );
}