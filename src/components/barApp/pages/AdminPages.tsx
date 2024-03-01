import { Navigate } from "react-router-dom";
import { Colaboradores, DashBoard, SideBarAdmin, Stocks, Marcas, Proveedores, Compras, Carrito, Ventas } from "..";
import { LinksProps } from "../../../interfaces/barInterface";
import { LayoutPages } from "../../../layout"
import { useBarContext } from "../../../context/useContext";
import { useEffect } from "react";


export const AdminPages = () => {

  const{startGetColabInDb, startGetProveeInDb, startDeleteFileSinDestino, startGetMarcasInDB, startGetItemsCarrito, startGetVentasInDB, startGetRegisterComprasDB, startGetMarcasMasVendidas} = useBarContext();

  useEffect(() => {
    startGetColabInDb();
    startGetProveeInDb();
    startGetMarcasInDB('', 0);
    startGetMarcasMasVendidas();
    startGetRegisterComprasDB('', 0);
    startGetItemsCarrito();
    startGetVentasInDB('', 0);
    startDeleteFileSinDestino();
  }, []);
  

    const routes:LinksProps[] = [
        {path:'/dash', element:<DashBoard/>},
        {path:'/colab', element:<Colaboradores/>},
        {path:'/prove', element:<Proveedores/>},
        {path:'/compras', element:<Compras/>},
        {path:'/marcas', element:<Marcas/>},
        {path:'/stock', element:<Stocks/>},
        {path:'/carrito', element:<Carrito/>},
        {path:'/ventas', element:<Ventas/>},
        {path:'/*', element:<Navigate to="/admin/dash"/>},
    ];

  return (
    <LayoutPages routes={routes} sidebar={<SideBarAdmin/>} />
  )
}
