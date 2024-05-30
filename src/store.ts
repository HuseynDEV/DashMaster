import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware';


type TokenStore = {
    token: string,
    setToken: (data: string) => void
}

export const useTokenStore = create<TokenStore>()(
    devtools(
        persist(
            (set) => ({
                token: '',
                setToken: (data: string) => set(() => ({ token: data })),
            }),
            { name: 'token-store' }
        )
    )
);


