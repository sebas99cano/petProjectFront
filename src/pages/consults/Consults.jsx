import React from "react";
import useConsults from "./useConsults";
import DataTable from "../../components/DataTable";

const Consults = () => {
  const { consultList, isLoading, consultColumns } = useConsults();
  return (
    <DataTable
      loading={isLoading}
      dataSource={consultList}
      columns={consultColumns}
      id={"consultTable"}
      title={"Consultas registradas"}
      color={"success"}
    />
  );
};

export default Consults;
