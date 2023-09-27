import React from "react";
import usePets from "./usePets";
import DataTable from "../../components/DataTable";
import AddPet from "./AddPet";

const Pets = () => {
  const {
    petList,
    isLoading,
    petColumns,
    isVisible,
    closeModal,
    openModal,
    handleCreate,
    petToEdit,
  } = usePets();
  return (
    <>
      <DataTable
        loading={isLoading}
        dataSource={petList}
        columns={petColumns}
        id={"clientTable"}
        title={"Mascotas registrados"}
        color={"alternative"}
        addButton={true}
        buttonText={"Agregar Mascota"}
        onClick={openModal}
      />

      <AddPet
        isVisible={isVisible}
        handleCancel={closeModal}
        handleCreate={handleCreate}
        petToEdit={petToEdit}
      />
    </>
  );
};

export default Pets;
