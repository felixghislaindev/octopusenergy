import Image from "next/image";
import Basket from "./Basket";
import { Product } from "../types/product";

interface ProductNavbarProps {
  basketItems: number;
  product: Product | null;
}

export default function ProductNavbar({
  basketItems,
  product,
}: ProductNavbarProps) {
  return (
    <header className="flex justify-between items-center p-6 bg-[var(--siphon)]">
      <div className="text-white font-bold text-xl">
        <Image
          src="/octopus-logo.svg"
          alt="Octopus Energy"
          width={180}
          height={30}
          priority
        />
      </div>
      <Basket
        itemCount={basketItems}
        product={product}
        quantity={basketItems}
      />
    </header>
  );
}
