import React from "react";
import useConsults from "./useConsults";
import DataTable from "../../components/DataTable";
import AddConsult from "./AddConsult";

const Consults = () => {
  const {
    consultList,
    isLoading,
    consultColumns,
    isVisible,
    closeModal,
    openModal,
    handleCreate,
    consultToEdit,
  } = useConsults();
  return (
    <>
      <DataTable
        loading={isLoading}
        dataSource={consultList}
        columns={consultColumns}
        id={"consultTable"}
        title={"Consultas registradas"}
        color={"success"}
        addButton={true}
        buttonText={"Agregar consulta"}
        onClick={openModal}
      />

      <AddConsult
        isVisible={isVisible}
        handleCancel={closeModal}
        handleCreate={handleCreate}
        consultToEdit={consultToEdit}
      />
    </>
  );
};

export default Consults;
