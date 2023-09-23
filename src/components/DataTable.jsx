import { Card, Table } from "antd";
import React from "react";

const DataTable = ({
  loading,
  dataSource,
  columns,
  title,
  id,
  color,
  rowKey,
}) => {
  return (
    <>
      <Card className={`cardTitle ${color ? color : "dark"}`}>
        {title ? title : ""}
      </Card>
      <Table
        id={id ? id : ""}
        className={"dataTable"}
        loading={loading ? loading : false}
        dataSource={dataSource}
        columns={columns}
        rowKey={(element) => element[rowKey ? rowKey : "id"]}
        bordered
        pagination={{
          defaultPageSize: 10,
          total: dataSource?.length ? dataSource.length : 0,
          showSizeChanger: true,
          pageSizeOptions: [5, 10, 15, 50],
        }}
        scroll={{
          x: true,
        }}
      />
    </>
  );
};
export default DataTable;
