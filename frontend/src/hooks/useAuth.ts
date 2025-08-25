import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchMe } from '../features/auth/authSlice';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const { user, loading } = useAppSelector((s) => s.auth);

  useEffect(() => {
    if (!user) {
      void dispatch(fetchMe()); // void — чтобы не ругался на неиспользованный Promise
    }
  }, [user, dispatch]); // ← добавили зависимости

  return { user, loading };
};
