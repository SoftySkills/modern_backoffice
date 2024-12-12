import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../views/Dashboard";
import Login from "../views/Login";
import AuthGuard from "../guards/AuthGuard";
import GuestGuard from "../guards/GuestGuard";
import DashboardLayout from "../layouts/DashboardLayout";
import { IRoute } from "../types";

export const routes: IRoute[] = [
  {
    path: "/",
    element: Dashboard,
    guard: AuthGuard,
    layout: DashboardLayout,
  },
  {
    path: "/login",
    element: Login,
    guard: GuestGuard,
  },
];

export const renderRoutes = (routes: IRoute[]) => {
  return (
    <Routes>
      {routes?.map((route: IRoute, index: number) => {
        const Component = route.element;
        const Guard = route.guard || React.Fragment;
        const Layout = route.layout || React.Fragment;

        return (
          <Route
            key={index}
            path={route.path}
            element={
              <Guard>
                <Layout>
                  <Component />
                </Layout>
              </Guard>
            }
          />
        );
      })}
    </Routes>
  );
};
