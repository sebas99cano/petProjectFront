import React, { useEffect, useState } from "react";
import { Space, Tag, Tooltip, message } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { baseUrl } from "../../helpers/Constants";
import axios from "axios";

const useMedicaments = () => {
  const [medicamentList, setMedicamentList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [medicamentToEdit, setMedicamentToEdit] = useState(null);

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

  const closeModal = () => {
    setMedicamentToEdit(null);
    setIsVisible(false);
  };

  const openModal = () => {
    setIsVisible(true);
  };

  const handleCreate = async (values, isEdit) => {
    try {
      if (isEdit) {
        const response = await axios.put(
          `${baseUrl}/api/medicament/${medicamentToEdit.id}`,
          {
            ...values,
          }
        );
        if (response.status === 200) {
          message.success("Medicamento editado correctamente");
        }
      } else {
        const response = await axios.post(`${baseUrl}/api/medicament`, {
          ...values,
        });
        if (response.status === 201) {
          message.success("Medicamento creado correctamente");
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      getMedicamentList();
      setMedicamentToEdit(null);
      setIsVisible(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${baseUrl}/api/medicament/${id}`);
      if (response.status === 204) {
        message.success("Medicamento eliminado correctamente");
      }
    } catch (error) {
      console.log(error);
    } finally {
      getMedicamentList();
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
      render: (medicament) => {
        return (
          <Space size="small">
            <Tooltip title={"Editar"}>
              <Tag color={"green"}>
                <EditOutlined
                  onClick={() => {
                    setMedicamentToEdit(medicament);
                    setIsVisible(true);
                  }}
                />
              </Tag>
            </Tooltip>
            <Tooltip title={"Eliminar"}>
              <Tag color={"red"}>
                <DeleteOutlined
                  onClick={() => {
                    handleDelete(medicament.id);
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
    medicamentList,
    isLoading,
    medicamentColumns,
    isVisible,
    closeModal,
    openModal,
    handleCreate,
    medicamentToEdit,
  };
};

export default useMedicaments;
