"use client";

import { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import type { Product } from "../types/product";

interface BasketProps {
  itemCount: number;
  product: Product | null;
  quantity: number;
}

export default function Basket({ itemCount, product, quantity }: BasketProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleBasket = () => {
    setIsOpen(!isOpen);
  };

  // Format price from pennies to pounds
  const formatPrice = (priceInPennies: number) => {
    return (priceInPennies / 100).toFixed(2);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleBasket}
        className="bg-transparent border-none p-0 cursor-pointer"
        aria-label="View basket"
      >
        <Image src="/basket.svg" alt="Basket" width={32} height={32} />
        {itemCount > 0 && (
          <span
            className="absolute -top-1 -right-1 bg-[var(--sohoLights)] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
            title="Basket items"
          >
            {itemCount}
          </span>
        )}
      </button>

      {isOpen && itemCount > 0 && (
        <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg z-10 text-[var(--siphon)]">
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg">Your Basket</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="bg-transparent border-none p-0 cursor-pointer"
                aria-label="Close basket"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {product && (
              <div className="border-b pb-4 mb-4">
                <div className="flex items-start gap-3">
                  <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                    <img
                      src={product.img_url || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-grow">
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-gray-600">Qty: {quantity}</p>
                    <p className="font-bold mt-1" data-testid="product-price">
                      £{formatPrice(product.price * quantity)}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-between font-bold">
              <span>Total:</span>
              <span>
                £{product ? formatPrice(product.price * quantity) : "0.00"}
              </span>
            </div>

            <button className="w-full mt-4 py-2 bg-[var(--sohoLights)] text-white font-bold rounded">
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
