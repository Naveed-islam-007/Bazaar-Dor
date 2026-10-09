import { getProducts } from "@/lib/api";
import React from "react";

const AllPro = async () => {
  const data = await getProducts();

  return (
    <div className="container mx-auto mt-20 mb-10">
      <p className="font-semibold text-xl mb-4 text-gray-800">সব পণ্য</p>
      <p>মোট {data.length.toLocaleString("bn-BD")}টি পণ্য দেখানো হচ্ছে</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
        {data.map((it) => (
          <div
            key={it.id}
            className="bg-[#f8fbf8] border border-gray-100 rounded-3xl p-4 flex flex-col justify-between shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 bg-[#edf3ed] rounded-2xl flex items-center justify-center flex-shrink-0 text-2xl">
                <p>{it.image}</p>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 text-lg leading-tight">
                  {it.nameBn}
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  প্রতি{" "}
                  {it.unit === "kg"
                    ? "কেজি"
                    : it.unit === "litre"
                    ? "লিটার"
                    : it.unit === "dozen"
                    ? "ডজন"
                    : it.unit}
                </p>
              </div>
            </div>

            <div className="flex items-end justify-between mt-5">
              <div>
                <p className="text-xs text-gray-500 mb-0.5">আজকের দাম</p>
                <p className="text-xl font-bold text-gray-900">
                  {it.today ?? "—"} <span className="text-sm font-medium">টাকা</span>
                </p>
              </div>

              {typeof it.change?.pct === "number" && (
                <div
                  className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${
                    it.change.pct > 0
                      ? "bg-[#fef2f2] text-[#dc2626]"
                      : it.change.pct < 0
                      ? "bg-[#ecfdf5] text-[#16a34a]"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  <span>
                    {it.change.pct > 0 ? "▲" : it.change.pct < 0 ? "▼" : "-"}
                  </span>
                  <span>
                    {it.change.pct === 0 ? "0%" : `${Math.abs(it.change.pct)}%`}
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllPro;