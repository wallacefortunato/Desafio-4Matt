export interface Contract {
    id: string;
    name: string;
    clientName: string;
    startDate: Date;
    endDate: Date;
    status: 'Ativo' | 'Expirado' | 'Pendente de Renovação' | 'Próximo ao Vencimento';
    value: number;
    type: string;
  }
  
  export interface ContractFormData {
    name: string;
    clientName: string;
    startDate: string;
    endDate: string;
    value: string;
    type: string;
  }