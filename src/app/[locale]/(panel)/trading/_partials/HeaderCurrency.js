import React from 'react';

const DropdownMenu = ({ children }) => {
    const [isOpen, setIsOpen] = React.useState(false);
  
    return (
      <div className="relative">
        <button
          className="flex items-center justify-between w-full px-4 py-2 text-white bg-gray-800 rounded-md focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          BTC/USDT
          <i className={`fas fa-chevron-down transform ${isOpen ? 'rotate-180' : ''}`}></i>
        </button>
  
        {isOpen && (
          <div className="absolute left-0 w-full mt-1 bg-gray-800 rounded-md shadow-lg z-10">
            {children}
          </div>
        )}
      </div>
    );
  };

function HeaderCurrency(props) {
    return (
        <div className="bg-gray-800 text-white text-xs sm:text-sm font-mono">
        {/* Desktop layout: unchanged, as a single row */}
        <div className="hidden sm:flex max-w-7xl mx-auto py-3 px-4 justify-between items-center">
          <div className="flex items-center">
            <span className="text-gray-400 mr-2">BTC/USDT</span>
            <span className="font-semibold">44,902.01</span>
          </div>
          <div className="flex items-center">
            <span className="text-green-500 mr-2">24h Change</span>
            <span className="font-semibold">444.01 0.99%</span>
          </div>
          <div className="flex items-center">
            <span className="text-gray-400 mr-2">24h High</span>
            <span className="font-semibold">45,200</span>
          </div>
          <div className="flex items-center">
            <span className="text-gray-400 mr-2">24h Low</span>
            <span className="font-semibold">43,175</span>
          </div>
          <div className="flex items-center">
            <span className="text-gray-400 mr-2">24h Vol(BTC)</span>
            <span className="font-semibold">43,293.38066</span>
          </div>
          <div className="flex items-center">
            <span className="text-gray-400 mr-2">24h Vol(USDT)</span>
            <span className="font-semibold">1,912,080,326.61</span>
          </div>
        </div>
  
        {/* Mobile layout: 4 rows with 2 columns each */}
        <div className="sm:hidden grid grid-rows-2 grid-flow-col gap-4 px-4 py-3">
          <div className="flex flex-col">
            <span className="text-gray-400">BTC/USDT</span>
            <span className="font-semibold">44,902.01</span>
          </div>
          <div className="flex flex-col">
            <span className="text-green-500">24h Change</span>
            <span className="font-semibold">444.01 0.99%</span>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-400">24h High</span>
            <span className="font-semibold">45,200</span>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-400">24h Low</span>
            <span className="font-semibold">43,175</span>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-400">24h Vol(BTC)</span>
            <span className="font-semibold">43,293.38066</span>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-400">24h Vol(USDT)</span>
            <span className="font-semibold">1,912,080,326.61</span>
          </div>
        </div>
      </div>

    );
}

export default HeaderCurrency;