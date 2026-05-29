// =======================
// API URL
// =======================

const API_URL: string = "https://localhost:7271/api/Books";


// =======================
// INTERFACES
// =======================

interface Author {

    id: number;
    name: string;

}


interface Book {

    id: number;
    title: string;
    authorId: number;
    author?: Author;

}

interface CreateBook {

    title: string;
    authorId: number;

}


// =======================
// DOM ELEMENTS
// =======================

const bookForm = document.getElementById("bookForm") as HTMLFormElement;

const booksContainer = document.getElementById(
    "booksContainer"
) as HTMLDivElement;

const titleInput = document.getElementById(
    "title"
) as HTMLInputElement;

const authorIdInput = document.getElementById(
    "authorId"
) as HTMLInputElement;


// =======================
// LOAD BOOKS ON PAGE LOAD
// =======================

window.addEventListener("DOMContentLoaded", () => {

    loadBooks();

});


// =======================
// LOAD BOOKS
// =======================

async function loadBooks(): Promise<void> {

    try {

        const response: Response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Failed to fetch books");
        }

        const books: Book[] = await response.json();

        displayBooks(books);
    }

    
    catch (error) {

        console.error(error);

        booksContainer.innerHTML = `
            <p>Unable to load books.</p>
        `;

    }

}


// =======================
// DISPLAY BOOKS
// =======================

function displayBooks(books: Book[]): void {

    booksContainer.innerHTML = "";

    if (books.length === 0) {

        booksContainer.innerHTML = `<p>No books found.</p>`;

        return;
    }
         books.forEach((book: Book) => {

        const card: HTMLDivElement = document.createElement("div");

        card.classList.add("book-card");

        card.innerHTML = `
            <h3>${book.title}</h3>
            <p><strong>ID:</strong> ${book.id}</p>
            <p><strong>Author ID:</strong> ${book.authorId}</p>
            <p><strong>Author:</strong> ${book.author?.name || "N/A"}</p>
        `;

        booksContainer.appendChild(card);

    });

}

// =======================
// ADD BOOK
// =======================

bookForm.addEventListener("submit", async (
    e: SubmitEvent
): Promise<void> => {

    e.preventDefault();

    const newBook: CreateBook = {

        title: titleInput.value,

        authorId: parseInt(authorIdInput.value)

    };

    try {

        const response: Response = await fetch(API_URL, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(newBook)

        });

        if (!response.ok) {

            const errorText: string = await response.text();

            throw new Error(errorText);

        }

        titleInput.value = "";

        authorIdInput.value = "";

        loadBooks();

    }
    catch (error) {

        console.error(error);

        alert("Error adding book");

    }

});