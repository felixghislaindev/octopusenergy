"use client";

interface QuantitySelectorProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
}

export default function QuantitySelector({
  quantity,
  onIncrease,
  onDecrease,
}: QuantitySelectorProps) {
  return (
    <div className="flex items-center">
      <span className="mr-2 text-sm">Qty</span>
      <div className="flex items-center">
        <button
          onClick={onDecrease}
          className="w-10 h-10 rounded-full bg-[var(--plum)] text-white flex items-center justify-center text-2xl"
          aria-label="Decrease quantity"
        >
          -
        </button>
        <span className="w-8 text-center text-xl mx-2" title="Current quantity">
          {quantity}
        </span>
        <button
          onClick={onIncrease}
          className="w-10 h-10 rounded-full bg-[var(--sohoLights)] text-white flex items-center justify-center text-2xl"
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>
    </div>
  );
}
