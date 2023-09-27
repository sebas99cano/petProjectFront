import React from "react";
import useMedicaments from "./useMedicaments";
import DataTable from "../../components/DataTable";
import AddMedicament from "./AddMedicament";

const Medicaments = () => {
  const {
    medicamentList,
    isLoading,
    medicamentColumns,
    isVisible,
    closeModal,
    openModal,
    handleCreate,
    medicamentToEdit,
  } = useMedicaments();
  return (
    <>
      <DataTable
        loading={isLoading}
        dataSource={medicamentList}
        columns={medicamentColumns}
        id={"medicamentTable"}
        title={"Medicamentos registrados"}
        color={"success"}
        addButton={true}
        buttonText={"Agregar medicamento"}
        onClick={openModal}
      />
      <AddMedicament
        isVisible={isVisible}
        handleCancel={closeModal}
        handleCreate={handleCreate}
        medicamentToEdit={medicamentToEdit}
      />
    </>
  );
};

export default Medicaments;
