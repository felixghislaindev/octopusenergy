import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Basket from "../components/Basket"; // adjust the path if necessary
import { Product } from "../types/product";

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

describe("Basket Component", () => {
  it("toggles basket view and displays product info", async () => {
    render(<Basket itemCount={1} product={mockProduct} quantity={2} />);

    // Basket badge is shown
    expect(screen.getByText("1")).toBeInTheDocument();

    // Basket should not be open initially
    expect(screen.queryByText("Your Basket")).not.toBeInTheDocument();

    // Open basket
    const basketButton = screen.getByRole("button", { name: /view basket/i });
    fireEvent.click(basketButton);

    // Ensure basket content is visible
    await waitFor(() =>
      expect(screen.getByText("Your Basket")).toBeInTheDocument()
    );

    // Check product name and quantity
    expect(screen.getByText(/energy saving/i)).toBeInTheDocument();
    expect(screen.getByText(/Qty: 2/i)).toBeInTheDocument();

    const priceElement = screen.getByTestId("product-price");

    // Assert that the price element contains the correct formatted price
    expect(priceElement).toBeInTheDocument();
    expect(priceElement.textContent).toBe("£25.98");

    // Close the basket
    const closeButton = screen.getByRole("button", { name: /close basket/i });
    fireEvent.click(closeButton);

    expect(screen.queryByText("Your Basket")).not.toBeInTheDocument();
  });

  it("does not show basket content when itemCount is 0", () => {
    render(<Basket itemCount={0} product={mockProduct} quantity={2} />);

    // Basket icon still renders
    const basketButton = screen.getByRole("button", { name: /view basket/i });
    fireEvent.click(basketButton);

    // Basket content should NOT render
    expect(screen.queryByText("Your Basket")).not.toBeInTheDocument();
  });

  it("should be able to add items to the basket", () => {
    // Render the basket with product and quantity
    render(<Basket itemCount={1} product={mockProduct} quantity={2} />);

    // Ensure that the basket is not open initially
    expect(screen.queryByText("Your Basket")).not.toBeInTheDocument();

    // Simulate clicking the "View Basket" button to open the basket
    const basketButton = screen.getByRole("button", { name: /view basket/i });
    fireEvent.click(basketButton);

    // After clicking, the basket should open, and the product should be displayed
    expect(screen.getByText("Your Basket")).toBeInTheDocument();
    expect(screen.getByText("Energy saving")).toBeInTheDocument();
    expect(screen.getByText(/Qty: 2/i)).toBeInTheDocument();

    const priceElement = screen.getByTestId("product-price");
    expect(priceElement).toBeInTheDocument();
    expect(priceElement.textContent).toBe("£25.98");

    // Optionally, check for the total price if needed
    expect(screen.getByText("Total:")).toBeInTheDocument();
  });
});
