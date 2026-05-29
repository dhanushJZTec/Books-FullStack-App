import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import api from "../services/api";

import Navbar from "../components/Navbar";



type Book = {
    id: number;
    title: string;
};

function Books() {

    const navigate = useNavigate();

    const [books, setBooks] = useState<Book[]>([]);

    useEffect(() => {

        fetchBooks();

    }, []);

    const fetchBooks = async () => {

        try {

            const token =
                localStorage.getItem("token");

            console.log("TOKEN:", token);

            const response = await api.get(
                "/books",
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

            console.log("BOOKS:", response.data);

            setBooks(response.data);

        } catch (error) {

            console.log(error);
        }
    };

    return (

        <div>

            <Navbar />

            <div style={{ padding: "20px" }}>

                <h1>Books List</h1>

                {
                    books.length === 0 ? (

                        <p>No books found</p>

                    ) : (

                        books.map((book) => (

                            <div
    key={book.id}
    onClick={() =>
        navigate(`/books/${book.id}`)
    }
    style={{
        padding: "20px",
        border: "1px solid #ddd",
        marginBottom: "12px",
        borderRadius: "10px",
        cursor: "pointer",
        background: "white"
    }}
>

    <h3>{book.title}</h3>

</div>
                        ))
                    )
                }

            </div>

        </div>
    );
}

export default Books;