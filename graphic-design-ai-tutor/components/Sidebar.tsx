
import React from 'react';
import { CourseModule } from '../types';
import { PsIcon, AiIcon, IdIcon, GeneralIcon } from './icons/AdobeIcons';

interface SidebarProps {
  modules: CourseModule[];
  onSelectModule: (module: CourseModule) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const softwareIcon = (software: CourseModule['software']) => {
  switch (software) {
    case 'photoshop':
      return <PsIcon className="w-6 h-6" />;
    case 'illustrator':
      return <AiIcon className="w-6 h-6" />;
    case 'indesign':
      return <IdIcon className="w-6 h-6" />;
    default:
      return <GeneralIcon className="w-6 h-6" />;
  }
};

export const Sidebar: React.FC<SidebarProps> = ({ modules, onSelectModule, isOpen, setIsOpen }) => {
  return (
    <>
      <div className={`fixed inset-0 bg-gray-900/50 z-20 md:hidden transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsOpen(false)}></div>
      <aside className={`absolute md:relative flex flex-col z-30 w-80 md:w-96 bg-gray-900 border-r border-gray-700/50 h-full transition-transform transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
        <div className="p-6 border-b border-gray-700/50 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">Design Course</h1>
          <button onClick={() => setIsOpen(false)} className="p-2 md:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {modules.map((module) => (
            <button
              key={module.id}
              onClick={() => onSelectModule(module)}
              className="w-full text-left p-4 rounded-lg hover:bg-indigo-600/20 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 group"
            >
              <div className="flex items-center gap-4">
                <div className="p-2 bg-gray-800 rounded-md group-hover:bg-indigo-600/30 transition-colors">
                    {softwareIcon(module.software)}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-100">{module.title}</h3>
                  <p className="text-sm text-gray-400">{module.description}</p>
                </div>
              </div>
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-700/50 text-center text-xs text-gray-500">
            Powered by Gemini
        </div>
      </aside>
    </>
  );
};
