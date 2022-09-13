import logo from './logo.svg';
import './App.css';
import TableData from './components/Table';
import { Button, TablePagination } from '@material-ui/core';
import AddEmployee from './components/AddEmployee';
import { useState ,useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { employeeActions } from './assets/store/employeeSlice';
import axios from 'axios';
import Pagination from './components/Paginate';

function App() {
const dispatch=useDispatch()
const [isLoading,setIsLoading]=useState(false)
const [currentPage,setCurrentPage]=useState(1)
const [postsPerPage]=useState(5)
const rows=useSelector(state=>state.employeeHandler.employees)
const listChange=useSelector(state=>state.employeeHandler.listChange)
const addEmployeeState=useSelector(state=>state.employeeHandler.addEmployeeState)
const changeState=()=>{
  dispatch(employeeActions.changeAddEmployeeState())
}
useEffect(()=>{
  setIsLoading(true)
  axios.post('https://employeelistupdate.herokuapp.com/getEmployees').then(res=>{
    console.log(res.data)
    dispatch(employeeActions.setEmployees(res.data.result))
    setIsLoading(false)
  }).catch(e=>{
    setIsLoading(false)
  })

 


},[listChange])

const indexOfLastPost=currentPage* postsPerPage
const indexOfFirstPost=indexOfLastPost- postsPerPage
const currentPosts = rows.slice(indexOfFirstPost, indexOfLastPost);
const paginate = pageNumber => setCurrentPage(pageNumber);

return (
    <div className="App">
    {isLoading?
    <div>
      <h1>LOADING.....</h1>
      </div>:
      <div>
    <TableData rows={currentPosts}/>
    </div>}
    <div>
    <Pagination
        postsPerPage={postsPerPage}
        totalPosts={rows.length}
        paginate={paginate}
        currentPage={currentPage}
      />

    </div>
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
