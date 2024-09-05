import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import { deleteStudent, getTableData, updateStudent } from '../../api/service/tableService';

export default function BasicTable(props) {
    const paginationModel = { page: 0, pageSize: 5 };

    const columns = [
      { field: 'id', headerName: 'ID', width: 70 },
      { field: 'groupName', headerName: 'Группа', width: 130 },
      { field: 'studentName', headerName: 'Имя', width: 130 },
      { field: 'studentSurname', headerName: 'Фамилия', width: 130 },

      {
        field: 'studentCourse',
        headerName: 'Курс',
        type: 'number',
        width: 180,
      },
      {
        field: 'sessionDone',
        headerName: 'Сдана ли сессия',
        width: 200,
      },
    ];

    const initialUser = {
      groupName : "",
      studentName : "",
      studentSurname : "",
      studentCourse : 1,
      sessionDone : false
    }
    
    const [open,setOpen] = useState(false)


    const [selectedStudent,setSelectedStudent] = useState(initialUser)

    const {rows} = props
    
    function handleRow(e){
      console.log(e)
      setSelectedStudent(e.row)
      setOpen(true)
    }

    return (
        <>
          <Paper sx={{ height: 400, width: '100%' }}>
              <DataGrid
                  rows={rows}
                  columns={columns}
                  initialState={{ pagination: { paginationModel } }}
                  pageSizeOptions={[5, 10]}
                  sx={{ border: 0 }}
                  onRowClick={(e)=>handleRow(e)}
              />
          </Paper>
          <TableModal open={open} setOpen={setOpen} student={selectedStudent} setStudent={setSelectedStudent} setRows={props.setRows}/>
        </>
    );
}


function TableModal (props){

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius:5,
    boxShadow: 24,
    p: 4,
  };

  const {open,setOpen,student,setStudent,setRows} = props

  const [error,setError] = useState()

  function handleForm(e,target){
    setStudent(prev=>{
        return {
            ...prev,
            [target]: e.target.value
        }
  })
  } 

  function handleClick(){
    let flag = false
    for(let value in student){
        if (student[value] === ""){
            flag = true
        }
    }
    if (flag){
        setError(true)
        return ""
    }else{
        updateStudent(student).then(()=>{
          setOpen(false)
          getTableData().then(res=>{
            setRows(res)
          })
        })
    }
  }

  function handleClickDelete(){
    if(student.id){
      deleteStudent(student.id).then(()=>{
        setOpen(false)
        getTableData().then(res=>{
          setRows(res)
        })
      })
    }
  }

  return (

    <Modal
      open={open}
      onClose={()=>{setOpen(false);setError(false)}}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Редактирование пользователя
        </Typography>
        <Box sx={{display:"flex", padding:2,alignItems:'center',mt:4,justifyContent:'space-between',flexDirection:"column"}}>
                <TextField
                    id="input-with-icon-textfield"
                    label="Группа"
                    sx={{ m: 2, width:"100%" }}
                    value={student.groupName}
                    onChange={(e)=>handleForm(e,"groupName")}
                />
                <TextField
                    id="input-with-icon-textfield"
                    label="Имя"
                    sx={{ m: 2, width:"100%" }}
                    value={student.studentName}
                    onChange={(e)=>handleForm(e,"studentName")}
                />
                <TextField
                    id="input-with-icon-textfield"
                    label="Фамилия"
                    sx={{ m: 2, width:"100%" }}
                    value={student.studentSurname}
                    onChange={(e)=>handleForm(e,"studentSurname")}
                />
                <FormControl sx={{ m: 2, width:"100%" }}>
                    <InputLabel id="demo-simple-select-autowidth-label">Курс</InputLabel>
                    <Select
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    value={student.studentCourse}
                    autoWidth
                    label="Курс"
                    onChange={(e)=>handleForm(e,"studentCourse")}
                    >
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                    </Select>
                </FormControl>
                <FormControl sx={{ m: 2, width:"100%" }}>
                    <InputLabel id="demo-simple-select-autowidth-label">Сдал сессию ?</InputLabel>
                    <Select
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    autoWidth
                    label="Сдана ли сессия"
                    value={student.sessionDone}
                    onChange={(e)=>handleForm(e,"sessionDone")}
                    >
                    <MenuItem value={true}>Да</MenuItem>
                    <MenuItem value={false}>Нет</MenuItem>
                    </Select>
                </FormControl>
                <Button onClick={handleClick} variant="contained" color="success" sx={{width:"100%", height:40}}>
                    Сохарнить
                </Button>
                <Button onClick={handleClickDelete} variant="contained" color="error" sx={{width:"100%", height:40 ,mt:2}}>
                    Удалить пользователя
                </Button>
            </Box>
            <Collapse in={error}>
                <Alert severity="error" >Необходимо заполнить все поля</Alert>
            </Collapse>
      </Box>
    </Modal>
  )
}