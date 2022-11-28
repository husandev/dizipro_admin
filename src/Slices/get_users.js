import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import instance from '../../axios';

const initialState = {
    data: [],
    status: 'idle',
    error: null,
};
export const getUsers = createAsyncThunk('api/users', async()=>{
  const response = await instance.get(`api/users`)
  return response.data
}) 

;

const get_users = createSlice({
    name: 'get_users',
    initialState,
    reducers: {
        getUsers(state, action) {
        const { faqs } = action.payload;
        state.faqs = faqs;
      },
    //   resetOneModel() {
    //     return {
    //       ...initialState
    //     }
    //   },
    },
    extraReducers(builder) {
      builder
        .addCase(getUsers.pending, (state, action) => {
          state.status = 'loading'
        })
        .addCase(getUsers.fulfilled, (state, action) => {
          state.status = 'succeeded'
          // A fetched posts to the array;
          state.data = [];
          state.data = state.data.concat(action.payload)
        })
        .addCase(getUsers.rejected, (state, action) => {
          state.status = 'failed'
          state.error = action.error.message
          console.log(action.error.message)
        })
      }
  });

// export const { resetOneModel } = get_constats.actions;
export const reducer = get_users.reducer;
export const users = (state) => state?.get_users?.data[0]
export default get_users;