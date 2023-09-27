import React from "react";
import useMedicaments from "./useMedicaments";
import DataTable from "../../components/DataTable";

const Medicaments = () => {
  const { medicamentList, isLoading, medicamentColumns } = useMedicaments();
  return (
    <DataTable
      loading={isLoading}
      dataSource={medicamentList}
      columns={medicamentColumns}
      id={"clientTable"}
      title={"Medicamentos registrados"}
      color={"success"}
    />
  );
};

export default Medicaments;
