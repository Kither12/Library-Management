import ProductsView from './product';

async function getData() {
	const res = await fetch(`http://localhost:8000/book`);
	if (!res.ok) {
		throw new Error("Failed to fetch data");
	}
	return res.json();
}

export default async function Product() {
	const books = await getData();
	return <ProductsView products={books} />;
}
