'use client';
import useSWR from 'swr';
import { getCookie } from 'cookies-next'

export default function useBook() {
	const fetcher = (url) => fetch(url).then((r) => r.json());
	const { data, error, isLoading } = useSWR('http://localhost:8000/book', fetcher);
	return {
		books: data,
		isLoading: isLoading,
		isError: error,
	};
}

export function useRentBook(id) {
	const fetcher = (url) => fetch(url).then((r) => r.json());
	const { data, error, isLoading } = useSWR(`http://localhost:8000/rent?user_id=${id}`, fetcher);
	return {
		books: data,
		isLoading: isLoading,
		isError: error,
	};
}

export function useRentTotal(){
    const fetcher = (url) => fetch(url).then((r) => r.json());
	const { data, error, isLoading } = useSWR(`http://localhost:8000/rent`, fetcher);
	return {
		books: data,
		isLoading: isLoading,
		isError: error,
	};
}

export function useRentBookCook() {
	const fetcher = (url) => fetch(url).then((r) => r.json());
    const id = getCookie("userID");
	const { data, error, isLoading } = useSWR(`http://localhost:8000/rent?user_id=${id}`, fetcher);
	return {
		books: data,
		isLoading: isLoading,
		isError: error,
	};
}

export function useRent(){
    const fetcher = (url) => fetch(url).then((r) => r.json());
	const { data, error, isLoading } = useSWR(`http://localhost:8000/rent`, fetcher);
	return {
		rents: data,
		isLoading: isLoading,
		isError: error,
	};
}