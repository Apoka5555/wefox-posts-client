import { ReactElement } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/molecules/nav-bar/NavBar";
import "./Layout.scss";

export function Layout(): ReactElement {
  return (
    <div className="layout">
      <NavBar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
