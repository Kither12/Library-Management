'use client';
import useSWR from 'swr';

export default function useUser(id) {
	const fetcher = (url) => fetch(url).then((r) => r.json());
	const { data, error, isLoading } = useSWR('http://localhost:3001/user', fetcher);
	return {
		users: data,
		isLoading: isLoading,
		isError: error,
	};
}
