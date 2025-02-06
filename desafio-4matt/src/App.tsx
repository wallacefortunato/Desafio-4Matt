import { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { MetricCard } from './components/MetricCard';
import { ContractsTable } from './components/ContractsTable';
import { Charts } from './components/Charts';
import { AddContractModal } from './components/AddContractModal';
import { ContractDetailsModal } from './components/ContractDetailsModal';
import { GlobalFilters } from './components/GlobalFilters';
import { useContractStore } from './store/useContractStore';
import { FileText, Users, AlertCircle, DollarSign, Plus } from 'lucide-react';
import { ContractFormData, Contract } from './types/contract';
import { parseISO } from 'date-fns';

function App() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedContract, setSelectedContract] = useState<Contract | null>(null);
  const { 
    contracts,
    filteredContracts,
    dateRange,
    selectedStatus,
    selectedType,
    getActiveContracts,
    getNearExpiryContracts,
    getTotalContractValue,
    addContract,
    setDateRange,
    setSelectedStatus,
    setSelectedType,
    applyFilters
  } = useContractStore();

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  const handleAddContract = (data: ContractFormData) => {
    addContract({
      name: data.name,
      clientName: data.clientName,
      startDate: parseISO(data.startDate),
      endDate: parseISO(data.endDate),
      value: Number(data.value),
      type: data.type,
    });
  };

  const handleRowClick = (contract: Contract) => {
    setSelectedContract(contract);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      
      <main className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard de Contratos</h1>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="h-5 w-5 mr-2" />
            Novo Contrato
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div onClick={() => setSelectedStatus('Todos')} className="cursor-pointer">
            <MetricCard
              title="Total de Contratos"
              value={contracts.length}
              icon={FileText}
            />
          </div>
          <div onClick={() => setSelectedStatus('Ativo')} className="cursor-pointer">
            <MetricCard
              title="Contratos Ativos"
              value={getActiveContracts().length}
              icon={Users}
            />
          </div>
          <div onClick={() => setSelectedStatus('Próximo ao Vencimento')} className="cursor-pointer">
            <MetricCard
              title="Próximos ao Vencimento"
              value={getNearExpiryContracts().length}
              icon={AlertCircle}
            />
          </div>
          <div onClick={() => setSelectedStatus('Ativo')} className="cursor-pointer">
            <MetricCard
              title="Valor Total (Ativos)"
              value={new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              }).format(getTotalContractValue())}
              icon={DollarSign}
            />
          </div>
        </div>

        <GlobalFilters
          dateRange={dateRange}
          selectedStatus={selectedStatus}
          selectedType={selectedType}
          onDateRangeChange={setDateRange}
          onStatusChange={setSelectedStatus}
          onTypeChange={setSelectedType}
        />

        <Charts contracts={filteredContracts.length > 0 ? filteredContracts : contracts} />

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Lista de Contratos</h2>
          <ContractsTable 
            data={filteredContracts.length > 0 ? filteredContracts : contracts}
            onRowClick={handleRowClick}
          />
        </div>

        <AddContractModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSubmit={handleAddContract}
        />

        <ContractDetailsModal
          contract={selectedContract}
          onClose={() => setSelectedContract(null)}
        />
      </main>
    </div>
  );
}

export default App;