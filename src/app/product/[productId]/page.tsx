import Link from "next/link";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ productId: string }>;
};

type Market = {
  market: string;
  division: string;
  min: number;
  max: number;
};

type ProductDetail = {
  id: number;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: { dir: "up" | "down" | "flat"; pct: number };
  markets: Market[];
};

const bn = (n: number) => n.toLocaleString("bn-BD");
const avgOf = (m: Market) => Math.round((m.min + m.max) / 2);

const ProductDetails = async ({ params }: Props) => {
  const { productId } = await params;

  const res = await fetch(
    `https://openapi.programming-hero.com/api/bazardor/products/${productId}`,
    { next: { revalidate: 3600 } }
  );

  if (!res.ok) notFound();

  const item: ProductDetail = await res.json();
  const markets = item.markets ?? [];

  const min = markets.length ? Math.min(...markets.map((m) => m.min)) : item.today;
  const max = markets.length ? Math.max(...markets.map((m) => m.max)) : item.today;
  const avg = markets.length
    ? Math.round(markets.reduce((s, m) => s + avgOf(m), 0) / markets.length)
    : item.today;

  const stats = [
    { label: "সর্বনিম্ন দাম", value: min, color: "text-green-600", note: "সবচেয়ে কম বাজারদর" },
    { label: "সর্বোচ্চ দাম", value: max, color: "text-red-600", note: "সবচেয়ে বেশি বাজারদর" },
    { label: "গড় দাম", value: avg, color: "text-green-600", note: `প্রতি ${item.unit} এর গড়` },
  ];

  return (
    <div className="container mx-auto px-3 py-6">
      <nav className="mb-4 flex items-center gap-2 text-sm text-gray-500">
        <Link href="/">হোম</Link>
        <span>›</span>
        <Link href={`/category/${item.category}`}>{item.categoryNameBn}</Link>
        <span>›</span>
        <span>{item.nameBn}</span>
      </nav>

      <div className="flex items-center justify-between gap-3 rounded-2xl shadow-sm bg-white p-5">
        <div className="flex items-center gap-3">
          <span className="text-4xl">{item.image}</span>
          <div>
            <h1 className="text-2xl font-bold">{item.nameBn}</h1>
            <p className="text-sm text-gray-500">
              প্রতি {item.unit} · {item.categoryNameBn}
            </p>
          </div>
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-500">আজকের দাম</p>
          <p className="text-2xl font-bold">{bn(item.today)} টাকা</p>
          {item.change.dir === "up" ? (
            <span className="text-red-600">▲ {bn(item.change.pct)}%</span>
          ) : item.change.dir === "down" ? (
            <span className="text-green-600">▼ {bn(Math.abs(item.change.pct))}%</span>
          ) : (
            <span>— ০%</span>
          )}
        </div>
      </div>

      <div className="mt-6 rounded-2xl shadow-sm bg-white p-5">
        <h2 className="mb-4 font-bold">দামের সারসংক্ষেপ</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {stats.map((s) => (
            <div key={s.label} className="rounded-2xl border border-gray-200 p-4">
              <p className="text-sm text-gray-500">{s.label}</p>
              <p className={`text-xl font-bold ${s.color}`}>{bn(s.value)} টাকা</p>
              <p className="text-sm text-gray-500">{s.note}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 rounded-2xl shadow-sm bg-white p-5">
        <h2 className="mb-4 font-bold">বাজারভিত্তিক আজকের দাম</h2>
        <div className="overflow-x-auto rounded-2xl border border-gray-200">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="p-3 font-medium">বাজার</th>
                <th className="p-3 font-medium">বিভাগ</th>
                <th className="p-3 text-right font-medium">সর্বনিম্ন</th>
                <th className="p-3 text-right font-medium">সর্বোচ্চ</th>
                <th className="p-3 text-right font-medium">গড়</th>
              </tr>
            </thead>
            <tbody>
              {markets.map((m, i) => (
                <tr key={`${m.market}-${i}`} className={i % 2 ? "bg-gray-50" : ""}>
                  <td className="p-3 font-medium">{m.market}</td>
                  <td className="p-3">{m.division}</td>
                  <td className="p-3 text-right">{bn(m.min)} টাকা</td>
                  <td className="p-3 text-right">{bn(m.max)} টাকা</td>
                  <td className="p-3 text-right font-bold">{bn(avgOf(m))} টাকা</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;