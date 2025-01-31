import React from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

const DisplayTable = ({ data, column }) => {
  const table = useReactTable({
    data,
    columns: column,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <div className="p-2">
      <table className="w-full py-0 px-0 border-collapse border">
        <thead className="bg-green-800   text-white">
          {table.getHeaderGroups().map((headerGroup) => (
            
            <tr key={headerGroup.id}>
                <th>Sr.No</th>

                
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="border whitespace-nowrap">
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="text-black">
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
                <td className="border px-2 py-2 whitespace-nowrap">{row.index + 1}</td>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="border px-2 py-2">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        
      </table>
      <div className="h-4" />
     
    </div>
  );
};

export default DisplayTable;
