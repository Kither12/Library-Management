'use server';
import { redirect } from 'next/navigation';

export async function addBook(formData) {
	await fetch(`${process.env.API_ENDPOINT}/book`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(formData),
	});
	redirect(`/admin/product`);
}
export async function editBook(id, formData) {
	await fetch(`${process.env.API_ENDPOINT}/book/${id}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(formData),
	});
	redirect(`/admin/product`);
}
export async function deleteProduct({ id }) {
	await fetch(`${process.env.API_ENDPOINT}/book/${id}`, {
		method: 'DELETE',
	});
}
