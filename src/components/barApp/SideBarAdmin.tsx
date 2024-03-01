import { FaFileInvoiceDollar, FaHandHolding, FaDollarSign, FaShoppingCart, FaStore, FaUser, FaWineBottle } from "react-icons/fa"
import { LinksProps } from "../../interfaces/barInterface"
import { NavLink } from "react-router-dom"
import { MdDashboard } from "react-icons/md"

import { useBarContext } from "../../context/useContext"


export const SideBarAdmin = () => {
    const{toogleSidebar, carrito} = useBarContext();

    const links:LinksProps[] = [
        {path:'/admin/dash', element:<MdDashboard />, nombre:'Dashboard'},
        {path:'/admin/colab', element:<FaUser/>, nombre:'Colaboradores'},
        {path:'/admin/prove', element:<FaHandHolding />, nombre:'Proveedores'},
        {path:'/admin/marcas', element:<FaWineBottle />, nombre:'Marcas'},
        {path:'/admin/compras', element:<FaFileInvoiceDollar />, nombre:'Compras'},
        {path:'/admin/stock', element:<FaStore />, nombre:'Stock'},

        {path:'/admin/carrito', element:<div className="relative">
            <FaShoppingCart className=" "/>
          <span className={`badge bg-red-500 text-white ${!toogleSidebar ? 'left-[200px]' : 'left-[10px]'} absolute top-0  ${!carrito.length ? 'hidden' : ''} `}>{carrito.length > 9  ? '9+' : carrito.length}</span>
        </div>, nombre:'Carrito'},

      {path:'/admin/ventas', element:<FaDollarSign />, nombre:'Ventas'},
    ]

  return (
    <div className="my-2 mx-1 sticky top-[72px]">
        {
            links.map((link, i:number) => (
                <NavLink key={i} to={link.path} className={({isActive}:{isActive:boolean}) => `${isActive ? 'bg-zinc-700 text-white' :'bg-gray-300 hover:bg-orange-50' } flex ${toogleSidebar && 'justify-center group-hover/icon:justify-start'} items-center gap-2 p-2 rounded-md font-medium transition-all ease-linear duration-100 my-4`}>
                    <span className={`text-primaryColor`}>{link.element}</span>
                    <span className={`${toogleSidebar && 'group-hover/icon:block hidden'} `}>{link.nombre}</span>
                </NavLink>
            ))
        }
    </div>
  )
}
