import React from "react";
import usePets from "./usePets";
import DataTable from "../../components/DataTable";

const Pets = () => {
  const { petList, isLoading, petColumns } = usePets();
  return (
    <DataTable
      loading={isLoading}
      dataSource={petList}
      columns={petColumns}
      id={"clientTable"}
      title={"Mascotas registrados"}
      color={"alternative"}
    />
  );
};

export default Pets;
