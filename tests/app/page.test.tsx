import { render, screen, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import Home from "../../app/page";

describe("Home page", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders the Terminal component", () => {
    render(<Home />);
    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(
      screen.getByText(
        /Rafael de Mattos - DevOps Engineer Terminal Interface/
      )
    ).toBeInTheDocument();
  });
});
