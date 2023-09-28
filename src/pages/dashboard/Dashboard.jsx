import React from "react";
import { Card, Col, Row } from "antd";
import {
  ContainerOutlined,
  BarChartOutlined,
  PieChartOutlined,
  LineChartOutlined,
} from "@ant-design/icons";
import GraphicsCard from "../../components/GraphicsCard";
import useDashboard from "./useDashboard";
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Doughnut, Pie, PolarArea } from "react-chartjs-2";

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const { data } = useDashboard();
  const pieData = {
    labels: ["Clientes", "Mascotas", "Consultas", "Medicamentos"],
    datasets: [
      {
        label: "Numero de registros",
        data: [
          data.clients.length,
          data.pets.length,
          data.consults.length,
          data.medicaments.length,
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <>
      <Card
        style={{
          margin: "0px 10px 40px 10px",
          fontSize: "24px",
        }}
      >
        Dashboard de Veterinary Pet Project
      </Card>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={12} lg={12} xl={6} xxl={6}>
          <GraphicsCard
            color={"dark"}
            icon={<ContainerOutlined />}
            title={"Numero de clientes"}
            data={data.clients.length}
          />
        </Col>
        <Col xs={24} sm={12} md={12} lg={12} xl={6} xxl={6}>
          <GraphicsCard
            color={"primary"}
            icon={<BarChartOutlined />}
            title={"Numero de mascotas"}
            data={data.pets.length}
          />
        </Col>
        <Col xs={24} sm={12} md={12} lg={12} xl={6} xxl={6}>
          <GraphicsCard
            color={"success"}
            icon={<PieChartOutlined />}
            title={"Numero de consultas"}
            data={data.consults.length}
          />
        </Col>
        <Col xs={24} sm={12} md={12} lg={12} xl={6} xxl={6}>
          <GraphicsCard
            color={"warning"}
            icon={<LineChartOutlined />}
            title={"Numero de medicamentos"}
            data={data.medicaments.length}
          />
        </Col>
        <Col span={8}>
          <Card style={{ position: "relative", width: "100%", height: "auto" }}>
            <Pie data={pieData} options={{ responsive: true }} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <PolarArea data={pieData} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Doughnut data={pieData} />
          </Card>
        </Col>
      </Row>
      <Card style={{ marginTop: "30px" }}>
        <h2>Examen parcial </h2>
        <p>
          PETS S.A. es un centro veterinario ubicado en la ciudad de Cartagena.
          Actualmente sus procesos de registros y control de información son muy
          manuales y se lleva a través de un archivo en MS Excel. Según
          solicitud del administrador, requiere que toda la información esté
          dentro de una aplicación web que le facilite mejor control de los
          datos y generación de informes a través de vistas o tablas. La
          información que suministra el centro está relacionada con: <br />
          Información de mascotas (Identificación, Nombre, Raza, Edad, Peso,
          medicamento, cliente) <br />
          Información de clientes (Cedula, Nombres, Apellidos, Dirección,
          Teléfono) <br />
          Información de medicamentos (Nombre, Descripción, dosis) <br />
          <br />
          Se requiere:
          <br /> Realizar el diagrama de clases. (5 puntos) <br /> Crear CRUD
          sobre la información referenciada anteriormente.(20 puntos)
          <br /> Desarrollar un reporte sobre medicamentos y clientes.(15
          puntos)
          <br /> Aprendizaje independiente. Puede ser una funcionalidad
          adicional (10 puntos).
        </p>

        <h2>Solución propuesta por Juan Sebastian Cano Grajales</h2>
        <a href="https://docs.google.com/document/d/1wCyV6R4FYL2Tgcs68unQOGDYmYDtj1lt2UQml7dKtlM/edit?usp=sharing">
          https://docs.google.com/document/d/1wCyV6R4FYL2Tgcs68unQOGDYmYDtj1lt2UQml7dKtlM/edit?usp=sharing
        </a>
      </Card>
    </>
  );
};

export default Dashboard;
