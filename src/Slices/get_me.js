import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import instance from '../../axios';
const initialState = {
    data: [],
    status: 'idle',
    error: null,
};
export const getMe = createAsyncThunk(`api/users/me`, async(token)=>{
  const response = await instance.get(`api/users/me`,{token})
  console.log(response,"response");
  return response.data
}) ;

const get_me = createSlice({
    name: 'get_me',
    initialState,
    reducers: {
        getMe(state, action) {
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
        .addCase(getMe.pending, (state, action) => {
          state.status = 'loading'
        })
        .addCase(getMe.fulfilled, (state, action) => {
          state.status = 'succeeded'
          // A fetched posts to the array;
          state.data = [];
          state.data = state.data.concat(action.payload)
        })
        .addCase(getMe.rejected, (state, action) => {
          state.status = 'failed'
          state.error = action.error.message
          console.log(action.error.message)
       
        })
      }
  });

// export const { resetOneModel } = get_constats.actions;
export const reducer = get_me.reducer;
export const lesson = (state) => state?.get_me?.data[0]?.data
export default get_me;