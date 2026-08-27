import { fireEvent, render, screen } from "@testing-library/react"
import { describe, expect, test } from "vitest"
import { MyCounterApp } from "../MyCounterApp"

describe("MyCounterApp", () => {
  test("should render the component", () => {
    render(<MyCounterApp />);

    expect(screen.getByRole("heading", { level: 1 }).innerHTML).toContain(
      "counter: 10",
    );
    expect(screen.getByRole("button", { name: "+1" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "-1" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Reset" })).toBeInTheDocument();
  });

  test("should increment the counter", async () => {
    render(<MyCounterApp />);
    const addButton = screen.getByRole("button", { name: "+1" });
    await fireEvent.click(addButton);

    expect(screen.getByRole("heading", { level: 1 }).innerHTML).toContain(
      "counter: 11",
    );
  });
});
