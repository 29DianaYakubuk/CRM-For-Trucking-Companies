import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:5001';
axios.defaults.withCredentials = true;

export type Item = { _id: string; title: string; description?: string; status: 'todo'|'in_progress'|'done'; createdAt?: string };

export const fetchItems = createAsyncThunk('items/fetch', async () => {
  const { data } = await axios.get('/api/items');
  return data as Item[];
});
export const fetchItem = createAsyncThunk('items/fetchOne', async (id: string) => {
  const { data } = await axios.get(`/api/items/${id}`);
  return data as Item;
});
export const createItem = createAsyncThunk('items/create', async (p: { title: string; description?: string; status?: Item['status'] }) => {
  const { data } = await axios.post('/api/items', { status: 'todo', ...p });
  return data as Item;
});
export const updateItem = createAsyncThunk('items/update', async ({ id, ...p }: { id: string; title?: string; description?: string; status?: Item['status'] }) => {
  const { data } = await axios.put(`/api/items/${id}`, p);
  return data as Item;
});
export const deleteItem = createAsyncThunk('items/delete', async (id: string) => {
  await axios.delete(`/api/items/${id}`);
  return id;
});

const slice = createSlice({
  name: 'items',
  initialState: { list: [] as Item[], current: null as Item | null, loading: false },
  reducers: {},
  extraReducers: (b) => {
    b.addCase(fetchItems.pending, (s)=>{ s.loading = true; })
     .addCase(fetchItems.fulfilled, (s,a)=>{ s.loading=false; s.list=a.payload; })
     .addCase(fetchItem.fulfilled, (s,a)=>{ s.current=a.payload; })
     .addCase(createItem.fulfilled, (s,a)=>{ s.list.unshift(a.payload); })
     .addCase(updateItem.fulfilled, (s,a)=>{ s.list = s.list.map(it=> it._id===a.payload._id ? a.payload : it); s.current=a.payload; })
     .addCase(deleteItem.fulfilled, (s,a)=>{ s.list = s.list.filter(it=> it._id!==a.payload); });
  }
});
export default slice.reducer;