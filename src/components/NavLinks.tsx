import Link from "next/link";
import { Category } from "@/types/type";

const NavLinks = async (): Promise<React.JSX.Element> => {
 const res = await fetch("https://api.api-store.workers.dev/api/bazardor/categories", {
  next: { revalidate: 3600 },
});
  const data: Category[] = await res.json();

  return (
    <div className="container mx-auto flex gap-3 overflow-x-auto py-3">
      
      {data.map((item) => (
       
        <Link
          key={item.id}
          href={`/category/${item.slug}`}
          className="btn btn-sm btn-ghost"
          
        >
          
          <span>{item.icon}</span>
          <span>{item.nameBn}</span>
        </Link>
      ))}
    </div>
  );
};

export default NavLinks;