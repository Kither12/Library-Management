'use client';
import useSWR from 'swr';

export default function useConfig() {
	const fetcher = (url) => fetch(url).then((r) => r.json());
	const { data, error, isLoading } = useSWR('http://localhost:3001/api/configLibrary/last/config', fetcher);
	return {
		data: data?.data,
		isLoading: isLoading,
		isError: error,
	};
}
