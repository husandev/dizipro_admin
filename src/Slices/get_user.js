import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import instance from '../../axios';

const initialState = {
    data: [],
    status: 'idle',
    error: null,
};
export const getUser = createAsyncThunk(`api/users/`, async(id)=>{
  const response = await instance.get(`api/users/${id}`)
  return response.data
}) 

;

const get_user = createSlice({
    name: 'get_user',
    initialState,
    reducers: {
        getUser(state, action) {
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
        .addCase(getUser.pending, (state, action) => {
          state.status = 'loading'
        })
        .addCase(getUser.fulfilled, (state, action) => {
          state.status = 'succeeded'
          // A fetched posts to the array;
          state.data = [];
          state.data = state.data.concat(action.payload)
        })
        .addCase(getUser.rejected, (state, action) => {
          state.status = 'failed'
          state.error = action.error.message
          console.log(action.error.message)
        })
      }
  });

// export const { resetOneModel } = get_constats.actions;
export const reducer = get_user.reducer;
export const user = (state) => state?.get_user?.data[0]?.data
export default get_user;