import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import instance from '../../axios';

const initialState = {
    data: [],
    status: 'idle',
    error: null,
};
export const updateUser = createAsyncThunk(`api/users/`, async(obj)=>{
  const response = await instance.put(`api/users/${obj.id}`,obj.body)
  return response.data
}) 

;

const update_user = createSlice({
    name: 'update_user',
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
        .addCase(updateUser.pending, (state, action) => {
          state.status = 'loading'
        })
        .addCase(updateUser.fulfilled, (state, action) => {
          state.status = 'succeeded'
          // A fetched posts to the array;
          state.data = [];
          state.data = state.data.concat(action.payload)
        })
        .addCase(updateUser.rejected, (state, action) => {
          state.status = 'failed'
          state.error = action.error.message
          console.log(action.error.message)
        })
      }
  });

// export const { resetOneModel } = get_constats.actions;
export const reducer = update_user.reducer;
export const LessonsResult = (state) => state?.update_user?.data[0]?.data
export default update_user;