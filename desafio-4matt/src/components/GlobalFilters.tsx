import React from 'react';

interface GlobalFiltersProps {
  dateRange: {
    startDate: string;
    endDate: string;
  };
  selectedStatus: string;
  selectedType: string;
  onDateRangeChange: (range: { startDate: string; endDate: string }) => void;
  onStatusChange: (status: string) => void;
  onTypeChange: (type: string) => void;
}

export const GlobalFilters: React.FC<GlobalFiltersProps> = ({
  dateRange,
  selectedStatus,
  selectedType,
  onDateRangeChange,
  onStatusChange,
  onTypeChange,
}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Data Inicial
          </label>
          <input
            type="date"
            value={dateRange.startDate}
            onChange={(e) => onDateRangeChange({ ...dateRange, startDate: e.target.value })}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Data Final
          </label>
          <input
            type="date"
            value={dateRange.endDate}
            onChange={(e) => onDateRangeChange({ ...dateRange, endDate: e.target.value })}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            value={selectedStatus}
            onChange={(e) => onStatusChange(e.target.value)}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Todos</option>
            <option value="Ativo">Ativo</option>
            <option value="Expirado">Expirado</option>
            <option value="Pendente de Renovação">Pendente de Renovação</option>
            <option value="Próximo ao Vencimento">Próximo ao Vencimento</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tipo
          </label>
          <select
            value={selectedType}
            onChange={(e) => onTypeChange(e.target.value)}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Todos</option>
            <option value="Serviço">Serviço</option>
            <option value="Fornecimento">Fornecimento</option>
            <option value="Consultoria">Consultoria</option>
            <option value="TI">TI</option>
          </select>
        </div>
      </div>
    </div>
  );
};