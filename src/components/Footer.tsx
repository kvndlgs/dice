import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-800 border-t border-gray-700 py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Dice Game. All rights reserved.
          </div>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="/terms" className="text-gray-400 hover:text-white text-sm">Terms</a>
            <a href="/privacy" className="text-gray-400 hover:text-white text-sm">Privacy</a>
            <a href="/contact" className="text-gray-400 hover:text-white text-sm">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}