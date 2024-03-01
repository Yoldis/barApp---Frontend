import { ChangeEvent, MouseEvent, ReactNode } from "react"

export interface BarProps {
    toogleSidebar:boolean,
    isLoading:boolean,
    errorBar:errorBarProv,
    getPassowrd:UsuarioProps|null,
    changeGrafico:string,
    setErrorBar(e:errorBarProv):void,
    setToogleSidebar:(b:boolean) => void,
    openModal:(id:string) => void,
    startChangeGrafico:(grafica:string) => void,
    
    // Colaboradores
    colaboradores:ColabProps[],
    startRegisterUpdateColabInDb:(payload:ColabProps) => void,
    startGetColabInDb():void,
    startDeleteColabInDb:(id:string) => void,

    // Proveedores
    proveedores:ProveedorProps[],
    startRegisterProveeInDb(provee:ProveedorProps):void
    startGetProveeInDb():void,
    startDeleteProveeInDb(id:string):void,


    // Cargar Archivo
    startUploadFile:(file:File, img:string) => Promise<string|undefined>,
    loadingImg:boolean,
    startDeleteFileSinDestino:() => void,

    // Marcas
    marcas:MarcasProps[],
    marcasMasVendidas:MarcasProps[],
    startRegisterUpdateMarca(marca:MarcasProps):void,
    startGetMarcasInDB:(search:string, pagina:number) => void,
    startDeleteMarcaInDB:(id:string) => void,
    startGetMarcasMasVendidas():void,

    // Registro de compras
    compras:ComprasProps[],
    startGetRegisterComprasDB:(search:string, pagina:number) => void,
    startDeleteRegisterComprasInDB(id:string):void,

    // Carrito
    carrito:CarritoProps[],
    startAddItemsCarritoDB(items:CarritoProps, isMasOrMenos?:boolean):void,
    startGetItemsCarrito:() => void,

    // Ventas
    ventas:ventasProps[],
    startGetVentasInDB:(search:string, pagina:number) => void,
    startRegisterVentasInDb:(carrito:CarritoProps[], cliente:string) => void,
    startDeleteVentaInDb:(id:string) => void,

    // InicialState con los estado al cerrar session
    startLogoutBar:() => void
}

export interface Valid {
    ok:boolean,
    msg:string,
    name:string
}

export interface PagesProps {
    routes:LinksProps[],
    sidebar:ReactNode,
    children?:ReactNode,
}

export interface LinksProps {
    path:string,
    element:ReactNode,
    nombre?:string
}

export interface TableThProps {
    th:string
}


export interface ModalProps {
    titleHeader:string,
    titleBtn:string,
    children:ReactNode,
    icon?:ReactNode,
    btnColor:string,
    onResetForm?():void,
    onSaveData(e:MouseEvent<HTMLButtonElement>):void,
    isLoading:boolean,
    error:errorBarProv,
    setError(e:errorBarProv):void,
    openModal:(id:string) => void
}

export interface InputSelectProps  {
    type:string,
    placeholder:string,
    name:string,
    value:string,
    tag:string,
    accept?:string,
    loadingImg?:boolean,
    onChangeInput?:(e:ChangeEvent<HTMLInputElement>) => void,
    onChangeSelect?:(e:ChangeEvent<HTMLSelectElement>) => void,

    readonly?:boolean,
    hidden?:boolean,
    label?:string,
    valid?:Valid|undefined,
    options?:{id:string|undefined, nombre:string}[],
    maxLength?:number
}

export interface ButtomProps {
    name?:string,
    icon?:ReactNode,
    btnColor?:string,
    btnSize?:string,
    colorText?:string,
    direction?:string,
    isLoading:boolean,
    disabled:boolean,
    onClickBtn:(e:MouseEvent<HTMLButtonElement>) => void
}

export interface ColabProps {
    id?:number,
    nombre:string,
    apellido:string,
    dni:string,
    telefono:string,
    email:string,
    usuario:string,
    userId:string,
    role:string,
    cambioPassword:boolean,
    horaEntrada?:string,
    horaSalida?:string,

    access_token?:string,
    refresh_token?:string
}

export interface errorBarProv {
    ok:boolean,
    msg?:string|null
}

export interface BtnEditDeleteProps {
    enaobleEdit?:boolean,
    callbackEdit?:() => void,
    callbackDelete:(id:string) => void,
    children?:ReactNode
    openModal:(id:string) => void
    id:string,
    nombre:string,
    isLoading:boolean,
    contenidoModal?:ReactNode
}

export interface AlertProps {
    id:string,
    title:string,
    children:ReactNode,
    buttom?:ReactNode,
    isloading?:boolean,
    onResetForm?:() => void
}

export interface UsuarioProps  {
    nombre:string,
    apellido:string,
    usuario:string,
    password?:string
}


export interface ProveedorProps {
    id?:number,
    nombre:string,
    direccion:string,
    telefono:string,
    email:string
}


export interface MarcasProps {
    id?:number,
    img?:string,
    nombre:string,
    compra:number,
    venta:number,
    unidades:number
    vendidas:number,
    idProvee:string,
    isNew:boolean,
    newUnidades:number,
    proveedores?:{nombre:string}
}

export interface ComprasProps {
    id?:number,
    marcasID:number,
    marcas:MarcasProps,
    unidades:number,
    newUnidades:number
    fecha:Date
}

export interface CarritoProps {
    id?:number,
    marcasID:number,
    marcas?:MarcasProps,
    precio:number,
    cantidad:number,
    unidades?:number,
}

export interface ventasProps {
    id?:number,
    fecha:Date,
    cliente:string,
    unidades:number,
    total:number,
    ventas_marcas?:{
        marcas:MarcasProps,
        cantidad:number,
        precio:number,
    }[]
}