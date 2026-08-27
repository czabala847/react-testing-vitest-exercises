import { fireEvent, render, screen } from "@testing-library/react"
import { describe, expect, test, vi } from "vitest"
import { MyCounterApp } from "../MyCounterApp"

const handleAddMock = vi.fn();
const handleSubtractMock = vi.fn();
const handleResetMock = vi.fn();

vi.mock("../../hooks/useCounter", () => ({
  useCounter: () => ({
    counter: 40,
    handleAdd: handleAddMock,
    handleSubtract: handleSubtractMock,
    handleReset: handleResetMock,
  }),
}));

describe("MyCounterApp", () => {
  test("should render the component", () => {
    render(<MyCounterApp />);

    expect(screen.getByRole("heading", { level: 1 }).innerHTML).toContain(
      "counter: 40",
    );

    expect(screen.getByRole("button", { name: "+1" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "-1" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Reset" })).toBeInTheDocument();
  });

  test("should call handleAdd when the +1 button is clicked", async () => {
    render(<MyCounterApp />);
    const addButton = screen.getByRole("button", { name: "+1" });
    await fireEvent.click(addButton);

    expect(handleAddMock).toHaveBeenCalled();
    expect(handleSubtractMock).not.toHaveBeenCalled();
    expect(handleResetMock).not.toHaveBeenCalled();
  });
});
