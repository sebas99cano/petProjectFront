import { Button, Form, Input, Modal } from "antd";
import React from "react";

const AddClient = ({ isVisible, clientToEdit, handleCancel, handleCreate }) => {
  const initialValues = clientToEdit ? clientToEdit : null;
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
  return (
    <>
      <Modal
        closable={false}
        destroyOnClose={true}
        maskClosable={false}
        title={"Agregar cliente"}
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
            name={"dni"}
            label="DNI"
            rules={rules.nameRules}
            hasFeedback
          >
            <Input type={"text"} placeholder={"DNI"} />
          </Form.Item>
          <Form.Item
            name={"name"}
            label="Nombre"
            rules={rules.nameRules}
            hasFeedback
          >
            <Input type={"text"} placeholder={"Nombre"} />
          </Form.Item>
          <Form.Item
            name={"lastName"}
            label="Apellido"
            rules={rules.nameRules}
            hasFeedback
          >
            <Input type={"text"} placeholder={"Apellido"} />
          </Form.Item>
          <Form.Item
            name={"phone"}
            label="Teléfono"
            rules={rules.nameRules}
            hasFeedback
          >
            <Input type={"text"} placeholder={"Teléfono"} />
          </Form.Item>
          <Form.Item
            name={"direction"}
            label="Dirección"
            rules={rules.nameRules}
            hasFeedback
          >
            <Input type={"text"} placeholder={"Dirección"} />
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

export default AddClient;
