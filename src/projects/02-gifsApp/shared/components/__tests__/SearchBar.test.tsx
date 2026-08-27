import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import { describe, expect, test, vi } from "vitest"
import { SearchBar } from "../SearchBar"

describe("SearchBar", () => {
  test("should render searchbar correctly", () => {
    render(<SearchBar onQuery={() => {}} />);

    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  test("should call onQuery with the correct value after 700ms", async () => {
    const onQueryMock = vi.fn();
    render(<SearchBar onQuery={onQueryMock} />);

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "test" } });

    expect(onQueryMock).not.toHaveBeenCalled();

    // Simulate user interaction (e.g., typing) after 700ms
    // setTimeout(() => {
    //   expect(onQueryMock).toHaveBeenCalledWith("test");
    // }, 700);

    await waitFor(() => expect(onQueryMock).toHaveBeenCalledWith("test"));
  });

  test("should call only once with the last value (debounce)", async () => {
    const onQueryMock = vi.fn();
    render(<SearchBar onQuery={onQueryMock} />);

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "t" } });
    fireEvent.change(input, { target: { value: "te" } });
    fireEvent.change(input, { target: { value: "tes" } });

    await waitFor(() => {
        expect(onQueryMock).toHaveBeenCalledTimes(1);
        expect(onQueryMock).toHaveBeenCalledWith("tes");
    });
  });
});
