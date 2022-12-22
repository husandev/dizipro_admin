import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import instance from '../../axios';

const initialState = {
    data: [],
    status: 'idle',
    error: null,
};
export const getModules = createAsyncThunk(`api/modules`, async()=>{
  const response = await instance.get(`api/modules`)
  return response.data
}) 

;

const get_modules = createSlice({
    name: 'get_modules',
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
        .addCase(getModules.pending, (state, action) => {
          state.status = 'loading'
        })
        .addCase(getModules.fulfilled, (state, action) => {
          state.status = 'succeeded'
          // A fetched posts to the array;
          state.data = [];
          state.data = state.data.concat(action.payload)
        })
        .addCase(getModules.rejected, (state, action) => {
          state.status = 'failed'
          state.error = action.error.message
          console.log(action.error.message)
        })
      }
  });

// export const { resetOneModel } = get_constats.actions;
export const reducer = get_modules.reducer;
export const modules = (state) => state?.get_modules?.data[0]?.data
export default get_modules;