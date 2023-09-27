import axios from "axios";
import React, { useEffect, useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { baseUrl } from "../../helpers/Constants";
import { Space, Tag, Tooltip, message } from "antd";

const useConsults = () => {
  const [consultList, setConsultList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [consultToEdit, setConsultToEdit] = useState(null);

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

  const closeModal = () => {
    setConsultToEdit(null);
    setIsVisible(false);
  };

  const openModal = () => {
    setIsVisible(true);
  };

  const handleCreate = async (values, isEdit) => {
    try {
      if (isEdit) {
        const response = await axios.put(
          `${baseUrl}/api/consult/${consultToEdit.id}`,
          {
            ...values,
          }
        );
        if (response.status === 200) {
          message.success("Consulta editada correctamente");
        }
      } else {
        const response = await axios.post(`${baseUrl}/api/consult`, {
          ...values,
        });
        if (response.status === 201) {
          message.success("Consulta creada correctamente");
        }
      }
    } catch (error) {
      message.error("ha ocurrido un error");
      console.log(error);
    } finally {
      getConsultList();
      setConsultToEdit(null);
      setIsVisible(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${baseUrl}/api/consult/${id}`);
      if (response.status === 204) {
        message.success("Consulta eliminada correctamente");
      }
    } catch (error) {
      message.error("ha ocurrido un error");
      console.log(error);
    } finally {
      getConsultList();
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
      title: "Mascota",
      key: "pet",
      elipsis: true,
      render: (consult) => {
        return <span>{consult.pet.name}</span>;
      },
    },
    {
      title: "Medicamentos",
      key: "medicaments",
      render: (consult) =>
        consult.medicaments.map((medicament) => (
          <span key={medicament.id}>
            {medicament.name} <br />
          </span>
        )),
    },
    {
      title: "Acciones",
      key: "action",
      width: "10%",
      elipsis: false,
      render: (consult) => {
        return (
          <Space size="small">
            <Tooltip title={"Editar"}>
              <Tag color={"green"}>
                <EditOutlined
                  onClick={() => {
                    setConsultToEdit({
                      ...consult,
                      petId: consult.pet.id,
                      medicamentsId: consult.medicaments.map(
                        (medicament) => medicament.id
                      ),
                    });
                    setIsVisible(true);
                  }}
                />
              </Tag>
            </Tooltip>
            <Tooltip title={"Eliminar"}>
              <Tag color={"red"}>
                <DeleteOutlined
                  onClick={() => {
                    handleDelete(consult.id);
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
    consultList,
    isLoading,
    consultColumns,
    isVisible,
    closeModal,
    openModal,
    handleCreate,
    consultToEdit,
  };
};

export default useConsults;
