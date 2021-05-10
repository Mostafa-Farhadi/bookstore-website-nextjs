export interface IBooks {
    id: number;
    name: string;
    author: string;
    nationality: string;
    price: number;
    genres: string[];
    about: string;
};

export interface IProps {
    books: IBooks[];
};

export interface IProp {
    book: IBooks;
};

export interface IEvent {
    target: {
        value: string
    }
};

export interface IBookComponent {
    src: string;
    name: string;
    author: string;
    price: number;
    id: number
};
