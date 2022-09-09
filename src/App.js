import logo from './logo.svg';
import './App.css';
import TableData from './components/Table';
import { Button } from '@material-ui/core';
import AddEmployee from './components/AddEmployee';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { employeeActions } from './assets/store/employeeSlice';

function App() {
const dispatch=useDispatch()
const addEmployeeState=useSelector(state=>state.employeeHandler.addEmployeeState)
const changeState=()=>{
  dispatch(employeeActions.changeAddEmployeeState())
}
  return (
    <div className="App">
    <TableData/>
    <div style={{paddingTop:'10px'}}>
    <Button onClick={changeState}> Add Employees </Button>
    </div>
    {addEmployeeState&&<div>
      <AddEmployee />
    </div>}
    </div>
  );
}

export default App;
