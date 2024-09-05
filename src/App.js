import { useEffect, useState } from "react";
import BasicTable from "./components/Table/Table";
import Header from "./components/Header/Header";
import Form from "./components/Form/Form";

import {getTableData} from "./api/service/tableService";

function App() {
  const [rows,setRows] = useState([])
  useEffect(()=>{
      getTableData().then(res=>setRows(res))
  },[])
  return (
    <div className="App">
      <Header setRows={setRows}/>
      <BasicTable rows={rows}></BasicTable>
      <Form setRows={setRows}/>
    </div>
  );
}

export default App;
