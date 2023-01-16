import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import instance from '../../axios';

const initialState = {
    data: [],
    status: 'idle',
    error: null,
};
export const updateLesson = createAsyncThunk(`api/lessons/`, async(obj)=>{
  const response = await instance.put(`api/lessons/${obj.id}`,obj.body)
  return response.data
}) 

;

const update_lesson = createSlice({
    name: 'update_lesson',
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
        .addCase(updateLesson.pending, (state, action) => {
          state.status = 'loading'
        })
        .addCase(updateLesson.fulfilled, (state, action) => {
          state.status = 'succeeded'
          // A fetched posts to the array;
          state.data = [];
          state.data = state.data.concat(action.payload)
        })
        .addCase(updateLesson.rejected, (state, action) => {
          state.status = 'failed'
          state.error = action.error.message
          console.log(action.error.message)
        })
      }
  });

// export const { resetOneModel } = get_constats.actions;
export const reducer = update_lesson.reducer;
export const LessonsResult = (state) => state?.update_lesson?.data[0]?.data
export default update_lesson;