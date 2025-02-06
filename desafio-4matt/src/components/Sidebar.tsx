import React from 'react';
import { LayoutDashboard, FileText, Settings, HelpCircle } from 'lucide-react';

export const Sidebar: React.FC = () => {
  return (
    <aside className="bg-gray-800 text-white w-64 min-h-screen p-4">
      <div className="flex items-center mb-8">
        <FileText className="h-8 w-8 mr-2" />
        <h1 className="text-xl font-bold">Contratos</h1>
      </div>
      
      <nav>
        <ul className="space-y-2">
          <li>
            <a href="#" className="flex items-center space-x-2 p-2 rounded-lg bg-gray-700">
              <LayoutDashboard className="h-5 w-5" />
              <span>Dashboard</span>
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-700">
              <FileText className="h-5 w-5" />
              <span>Contratos</span>
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-700">
              <Settings className="h-5 w-5" />
              <span>Configurações</span>
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-700">
              <HelpCircle className="h-5 w-5" />
              <span>Ajuda</span>
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  );
};