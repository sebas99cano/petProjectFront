import axios from "axios";
import React, { useEffect, useState } from "react";
import { baseUrl } from "../../helpers/Constants";
import { Button, DatePicker, Form, Modal, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import moment from "moment/moment";
const { Option } = Select;
const AddConsult = ({
  isVisible,
  consultToEdit,
  handleCancel,
  handleCreate,
}) => {
  const [petList, setPetList] = useState([]);
  const [medicamentList, setMedicamentList] = useState([]);
  const initialValues = consultToEdit ? consultToEdit : null;
  const fechaMoment = initialValues ? moment(initialValues.date) : null;
  const rules = {
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

  useEffect(() => {
    getPetList();
    getMedicamentList();
  }, []);

  const getPetList = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/pet`);
      if (Array.isArray(response.data)) {
        setPetList(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getMedicamentList = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/medicament`);
      if (Array.isArray(response.data)) {
        setMedicamentList(response.data);
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
        title={"Agregar consulta"}
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
          {initialValues && (
            <Form.Item label="Fecha">
              <DatePicker
                disabled
                value={fechaMoment}
                style={{
                  width: "100%",
                }}
              />
            </Form.Item>
          )}
          <Form.Item
            name={"description"}
            label="Descripción"
            rules={rules.descriptionRules}
            hasFeedback
          >
            <TextArea type={"text"} placeholder={"Descripción"} />
          </Form.Item>
          <Form.Item
            name="petId"
            label="Mascota"
            hasFeedback
            rules={[{ required: true, message: "Selecciona una mascota" }]}
          >
            <Select placeholder="Selecciona un dueño">
              {petList.map((pet) => (
                <Option key={pet.id} value={pet.id}>
                  {pet.name} - {pet.race} - {pet.age}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="medicamentsId" label="Medicamentos">
            <Select mode="multiple" placeholder="Selecciona los medicamentos">
              {medicamentList.map((medicament) => (
                <Option key={medicament.id} value={medicament.id}>
                  {medicament.name}
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

export default AddConsult;
