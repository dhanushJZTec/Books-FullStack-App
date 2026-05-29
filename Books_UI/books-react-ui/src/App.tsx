import {
    Routes,
    Route,
    Navigate
} from "react-router-dom";

import Login from "./pages/Login";

import Register from "./pages/Register";

import Books from "./pages/Books";

import BookDetails from "./pages/BookDetails";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {

    return (

        <Routes>

            <Route
                path="/"
                element={<Navigate to="/login" />}
            />

            <Route
                path="/login"
                element={<Login />}
            />

            <Route
                path="/register"
                element={<Register />}
            />

            <Route
                path="/books"
                element={
                    <ProtectedRoute>

                        <Books />

                    </ProtectedRoute>
                }
            />

            <Route
    path="/books/:id"
    element={
        <ProtectedRoute>
            <BookDetails />
        </ProtectedRoute>
    }
/>

        </Routes>
    );
}

export default App;