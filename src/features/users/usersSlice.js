import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const USER_URL='https://jsonplaceholder.typicode.com/users'

const initialState ={
  users:[],
  status:'idle',
  error:null,
}

export const fetchUsers = createAsyncThunk('users/fetchUsers',async ()=>{
  try{
    const response = await axios.get(USER_URL)
    return [...response.data]
  }catch(error){
    console.error(error)
    return error.message
  }
})


const usersSlice = createSlice({
  name:'users',
  initialState,
  //sync reducers
  reducers:{},
  //async reducers
  extraReducers(builder){
    builder.addCase(fetchUsers.pending,(state,action)=>{
      state.status='loading'
    }).addCase(fetchUsers.fulfilled,(state,action)=>{
      state.status='succeeded'
      state.users=action.payload
    }).addCase(fetchUsers.rejected,(state,action)=>{
      state.status='failed'
      state.error=action.error.message
    })
  }
})


export const selectAllUsers = state => state.users.users;
export const selectUserStatus = state => state.users.status;
export const selectUserError = state => state.users.error;
export const selectUserById = ( state , userId ) => state.users.find ( user => user.id === userId );

export default usersSlice.reducer;