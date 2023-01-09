import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import instance from '../../axios';

const initialState = {
    data: [],
    status: 'idle',
    error: null,
};
export const deleteModule = createAsyncThunk(`api/modules/`, async(id)=>{
  const response = await instance.delete(`api/modules/${id}`)
  return response.data
}) 

;

const delete_module = createSlice({
    name: 'delete_module',
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
        .addCase(deleteModule.pending, (state, action) => {
          state.status = 'loading'
        })
        .addCase(deleteModule.fulfilled, (state, action) => {
          state.status = 'succeeded'
          // A fetched posts to the array;
          state.data = [];
          state.data = state.data.concat(action.payload)
        })
        .addCase(deleteModule.rejected, (state, action) => {
          state.status = 'failed'
          state.error = action.error.message
          console.log(action.error.message)
        })
      }
  });

// export const { resetOneModel } = get_constats.actions;
export const reducer = delete_module.reducer;
export default delete_module;