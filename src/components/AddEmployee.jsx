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
import { useDispatch, useSelector } from "react-redux";
import { employeeActions } from "../assets/store/employeeSlice";

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


const CustomTableCell = ({ isEditMode, name, onChange ,value}) => {
  const [gender, setGender] = React.useState(value);
  const [status,setStatus] = React.useState(value);


  const handleChange = (event) => {
    name==='gender'?setGender(event.target.value):setStatus(event.target.value);
    console.log(event.target.name)
    onChange(event)
    
  };
  const classes = useStyles();
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
          value={value}
          name={name}
          onChange={e => onChange(e)}
          className={classes.input}
        />
      ) : (
        // row[name]
        value
      )}
    </TableCell>
  );
};

function AddEmployee() {
  const dispatch=useDispatch();
  const newEmployeeData=useSelector(state=>state.employeeHandler.newEmployee)

  const classes = useStyles();

  const onChange = (e, row) => {

    dispatch(employeeActions.onChangeNewEmployee({e:e}))

  };

  




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
          {/* {rows.map(row => ( */}
            <TableRow >
              <TableCell className={classes.selectTableCell}>
               
              </TableCell>
              <CustomTableCell {...{ isEditMode:true, name: "name", onChange, value:newEmployeeData['name']}} />
              <CustomTableCell {...{ isEditMode:true, name: "email", onChange, value:newEmployeeData['email']}} />
              <CustomTableCell {...{ isEditMode:true, name: "mobile", onChange, value:newEmployeeData['mobile']}} />
              <CustomTableCell {...{ isEditMode:true, name: "gender", onChange, value:newEmployeeData['gender']}} />
              <CustomTableCell {...{ isEditMode:true, name: "status", onChange, value:newEmployeeData['status']}} />
            </TableRow>
          {/* ))} */}
        </TableBody>
      </Table>
    </Paper>
  );
}


export default AddEmployee