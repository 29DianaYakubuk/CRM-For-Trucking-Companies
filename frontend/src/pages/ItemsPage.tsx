import { Link } from 'react-router-dom';
import { useItems } from '../hooks/useItems';
import Loader from '../components/loader.tsx';
import Badge from '../components/Badge';

const statusLabel: Record<string,string> = { todo: 'ожидает', in_progress: 'в пути', done: 'доставлено' };

export default function ItemsPage(){
  const { list, loading } = useItems();
  if (loading) return <Loader/>;
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="h1">Заявки</h1>
        <Link className="btn" to="/create">Новая заявка</Link>
      </div>
      <ul className="grid gap-3">
        {list.map(i=>(
          <li key={i._id} className="card flex items-start justify-between gap-4">
            <div>
              <div className="font-medium text-lg">{i.title}</div>
              <div className="text-sm opacity-80 mt-1">{i.description}</div>
              <div className="mt-2"><Badge>{statusLabel[i.status] ?? i.status}</Badge></div>
            </div>
            <Link className="btn-secondary" to={`/edit/${i._id}`}>Редактировать</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}