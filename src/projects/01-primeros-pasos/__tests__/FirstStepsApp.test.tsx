import { render, screen } from "@testing-library/react"
import { afterEach, describe, expect, test, vi } from "vitest"
import { FirstStepsApp } from "../FirstStepsApp"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const mockItemCounter = vi.fn((props: unknown) => {
  return <div data-testid="item-counter" />;
});

// vi.mock("../shopping-cart/ItemCounter", () => ({
//   ItemCounter: () => <div data-testid="item-counter" />,
// }));

vi.mock("../shopping-cart/ItemCounter", () => ({
  ItemCounter: (props: unknown) => mockItemCounter(props),
}));

describe("FirstStepsApp", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  test("should render the correct number of ItemCounter components", () => {
    render(<FirstStepsApp />);

    const itemCounterElements = screen.getAllByTestId("item-counter");

    expect(itemCounterElements).toHaveLength(3);
  });

  test("should call ItemCounter with the correct props", () => {
    render(<FirstStepsApp />);

    expect(mockItemCounter).toHaveBeenCalledTimes(3);
    expect(mockItemCounter).toHaveBeenCalledWith({
      name: "Nintendo Switch 2",
      quantity: 1,
    });
    expect(mockItemCounter).toHaveBeenCalledWith({
      name: "Pro Controller",
      quantity: 2,
    });
    expect(mockItemCounter).toHaveBeenCalledWith({
      name: "Super Smash",
      quantity: 5,
    });
  });
});
