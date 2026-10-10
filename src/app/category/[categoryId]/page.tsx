import { Product } from "@/types/type";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ categoryId: string }>;
};

const CategoryPage = async ({ params }: Props) => {
  const { categoryId } = await params;

  const res = await fetch(
    `https://api.api-store.workers.dev/api/bazardor/products?category=${categoryId}`,
    { next: { revalidate: 3600 } }
  );

  if (!res.ok) notFound();

  const data: Product[] = await res.json();

  if (!data.length) notFound();

  return (
    <div className="container mx-auto px-3 py-6">
      <div className="flex items-center gap-3 rounded-2xl shadow-sm bg-white p-5">
        <span className="text-4xl">{data[0].categoryIcon}</span>
        <div>
          <h1 className="text-2xl font-bold">{data[0].categoryNameBn}</h1>
          <p className="text-sm text-gray-500">
            {data.length.toLocaleString("bn-BD")}টি পণ্যের আজকের দাম ও পরিবর্তন
          </p>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-3 rounded-2xl shadow-sm bg-white p-4">
        <span>সাজান</span>
        <select className="select select-sm w-auto">
          <option>ডিফল্ট</option>
        </select>
      </div>

      <p className="my-6">
        মোট {data.length.toLocaleString("bn-BD")}টি পণ্য দেখানো হচ্ছে
      </p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {data.map((item) => (
          <Link key={item.id} href={`/product/${item.id}`}>
            <div className="rounded-2xl shadow-sm bg-white p-4">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{item.image}</span>
                <div>
                  <h2 className="font-bold">{item.nameBn}</h2>
                  <p className="text-sm text-gray-500">প্রতি {item.unit}</p>
                </div>
              </div>

              <p className="mt-4 text-sm text-gray-500">আজকের দাম</p>
              <div className="flex items-center justify-between">
                <p className="text-xl font-bold">
                  {item.today.toLocaleString("bn-BD")} টাকা
                </p>

                {item.change.dir === "up" ? (
                  <span className="text-red-600">▲ {item.change.pct}%</span>
                ) : item.change.dir === "down" ? (
                  <span className="text-green-600">
                    ▼ {Math.abs(item.change.pct)}%
                  </span>
                ) : (
                  <span>— 0%</span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;