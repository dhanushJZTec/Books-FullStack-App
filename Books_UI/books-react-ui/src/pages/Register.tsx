import { useState } from "react";

import { useNavigate, Link } from "react-router-dom";

import api from "../services/api";

import "../Styles/auth.css";

function Register() {

    const [username, setUsername] = useState("");

    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleRegister = async (
        e: React.FormEvent
    ) => {

        e.preventDefault();

        try {

            await api.post("/auth/register", {
                username,
                password
            });

            alert("Registration successful");

            navigate("/login");

        } catch (error) {

            console.log(error);

            alert("Registration failed");
        }
    };

    return (

        <div className="auth-container">

            <div className="auth-card">

                <h1 className="auth-title">
                    Register
                </h1>

                <form
                    className="auth-form"
                    onSubmit={handleRegister}
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
                        Register
                    </button>

                </form>

                <div className="auth-footer">

                    Already have an account?{" "}

                    <Link
                        className="auth-link"
                        to="/login"
                    >
                        Login
                    </Link>

                </div>

            </div>

        </div>
    );
}

export default Register;