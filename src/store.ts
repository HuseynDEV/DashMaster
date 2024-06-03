import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware';


type BookDataType = {
    username: string,
    description: string,
    coverImage: string,
    genre: string,
    id: string
}

type TokenStore = {
    token: string,
    setToken: (data: string) => void,
    books: BookDataType[],
    addBook: (data: BookDataType) => void,
    deleteBook: (id: string) => void,
    setBooks: (data: BookDataType[]) => void
}

export const useTokenStore = create<TokenStore>()(
    devtools(
        persist(
            (set) => ({
                token: '',
                books: [],
                setToken: (data: string) => set(() => ({ token: data })),
                setBooks: (data) => set(() => ({ books: data })),
                addBook: (data) => set((state) => ({ books: { ...state.books, data } })),
                deleteBook: (id) => set(state => ({ books: state.books.filter(item => item.id != id) }))
            }),
            {
                name: 'token-store',
                partialize: (state) => ({ token: state.token })
            }
        )
    )
);


