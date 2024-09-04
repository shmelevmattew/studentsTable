import { Box, Typography } from "@mui/material";
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { getTableData, getTableDataByName } from "../../api/service/tableService";

export default function Header(props){

    function handleSearch(e){
        getTableDataByName(e.target.value).then(res=>{
            props.setRows(res)
        })
    }
    return (
        <Card sx={{width:"100%",height:60,display:"flex",alignItems:"center",padding:1,justifyContent:"space-between",mb:2}}>
            <Typography sx={{ml:2,fontSize:24}}>Таблица студентов</Typography>
            <TextField
                id="input-with-icon-textfield"
                label="Поиск по имени..."
                slotProps={{
                input: {
                    endAdornment: (
                    <InputAdornment position="end">

                    </InputAdornment>
                    ),
                },
                }}
                sx={{mr:5}}
                variant="filled"
                onChange={handleSearch}
            />
        </Card>
    )
}