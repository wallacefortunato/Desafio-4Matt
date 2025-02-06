import React from 'react';
import { Contract } from '../types/contract';
import { format } from 'date-fns';
import { X } from 'lucide-react';

interface ContractDetailsModalProps {
  contract: Contract | null;
  onClose: () => void;
}

export const ContractDetailsModal: React.FC<ContractDetailsModalProps> = ({
  contract,
  onClose,
}) => {
  if (!contract) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-2xl w-full mx-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Detalhes do Contrato</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-medium text-gray-500">ID do Contrato</h3>
            <p className="mt-1 text-lg">{contract.id}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Nome do Contrato</h3>
            <p className="mt-1 text-lg">{contract.name}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Cliente/Fornecedor</h3>
            <p className="mt-1 text-lg">{contract.clientName}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Tipo</h3>
            <p className="mt-1 text-lg">{contract.type}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Data de Início</h3>
            <p className="mt-1 text-lg">{format(contract.startDate, 'dd/MM/yyyy')}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Data de Vencimento</h3>
            <p className="mt-1 text-lg">{format(contract.endDate, 'dd/MM/yyyy')}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Status</h3>
            <span className={`inline-block mt-1 px-3 py-1 rounded-full text-sm ${
              contract.status === 'Ativo' ? 'bg-green-100 text-green-800' :
              contract.status === 'Expirado' ? 'bg-red-100 text-red-800' :
              contract.status === 'Pendente de Renovação' ? 'bg-yellow-100 text-yellow-800' :
              'bg-blue-100 text-blue-800'
            }`}>
              {contract.status}
            </span>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Valor</h3>
            <p className="mt-1 text-lg">
              {new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              }).format(contract.value)}
            </p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t">
          <h3 className="text-lg font-semibold mb-4">Informações Adicionais</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-medium text-gray-500">Duração do Contrato</h4>
              <p className="mt-1 text-lg">
                {Math.ceil((contract.endDate.getTime() - contract.startDate.getTime()) / (1000 * 60 * 60 * 24 * 30))} meses
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500">Valor Mensal Médio</h4>
              <p className="mt-1 text-lg">
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                }).format(contract.value / Math.ceil((contract.endDate.getTime() - contract.startDate.getTime()) / (1000 * 60 * 60 * 24 * 30)))}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};