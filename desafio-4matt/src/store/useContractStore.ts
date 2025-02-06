import { create } from 'zustand';
import { Contract } from '../types/contract';
import { parseISO } from 'date-fns';

const rawData = [
  {
    id: 'CT-001',
    name: 'Manutenção TI',
    clientName: 'ABC Ltda.',
    startDate: '2023-01-15',
    endDate: '2025-01-15',
    status: 'Ativo',
    value: 150000,
    type: 'Serviço'
  },
  {
    id: 'CT-002',
    name: 'Fornecimento Materiais',
    clientName: 'XYZ S.A.',
    startDate: '2022-06-10',
    endDate: '2024-06-10',
    status: 'Expirado',
    value: 200000,
    type: 'Fornecimento'
  },
  {
    id: 'CT-003',
    name: 'Consultoria Financeira',
    clientName: '123 Consulting',
    startDate: '2023-09-01',
    endDate: '2024-09-01',
    status: 'Pendente de Renovação',
    value: 100000,
    type: 'Consultoria'
  },
  {
    id: 'CT-004',
    name: 'Desenvolvimento Web',
    clientName: 'Empresa Beta',
    startDate: '2024-02-20',
    endDate: '2026-02-20',
    status: 'Ativo',
    value: 300000,
    type: 'Serviço'
  },
  {
    id: 'CT-005',
    name: 'Suporte Técnico',
    clientName: 'Fornecedor Z',
    startDate: '2023-07-01',
    endDate: '2024-07-01',
    status: 'Próximo ao Vencimento',
    value: 80000,
    type: 'Fornecimento'
  },
  {
    id: 'CT-006',
    name: 'Software ERP',
    clientName: 'Tech Solutions',
    startDate: '2022-12-10',
    endDate: '2024-12-10',
    status: 'Ativo',
    value: 250000,
    type: 'TI'
  },
  {
    id: 'CT-007',
    name: 'Consultoria RH',
    clientName: 'Alpha Corp.',
    startDate: '2023-05-05',
    endDate: '2025-05-05',
    status: 'Ativo',
    value: 175000,
    type: 'Consultoria'
  },
  {
    id: 'CT-008',
    name: 'Treinamento TI',
    clientName: 'Delta Group',
    startDate: '2023-08-15',
    endDate: '2024-08-15',
    status: 'Próximo ao Vencimento',
    value: 90000,
    type: 'Serviço'
  },
  {
    id: 'CT-009',
    name: 'Segurança Digital',
    clientName: 'Beta Tech',
    startDate: '2023-11-25',
    endDate: '2025-11-25',
    status: 'Ativo',
    value: 120000,
    type: 'TI'
  },
  {
    id: 'CT-010',
    name: 'Logística e Transporte',
    clientName: 'Global Partners',
    startDate: '2021-09-30',
    endDate: '2023-09-30',
    status: 'Expirado',
    value: 210000,
    type: 'Fornecimento'
  },
  {
    id: 'CT-011',
    name: 'Auditoria Fiscal',
    clientName: 'Compliance Corp',
    startDate: '2023-04-20',
    endDate: '2024-04-20',
    status: 'Próximo ao Vencimento',
    value: 95000,
    type: 'Consultoria'
  },
  {
    id: 'CT-012',
    name: 'Infraestrutura Cloud',
    clientName: 'CloudTech Ltda.',
    startDate: '2023-06-15',
    endDate: '2025-06-15',
    status: 'Ativo',
    value: 320000,
    type: 'TI'
  },
  {
    id: 'CT-013',
    name: 'Fornecimento de Hardware',
    clientName: 'Hardware Solutions',
    startDate: '2022-10-01',
    endDate: '2024-10-01',
    status: 'Pendente de Renovação',
    value: 180000,
    type: 'Fornecimento'
  },
  {
    id: 'CT-014',
    name: 'Consultoria Estratégica',
    clientName: 'Strategy Experts',
    startDate: '2023-12-10',
    endDate: '2026-12-10',
    status: 'Ativo',
    value: 400000,
    type: 'Consultoria'
  },
  {
    id: 'CT-015',
    name: 'Manutenção Predial',
    clientName: 'BuildTech',
    startDate: '2023-02-15',
    endDate: '2024-02-15',
    status: 'Expirado',
    value: 220000,
    type: 'Serviço'
  }
];

interface ContractStore {
  contracts: Contract[];
  addContract: (contract: Omit<Contract, 'id' | 'status'>) => void;
  getActiveContracts: () => Contract[];
  getNearExpiryContracts: () => Contract[];
  getTotalContractValue: () => number;
}

export const useContractStore = create<ContractStore>((set, get) => ({
  contracts: rawData.map(contract => ({
    ...contract,
    startDate: parseISO(contract.startDate),
    endDate: parseISO(contract.endDate),
  })),
  
  addContract: (contract) => set(state => ({
    contracts: [...state.contracts, {
      ...contract,
      id: `CT-${(state.contracts.length + 1).toString().padStart(3, '0')}`,
      status: 'Ativo'
    }]
  })),

  getActiveContracts: () => {
    return get().contracts.filter(contract => contract.status === 'Ativo');
  },

  getNearExpiryContracts: () => {
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
    
    return get().contracts.filter(contract => 
      contract.status === 'Ativo' && 
      contract.endDate <= thirtyDaysFromNow
    );
  },

  getTotalContractValue: () => {
    return get().getActiveContracts().reduce((sum, contract) => sum + contract.value, 0);
  },
}));