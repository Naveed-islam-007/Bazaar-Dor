import Image from 'next/image';
import React from 'react';

const Banner = () => {
    return (
        <div>
            <section className="bg-[#f0f5f0] px-8 py-8">
      <div className="container mx-auto flex items-center justify-between rounded-2xl border border-gray-200 bg-[#fbfdfb] px-6 py-12 md:px-10">

        {/* Left side */}
        <div className="max-w-xl">
          <span className="rounded-full bg-[#e1f3e5] px-3 py-1 text-xs text-green-700">
            শুক্রবার, ৯ অক্টোবর, ২০২৬
          </span>

          <h1 className="mt-3 text-2xl font-bold text-[#26352b] md:text-3xl">
            আজকের বাজারের দাম এক নজরে
          </h1>

          <p className="mt-3 text-xs leading-5 text-gray-500">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম –
            বাজারভিত্তিক বিশ্লেষণ, ট্রেন্ড, সর্বনিম্ন-সর্বোচ্চ
            এবং দামের পরিবর্তন এক জায়গায়।
          </p>

          <button className="mt-4 rounded-md bg-green-700 px-4 py-2 text-xs font-semibold text-white shadow hover:bg-green-800">
            সব দাম দেখুন
          </button>
        </div>

        {/* Right side */}
        <div className="ml-4 hidden shrink-0 sm:block">
          <Image
            src="/bazar-hero.png"
            alt="Vegetable basket"
            width={180}
            height={140}
            className="object-contain"
          />
        </div>

      </div>
    </section> 
        </div>
    );
};

export default Banner;