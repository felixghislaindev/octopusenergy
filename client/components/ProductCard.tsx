import Image from "next/image";
import type { Product } from "../types/product";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div>
      <div className="bg-white rounded-lg p-6 mb-6">
        <Image
          src={product.img_url || "/placeholder.svg"}
          alt={product.name}
          width={400}
          height={400}
          className="w-full h-auto"
        />
      </div>

      <h1 className="text-4xl font-bold mb-2">{product.name}</h1>
      <p className="text-xl text-[var(--purpleHaze)] mb-6">
        {product.power} // Packet of {product.quantity}
      </p>
    </div>
  );
}
