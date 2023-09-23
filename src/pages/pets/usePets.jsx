import React, { useEffect, useState } from "react";
import { Space, Tag, Tooltip } from "antd";
import { EditOutlined, InfoCircleTwoTone } from "@ant-design/icons";
import { baseUrl } from "../../helpers/Constants";
import axios from "axios";

const usePets = () => {
  const [petList, setPetList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getPetList();
  }, []);

  const getPetList = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${baseUrl}/api/pet`);
      if (Array.isArray(response.data)) {
        setPetList(response.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const petColumns = [
    {
      title: "Nombre",
      dataIndex: "name",
      key: "name",
      elipsis: true,
      sorter: (a, b) => a.name.localeCompare(b.name),
      showSorterTooltip: false,
    },
    {
      title: "Raza",
      dataIndex: "race",
      key: "race",
      elipsis: true,
      sorter: (a, b) => a.name.localeCompare(b.name),
      showSorterTooltip: false,
    },
    {
      title: "Edad",
      dataIndex: "age",
      key: "age",
      elipsis: true,
      sorter: (a, b) => a.name.localeCompare(b.name),
      showSorterTooltip: false,
    },
    {
      title: "Peso",
      dataIndex: "weight",
      key: "weight",
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

  return { petList, isLoading, petColumns };
};

export default usePets;
