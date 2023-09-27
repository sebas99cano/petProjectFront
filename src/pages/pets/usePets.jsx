import React, { useEffect, useState } from "react";
import { Space, Tag, Tooltip, message } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { baseUrl } from "../../helpers/Constants";
import axios from "axios";

const usePets = () => {
  const [petList, setPetList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [petToEdit, setPetToEdit] = useState(null);

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
      message.error("ha ocurrido un error");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const closeModal = () => {
    setPetToEdit(null);
    setIsVisible(false);
  };

  const openModal = () => {
    setIsVisible(true);
  };

  const handleCreate = async (values, isEdit) => {
    try {
      if (isEdit) {
        const response = await axios.put(`${baseUrl}/api/pet/${petToEdit.id}`, {
          ...values,
        });
        if (response.status === 200) {
          message.success("Mascota editada correctamente");
        }
      } else {
        const response = await axios.post(`${baseUrl}/api/pet`, {
          ...values,
        });
        if (response.status === 201) {
          message.success("Mascota creado correctamente");
        }
      }
    } catch (error) {
      message.error("ha ocurrido un error");
      console.log(error);
    } finally {
      getPetList();
      setPetToEdit(null);
      setIsVisible(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${baseUrl}/api/pet/${id}`);
      if (response.status === 204) {
        message.success("Mascota eliminada correctamente");
      }
    } catch (error) {
      message.error("ha ocurrido un error");
      console.log(error);
    } finally {
      getPetList();
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
      title: "Dueño",

      key: "client",
      elipsis: true,
      render: (pet) => (
        <span>
          {pet.client.name} - {pet.client.dni}
        </span>
      ),
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
      title: "Peso (KG)",
      dataIndex: "weight",
      key: "weight",
    },
    {
      title: "Acciones",
      key: "action",
      width: "10%",
      elipsis: false,
      render: (pet) => {
        return (
          <Space size="small">
            <Tooltip title={"Editar"}>
              <Tag color={"green"}>
                <EditOutlined
                  onClick={() => {
                    setPetToEdit({ ...pet, clientId: pet.client.id });
                    setIsVisible(true);
                  }}
                />
              </Tag>
            </Tooltip>
            <Tooltip title={"Eliminar"}>
              <Tag color={"red"}>
                <DeleteOutlined
                  onClick={() => {
                    handleDelete(pet.id);
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
    petList,
    isLoading,
    petColumns,
    isVisible,
    closeModal,
    openModal,
    handleCreate,
    petToEdit,
  };
};

export default usePets;
