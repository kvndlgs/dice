import React from 'react';
import { navItems } from './Layout';

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-800 border-r border-gray-700">
      <nav className="mt-8">
        <div className="px-4 space-y-2">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-700 rounded-md transition-colors"
            >
              <item.icon className="h-5 w-5 mr-3" />
              {item.label}
            </a>
          ))}
        </div>
      </nav>
    </aside>
  );
}