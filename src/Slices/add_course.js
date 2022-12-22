import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import instance from '../../axios';

const initialState = {
    data: [],
    status: 'idle',
    error: null,
};
export const addCourses = createAsyncThunk(`api/courses`, async(obj)=>{
  console.log(obj);
  const response = await instance.post(`api/courses`,
   obj
  )
  return response.data
}) 

;

const add_course = createSlice({
    name: 'add_course',
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
        .addCase(addCourses.pending, (state, action) => {
          state.status = 'loading'
        })
        .addCase(addCourses.fulfilled, (state, action) => {
          state.status = 'succeeded'
          // A fetched posts to the array;
          state.data = [];
          state.data = state.data.concat(action.payload)
        })
        .addCase(addCourses.rejected, (state, action) => {
          state.status = 'failed'
          state.error = action.error.message
          console.log(action.error.message)
        })
      }
  });

// export const { resetOneModel } = get_constats.actions;
export const reducer = add_course.reducer;
export default add_course;