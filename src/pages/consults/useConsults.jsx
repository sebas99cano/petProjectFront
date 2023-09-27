import axios from "axios";
import React, { useEffect, useState } from "react";
import { EditOutlined, InfoCircleTwoTone } from "@ant-design/icons";
import { baseUrl } from "../../helpers/Constants";
import { Space, Tag, Tooltip, message } from "antd";

const useConsults = () => {
  const [consultList, setConsultList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getConsultList();
  }, []);

  const getConsultList = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${baseUrl}/api/consult`);
      if (Array.isArray(response.data)) {
        setConsultList(response.data);
      }
    } catch (error) {
      message.error("ha ocurrido un error");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const consultColumns = [
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      elipsis: true,
    },
    {
      title: "Fecha",

      key: "date",
      elipsis: true,
      render: (consult) => (
        <span>{new Date(consult.date).toLocaleString()}</span>
      ),
    },
    {
      title: "pet",
      key: "pet",
      elipsis: true,
      render: (consult) => {
        return <span>{consult.pet.name}</span>;
      },
    },
    {
      title: "Acciones",
      key: "action",
      width: "10%",
      elipsis: false,
      render: (consult) => {
        return (
          <Space size="small">
            <Tooltip title={"Ver detalles"}>
              <Tag color={"blue"}>
                <InfoCircleTwoTone
                  onClick={() => {
                    console.log(consult);
                  }}
                />
              </Tag>
            </Tooltip>
            <Tooltip title={"Editar"}>
              <Tag color={"green"}>
                <EditOutlined
                  onClick={() => {
                    console.log(consult);
                  }}
                />
              </Tag>
            </Tooltip>
          </Space>
        );
      },
    },
  ];

  return { consultList, isLoading, consultColumns };
};

export default useConsults;
