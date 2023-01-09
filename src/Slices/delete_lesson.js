import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import instance from '../../axios';

const initialState = {
    data: [],
    status: 'idle',
    error: null,
};
export const deleteLesson = createAsyncThunk(`api/lessons/`, async(id)=>{
  const response = await instance.delete(`api/lessons/${id}`)
  return response.data
}) 

;

const delete_lesson = createSlice({
    name: 'delete_lesson',
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
        .addCase(deleteLesson.pending, (state, action) => {
          state.status = 'loading'
        })
        .addCase(deleteLesson.fulfilled, (state, action) => {
          state.status = 'succeeded'
          // A fetched posts to the array;
          state.data = [];
          state.data = state.data.concat(action.payload)
        })
        .addCase(deleteLesson.rejected, (state, action) => {
          state.status = 'failed'
          state.error = action.error.message
          console.log(action.error.message)
        })
      }
  });

// export const { resetOneModel } = get_constats.actions;
export const reducer = delete_lesson.reducer;
export default delete_lesson;