import type { Product } from "../types/product";
import Footer from "./footer";

interface ProductDetailsProps {
  product: Product;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  return (
    <div>
      {/* Description */}
      <div className="mb-6 bg-[var(--hemocyanin)] py-6 px-6">
        <div className="max-w-md mx-auto">
          <h2 className="text-3xl font-bold mb-4">Description</h2>
          <p className="text-lg">{product.description}</p>
        </div>
      </div>

      {/* Specifications */}
      <div className="mb-6 px-6">
        <div className="max-w-md mx-auto">
          <h2 className="text-3xl font-bold mb-4">Specifications</h2>
          <div className="space-y-4">
            {[
              { name: "Brand", value: product.brand },
              { name: "Item weight (g)", value: product?.weight?.toString() },
              {
                name: "Dimensions (cm)",
                value: `${product.height} x ${product.width} x ${product.length}`,
              },
              { name: "Item Model number", value: product.model_code },
              { name: "Colour", value: product.colour },
            ].map((spec, index) => (
              <div key={index} className="flex justify-between py-2">
                <span className="text-lg">{spec.name}</span>
                <span className="text-lg">{spec.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
