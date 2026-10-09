import { Product } from '@/types/type';
import React from 'react';

const PriceDec = async() => {
    const res = await fetch('https://api.abcz.workers.dev/api/bazardor/products');
      const data: Product[] = await res.json();
    
      const TopDec = data
        ?.filter((d) => d?.change?.dir === 'up')
        .sort((a, b) => a.change.pct - b.change.pct)
        .slice(0, 6);
    return (
        <div className='container mx-auto mt-20 mb-20'>
            <p className='font-semibold text-xl mb-4 text-gray-800'>আজ দাম কমেছে</p>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {TopDec?.map((it) => (
          <div
            key={it.id}
            className="bg-[#f8fbf8] border border-gray-100 rounded-3xl p-4 flex flex-col justify-between shadow-sm"
          >
            
            <div className="flex items-center gap-7">
              <div className="w-14 h-14 bg-[#edf3ed] rounded-2xl flex items-center justify-center relative overflow-hidden flex-shrink-0 text-2xl">
              <p>{it.image}</p>
               
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg leading-tight">
                  {it.nameBn}
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  প্রতি {it.unit === 'kg' ? 'কেজি' : it.unit === 'litre' ? 'লিটার' : it.unit === 'dozen' ? 'ডজন' : it.unit}
                </p>
              </div>
            </div>

            <div className="flex items-end justify-between mt-5">
              <div>
                <p className="text-xs text-gray-500 mb-0.5">আজকের দাম</p>
                <p className="text-xl font-bold text-gray-900">
                  {it.today} <span className="text-sm font-medium">টাকা</span>
                </p>
              </div>

              <div className="flex items-center gap-1 bg-[#fef2f2] text-[#dc2626] px-3 py-1 rounded-full text-xs font-bold">
                <span>▲</span>
                <span>{it.change?.pct}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
        </div>
    );
};

export default PriceDec;