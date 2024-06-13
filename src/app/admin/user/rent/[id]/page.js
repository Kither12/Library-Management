import ProductPage from './product';

async function getData(id) {
	const res = await fetch(`http://localhost:3001/api/readers/${id}`);
	if (!res.ok) {
		return undefined;
	}
	return res.json();
}

export default async function rented_book({ params }) {
	const user = (await getData(params.id)).data;
	if (!user) {
		notFound();
	}
	return <ProductPage id={params.id} names={user.name}></ProductPage>;
}
