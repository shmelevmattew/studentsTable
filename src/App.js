import { useEffect, useState } from "react";
import supabase from "./api/client";
import { getTableData, getTableDataByName } from "./api/service/tableService";
import { Table } from "@mui/material";
import BasicTable from "./components/Table/Table";
import Header from "./components/Header/Header";

function App() {
  const [rows,setRows] = useState([])
  useEffect(()=>{
  },[])
  return (
    <div className="App">
      <Header setRows={setRows}/>
      <BasicTable rows={rows}></BasicTable> 
    </div>
  );
}

export default App;
