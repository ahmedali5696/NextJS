import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getDatabase, ref, set } from "firebase/database";


export const sendMsg = createAsyncThunk(
  'msg/sendMsg',
  async (msg, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    const db = getDatabase()
    
    try {
      set(ref(db, '/messages/' + msg.id), msg.msg)
        .then(res => console.log(res))
        .catch((error) => console.log(error))
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

const msgSlice = createSlice({
  name: 'msg',
  initialState: {
    sending: false,
    success: false
  },
  extraReducers: builder => {
    builder
      .addCase(sendMsg.pending, (state, action) => {
        state.sending = true
      })
      .addCase(sendMsg.fulfilled, (state, action) => {
        state.sending = false
        state.success = true
      })
      .addCase(sendMsg.rejected, (state, action) => {
        state.sending = false
        state.success = false
      })
  }
})

export default msgSlice.reducer