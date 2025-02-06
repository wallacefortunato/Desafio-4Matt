import React, { useState } from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  SortingState,
} from '@tanstack/react-table';
import { Contract } from '../types/contract';
import { format } from 'date-fns';

const columnHelper = createColumnHelper<Contract>();

interface ContractsTableProps {
  data: Contract[];
  onRowClick: (contract: Contract) => void;
}

export const ContractsTable: React.FC<ContractsTableProps> = ({ data, onRowClick }) => {
  const [sorting, setSorting] = useState<SortingState>([]);

  const columns = [
    columnHelper.accessor('id', {
      header: 'ID',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('name', {
      header: 'Nome do Contrato',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('clientName', {
      header: 'Cliente/Fornecedor',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('startDate', {
      header: 'Data de Início',
      cell: info => format(info.getValue(), 'dd/MM/yyyy'),
    }),
    columnHelper.accessor('endDate', {
      header: 'Data de Vencimento',
      cell: info => format(info.getValue(), 'dd/MM/yyyy'),
    }),
    columnHelper.accessor('status', {
      header: 'Status',
      cell: info => (
        <span className={`px-2 py-1 rounded-full text-sm ${
          info.getValue() === 'Ativo' ? 'bg-green-100 text-green-800' :
          info.getValue() === 'Expirado' ? 'bg-red-100 text-red-800' :
          info.getValue() === 'Pendente de Renovação' ? 'bg-yellow-100 text-yellow-800' :
          'bg-blue-100 text-blue-800'
        }`}>
          {info.getValue()}
        </span>
      ),
    }),
    columnHelper.accessor('value', {
      header: 'Valor',
      cell: info => new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(info.getValue()),
    }),
    columnHelper.accessor('type', {
      header: 'Tipo',
      cell: info => info.getValue(),
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id} className="bg-gray-50">
              {headerGroup.headers.map(header => (
                <th
                  key={header.id}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr
              key={row.id}
              className="hover:bg-gray-50 border-t border-gray-200 cursor-pointer"
              onClick={() => onRowClick(row.original)}
            >
              {row.getVisibleCells().map(cell => (
                <td
                  key={cell.id}
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                >
                  {flexRender(
                    cell.column.columnDef.cell,
                    cell.getContext()
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};