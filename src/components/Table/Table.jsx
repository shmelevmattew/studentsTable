import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';

export default function BasicTable(props) {

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
          description: 'This column has a value getter and is not sortable.',
          width: 200,
        },
      ];
      

    const {rows} = props
    console.log(rows)
    const paginationModel = { page: 0, pageSize: 5 };
    return (
        <Paper sx={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{ pagination: { paginationModel } }}
                pageSizeOptions={[5, 10]}
                sx={{ border: 0 }}
            />
        </Paper>
    );
}