import { Button, Form, Input, Modal } from "antd";
import TextArea from "antd/es/input/TextArea";
import React from "react";

const AddMedicament = ({
  isVisible,
  medicamentToEdit,
  handleCancel,
  handleCreate,
}) => {
  const initialValues = medicamentToEdit ? medicamentToEdit : null;
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
    descriptionRules: [
      {
        required: true,
        type: "string",
        min: 3,
        max: 300,
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
        title={"Agregar medicamento"}
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
            name={"description"}
            label="Descripción"
            rules={rules.descriptionRules}
            hasFeedback
          >
            <TextArea type={"text"} placeholder={"Descripción"} />
          </Form.Item>
          <Form.Item
            name={"dosis"}
            label="Dosis"
            rules={rules.descriptionRules}
            hasFeedback
          >
            <TextArea type={"text"} placeholder={"Dosis"} />
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

export default AddMedicament;
