import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "../../services/auth-service";

const initialState = {
  employeeId: "",
  isAuth: false,
  loading: false,
  error: "",
};

export const login = createAsyncThunk(
  "authSlice/login",
  async (
    { username, password }: { username: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await authService.login(username, password);

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message);
      }

      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const AuthSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    setAuth: (
      state,
      action: PayloadAction<{ isAuth: boolean; token: string }>
    ) => {
      if (!action.payload.token) return;
      state.isAuth = action.payload.isAuth;
      localStorage.setItem("token", action.payload.token);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      login.fulfilled,
      (state, action: { payload: { token: string; employeeId: string } }) => {
        if (!action.payload.token) return;
        state.isAuth = true;
        state.employeeId = action.payload.employeeId;
        localStorage.setItem("token", action.payload.token);
        state.loading = false;
      }
    );
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as string) || "";
    });
  },
});
export const { setAuth } = AuthSlice.actions;
export default AuthSlice.reducer;
