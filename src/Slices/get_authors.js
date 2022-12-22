import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import instance from '../../axios';

const initialState = {
    data: [],
    status: 'idle',
    error: null,
};
export const getAuthors = createAsyncThunk(`api/users/authors/`, async()=>{
  const response = await instance.get(`api/users/authors`)
  return response.data
}) 

;

const get_authors = createSlice({
    name: 'get_authors',
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
        .addCase(getAuthors.pending, (state, action) => {
          state.status = 'loading'
        })
        .addCase(getAuthors.fulfilled, (state, action) => {
          state.status = 'succeeded'
          // A fetched posts to the array;
          state.data = [];
          state.data = state.data.concat(action.payload)
        })
        .addCase(getAuthors.rejected, (state, action) => {
          state.status = 'failed'
          state.error = action.error.message
          console.log(action.error.message)
        })
      }
  });

// export const { resetOneModel } = get_constats.actions;
export const reducer = get_authors.reducer;
export const authors = (state) => state?.get_authors?.data[0]?.data
export default get_authors;