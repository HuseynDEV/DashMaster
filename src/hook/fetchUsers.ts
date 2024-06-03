import { getBooks } from "@/http/api";
import { useTokenStore } from "@/store";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export const fetchUsers = () => {
    const { data } = useQuery({
        queryKey: ['dataBooks'],
        queryFn: getBooks
    })
    const setBooks = useTokenStore(state => state.setBooks)

    useEffect(() => {
        if (data) {
            setBooks(data)
        }
    }, [data, setBooks])
}