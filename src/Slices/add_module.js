import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import instance from '../../axios';

const initialState = {
    data: [],
    status: 'idle',
    error: null,
};
export const addModule = createAsyncThunk(`api/modules/`, async(obj)=>{
  const response = await instance.post(`api/modules/`,obj)
  return response.data
}) 

;

const add_module = createSlice({
    name: 'add_module',
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
        .addCase(addModule.pending, (state, action) => {
          state.status = 'loading'
        })
        .addCase(addModule.fulfilled, (state, action) => {
          state.status = 'succeeded'
          // A fetched posts to the array;
          state.data = [];
          state.data = state.data.concat(action.payload)
        })
        .addCase(addModule.rejected, (state, action) => {
          state.status = 'failed'
          state.error = action.error.message
          console.log(action.error.message)
        })
      }
  });

// export const { resetOneModel } = get_constats.actions;
export const reducer = add_module.reducer;
export const modulesResult = (state) => state?.add_module?.data[0]?.data
export default add_module;