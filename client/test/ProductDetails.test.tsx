// components/__tests__/ProductDetails.test.tsx
import { render, screen } from "@testing-library/react";
import { Product } from "../types/product";
import ProductDetails from "../components/ProductDetails";

const mockProduct: Product = {
  id: 1,
  name: "Energy Saving Bulb",
  power: "25W",
  description: "Available in 7 watts, 9 watts, 11 watts Spiral Light bulb",
  price: 1299,
  quantity: 4,
  brand: "Philips",
  weight: 77,
  height: 12.6,
  width: 6.2,
  length: 6.2,
  model_code: "E27 ES",
  colour: "Cool daylight",
  img_url: "https://example.com/bulb.png",
};

describe("ProductDetails", () => {
  it("renders product description", () => {
    render(<ProductDetails product={mockProduct} />);

    expect(screen.getByText("Description")).toBeInTheDocument();
    expect(screen.getByText(mockProduct.description)).toBeInTheDocument();
  });

  it("renders all specifications", () => {
    render(<ProductDetails product={mockProduct} />);

    expect(screen.getByText("Specifications")).toBeInTheDocument();

    const specs = [
      { label: "Brand", value: mockProduct.brand },
      { label: "Item weight (g)", value: mockProduct.weight.toString() },
      {
        label: "Dimensions (cm)",
        value: `${mockProduct.height} x ${mockProduct.width} x ${mockProduct.length}`,
      },
      { label: "Item Model number", value: mockProduct.model_code },
      { label: "Colour", value: mockProduct.colour },
    ];

    specs.forEach((spec) => {
      const labelElement = screen.getByText(spec.label);
      expect(labelElement).toBeInTheDocument();

      const row = labelElement.closest("div");
      expect(row).toHaveTextContent(spec.value);
    });
  });
});
