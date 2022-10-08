import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,
  token: localStorage.getItem("token") || null,
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      localStorage.setItem("user", JSON.stringify(action.payload.user))
      localStorage.setItem("token", action.payload.token)

      state.user = action.payload.user
      state.token = action.payload.token
    },
    logout: (state) => {
      localStorage.removeItem("user")
      localStorage.removeItem("token")

      state.user = null
      state.token = null
    },
  },
})

export const { login, logout } = authSlice.actions

export default authSlice.reducer
