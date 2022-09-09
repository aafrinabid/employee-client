import { SatelliteSharp } from "@material-ui/icons";
import { createSlice } from "@reduxjs/toolkit";


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
               if (row._id ===action.payload) {
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
            const { _id } = action.payload.row;
            const newRows = state.employees.map(row => {
              if (row._id === _id) {
                return { ...row, [name]: value };
        
              }
              return row;
            });
            state.employees=newRows
          },
          onRevert(state,action){
            console.log(action)
            const personIndex=state.employees.findIndex(user=>user._id===action.payload)
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
            state.addEmployeeState=false
            const   employee={
                id:'',
                name:'',
                email:'',
                mobile:'',
                gender:'male',
                status:'active',
                image:''
                
            }
            state.newEmployee=employee
            
          },
          setEmployees(state,action){
            state.employees=[...action.payload]
          },
          listChanger(state){
            state.listChange=!state.listChange
          },
          deleteEmployee(state,action){
            const updatedList=state.employees.filter(user=>user._id!==action.payload)
            state.employees=[...updatedList]
          }

    }
})


export const employeeActions=EmployeeSlice.actions
export default EmployeeSlice.reducer
