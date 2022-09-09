import { createSlice } from "@reduxjs/toolkit";

const producers=[ 
    {id:1,name:"Ravi",email:'ravi@gmail.com',mobile:9895433434,gender:'male',status:'active',isEditMode:false},
{id:2,name:"shabu",mail:'Shabu@gmail.com',mobile:9895363434,gender:'male',status:'active',isEditMode:false},
{id:3,name:"safu",mail:'Shaf@gmail.com',mobile:9895363444,gender:'male',status:'active',isEditMode:false},

]
const EmployeeSlice=createSlice({
    name:'employee',
    initialState:{
        beforeEdit:{},
        employees:producers
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
            const personIndex=state.employees.findIndex(user=>user.id===action.payload)
            const updatedRows=state.employees
            updatedRows[personIndex]=state.beforeEdit
            state.employees=updatedRows
          
          }

    }
})


export const employeeActions=EmployeeSlice.actions
export default EmployeeSlice.reducer
