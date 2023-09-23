import React, { useEffect, useState } from "react";
import { Space, Tag, Tooltip } from "antd";
import { EditOutlined, InfoCircleTwoTone } from "@ant-design/icons";
import { baseUrl } from "../../helpers/Constants";
import axios from "axios";

const useClients = () => {
  const [clientList, setClientList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getClientList();
  }, []);

  const getClientList = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${baseUrl}/api/client`);
      if (Array.isArray(response.data)) {
        setClientList(response.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const clientColumns = [
    {
      title: "Documento",
      dataIndex: "dni",
      key: "dni",
    },
    {
      title: "Nombre",
      dataIndex: "name",
      key: "name",
      elipsis: true,
      sorter: (a, b) => a.name.localeCompare(b.name),
      showSorterTooltip: false,
    },
    {
      title: "Teléfono",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Dirección",
      dataIndex: "direction",
      key: "direction",
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

  return { clientList, isLoading, clientColumns };
};

export default useClients;
