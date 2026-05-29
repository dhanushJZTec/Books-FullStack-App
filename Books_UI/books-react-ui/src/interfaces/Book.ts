export interface Book {

    id: number;

    title: string;

    authorId: number;

    author?: {

        id: number;

        name: string;

    };

}