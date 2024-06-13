import ProductView from "./product-rent-view"
import { notFound } from "next/navigation";

async function getData(id) {
	const res = await fetch(`http://localhost:8000/book/${id}`);
	if (!res.ok) {
		return undefined;
	}
	return res.json();
}

export default async function rent_product({ params }){
    const res = (await getData(params.id));
	if (!res) {
		notFound();
	}
    return <ProductView id={params.id} title={res.title}></ProductView>
}