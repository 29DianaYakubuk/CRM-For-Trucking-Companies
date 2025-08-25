import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks.ts';
import { fetchItems } from '../features/items/itemsSlice.ts';

export const useItems = () => {
  const dispatch = useAppDispatch();
  const { list, loading } = useAppSelector(s=>s.items);
  useEffect(()=>{ dispatch(fetchItems()); }, [dispatch]);
  return { list, loading };
};