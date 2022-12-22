import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import instance from '../../axios';

const initialState = {
    data: [],
    status: 'idle',
    error: null,
};
export const getCourses = createAsyncThunk(`api/courses/`, async()=>{
  const response = await instance.get(`api/courses`)
  return response.data
}) 

;

const get_courses = createSlice({
    name: 'get_courses',
    initialState,
    reducers: {
        getCourses(state, action) {
        const { faqs } = action.payload;
        state.faqs = faqs;
      },
    //   resetOneModel() {
    //     return {
    //       ...initialState
    //     }
    //   },
    },
    extraReducers(builder) {
      builder
        .addCase(getCourses.pending, (state, action) => {
          state.status = 'loading'
        })
        .addCase(getCourses.fulfilled, (state, action) => {
          state.status = 'succeeded'
          // A fetched posts to the array;
          state.data = [];
          state.data = state.data.concat(action.payload)
        })
        .addCase(getCourses.rejected, (state, action) => {
          state.status = 'failed'
          state.error = action.error.message
          console.log(action.error.message)
        })
      }
  });

// export const { resetOneModel } = get_constats.actions;
export const reducer = get_courses.reducer;
export const courses = (state) => state?.get_courses?.data[0]?.data
export default get_courses;