import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import instance from '../../axios';

const initialState = {
    data: [],
    status: 'idle',
    error: null,
};
export const getCategories = createAsyncThunk(`api/categories/`, async()=>{
  const response = await instance.get(`api/categories`)
  return response.data
}) 

;

const get_categories = createSlice({
    name: 'get_categories',
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
        .addCase(getCategories.pending, (state, action) => {
          state.status = 'loading'
        })
        .addCase(getCategories.fulfilled, (state, action) => {
          state.status = 'succeeded'
          // A fetched posts to the array;
          state.data = [];
          state.data = state.data.concat(action.payload)
        })
        .addCase(getCategories.rejected, (state, action) => {
          state.status = 'failed'
          state.error = action.error.message
          console.log(action.error.message)
        })
      }
  });

// export const { resetOneModel } = get_constats.actions;
export const reducer = get_categories.reducer;
export const categories = (state) => state?.get_categories?.data[0]?.data
export default get_categories;