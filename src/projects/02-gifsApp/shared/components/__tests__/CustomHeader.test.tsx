import { render, screen } from "@testing-library/react"
import { describe, expect, test } from "vitest"
import { CustomHeader } from "../CustomHeader"

describe("CustomHeader", () => {
    const title = "Test Title";
  test("should render the title correct", () => {
    render(<CustomHeader title={title} />);

    const titleElement = screen.getByText(title);
    expect(titleElement).toBeInTheDocument();
  });

    test("should render the description correct", () => {
    const description = "Test Description";
    render(<CustomHeader title={title} description={description} />);

    const descriptionElement = screen.getByText(description);
    expect(descriptionElement).toBeInTheDocument();
  });

  test("should not render the description when it is not provided", () => {
    render(<CustomHeader title={title} />);

    const paragraphElement = screen.queryByRole("paragraph");
    expect(paragraphElement).not.toBeInTheDocument();
  })
});
