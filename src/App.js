import logo from './logo.svg';
import './App.css';
import TableData from './components/Table';
import { Button } from '@material-ui/core';
import AddEmployee from './components/AddEmployee';
import { useState } from 'react';

function App() {
  const [open,setOpen]=useState(false)
  return (
    <div className="App">
    <TableData/>
    <div style={{paddingTop:'10px'}}>
    <Button onClick={()=>setOpen(prev=>!prev)}> Add Employees </Button>
    </div>
    {open &&<div>
      <AddEmployee />
    </div>}
    </div>
  );
}

export default App;
