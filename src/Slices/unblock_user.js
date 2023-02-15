import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import instance from '../../axios';

const initialState = {
    data: [],
    status: 'idle',
    error: null,
};
export const unBlockUser = createAsyncThunk(`api/users/unblock`, async(id)=>{
  const response = await instance.post(`api/users/unblock/${id}`)
  return response.data
}) 

;

const unblock_user = createSlice({
    name: 'unblock_user',
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
        .addCase(unBlockUser.pending, (state, action) => {
          state.status = 'loading'
        })
        .addCase(unBlockUser.fulfilled, (state, action) => {
          state.status = 'succeeded'
          // A fetched posts to the array;
          state.data = [];
          state.data = state.data.concat(action.payload)
        })
        .addCase(unBlockUser.rejected, (state, action) => {
          state.status = 'failed'
          state.error = action.error.message
          console.log(action.error.message)
        })
      }
  });

// export const { resetOneModel } = get_constats.actions;
export const reducer = unblock_user.reducer;
export default unblock_user;