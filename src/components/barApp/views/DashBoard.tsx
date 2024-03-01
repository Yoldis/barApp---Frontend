

import { FaChartLine, FaChartPie, FaRegChartBar } from "react-icons/fa";
import { useBarContext } from "../../../context/useContext";
import { ReactNode } from "react";
import { BiSolidDoughnutChart } from "react-icons/bi";
import { Graficas } from "..";
import { MdDashboard } from "react-icons/md";

interface ButtomGraficProps {
  icon:ReactNode,
  title:string
}

export const DashBoard = () => {

  const {startChangeGrafico, changeGrafico} = useBarContext();

  const btnsGraficos:ButtomGraficProps[] = [
    {icon:<FaRegChartBar className={`${changeGrafico === "Barras" && "text-primaryColor" } `} />,  title:'Barras'},
    {icon:<FaChartLine className={`${ changeGrafico === "Linea" && "text-primaryColor" } `} />, title:'Linea'},
    {icon:<FaChartPie className={`${changeGrafico === "Pastel" && "text-primaryColor"} `} />, title:'Pastel'},
    {icon:<BiSolidDoughnutChart className={`${ changeGrafico === "Doughnut" && "text-primaryColor" } `} />, title:'Doughnut'},
  ]

  return (
    <section className="animate__animated animate__fadeIn">
      <div className="p-2 select-none mb-5 flex items-center justify-between gap-2 mx-4">
        <h1 className="md:text-2xl text-lg font-bold border-b border-b-primaryColor flex items-center gap-1.5">
          <MdDashboard className={`text-primaryColor`}/>
          Dashboard
        </h1>

        <div className="p-2 ">
          <p className="font-bold text-center">Graficos:</p>

          <div className="items-center gap-4 grid md:grid-cols-4 grid-cols-1 justify-items-center">
            {btnsGraficos.map((b) => (
              <button
                key={b.title}
                className={`flex items-center gap-1 font-semibold ${
                  changeGrafico === b.title && "border-b-primaryColor"
                }  border-b transition-all ease-linear`}
                onClick={() => startChangeGrafico(b.title)}
              >
                {b.icon}
                {b.title}
              </button>
            ))}
          </div>
        </div>
      </div>
        {/* Grafica */}
        <Graficas />
    </section>
  );
}
