import React, { useEffect, useState } from "react";
import { Space, Tag, Tooltip } from "antd";
import { EditOutlined, InfoCircleTwoTone } from "@ant-design/icons";
import { baseUrl } from "../../helpers/Constants";
import axios from "axios";

const useMedicaments = () => {
  const [medicamentList, setMedicamentList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getMedicamentList();
  }, []);

  const getMedicamentList = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${baseUrl}/api/medicament`);
      if (Array.isArray(response.data)) {
        setMedicamentList(response.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const medicamentColumns = [
    {
      title: "Nombre",
      dataIndex: "name",
      key: "name",
      elipsis: true,
      sorter: (a, b) => a.name.localeCompare(b.name),
      showSorterTooltip: false,
    },
    {
      title: "Dosis",
      dataIndex: "dosis",
      key: "dosis",
      elipsis: true,
      sorter: (a, b) => a.name.localeCompare(b.name),
      showSorterTooltip: false,
    },
    {
      title: "Descripción",
      dataIndex: "description",
      key: "description",
      elipsis: true,
      sorter: (a, b) => a.name.localeCompare(b.name),
      showSorterTooltip: false,
    },
    {
      title: "Acciones",
      key: "action",
      width: "10%",
      elipsis: false,
      render: (client) => {
        return (
          <Space size="small">
            <Tooltip title={"Ver detalles"}>
              <Tag color={"blue"}>
                <InfoCircleTwoTone
                  onClick={() => {
                    console.log(client);
                  }}
                />
              </Tag>
            </Tooltip>
            <Tooltip title={"Editar"}>
              <Tag color={"green"}>
                <EditOutlined
                  onClick={() => {
                    console.log(client);
                  }}
                />
              </Tag>
            </Tooltip>
          </Space>
        );
      },
    },
  ];
  return { medicamentList, isLoading, medicamentColumns };
};

export default useMedicaments;
