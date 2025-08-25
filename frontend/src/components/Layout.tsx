import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.ts';
import { useAppDispatch } from '../app/hooks.ts';
import { logout } from '../features/auth/authSlice';

export default function Layout({ children }: { children: React.ReactNode }){
  const { user } = useAuth();
  const dispatch = useAppDispatch();
  return (
    <div className="min-h-dvh flex flex-col">
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b">
        <div className="container-main flex items-center justify-between py-3">
          <Link to="/" className="font-semibold text-lg">FleetOps Mini</Link>
          <nav className="flex items-center gap-4 text-sm">
            <NavLink to="/" className={({isActive})=>isActive? 'underline' : ''}>Заявки</NavLink>
            {user && <NavLink to="/profile" className={({isActive})=>isActive? 'underline' : ''}>Профиль</NavLink>}
            {!user ? (
              <>
                <NavLink to="/login">Вход</NavLink>
                <NavLink to="/register">Регистрация</NavLink>
              </>
            ) : (
              <button className="btn-secondary" onClick={()=>dispatch(logout())}>Выйти</button>
            )}
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <div className="container-main">{children}</div>
      </main>
      <footer className="border-t bg-white">
        <div className="container-main text-sm opacity-70">
          MERN • Trucking CRM demo
        </div>
      </footer>
    </div>
  );
}