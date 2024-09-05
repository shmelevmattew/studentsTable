import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import { useState } from 'react';
import { addStudent, getTableData } from '../../api/service/tableService';


export default function Form (props) {

    const initialValue = {
        groupName : "",
        studentName : "",
        studentSurname : "",
        studentCourse : 1,
        sessionDone : false
    }

    const [student,setStudent] = useState(initialValue)
    const [error,setError] = useState(false)

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
            setError(false)
            addStudent(student).then(()=>{
                setStudent(initialValue)
                getTableData().then(res=>{
                    props.setRows(res)
                })
            })
        }
    }

    return (
        <>
            <Card sx={{display:"flex", padding:2,alignItems:'center',mt:4,justifyContent:'space-between'}}>
                <TextField
                    id="input-with-icon-textfield"
                    label="Группа"
                    value={student.groupName}
                    onChange={(e)=>handleForm(e,"groupName")}
                />
                <TextField
                    id="input-with-icon-textfield"
                    label="Имя"
                    value={student.studentName}
                    onChange={(e)=>handleForm(e,"studentName")}
                />
                <TextField
                    id="input-with-icon-textfield"
                    label="Фамилия"
                    value={student.studentSurname}
                    onChange={(e)=>handleForm(e,"studentSurname")}
                />
                <FormControl sx={{ m: 1, minWidth: 80 }}>
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
                <FormControl sx={{ m: 1, minWidth: 80 }}>
                    <InputLabel id="demo-simple-select-autowidth-label">Сдал?</InputLabel>
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
                <Button onClick={handleClick} variant="contained" color="success">
                    Добавить
                </Button>
            </Card>
            <Collapse in={error}>
                <Alert severity="error" >Необходимо заполнить все поля</Alert>
            </Collapse>

        </>
    )
}