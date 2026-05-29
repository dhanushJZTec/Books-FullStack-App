import { useEffect, useState } from "react";

import {
    useParams,
    useNavigate
} from "react-router-dom";

import api from "../services/api";

import Navbar from "../components/Navbar";

type Book = {
    id: number;
    title: string;
    author?: {
        name: string;
    };
};

function BookDetails() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [book, setBook] =
        useState<Book | null>(null);

    useEffect(() => {

        fetchBook();

    }, []);

    const fetchBook = async () => {

        try {

            const token =
                localStorage.getItem("token");

            const response = await api.get(
                `/books/${id}`,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

            console.log(response.data);

            setBook(response.data);

        } catch (error) {

            console.log(error);
        }
    };

    if (!book) {

        return <p>Loading...</p>;
    }

    return (

        <div>

            <Navbar />

            <div
                style={{
                    maxWidth: "700px",
                    margin: "40px auto",
                    background: "white",
                    padding: "30px",
                    borderRadius: "14px",
                    boxShadow:
                        "0 4px 12px rgba(0,0,0,0.1)"
                }}
            >

                <button
                    onClick={() =>
                        navigate("/books")
                    }
                    style={{
                        marginBottom: "20px",
                        padding: "10px 18px",
                        border: "none",
                        borderRadius: "8px",
                        background: "#2563eb",
                        color: "white",
                        cursor: "pointer",
                        fontWeight: "bold"
                    }}
                >
                     Back
                </button>

                <h1>{book.title}</h1>

                <p
                    style={{
                        fontSize: "18px",
                        marginTop: "20px"
                    }}
                >
                    <strong>Author:</strong>{" "}
                    {book.author?.name}
                </p>

            </div>

        </div>
    );
}

export default BookDetails;