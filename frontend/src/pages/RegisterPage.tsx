import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { register as signup } from '../features/auth/authSlice';
import { Navigate } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';

export default function RegisterPage(){
  const { register, handleSubmit } = useForm<{name: string; email: string; password: string}>();
  const dispatch = useAppDispatch();
  const { user, loading } = useAppSelector(s=>s.auth);
  if (user) return <Navigate to="/" replace/>;
  return (
    <form className="card max-w-sm mx-auto space-y-3" onSubmit={handleSubmit(v=>dispatch(signup(v)))}>
      <h1 className="h1">Регистрация</h1>
      <Input placeholder="Имя" {...register('name', { required: true })} />
      <Input placeholder="Email" type="email" {...register('email', { required: true })} />
      <Input placeholder="Пароль" type="password" {...register('password', { required: true, minLength: 6 })} />
      <Button disabled={loading} type="submit">Создать аккаунт</Button>
    </form>
  );
}