import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Basket from "../components/Basket";
import { Product } from "../types/product";

const mockProduct: Product = {
  id: 1,
  name: "Energy saving",
  power: "25W",
  description:
    "Available in 7 watts, 9 watts, 11 watts Spiral Light bulb in B22, bulb switches on instantly, no wait around warm start and flicker free features make for a great all purpose bulb",
  price: 1299,
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

describe("Basket Component", () => {
  it("toggles basket view and displays product info", async () => {
    render(<Basket itemCount={1} product={mockProduct} quantity={2} />);

    expect(screen.getByText("1")).toBeInTheDocument();

    expect(screen.queryByText("Your Basket")).not.toBeInTheDocument();

    const basketButton = screen.getByRole("button", { name: /view basket/i });
    fireEvent.click(basketButton);

    await waitFor(() =>
      expect(screen.getByText("Your Basket")).toBeInTheDocument()
    );

    expect(screen.getByText(/energy saving/i)).toBeInTheDocument();
    expect(screen.getByText(/Qty: 2/i)).toBeInTheDocument();

    const priceElement = screen.getByTestId("product-price");

    expect(priceElement).toBeInTheDocument();
    expect(priceElement.textContent).toBe("£25.98");

    const closeButton = screen.getByRole("button", { name: /close basket/i });
    fireEvent.click(closeButton);

    expect(screen.queryByText("Your Basket")).not.toBeInTheDocument();
  });

  it("does not show basket content when itemCount is 0", () => {
    render(<Basket itemCount={0} product={mockProduct} quantity={2} />);

    const basketButton = screen.getByRole("button", { name: /view basket/i });
    fireEvent.click(basketButton);

    expect(screen.queryByText("Your Basket")).not.toBeInTheDocument();
  });

  it("should be able to add items to the basket", () => {
    render(<Basket itemCount={1} product={mockProduct} quantity={2} />);

    expect(screen.queryByText("Your Basket")).not.toBeInTheDocument();

    const basketButton = screen.getByRole("button", { name: /view basket/i });
    fireEvent.click(basketButton);

    expect(screen.getByText("Your Basket")).toBeInTheDocument();
    expect(screen.getByText("Energy saving")).toBeInTheDocument();
    expect(screen.getByText(/Qty: 2/i)).toBeInTheDocument();

    const priceElement = screen.getByTestId("product-price");
    expect(priceElement).toBeInTheDocument();
    expect(priceElement.textContent).toBe("£25.98");

    expect(screen.getByText("Total:")).toBeInTheDocument();
  });
});
