import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchItem, updateItem, deleteItem } from '../features/items/itemsSlice';
import Input from '../components/Input';
import Button from '../components/Button';

export default function EditItemPage(){
  const { id } = useParams();
  const { register, handleSubmit, reset } = useForm<{title: string; description?: string; status: 'todo'|'in_progress'|'done'}>();
  const { current } = useAppSelector(s=>s.items);
  const dispatch = useAppDispatch();
  const nav = useNavigate();

  useEffect(()=>{ if(id) dispatch(fetchItem(id)); },[id]);
  useEffect(()=>{ if(current) reset({ title: current.title, description: current.description, status: current.status }); },[current]);

  if (!id) return null;
  return (
    <form className="card max-w-md mx-auto space-y-3" onSubmit={handleSubmit(async v=>{ await dispatch(updateItem({ id, ...v })); nav('/'); })}>
      <h1 className="h1">Редактирование</h1>
      <div>
        <div className="label">Название</div>
        <Input {...register('title', { required: true })} />
      </div>
      <div>
        <div className="label">Описание</div>
        <Input {...register('description')} />
      </div>
      <div>
        <div className="label">Статус</div>
        <select className="field" {...register('status')}>
          <option value="todo">ожидает</option>
          <option value="in_progress">в пути</option>
          <option value="done">доставлено</option>
        </select>
      </div>
      <div className="flex gap-2">
        <Button type="submit">Обновить</Button>
        <Button className="btn-secondary" type="button" onClick={async()=>{ await dispatch(deleteItem(id)); nav('/'); }}>Удалить</Button>
      </div>
    </form>
  );
}