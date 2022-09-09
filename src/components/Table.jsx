import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Input from "@material-ui/core/Input";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/EditOutlined";
import DoneIcon from "@material-ui/icons/DoneAllTwoTone";
import RevertIcon from "@material-ui/icons/NotInterestedOutlined";
import { Select } from "@material-ui/core";
import {MenuItem} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3),
    overflowX: "auto"
  },
  table: {
    minWidth: 650
  },
  selectTableCell: {
    width: 60
  },
  tableCell: {
    width: 130,
    height: 40
  },
  input: {
    width: 130,
    height: 40
  }
}));

const createData = (id,name,email,mobile,gender,status) => ({
  id,
  name,
  email,
  mobile,
  gender,
  status,
  isEditMode: false
});

const CustomTableCell = ({ row, name, onChange }) => {
  const [gender, setGender] = React.useState(row[name]);
  const [status,setStatus] = React.useState(row[name]);


  const handleChange = (event) => {
    name==='gender'?setGender(event.target.value):setStatus(event.target.value);
    console.log(event.target.name)
    onChange(event,row)
    
  };
  const classes = useStyles();
  const { isEditMode } = row;
  return (
    <TableCell align="left" className={classes.tableCell}>
      {isEditMode ? (
        name==='gender' || name==='status'? <Select
        name={name}
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={name==='gender'?gender:status}
        label="Age"
        onChange={handleChange}
      >
        <MenuItem  value={name==='gender'?'male':'active'}>{name==='gender'?'male':'active'}</MenuItem>
        <MenuItem value={name==='gender'?'female':'inactive'}>{name==='gender'?'female':'inactive'}</MenuItem>
      {name==='gender' && <MenuItem value={'others'}>Others</MenuItem>
}
      </Select>:
        <Input
          value={row[name]}
          name={name}
          onChange={e => onChange(e, row)}
          className={classes.input}
        />
      ) : (
        row[name]
      )}
    </TableCell>
  );
};

function TableData() {
  const [rows, setRows] = React.useState([
    createData(1,"Ravi",'ravi@gmail.com',9895433434,'male','active'),
    createData(2,"shabu",'Shabu@gmail.com',9895363434,'male','active'),
    createData(3,"Jafar",'jafar@gmail.com',9895783434,'male','active'),

  ]);
  const [beforeEdit,setBeforeEdit]=useState('')
  const [previous, setPrevious] = React.useState({});
  console.log(beforeEdit)
  const classes = useStyles();

  const onToggleEditMode = id => {
    setRows(state => {
      return rows.map(row => {
        if (row.id === id) {
          setBeforeEdit({...row})
          return { ...row, isEditMode: !row.isEditMode };
        }else{
          return { ...row, isEditMode: false };

        }
      });
    });
  };

  const onChange = (e, row) => {
 
    const value = e.target.value;
    const name = e.target.name;
    const { id } = row;
    const newRows = rows.map(row => {
      if (row.id === id) {
        return { ...row, [name]: value };

      }
      return row;
    });
    setRows(newRows);
  };

const onRevert=id=>{
  const personIndex=rows.findIndex(user=>user.id===id)
  const updatedRows=rows
  updatedRows[personIndex]=beforeEdit
  setRows([...updatedRows])

}





  return (
    <Paper className={classes.root}>
      <Table className={classes.table} aria-label="caption table">
        <TableHead>
          <TableRow>
            <TableCell align="left" />
            <TableCell align="left">Name</TableCell>
            <TableCell align="left">Email</TableCell>
            <TableCell align="left">Mobile</TableCell>
            <TableCell align="left">Gender</TableCell>
            <TableCell align="left">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.id}>
              <TableCell className={classes.selectTableCell}>
                {row.isEditMode ? (
                  <>
                    <IconButton
                      aria-label="done"
                      onClick={() => onToggleEditMode(row.id)}
                    >
                      <DoneIcon />
                    </IconButton>
                    <IconButton
                      aria-label="revert"
                      onClick={() => onRevert(row.id)}
                    >
                      <RevertIcon />
                    </IconButton>
                  </>
                ) : (
                  <IconButton
                    aria-label="delete"
                    onClick={() => onToggleEditMode(row.id)}
                  >
                    <EditIcon />
                  </IconButton>
                )}
              </TableCell>
              <CustomTableCell {...{ row, name: "name", onChange }} />
              <CustomTableCell {...{ row, name: "email", onChange }} />
              <CustomTableCell {...{ row, name: "mobile", onChange }} />
              <CustomTableCell {...{ row, name: "gender", onChange }} />
              <CustomTableCell {...{ row, name: "status", onChange }} />
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}


export default TableData