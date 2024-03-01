import { ReactNode } from "react";
import { TableThProps } from "../interfaces/barInterface";

interface Table {
    thHeader?:TableThProps[],
    children:ReactNode
}


export const LayoutTable = <T extends Table>({thHeader, children}:T) => {

  return (
  <div className="overflow-x-auto">
      <table className="table table-auto rounded-md table-zebra ">
        {/* head */}
        <thead>
          {
            thHeader && <tr>
            {
             thHeader.map((t, i) => (
                    <th key={i}>{t.th}</th>
                ))
            }
          </tr>
          }
          
        </thead>
        <tbody className="">
          {children}
        </tbody>
      </table>
    </div>
  );
}
