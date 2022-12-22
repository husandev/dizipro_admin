import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import instance from '../../axios';

const initialState = {
    data: [],
    status: 'idle',
    error: null,
};
export const addLesson = createAsyncThunk(`api/lessons/`, async(obj)=>{
  const response = await instance.post(`api/lessons/`,obj)
  return response.data
}) 

;

const add_lesson = createSlice({
    name: 'add_lesson',
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
        .addCase(addLesson.pending, (state, action) => {
          state.status = 'loading'
        })
        .addCase(addLesson.fulfilled, (state, action) => {
          state.status = 'succeeded'
          // A fetched posts to the array;
          state.data = [];
          state.data = state.data.concat(action.payload)
        })
        .addCase(addLesson.rejected, (state, action) => {
          state.status = 'failed'
          state.error = action.error.message
          console.log(action.error.message)
        })
      }
  });

// export const { resetOneModel } = get_constats.actions;
export const reducer = add_lesson.reducer;
export const LessonsResult = (state) => state?.add_lesson?.data[0]?.data
export default add_lesson;