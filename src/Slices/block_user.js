import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import instance from '../../axios';

const initialState = {
    data: [],
    status: 'idle',
    error: null,
};
export const blockUser = createAsyncThunk(`api/users/block`, async(id)=>{
  const response = await instance.post(`api/users/block/${id}`)
  return response.data
}) 

;

const block_user = createSlice({
    name: 'block_user',
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
        .addCase(blockUser.pending, (state, action) => {
          state.status = 'loading'
        })
        .addCase(blockUser.fulfilled, (state, action) => {
          state.status = 'succeeded'
          // A fetched posts to the array;
          state.data = [];
          state.data = state.data.concat(action.payload)
        })
        .addCase(blockUser.rejected, (state, action) => {
          state.status = 'failed'
          state.error = action.error.message
          console.log(action.error.message)
        })
      }
  });

// export const { resetOneModel } = get_constats.actions;
export const reducer = block_user.reducer;
export default block_user;