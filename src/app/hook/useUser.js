'use client';
import useSWR from 'swr';

export default function useUser() {
	const fetcher = (url) => fetch(url).then((r) => r.json());
	const { data, error, isLoading } = useSWR('http://localhost:3001/api/readers', fetcher);
	return {
		users: data?.data,
		isLoading: isLoading,
		isError: error,
	};
}
