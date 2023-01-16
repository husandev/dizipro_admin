import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import instance from '../../axios';

const initialState = {
    data: [],
    status: 'idle',
    error: null,
};
export const getLesson = createAsyncThunk(`api/lessons/1`, async(id)=>{
  const response = await instance.get(`api/lessons/${id}`)
  return response.data
}) 

;

const get_lesson = createSlice({
    name: 'get_lesson',
    initialState,
    reducers: {
        getLesson(state, action) {
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
        .addCase(getLesson.pending, (state, action) => {
          state.status = 'loading'
        })
        .addCase(getLesson.fulfilled, (state, action) => {
          state.status = 'succeeded'
          // A fetched posts to the array;
          state.data = [];
          state.data = state.data.concat(action.payload)
        })
        .addCase(getLesson.rejected, (state, action) => {
          state.status = 'failed'
          state.error = action.error.message
          console.log(action.error.message)
        })
      }
  });

// export const { resetOneModel } = get_constats.actions;
export const reducer = get_lesson.reducer;
export const lesson = (state) => state?.get_lesson?.data[0]?.data
export default get_lesson;