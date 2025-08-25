import { useAuth } from '../hooks/useAuth';
export default function ProfilePage(){
  const { user, loading } = useAuth();
  if (loading || !user) return null;
  return (
    <div className="card">
      <h1 className="h1 mb-4">Профиль</h1>
      <div className="space-y-2 text-sm">
        <div><span className="label">Имя:</span> {user.name}</div>
        <div><span className="label">Email:</span> {user.email}</div>
      </div>
    </div>
  );
}