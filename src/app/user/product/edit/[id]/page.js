import { Container, Grid } from '@mui/material';
import { notFound } from 'next/navigation';
import BookDetail from './book-detail';

async function getData(id) {
	const res = await fetch(`${process.env.API_ENDPOINT}/book?id=${id}`, { cache: 'no-cache' });
	if (!res.ok) {
		return undefined;
	}
	return res.json();
}

export default async function EditProduct({ params }) {
	const book = (await getData(params.id))[0];
	if (!book) {
		notFound();
	}
	return (
		<Container>
			<Grid container>
				<Grid item >
					<BookDetail book={book}></BookDetail>
				</Grid>
			</Grid>
		</Container>
	);
}
