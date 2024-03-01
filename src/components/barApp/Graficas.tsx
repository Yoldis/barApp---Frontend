import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement, LineElement} from "chart.js";
import { Bar, Pie, Line, Doughnut } from "react-chartjs-2";
import { useBarContext } from "../../context/useContext";
import {  MarcasProps } from "../../interfaces/barInterface";

// Registrar componentes para los distintos graficos
ChartJS.register(CategoryScale, LinearScale, Tooltip, Legend, BarElement, ArcElement, PointElement, LineElement);


export const Graficas = () => {
  const {changeGrafico, marcasMasVendidas} = useBarContext();

  const colorGraficas:string[] = [
    "#fff7ed", '#fcd34d', "#f97316", "#ca8a04", "#c2410c",  '#713f12', '#7f1d1d', '#64748b', '#262626', '#a1a1aa'
  ];
  const marcasSorted:MarcasProps[] = marcasMasVendidas.sort((a, b) => b.vendidas - a.vendidas).slice(0, 10);

  
  return (
    <>
      {changeGrafico === "Barras" ? (
        <div className="w-[85%] m-auto my-2">
          <Bar
            data={{
              labels: [...marcasSorted.map((c) => c.nombre)],
              datasets: [
                {
                  label: "Ventas",
                  backgroundColor: colorGraficas,
                  borderColor: "rgba(0,0,0,1)",
                  borderWidth: 2,
                  data: [...marcasSorted.map((c) => c.vendidas)],
                },
              ],
            }}
          />
        </div>
      ) : changeGrafico === "Linea" ? (
        <div className="w-[85%] m-auto my-2">
          <Line
            data={{
              labels: [...marcasSorted.map((c) => c.nombre)],
              datasets: [
                {
                  label: "Ventas",
                  backgroundColor: colorGraficas,
                  borderColor: "rgba(0,0,0,1)",
                  borderWidth: 2,
                  data: [...marcasSorted.map((c) => c.vendidas)],
                },
              ],
            }}
          />
        </div>
      ) : changeGrafico === "Pastel" ? (
        <div className="w-[43%] m-auto my-2">
          <Pie
            data={{
              labels: [...marcasSorted.map((c) => c.nombre)],
              datasets: [
                {
                  label: "Ventas",
                  backgroundColor: colorGraficas,
                  borderColor: "rgba(0,0,0,1)",
                  borderWidth: 2,
                  data: [...marcasSorted.map((c) => c.vendidas)],
                },
              ],
            }}
          />
        </div>
      ) : changeGrafico === "Doughnut" ? (
        <div className="w-[43%] m-auto my-2">
          <Doughnut
            data={{
              labels: [...marcasSorted.map((c) => c.nombre)],
              datasets: [
                {
                  label: "Ventas",
                  backgroundColor: colorGraficas,
                  borderColor: "rgba(0,0,0,1)",
                  borderWidth: 2,
                  data: [...marcasSorted.map((c) => c.vendidas)],
                },
              ],
            }}
          />
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
