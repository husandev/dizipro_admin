import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import instance from '../../axios';

const initialState = {
    data: [],
    status: 'idle',
    error: null,
};
export const searchUser = createAsyncThunk(`api/users?keyword=''`, async(val)=>{
  const response = await instance.get(`api/users?keyword=${val}`,
 
  )
  return response.data
}) 

;

const search_user = createSlice({
    name: 'search_user',
    initialState,
    reducers: {
    //   resetOneModel() {
    //     return {
    //       ...initialState
    //     }
    //   },
    },
    extraReducers(builder) {
      builder
        .addCase(searchUser.pending, (state, action) => {
          state.status = 'loading'
        })
        .addCase(searchUser.fulfilled, (state, action) => {
          state.status = 'succeeded'
          // A fetched posts to the array;
          state.data = [];
          state.data = state.data.concat(action.payload)
        })
        .addCase(searchUser.rejected, (state, action) => {
          state.status = 'failed'
          state.error = action.error.message
          console.log(action.error.message)
        })
      }
  });

// export const { resetOneModel } = get_constats.actions;
export const reducer = search_user.reducer;
export const searchedUser = (state) => state?.search_user?.data[0]?.data
export default search_user;