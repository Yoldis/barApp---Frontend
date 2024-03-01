import {  PDFDownloadLink } from "@react-pdf/renderer";
import { FaFilePdf, FaTrashAlt } from "react-icons/fa";
import { Alert, Buttom } from "..";
import { useAuthContext, useBarContext } from "../../../context/useContext";
import { format } from "date-fns";
import { LayoutTable } from "../../../layout";
import { TableThProps } from "../../../interfaces/barInterface";
import { VentasPdf } from "../../../pdf/VentasPdf";

export const TableVentas = () => {
    const{user} = useAuthContext();
    const{ventas, isLoading, startDeleteVentaInDb, openModal} = useBarContext();

    const onDelete = (id:string) => {
        startDeleteVentaInDb(id);
    };


    const thHeader:TableThProps[] = [
        {th:''}, {th:'Nombre'}, {th:'Total'},
    ];

  return (
    <section className="select-none">
        {
            ventas.map((v) => (
                <div key={v.id || ''} className="mt-4 animate__animated animate__fadeIn my-2 shadow-lg">
                    <div className="px-4 flex items-center justify-between gap-2">
                        <div>
                            <h1 className="font-bold text-lg">Cliente: <span className="text-primaryColor">{v.cliente}</span></h1>
                            <h3 className="text-sm font-semibold text-base-600">Fecha: {format(v.fecha, 'yyyy-MM-dd')}</h3>
                        </div>

                            <PDFDownloadLink document={<VentasPdf data={v} />} fileName={`${v.cliente}.pdf`} className="flex items-center gap-1 bg-red-700 text-white rounded-md p-1.5 active:scale-95 transition-all ease-in-out duration-75 text-sm">
                                {({ loading }) => loading ? 'Cargando documento...' : <><FaFilePdf/>{v.cliente}</>}
                            </PDFDownloadLink>

                        {
                            !user.colab && <Alert
                            buttom={
                            <Buttom
                                name="Eliminar"
                                btnColor="bg-red-500"
                                icon={<FaTrashAlt/>}
                                direction="float-end mt-2"
                                isLoading={isLoading}
                                onClickBtn={() => openModal(v.id?.toString() || '')}
                                disabled={isLoading ? true : false}
                                /> 
                            }
                            title={`Eliminar a - ${v.cliente}`}
                            id={v.id?.toString() || ''}
                        >

                        <Buttom
                            name="Eliminar"
                            btnColor="bg-red-500"
                            icon={<FaTrashAlt/>}
                            direction="float-end mt-2"
                            isLoading={isLoading}
                            onClickBtn={() => onDelete(v.id?.toString() || '')}
                            disabled={isLoading ? true : false}
                            /> 
                        </Alert>
                        }
                        
                    </div>

                    <LayoutTable thHeader={thHeader}>
                        {v.ventas_marcas?.map((c, i) => (
                        <tr key={c.marcas.id} className="odd:bg-white even:bg-slate-50">
                            <td className="font-bold">{i + 1}</td>
                            <td>
                                <div className="flex items-center gap-3">
                                    <div className="avatar">
                                    <div className="mask mask-squircle w-12 h-12">
                                        <img
                                        src={c.marcas?.img}
                                        alt={c.marcas?.nombre}
                                        />
                                    </div>
                                    </div>
                                    <div>
                                    <div className="font-bold">{c.marcas?.nombre}</div>
                                    <div className="badge bg-red-600 text-white font-medium text-sm"> x{c.cantidad}</div>
                                    </div>
                                </div>
                            </td>

                            <td>
                                <div className="text-sm flex font-medium">RD$ <span className="text-white badge bg-yellow-600">{c.precio}.00</span></div>
                            </td>
                        </tr>
                        ))}
                    </LayoutTable>

                    <LayoutTable>
                        <tr className={`bg-blue-100`}>
                        <td className="font-bold">{v.ventas_marcas ? v.ventas_marcas?.length + 1 : 0}</td>
                        <td>
                            <p className="font-bold">Unidades: <span className="badge bg-blue-500 text-white">x{v.unidades}</span></p>
                        </td>

                        <td>
                            <p className="font-bold">Total: <span className="badge bg-blue-500 text-white">RD$ {v.total}.00</span></p>
                        </td>
                        </tr>
                    </LayoutTable>
                </div>
            ))
        }

    </section>
  )
}
