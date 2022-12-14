import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const userLogin = createAsyncThunk(
  'login/userLogin',
  async (userData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    const url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDuS1urv_ldcP5vmbSoNiIAs5bq6-PBBEU'
    try {
      const sendData = await fetch(url,
        {
          method: 'POST',
          body: JSON.stringify({
            ...userData,
            returnSecureToken: true
          }),
          headers: { 'Content-Type': 'application/json' }
        })

      if (sendData.ok) {
        return sendData.json()
      } else {
        return sendData.json().then(data => {
          throw new Error(data.error.message)
        })
      }
    } catch (error) {
      console.log(error.message)
      return rejectWithValue(error.message)
    }
  }
)

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    token:'',
    expires: null,
    loading: false,
    isLoggedIn: false,
    loginError: null
  },
  reducers: {
    logout: (state, action) => {
      state.token = ''
      state.isLoggedIn = false
      state.expires = null
      localStorage.removeItem('isLoggedIn')
    }
  },
  extraReducers: builder => {
    builder
      .addCase(userLogin.pending, (state, action) => {
        state.loading = true
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.token = action.payload.idToken
        state.expires = action.payload.expiresIn
        state.loading = false
        state.isLoggedIn = true
        state.loginError = null
        localStorage.setItem('isLoggedIn', state.isLoggedIn)
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.loading = false
        state.isLoggedIn = false
        state.loginError = action.error.message
      })
  }
})

export const loginState = (state) => state.login

export const { logout } = loginSlice.actions

export default loginSlice.reducer