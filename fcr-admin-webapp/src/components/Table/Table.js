import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./Table.scss";
const Table = ({ columns, data }) => {
  return (
    <div style={{ height: 500, width: "100%" }} className="table">
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={7}
        rowsPerPageOptions={[10]}
        // checkboxSelection
      />
    </div>
  );
};

export default Table;
