import { fireEvent, render, screen } from "@testing-library/react"
import { describe, expect, test } from "vitest"
import { ItemCounter } from "../ItemCounter"

describe("ItemCounter", () => {
  test("should render with default values", () => {
    const name = "Test Item";

    render(<ItemCounter name={name} />);
    expect(screen.getByText(name)).toBeDefined();
  });

  test("should render with custom quantity", () => {
    const name = "Test Item";
    const quantity = 5;

    render(<ItemCounter name={name} quantity={quantity} />);
    expect(screen.getByText(quantity)).toBeDefined();
  });

  test("should increase count when +1 button is clicked", async () => {
    const name = "Test Item";
    const quantity = 2;

    render(<ItemCounter name={name} quantity={quantity} />);

    const [buttonAdd] = screen.getAllByRole("button");
    fireEvent.click(buttonAdd);
    expect(screen.getByText(quantity + 1)).toBeDefined();
  });

  test("should decrease count when -1 button is clicked", async () => {
    const name = "Test Item";
    const quantity = 2;

    render(<ItemCounter name={name} quantity={quantity} />);

    const [_, buttonSubtract] = screen.getAllByRole("button");
    fireEvent.click(buttonSubtract);
    expect(screen.getByText(quantity - 1)).toBeDefined();
  });

  test("should not decrease count below 1", async () => {
    const name = "Test Item";
    const quantity = 1;

    render(<ItemCounter name={name} quantity={quantity} />);

    const [_, buttonSubtract] = screen.getAllByRole("button");
    fireEvent.click(buttonSubtract);
    expect(screen.getByText(1)).toBeDefined();
  });
});
