import { useState } from "react";

import { useNavigate, Link } from "react-router-dom";

import api from "../services/api";

import { useAuth } from "../context/AuthContext";

import "../Styles/auth.css";

function Login() {

    const [username, setUsername] = useState("");

    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const { login } = useAuth();

    const handleLogin = async (
        e: React.FormEvent
    ) => {

        e.preventDefault();

        try {

            const response = await api.post(
                "/auth/login",
                {
                    username,
                    password
                }
            );
             console.log("SUCCESS", response.data);

            const token = response.data.token;

            login(token);

            navigate("/books");

        } catch (error: any) {

    console.log("FULL ERROR", error);

    console.log("STATUS", error.response?.status);

    console.log("DATA", error.response?.data);

    console.log("REQUEST", error.config);

    alert(error.response?.data);
}
    };

    return (

        <div className="auth-container">

            <div className="auth-card">

                <h1 className="auth-title">
                    Login
                </h1>

                <form
                    className="auth-form"
                    onSubmit={handleLogin}
                >

                    <input
                        className="auth-input"
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) =>
                            setUsername(e.target.value)
                        }
                    />

                    <input
                        className="auth-input"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                    />

                    <button
                        className="auth-button"
                        type="submit"
                    >
                        Login
                    </button>

                </form>

                <div className="auth-footer">

                    Don't have an account?{" "}

                    <Link
                        className="auth-link"
                        to="/register"
                    >
                        Register
                    </Link>

                </div>

            </div>

        </div>
    );
}

export default Login;