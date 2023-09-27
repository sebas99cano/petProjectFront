import React, { useEffect, useState } from "react";
import { Space, Tag, Tooltip, message } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { baseUrl } from "../../helpers/Constants";
import axios from "axios";

const useClients = () => {
  const [clientList, setClientList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [clientToEdit, setClientToEdit] = useState(null);

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

  const closeModal = () => {
    setClientToEdit(null);
    setIsVisible(false);
  };

  const openModal = () => {
    setIsVisible(true);
  };

  const handleCreate = async (values, isEdit) => {
    try {
      if (isEdit) {
        const response = await axios.put(
          `${baseUrl}/api/client/${clientToEdit.id}`,
          {
            ...values,
          }
        );
        if (response.status === 200) {
          message.success("Cliente editado correctamente");
        }
      } else {
        const response = await axios.post(`${baseUrl}/api/client`, {
          ...values,
        });
        if (response.status === 201) {
          message.success("Cliente creado correctamente");
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      getClientList();
      setClientToEdit(null);
      setIsVisible(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${baseUrl}/api/client/${id}`);
      if (response.status === 204) {
        message.success("Cliente eliminado correctamente");
      }
    } catch (error) {
      console.log(error);
    } finally {
      getClientList();
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
      title: "Apellido",
      dataIndex: "lastName",
      key: "lastName",
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
            <Tooltip title={"Editar"}>
              <Tag color={"green"}>
                <EditOutlined
                  onClick={() => {
                    setClientToEdit(client);
                    setIsVisible(true);
                  }}
                />
              </Tag>
            </Tooltip>
            <Tooltip title={"Eliminar"}>
              <Tag color={"red"}>
                <DeleteOutlined
                  onClick={() => {
                    handleDelete(client.id);
                  }}
                />
              </Tag>
            </Tooltip>
          </Space>
        );
      },
    },
  ];

  return {
    clientList,
    isLoading,
    clientColumns,
    isVisible,
    closeModal,
    openModal,
    handleCreate,
    clientToEdit,
  };
};

export default useClients;
