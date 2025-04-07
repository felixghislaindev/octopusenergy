import { render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Product from "../pages/product";
import { GET_PRODUCT } from "../graphql/queries";
import { customMockProvider } from "../utils/customMockProvider";

const mocks = [
  {
    request: {
      query: GET_PRODUCT,
      variables: { id: "1" },
    },
    result: {
      data: {
        Product: {
          id: "1",
          name: "Test Bulb",
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
        },
      },
    },
  },
];

describe("Product interactions", () => {
  test("should be able to increase and decrease product quantity", async () => {
    const { getByText, getByTitle, findByText } = render(
      customMockProvider(mocks, <Product />)
    );

    await findByText("Test Bulb");

    const increaseQuantity = getByText("+");
    const currentQuantity = getByTitle("Current quantity");

    expect(currentQuantity).toHaveTextContent("1");

    fireEvent.click(increaseQuantity);
    expect(currentQuantity).toHaveTextContent("2");

    const decreaseQuantity = getByText("-");
    fireEvent.click(decreaseQuantity);
    expect(currentQuantity).toHaveTextContent("1");
  });

  test("should be able to add items to the basket", async () => {
    const { getByText, getByTitle, findByText } = render(
      customMockProvider(mocks, <Product />)
    );

    await findByText("Test Bulb");

    const increaseQuantity = getByText("+");
    const currentQuantity = getByTitle("Current quantity");

    fireEvent.click(increaseQuantity);
    fireEvent.click(increaseQuantity);
    fireEvent.click(increaseQuantity);

    expect(currentQuantity).toHaveTextContent("4");

    const addToCartButton = getByText("Add to cart");
    fireEvent.click(addToCartButton);

    const basketItems = getByTitle("Basket items");
    expect(basketItems).toHaveTextContent("4");
  });
});
