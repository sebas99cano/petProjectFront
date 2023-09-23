import React, { Suspense } from "react";
import { Layout, Menu } from "antd";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Home from "../home/Home";
import Clients from "../clients/Clients";
import Pets from "../pets/Pets";
import Medicaments from "../medicaments/Medicaments";

const { Header, Content } = Layout;

const routes = [
  { title: "Home", key: "/", path: "/", element: <Home />, isVisible: true },
  {
    title: "Clientes",
    key: "/clients",
    path: "/clients",
    element: <Clients />,
    isVisible: true,
  },
  {
    title: "Mascotas",
    key: "/pets",
    path: "/pets",
    element: <Pets />,
    isVisible: true,
  },
  {
    title: "Medicamentos",
    key: "/medicaments",
    path: "/medicaments",
    element: <Medicaments />,
    isVisible: true,
  },
  {
    title: "notFound",
    key: "notFound",
    path: "*",
    element: <></>,
    isVisible: false,
  },
];
const AppLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const getRoutes = () => {
    return routes.map((menuItem) => (
      <Route
        key={menuItem.key}
        path={menuItem.path}
        element={menuItem.element}
      />
    ));
  };

  const menuItems = routes.map((route) => {
    if (route.isVisible) {
      return {
        key: route.key,
        label: route.title,
        onClick: () => (route.path ? navigate(route.path) : null),
      };
    }
  });

  const routesList = getRoutes();

  return (
    <Layout style={{ padding: "0px", margin: "0px" }}>
      <Header
        style={{
          justifyContent: "center",
          background: "#f5f5f5",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Menu
          style={{ background: "#f5f5f5" }}
          mode="horizontal"
          selectedKeys={[location.pathname]}
          items={menuItems}
        />
      </Header>
      <Content
        style={{
          padding: "50px 50px",
          background: "#fff",
        }}
      >
        <Suspense fallback={<></>}>
          <Routes>{routesList}</Routes>
        </Suspense>
      </Content>
    </Layout>
  );
};

export default AppLayout;