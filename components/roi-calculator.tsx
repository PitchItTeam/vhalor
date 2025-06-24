"use client";

import { useState } from "react";

export default function ROICalculator() {
  const [flightsPerYear, setFlightsPerYear] = useState(0);
  const savings = flightsPerYear * 2 * 65;

  return (
    <div className="bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 p-3 rounded shadow-lg backdrop-blur-sm">
      <p className="text-sm text-slate-600 mb-0 leading-relaxed">
        Calculate your potential savings with the Travhalór jacket
      </p>
      
      <div className="mb-2 flex items-center gap-2">
        <label htmlFor="flights" className="text-xs font-medium text-slate-700 uppercase tracking-wide whitespace-nowrap">
          Flights per year
        </label>
        <input
          id="flights"
          type="number"
          value={flightsPerYear}
          onChange={(e) => setFlightsPerYear(Number(e.target.value))}
          className="w-20 px-3 py-2 bg-white/80 border border-slate-200 rounded focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 placeholder-slate-400 text-slate-800 font-medium text-sm"
          placeholder="0"
          min="0"
        />
      </div>
      
      <div className="p-2 bg-gradient-to-r from-emerald-50 to-blue-50 border border-emerald-200 rounded flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-slate-700">Annual Savings:</span>
          <span className="text-lg font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
            ${savings.toLocaleString()}
          </span>
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse ml-2"></div>
        </div>
        <span className="text-sm text-slate-500 ml-0 sm:ml-2 leading-tight">
          (Based on $65/carry-on x 2 for return)
        </span>
      </div>
    </div>
  );
}