import { async } from "@firebase/util"
import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit"
import { ref, child, get } from "firebase/database";

import { database } from '../firebase';

export const getData = createAsyncThunk(
  'data/getAllData',
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    const dbRef = ref(database);

    try {
      const data = await get(child(dbRef, `/`))
      return data.val()

    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

export const updateData = createAsyncThunk(
  'data/updateData',
  async (path, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    const dbRef = ref(database);

    try {
      const data = await get(child(dbRef, '/' + path))
      return { data: data.val(), path }

    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

const allDataSlice = createSlice({
  name: 'data',
  initialState: {
    isLoading: false,
    error: '',
    data: []
  },
  extraReducers: builder => {
    builder
      .addCase(getData.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(getData.fulfilled, (state, action) => {
        state.isLoading = false
        state.data = action.payload
      })
      .addCase(getData.rejected, (state, action) => {
        state.isLoading = false
        state.error = 'There error from the server, Please try later'
      })
      .addCase(updateData.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(updateData.fulfilled, (state, action) => {
        state.isLoading = false
        state.data = {
          ...state.data,
          [action.payload.path]: action.payload.data
        }
      })
      .addCase(updateData.rejected, (state, action) => {
        state.isLoading = false
        state.error = 'There error from the server, Please try later'
      })
  }
})

export const dataState = (state) => state.data
export const { addItem } = allDataSlice.actions
export default allDataSlice.reducer