import {
    Link
} from "react-router-dom";

import type {
    Book
} from "../interfaces/Book";

type Props = {

    book: Book;

};

function BookCard({
    book
}: Props) {

    return (

        <div className="book-card">

            <h2>
                {book.title}
            </h2>

            <p>
                Author:
                {book.author?.name || "No Author"}
            </p>

            <Link
                to={`/books/${book.id}`}
                className="details-button"
            >
                View Details
            </Link>

        </div>

    );

}

export default BookCard;