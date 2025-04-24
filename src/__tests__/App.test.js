import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../components/App";

beforeEach(() => {
  global.fetch = jest.fn((url, options) => {
    if (options?.method === "DELETE") {
      return Promise.resolve();
    }
    if (options?.method === "PATCH") {
      return Promise.resolve();
    }
    return Promise.resolve({
      json: () =>
        Promise.resolve([
          {
            id: 1,
            question: "lorem testum 1",
            answers: ["1", "2", "3", "4"],
            correctIndex: 0,
          },
          {
            id: 2,
            question: "lorem testum 2",
            answers: ["1", "2", "3", "4"],
            correctIndex: 1,
          },
        ]),
    });
  });
});

afterEach(() => {
  jest.clearAllMocks();
});

test("updates the correct answer dropdown", async () => {
  render(<App />);
  fireEvent.click(screen.getByRole("button", { name: /View Questions/i }));

  await screen.findByText("lorem testum 2");

  const dropdown = screen.getByTestId("dropdown-2"); // Use test ID for specific dropdown
  await act(async () => {
    fireEvent.change(dropdown, { target: { value: "3" } });
  });

  expect(dropdown.value).toBe("3");
});
