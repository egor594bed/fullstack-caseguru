import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "../../services/auth-service";

const initialState = {
  employeeId: 0,
  isAuth: false,
  position: "",
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
    logut: (state) => {
      state.isAuth = false;
      state.employeeId = 0;
      state.position = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      login.fulfilled,
      (
        state,
        action: {
          payload: { employeeId: number; position: string };
        }
      ) => {
        state.isAuth = true;
        state.employeeId = action.payload.employeeId;
        state.position = action.payload.position;
        state.loading = false;
      }
    );
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as string) || "";
    });
  },
});
export const { logut } = AuthSlice.actions;
export default AuthSlice.reducer;
