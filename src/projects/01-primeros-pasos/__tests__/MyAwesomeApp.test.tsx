import { render, screen } from "@testing-library/react"
import { describe, expect, test } from "vitest"
import { MyAwesomeApp } from "../MyAwesomeApp"

describe("MyAwesomeApp", () => {
  test("should render firstName and lastName", () => {
    render(<MyAwesomeApp />);

    const h1 = screen.getByTestId("name");
    const h3 = screen.getByTestId("lastName");

    expect(h1).toBeInTheDocument();
    expect(h3).toBeInTheDocument();
  });

  test("should match snapshot", () => {
    const { container } = render(<MyAwesomeApp />);
    expect(container).toMatchSnapshot();
  });
});
