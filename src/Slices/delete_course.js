import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import instance from '../../axios';

const initialState = {
    data: [],
    status: 'idle',
    error: null,
};
export const deleteCourse = createAsyncThunk(`api/courses/purchase`, async(obj)=>{
  console.log(obj,"deleted");
  const response = await instance.delete(`api/courses/purchase`,obj)
  return response.data
}) 

;

const delete_course = createSlice({
    name: 'delete_course',
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
        .addCase(deleteCourse.pending, (state, action) => {
          state.status = 'loading'
        })
        .addCase(deleteCourse.fulfilled, (state, action) => {
          state.status = 'succeeded'
          // A fetched posts to the array;
          state.data = [];
          state.data = state.data.concat(action.payload)
        })
        .addCase(deleteCourse.rejected, (state, action) => {
          state.status = 'failed'
          state.error = action.error.message
          console.log(action.error.message)
        })
      }
  });

// export const { resetOneModel } = get_constats.actions;
export const reducer = delete_course.reducer;
export default delete_course;