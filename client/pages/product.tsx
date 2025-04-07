"use client";

import { useState, useEffect } from "react";
import { GET_PRODUCT } from "../graphql/queries";
import ProductCard from "../components/ProductCard";
import ProductDetails from "../components/ProductDetails";
import QuantitySelector from "../components/QuantitySelector";
import { useQuery } from "@apollo/client";
import { Product as ProductType } from "../types/product";
import ProductNavbar from "../components/ProductNavbar";
import Footer from "../components/Footer";

export default function Product() {
  const [product, setProduct] = useState<ProductType | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isAddingToBasket, setIsAddingToBasket] = useState(false);
  const [basketItems, setBasketItems] = useState(0);

  const { data, loading, error } = useQuery(GET_PRODUCT, {
    variables: { id: "1" },
  });

  useEffect(() => {
    if (data && data.Product) {
      setProduct(data.Product);
    }
  }, [data]);

  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () =>
    quantity > 1 && setQuantity((prev) => prev - 1);

  const addToBasket = () => {
    if (!product) return;

    setIsAddingToBasket(true);
    setBasketItems((prev) => prev + quantity);

    setTimeout(() => {
      setIsAddingToBasket(false);
    }, 500);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[var(--siphon)]">
        <p className="text-[var(--ice)]">Loading product...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[var(--siphon)]">
        <p className="text-[var(--ice)]">Failed to load product.</p>
      </div>
    );
  }

  const formatPrice = (priceInPennies: number): string =>
    (priceInPennies / 100).toFixed(2);

  return (
    <div className="min-h-screen bg-[#10002f] text-[var(--ice)] font-sans">
      <ProductNavbar basketItems={basketItems} product={product} />

      <div className="max-w-md mx-auto px-6">
        <ProductCard product={product} />

        <div className="flex justify-between items-center mb-6">
          <p className="text-3xl font-bold">£{formatPrice(product.price)}</p>
          <QuantitySelector
            quantity={quantity}
            onIncrease={increaseQuantity}
            onDecrease={decreaseQuantity}
          />
        </div>

        <button
          onClick={addToBasket}
          className="w-full py-4 bg-[var(--sohoLights)] text-white text-xl font-bold rounded-lg mb-10"
          disabled={isAddingToBasket}
        >
          {isAddingToBasket ? "Adding..." : "Add to cart"}
        </button>
      </div>

      <ProductDetails product={product} />
      {/* Footer */}
      <Footer />
    </div>
  );
}
