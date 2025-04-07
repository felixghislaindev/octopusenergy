// components/__tests__/QuantitySelector.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import QuantitySelector from "../components/QuantitySelector";

describe("QuantitySelector", () => {
  const mockIncrease = jest.fn();
  const mockDecrease = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders with initial quantity", () => {
    render(
      <QuantitySelector
        quantity={3}
        onIncrease={mockIncrease}
        onDecrease={mockDecrease}
      />
    );

    expect(screen.getByText("Qty")).toBeInTheDocument();
    expect(screen.getByTitle("Current quantity")).toHaveTextContent("3");
  });

  it("calls onIncrease when + button is clicked", () => {
    render(
      <QuantitySelector
        quantity={1}
        onIncrease={mockIncrease}
        onDecrease={mockDecrease}
      />
    );

    fireEvent.click(screen.getByLabelText("Increase quantity"));
    expect(mockIncrease).toHaveBeenCalledTimes(1);
  });

  it("calls onDecrease when - button is clicked", () => {
    render(
      <QuantitySelector
        quantity={2}
        onIncrease={mockIncrease}
        onDecrease={mockDecrease}
      />
    );

    fireEvent.click(screen.getByLabelText("Decrease quantity"));
    expect(mockDecrease).toHaveBeenCalledTimes(1);
  });

  it("has correct button colors", () => {
    render(
      <QuantitySelector
        quantity={1}
        onIncrease={mockIncrease}
        onDecrease={mockDecrease}
      />
    );

    const increaseButton = screen.getByLabelText("Increase quantity");
    const decreaseButton = screen.getByLabelText("Decrease quantity");

    expect(increaseButton).toHaveClass("bg-[var(--sohoLights)]");
    expect(decreaseButton).toHaveClass("bg-[var(--plum)]");
  });
});
