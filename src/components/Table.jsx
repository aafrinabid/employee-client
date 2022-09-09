import React, { useState,useEffect} from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { employeeActions } from "../assets/store/employeeSlice";
import axios from "axios";

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
       name==='image'?<img src={row[name]} /> :row[name]
      )}
    </TableCell>
  );
};

function TableData() {
  const dispatch=useDispatch();

  const rows=useSelector(state=>state.employeeHandler.employees)
  const beforeEdit=useSelector(state=>state.employeeHandler.beforeEdit)
  console.log(beforeEdit)

  const classes = useStyles();
  useEffect(()=>{
    axios.post('http://localhost:4000/getEmployees').then(res=>{
      console.log(res.data)
      dispatch(employeeActions.setEmployees(res.data.result))
    })

  },[])

  const onToggleEditMode = id => {
dispatch(employeeActions.onToggleEditMode(id))



  };

  const onChange = (e, row) => {

    dispatch(employeeActions.onChange({e:e,row:row}))

  };

const onRevert=id=>{
  dispatch(employeeActions.onRevert(id))


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
            <TableCell align="left">Image</TableCell>

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
              <CustomTableCell {...{ row, name: "image", onChange }} />

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}


export default TableData