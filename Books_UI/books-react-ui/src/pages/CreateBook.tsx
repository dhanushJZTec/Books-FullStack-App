import { useState } from "react";

import { useForm } from "react-hook-form";

import api from "../services/api";

type FormData = {

    title: string;

    authorId: number;

};

function CreateBook() {

    const {

        register,

        handleSubmit,

        reset,

        formState: { errors }

    } = useForm<FormData>();

    const [loading, setLoading] =
        useState(false);

    const [message, setMessage] =
        useState("");

    const [error, setError] =
        useState("");

    async function onSubmit(
        data: FormData
    ) {

        try {

            setLoading(true);

            setMessage("");

            setError("");

            await api.post(
                "/Books",
                data
            );

            setMessage(
                "Book Created Successfully"
            );

            reset();

        }

        catch (err) {

            console.log(err);

            setError(
                "Failed To Create Book"
            );

        }

        finally {

            setLoading(false);

        }

    }

    return (

        <div className="create-book">

            <h1>
                Create Book
            </h1>

            <form
                onSubmit={handleSubmit(onSubmit)}
            >

                <input

                    type="text"

                    placeholder="Book Title"

                    {
                        ...register("title", {

                            required:
                                "Title is required"

                        })
                    }

                />

                <p className="error">

                    {errors.title?.message}

                </p>

                <input

                    type="number"

                    placeholder="Author ID"

                    {
                        ...register("authorId", {

                            required:
                                "Author ID is required",

                            valueAsNumber: true

                        })
                    }

                />

                <p className="error">

                    {errors.authorId?.message}

                </p>

                <button
                    type="submit"
                    disabled={loading}
                >

                    {
                        loading
                        ? "Creating..."
                        : "Create Book"
                    }

                </button>

            </form>

            {
                message && (

                    <p className="success">

                        {message}

                    </p>

                )
            }

            {
                error && (

                    <p className="error">

                        {error}

                    </p>

                )
            }

        </div>

    );

}

export default CreateBook;