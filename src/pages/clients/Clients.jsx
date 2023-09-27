import React from "react";
import useClients from "./useClients";
import DataTable from "../../components/DataTable";
import AddClient from "./AddClient";

const Clients = () => {
  const {
    clientList,
    isLoading,
    clientColumns,
    isVisible,
    closeModal,
    openModal,
    handleCreate,
    clientToEdit,
  } = useClients();
  return (
    <>
      <DataTable
        loading={isLoading}
        dataSource={clientList}
        columns={clientColumns}
        id={"clientTable"}
        title={"Clientes registrados"}
        color={"primary"}
        addButton={true}
        buttonText={"Agregar cliente"}
        onClick={openModal}
      />

      <AddClient
        isVisible={isVisible}
        handleCancel={closeModal}
        handleCreate={handleCreate}
        clientToEdit={clientToEdit}
      />
    </>
  );
};

export default Clients;
