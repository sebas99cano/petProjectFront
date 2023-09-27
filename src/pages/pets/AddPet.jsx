import axios from "axios";
import React, { useEffect, useState } from "react";
import { baseUrl } from "../../helpers/Constants";
import { Button, Form, Input, InputNumber, Modal, Select } from "antd";
const { Option } = Select;
const AddPet = ({ isVisible, petToEdit, handleCancel, handleCreate }) => {
  const [clientList, setClientList] = useState([]);
  const initialValues = petToEdit ? petToEdit : null;
  const rules = {
    nameRules: [
      {
        required: true,
        type: "string",
        min: 3,
        max: 30,
        message: "Ingrese un valor valido",
      },
    ],
  };

  useEffect(() => {
    getClientList();
  }, []);

  const getClientList = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/client`);
      if (Array.isArray(response.data)) {
        setClientList(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Modal
        closable={false}
        destroyOnClose={true}
        maskClosable={false}
        title={"Agregar mascota"}
        open={isVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          initialValues={initialValues}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 13 }}
          onFinish={(values) =>
            handleCreate(values, initialValues ? true : false)
          }
        >
          <hr style={{ margin: "20px" }} />
          <Form.Item
            name={"name"}
            label="Nombre"
            rules={rules.nameRules}
            hasFeedback
          >
            <Input type={"text"} placeholder={"Nombre"} />
          </Form.Item>
          <Form.Item
            name={"race"}
            label="Raza"
            rules={rules.nameRules}
            hasFeedback
          >
            <Input type={"text"} placeholder={"Raza"} />
          </Form.Item>
          <Form.Item
            name={"age"}
            label="Edad"
            rules={[
              {
                required: true,
                min: 1,
                type: "string",
                message: "Ingresa una edad valida",
              },
            ]}
            hasFeedback
          >
            <Input type={"text"} placeholder={"Edad"} />
          </Form.Item>
          <Form.Item
            name={"weight"}
            label="Peso (KG)"
            rules={[
              {
                required: true,
                message: "Ingresa un peso valido",
              },
            ]}
            hasFeedback
          >
            <InputNumber
              style={{ width: "100%" }}
              controls={false}
              min={0}
              max={999}
              placeholder={"Peso"}
            />
          </Form.Item>
          <Form.Item
            name="clientId"
            label="Dueño"
            hasFeedback
            rules={[{ required: true, message: "Selecciona un dueño" }]}
          >
            <Select
              placeholder="Selecciona un dueño"
              disabled={initialValues ? true : false}
            >
              {clientList.map((client) => (
                <Option key={client.id} value={client.id}>
                  {client.name} - {client.dni}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <hr style={{ margin: "20px" }} />
          <Form.Item
            wrapperCol={24}
            style={{ textAlign: "center", marginTop: "10px" }}
          >
            <Button
              type={"primary"}
              htmlType={"submit"}
              style={{ marginRight: "8px" }}
            >
              {initialValues ? "Editar" : "Agregar"}
            </Button>

            <Button type={"default"} onClick={handleCancel}>
              Cancelar
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddPet;
