'use client';
import useSWR from 'swr';

export default function useBook() {
	const fetcher = (url) => fetch(url).then((r) => r.json());
	const { data, error, isLoading } = useSWR('http://localhost:3001/book', fetcher);
	return {
		books: data,
		isLoading: isLoading,
		isError: error,
	};
}
