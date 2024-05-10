import EditBook from '../../edit-form';
import { notFound } from 'next/navigation';

async function getData(id) {
	const res = await fetch(`${process.env.API_ENDPOINT}/book?id=${id}`);
	if (!res.ok) {
		return undefined;
	}
	return res.json();
}

export default async function EditProductPage({ params }) {
	const book = (await getData(params.id))[0];
	if (!book) {
		notFound();
	}
	return <EditBook id={params.id} title={book.title} author={book.author} total={book.total} description={book.description}/>;
}
