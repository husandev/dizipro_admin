import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import instance from '../../axios';

const initialState = {
    data: [],
    status: 'idle',
    error: null,
};
export const AddCourseToUser = createAsyncThunk(`api/courses/admin/user`, async(obj)=>{
  const response = await instance.post(`api/courses/admin/user`,
   obj
  )
  return response.data
}) 

;

const add_course_to_user = createSlice({
    name: 'add_course_to_user',
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
        .addCase(AddCourseToUser.pending, (state, action) => {
          state.status = 'loading'
        })
        .addCase(AddCourseToUser.fulfilled, (state, action) => {
          state.status = 'succeeded'
          // A fetched posts to the array;
          state.data = [];
          state.data = state.data.concat(action.payload)
        })
        .addCase(AddCourseToUser.rejected, (state, action) => {
          state.status = 'failed'
          state.error = action.error.message
          console.log(action.error.message)
        })
      }
  });

// export const { resetOneModel } = get_constats.actions;
export const reducer = add_course_to_user.reducer;
export default add_course_to_user;