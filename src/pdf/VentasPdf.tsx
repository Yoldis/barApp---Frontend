import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import { MarcasProps, ventasProps } from '../interfaces/barInterface';
import { format } from 'date-fns';

// Create styles
const styles = StyleSheet.create({
  title:{
    marginBottom:20,
  },

  fecha:{
    fontSize:10,
    marginTop:5
  },

  page: {
    backgroundColor: '#E4E4E4',
  },

  section: {
    margin: 10,
    padding: 10,
  },

  containerEmpresaFecha:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
  },

  containerImgEmpresa:{
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    gap:'5px'
  },

  logo:{
    width:'40px',
    height:'40px',
    objectFit:'cover',
    borderRadius:15
  },

  descripcion:{
    fontSize:10,
    marginTop:5
  },

  table: {
    width: '100%', // ancho de la tabla
    display: 'flex',
    borderStyle: 'solid',
    borderWidth: 1,
  },

  tableRow: {
    width:'100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent:'space-around',
    gap:'5px'
  },

  tableColHeader: {
    width:'100%',
    padding:'5px',
    borderStyle: 'solid',
    borderRightWidth: 1,
    borderBottomWidth:1
  },

  tableCellHeader: {
    width:'100%',
    paddingHorizontal:'5px',
    textAlign:'center',
    fontSize: 10, 
    fontWeight: 500,
  },

  tableCol: {
    width:'100%',
    padding:'5px',
    borderStyle: 'solid',
    borderRightWidth: 1,
    borderBottomWidth:1
  },

  tableCell: {
    width:'100%',
    fontSize: 9,
    paddingHorizontal:'5px',
    textAlign:'center'
  },

  containerUser:{
    marginTop:'20px',
    fontSize:14,
    // display:'flex',
    // flexDirection:'row',
    // justifyContent:'flex-end'
  },


});

interface PdfProps {
  data:ventasProps
}

// Create Document Component
export const VentasPdf = <T extends PdfProps>({data}:T) => (

  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>

        <View style={styles.containerEmpresaFecha}>
          {/* <View style={styles.empresaContainer}>
            <View style={styles.containerImgEmpresa}>
              <Image style={styles.logo} src={empresa.logo} />
              <Text>{empresa.nombre}</Text>
            </View>
            <Text style={styles.descripcion}>{empresa.descripcion}</Text>
          </View> */}

          <View style={styles.title}>
            <Text>Cliente: {data.cliente}</Text>
            <Text style={styles.fecha}>Fecha: {format(data.fecha, 'yyyy-MM-dd hh:MM aa')}</Text>
          </View>
        </View>

        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>Productos</Text>
            </View>

            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>Cantidad</Text>
            </View>

            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>Total</Text>
            </View>

          </View>

          {data.ventas_marcas?.map((m:{marcas:MarcasProps, cantidad:number, precio:number}, index:number) => (
            <View key={index} style={styles.tableRow}>
              <View style={styles.tableCol}>
                <View style={styles.containerImgEmpresa}>
                <View>
                  <Image style={styles.logo} src={m.marcas.img} />
                </View>
                  <Text style={styles.tableCell}>
                    {m.marcas.nombre}
                  </Text>
                </View>
              </View>

              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>
                  x{m.cantidad}
                </Text>
              </View>

              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>RD$ {m.precio}</Text>
              </View>
            </View>
          ))}
        </View>

          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>Unidades: x{data.unidades}</Text>
            </View>

            <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>Total: RD$ {data.total}</Text>
            </View>
          </View>
        </View>
    </Page>
  </Document>
)