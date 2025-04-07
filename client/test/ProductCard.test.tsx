// components/__tests__/ProductCard.test.tsx
import { render, screen } from "@testing-library/react";

import { Product } from "../types/product";
import ProductCard from "../components/ProductCard";

// Mock next/image
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}));

const mockProduct: Product = {
  id: 1,
  name: "Energy saving",
  power: "25W",
  description:
    "Available in 7 watts, 9 watts, 11 watts Spiral Light bulb in B22, bulb switches on instantly, no wait around warm start and flicker free features make for a great all purpose bulb",
  price: 1299, // Price in pennies
  quantity: 4,
  brand: "Philips",
  weight: 77,
  height: 12.6,
  width: 6.2,
  length: 6.2,
  model_code: "E27 ES",
  colour: "Cool daylight",
  img_url: "https://i.ibb.co/2nzwxnQ/bulb.png",
};

describe("ProductCard", () => {
  it("renders product image with correct attributes", () => {
    render(<ProductCard product={mockProduct} />);

    const image = screen.getByRole("img", { name: mockProduct.name });
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", mockProduct.img_url);
  });

  it("renders product name with correct styling", () => {
    render(<ProductCard product={mockProduct} />);

    const productName = screen.getByText(mockProduct.name);
    expect(productName).toBeInTheDocument();
    expect(productName).toHaveClass("text-4xl");
    expect(productName).toHaveClass("font-bold");
    expect(productName).toHaveClass("mb-2");
  });

  it("renders product details with correct styling", () => {
    render(<ProductCard product={mockProduct} />);

    const productDetails = screen.getByText(
      `${mockProduct.power} // Packet of ${mockProduct.quantity}`
    );
    expect(productDetails).toBeInTheDocument();
    expect(productDetails).toHaveClass("text-xl");
    expect(productDetails).toHaveClass("text-[var(--purpleHaze)]");
    expect(productDetails).toHaveClass("mb-6");
  });
});
