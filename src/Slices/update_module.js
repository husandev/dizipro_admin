import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import instance from '../../axios';

const initialState = {
    data: [],
    status: 'idle',
    error: null,
};
export const updateModule = createAsyncThunk(`api/modules/`, async(obj)=>{
  const response = await instance.put(`api/modules/${obj.id}`,obj.body)
  return response.data
}) 

;

const update_module = createSlice({
    name: 'update_module',
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
        .addCase(updateModule.pending, (state, action) => {
          state.status = 'loading'
        })
        .addCase(updateModule.fulfilled, (state, action) => {
          state.status = 'succeeded'
          // A fetched posts to the array;
          state.data = [];
          state.data = state.data.concat(action.payload)
        })
        .addCase(updateModule.rejected, (state, action) => {
          state.status = 'failed'
          state.error = action.error.message
          console.log(action.error.message)
        })
      }
  });

// export const { resetOneModel } = get_constats.actions;
export const reducer = update_module.reducer;
export default update_module;