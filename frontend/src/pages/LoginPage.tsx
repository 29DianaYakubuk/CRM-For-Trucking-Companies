import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../app/hooks.ts';
import { login } from '../features/auth/authSlice.ts';
import { Navigate } from 'react-router-dom';
import Input from '../components/Input.tsx';
import Button from '../components/Button.tsx';

export default function LoginPage(){
  const { register: form, handleSubmit } = useForm<{email: string; password: string}>();
  const dispatch = useAppDispatch();
  const { user, loading, error } = useAppSelector(s=>s.auth);
  if (user) return <Navigate to="/" replace/>;
  return (
    <form className="card max-w-sm mx-auto space-y-3" onSubmit={handleSubmit(v=>dispatch(login(v)))}>
      <h1 className="h1">Вход</h1>
      <Input placeholder="Email" type="email" {...form('email', { required: true })} />
      <Input placeholder="Пароль" type="password" {...form('password', { required: true })} />
      {error && <div className="text-red-600 text-sm">{error}</div>}
      <Button disabled={loading} type="submit">Войти</Button>
    </form>
  );
}