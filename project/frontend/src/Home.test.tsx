/* eslint-disable testing-library/no-debugging-utils */
import { render, screen } from "@testing-library/react";
import { Home } from "./pages/Home";

describe("render Home", () => {
  it("should render all elements", () => {
    render(<Home />);

    screen.debug();
  });
});
