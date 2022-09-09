import { SatelliteSharp } from "@material-ui/icons";
import { createSlice } from "@reduxjs/toolkit";

const producers=[ 
    {id:1,name:"Ravi",email:'ravi@gmail.com',mobile:9895433434,gender:'male',status:'active',isEditMode:false},
{id:2,name:"shabu",email:'Shabu@gmail.com',mobile:9895363434,gender:'male',status:'active',isEditMode:false},
{id:3,name:"safu",email:'Shaf@gmail.com',mobile:9895363444,gender:'male',status:'active',isEditMode:false},

]
const EmployeeSlice=createSlice({
    name:'employee',
    initialState:{
        beforeEdit:{},
        employees:[],
        addEmployeeState:false,
        newEmployee:{
            id:'',
            name:'',
            email:'',
            mobile:'',
            gender:'male',
            status:'active',
            image:''
            
        },
        listChange:false
    },
    reducers:{
        onToggleEditMode (state,action){
           state.employees=state.employees.map(row=>{
               if (row.id ===action.payload) {
                state.beforeEdit={...row}
              return { ...row, isEditMode: !row.isEditMode };
            }else{
              return { ...row, isEditMode: false };
    
            }
           })
          },
          onChange(state,action){
 
            const value = action.payload.e.target.value;
            const name = action.payload.e.target.name;
            const { id } = action.payload.row;
            const newRows = state.employees.map(row => {
              if (row.id === id) {
                return { ...row, [name]: value };
        
              }
              return row;
            });
            state.employees=newRows
          },
          onRevert(state,action){
            console.log(action)
            const personIndex=state.employees.findIndex(user=>user.id===action.payload)
            console.log(state.employees[personIndex])
            const updatedRows=state.employees
            updatedRows[personIndex]=state.beforeEdit
            state.employees=updatedRows
          },
          onChangeNewEmployee(state,action){
            const value = action.payload.value
            const name = action.payload.name;
            console.log(value)
                state.newEmployee={...state.newEmployee,[name]:value}

          },
          changeAddEmployeeState(state){
            state.addEmployeeState=!state.addEmployeeState
          },
          addEmployee(state){
            console.log('submitting')
            state.employees=[...state.employees,state.newEmployee]
            state.addEmployeeState=false
          },
          setEmployees(state,action){
            state.employees=[...action.payload]
          }

    }
})


export const employeeActions=EmployeeSlice.actions
export default EmployeeSlice.reducer
