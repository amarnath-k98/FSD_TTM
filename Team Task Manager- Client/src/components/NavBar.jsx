import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { clearState } from '../features/authSlice';

const NavBar = () => {
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();
  return (
    <nav className="">
      <div className="flex items-center justify-between">
        <Link to={"/"} className="text-lg font-semibold">
          Team Task Manager
        </Link>
        <div className="flex items-center gap-3">
          {user ? (
                      <>
                          <span>{user.name} ({user.role})</span>
                          <button onClick={ () => dispatch(clearState())}>Logout</button>
                      </>
          ) : (
            <>
              <Link to={"/login"} className="text-sm">
                Login
              </Link>
              <Link to={"/register"} className="text-sm">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavBar
