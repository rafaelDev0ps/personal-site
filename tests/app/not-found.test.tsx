import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import NotFound from "../../app/not-found";

describe("NotFound page", () => {
  it("renders 404 heading", () => {
    render(<NotFound />);
    expect(screen.getByText("404")).toBeInTheDocument();
  });

  it("renders the error message", () => {
    render(<NotFound />);
    expect(screen.getByText("Oops! Page not found")).toBeInTheDocument();
  });

  it("has a link back to home", () => {
    render(<NotFound />);
    const link = screen.getByText("Return to Home");
    expect(link).toBeInTheDocument();
    expect(link.closest("a")).toHaveAttribute("href", "/");
  });
});
