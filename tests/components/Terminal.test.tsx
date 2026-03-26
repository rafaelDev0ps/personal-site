import { render, screen, fireEvent, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import Terminal from "@/components/Terminal";

describe("Terminal", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  function renderAndCompleteAnimation() {
    render(<Terminal />);
    act(() => {
      vi.advanceTimersByTime(2000);
    });
  }

  it("renders the welcome message", () => {
    render(<Terminal />);
    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(
      screen.getByText(
        /Rafael de Mattos - DevOps Engineer Terminal Interface/
      )
    ).toBeInTheDocument();
  });

  it("shows the input after welcome animation completes", () => {
    renderAndCompleteAnimation();

    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.getAllByText(/rafael@devops:~\$/).length).toBeGreaterThan(0);
  });

  it("handles the help command", () => {
    renderAndCompleteAnimation();

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "help" } });
    fireEvent.submit(input.closest("form")!);

    expect(screen.getByText(/Available commands:/)).toBeInTheDocument();
  });

  it("handles the about command", () => {
    renderAndCompleteAnimation();

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "about" } });
    fireEvent.submit(input.closest("form")!);

    expect(screen.getByText(/About Rafael de Mattos/)).toBeInTheDocument();
  });

  it("handles unknown commands", () => {
    renderAndCompleteAnimation();

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "foobar" } });
    fireEvent.submit(input.closest("form")!);

    expect(
      screen.getByText(/Command not found: foobar/)
    ).toBeInTheDocument();
  });

  it("handles the resume command", () => {
    const testUrl = "https://pub-test.r2.dev/resume.pdf";
    vi.stubEnv("NEXT_PUBLIC_RESUME_URL", testUrl);
    const openSpy = vi.spyOn(window, "open").mockImplementation(() => null);
    renderAndCompleteAnimation();

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "resume" } });
    fireEvent.submit(input.closest("form")!);

    expect(screen.getByText(/Resume/)).toBeInTheDocument();
    expect(screen.getByText(/resume.pdf/)).toBeInTheDocument();
    expect(openSpy).toHaveBeenCalledWith(testUrl, "_blank");

    openSpy.mockRestore();
    vi.unstubAllEnvs();
  });

  it("handles the clear command", () => {
    renderAndCompleteAnimation();

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "clear" } });
    fireEvent.submit(input.closest("form")!);

    expect(
      screen.queryByText(
        /Rafael de Mattos - DevOps Engineer Terminal Interface/
      )
    ).not.toBeInTheDocument();
  });
});
