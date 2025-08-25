import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../app/hooks.ts';
import { createItem } from '../features/items/itemsSlice';
import Input from '../components/Input';
import Button from '../components/Button';

export default function CreateItemPage(){
  const { register, handleSubmit } = useForm<{title: string; description?: string; status: 'todo'|'in_progress'|'done'}>();
  const nav = useNavigate();
  const dispatch = useAppDispatch();
  return (
    <form className="card max-w-md mx-auto space-y-3" onSubmit={handleSubmit(async v=>{ await dispatch(createItem(v)); nav('/'); })}>
      <h1 className="h1">Новая заявка</h1>
      <div>
        <div className="label">Название</div>
        <Input placeholder="Напр.: Miami → Orlando" {...register('title', { required: true })} />
      </div>
      <div>
        <div className="label">Описание</div>
        <Input placeholder="Вес, тип груза…" {...register('description')} />
      </div>
      <div>
        <div className="label">Статус</div>
        <select className="field" {...register('status')}>
          <option value="todo">ожидает</option>
          <option value="in_progress">в пути</option>
          <option value="done">доставлено</option>
        </select>
      </div>
      <Button type="submit">Сохранить</Button>
    </form>
  );
}