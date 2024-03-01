import { FaBars, FaSignOutAlt } from "react-icons/fa";
import {useAuthContext, useBarContext } from "../../context/useContext";
import { Link, useNavigate } from "react-router-dom";

export const NavBar = () => {
     const{startSignOut} = useAuthContext();
    const{setToogleSidebar, toogleSidebar, startLogoutBar} = useBarContext();
    const navigate  = useNavigate();

    const onLogout = () => {
      startSignOut();
      startLogoutBar();
      navigate('/auth/login');
    }
    const onToogleSideBar = () => toogleSidebar ? setToogleSidebar(false) : setToogleSidebar(true);

  return (
    <div className="flex justify-between items-center p-2 px-4 bg-zinc-700 sticky top-0 z-20">
      <div className="flex items-center gap-1">
        <button
          onClick={onToogleSideBar}
          className="hover:bg-gray-400 text-white p-3 rounded-md active:scale-95 transition-all ease-linear"
        >
          <FaBars />
        </button>
          <Link to={'/admin/dash'} className="text-2xl text-primaryColor font-bold select-none">
            BarApp
          </Link>
      </div>
      <FaSignOutAlt
        onClick={onLogout}
        className="text-lg text-primaryColor cursor-pointer"
      />
    </div>
  );
}
