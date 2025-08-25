import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:5001';
axios.defaults.withCredentials = true;
type User = { id: string; email: string; name: string } | null;

export const fetchMe = createAsyncThunk('auth/me', async () => {
  const { data } = await axios.get('/api/auth/me');
  return data as NonNullable<User>;
});
export const login = createAsyncThunk('auth/login', async (p: { email: string; password: string }) => {
  const { data } = await axios.post('/api/auth/login', p);
  return data as NonNullable<User>;
});
export const register = createAsyncThunk('auth/register', async (p: { name: string; email: string; password: string }) => {
  const { data } = await axios.post('/api/auth/register', p);
  return data as NonNullable<User>;
});
export const logout = createAsyncThunk('auth/logout', async () => {
  await axios.post('/api/auth/logout');
});

const slice = createSlice({
  name: 'auth',
  initialState: { user: null as User, loading: false, error: '' },
  reducers: {},
  extraReducers: (b) => {
    b.addCase(fetchMe.pending, (s) => { s.loading = true; })
     .addCase(fetchMe.fulfilled, (s, a) => { s.loading = false; s.user = a.payload; })
     .addCase(fetchMe.rejected, (s) => { s.loading = false; s.user = null; })
     .addCase(login.pending, (s)=>{ s.loading=true; s.error=''; })
     .addCase(login.fulfilled, (s,a)=>{ s.loading=false; s.user=a.payload; })
     .addCase(login.rejected, (s)=>{ s.loading=false; s.error='Login failed'; })
     .addCase(register.fulfilled, (s,a)=>{ s.user=a.payload; })
     .addCase(logout.fulfilled, (s)=>{ s.user=null; });
  }
});
export default slice.reducer;