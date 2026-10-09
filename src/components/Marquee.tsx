
import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";
import { Product } from "@/types/type";

const Marquee = async () => {
  const res = await fetch(
    "https://api.abcz.workers.dev/api/bazardor/products"
  );

  const products: Product[] = await res.json();

  return (
    <div className="border-y bg-white">
      <MarqueeText className="py-2" duration={30} pauseOnHover>
        {products.slice(0, 20).map((p) => (
          <div
            key={p.id}
            className="mx-5 inline-flex items-center gap-2 text-sm hover:underline"
          >
            <span>{p.image}</span>
            <span className="font-semibold">{p.nameBn}</span>
            <span>{p.today} টাকা/KG</span>

            {p.change.dir === "up" && (
              <span className="font-bold text-red-600">
                ▲ {p.change.pct}%
              </span>
            )}

            {p.change.dir === "down" && (
              <span className="font-bold text-green-600">
                ▼ {Math.abs(p.change.pct)}%
              </span>
            )}
          </div>
        ))}
      </MarqueeText>
    </div>
  );
};

export default Marquee;