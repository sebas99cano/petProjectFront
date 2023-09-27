import React from "react";
import useClients from "./useClients";
import DataTable from "../../components/DataTable";

const Clients = () => {
  const { clientList, isLoading, clientColumns } = useClients();
  return (
    <DataTable
      loading={isLoading}
      dataSource={clientList}
      columns={clientColumns}
      id={"clientTable"}
      title={"Clientes registrados"}
      color={"primary"}
    />
  );
};

export default Clients;
