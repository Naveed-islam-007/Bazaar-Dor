import AllPro from "@/components/AllPro";
import Banner from "@/components/Banner";
import Marquee from "@/components/Marquee";
import PriceDec from "@/components/PriceDec";
import PriceInc from "@/components/PriceInc";

export default function Home() {
  return (
    <div>
      <Marquee></Marquee>
      <Banner></Banner>
      <PriceInc></PriceInc>
      <PriceDec></PriceDec>
      <AllPro></AllPro>
    </div>
  );
}