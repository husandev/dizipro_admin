import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import instance from '../../axios';

const initialState = {
    data: [],
    status: 'idle',
    error: null,
};
export const getModule = createAsyncThunk(`api/modules/988b012f-1db9-4f00-b2a7-531b9e965724`, async(id)=>{
  const response = await instance.get(`api/modules/${id}`)
  return response.data
}) 

;

const get_module = createSlice({
    name: 'get_module',
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
        .addCase(getModule.pending, (state, action) => {
          state.status = 'loading'
        })
        .addCase(getModule.fulfilled, (state, action) => {
          state.status = 'succeeded'
          // A fetched posts to the array;
          state.data = [];
          state.data = state.data.concat(action.payload)
        })
        .addCase(getModule.rejected, (state, action) => {
          state.status = 'failed'
          state.error = action.error.message
          console.log(action.error.message)
        })
      }
  });

// export const { resetOneModel } = get_constats.actions;
export const reducer = get_module.reducer;
// export const module = (state) => state?.get_module?.data[0]?.data
export default get_module;