import { Route, Routes } from "react-router-dom";
import { useBarContext } from "../context/useContext";
import { PagesProps } from "../interfaces/barInterface";
import { NavBar } from "../components/barApp";


export const LayoutPages = <T extends PagesProps>({routes ,sidebar, children}:T) => {
  const{toogleSidebar} = useBarContext();


  return (
    <section className="bg-gray-300 ">
      <NavBar />
      <div
        className={`transition-all ease-in-out grid grid-cols-1 ${
          toogleSidebar
            ? "md:grid-cols-[70px_auto]"
            : "md:grid-cols-[250px_auto]"
        }  min-h-[calc(100vh-56px)] divide-x `}
      >
        <div
          className={`md:w-auto w-[250px] md:relative fixed ${
            toogleSidebar ? "md:left-0 right-[-250px]" : "md:left-0 right-0"
          } transition-all ease-linear hover:md:w-[250px] bg-zinc-600 min-h-[calc(100vh-56px)] group/icon z-10`}
        >
          {sidebar}
        </div>

        <Routes>
          {routes.map((route, i) => (
            <Route key={i} path={route.path} element={route.element} />
          ))}
        </Routes>

        {children}
      </div>
    </section>
  );
}
