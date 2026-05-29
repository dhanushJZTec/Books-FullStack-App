import {
  render,
  screen
} from "@testing-library/react";

import {
  BrowserRouter
} from "react-router-dom";

import BookCard from "./BookCard";

describe("BookCard Component", () => {

  const mockBook = {
    id: 1,
    title: "Atomic Habits",
    authorId: 1,
    author: {
      id: 1,
      name: "James Clear"
    }
  };

  test("renders book title", () => {

    render(
      <BrowserRouter>
        <BookCard book={mockBook} />
      </BrowserRouter>
    );

    expect(
      screen.getByText(
        "Atomic Habits"
      )
    ).toBeInTheDocument();

  });

  test("renders author name", () => {

    render(
      <BrowserRouter>
        <BookCard book={mockBook} />
      </BrowserRouter>
    );

    expect(
      screen.getByText(
        /James Clear/i
      )
    ).toBeInTheDocument();

  });

  test("renders View Details link", () => {

    render(
      <BrowserRouter>
        <BookCard book={mockBook} />
      </BrowserRouter>
    );

    expect(
      screen.getByRole("link", {
        name: /View Details/i
      })
    ).toBeInTheDocument();

  });

});