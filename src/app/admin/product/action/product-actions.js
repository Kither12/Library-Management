'use server';
import { redirect } from 'next/navigation';

export async function addBook(formData) {
	await fetch(`http://127.0.0.1:8000/book`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(formData),
	});
	redirect(`/admin/product`);
}
export async function editBook(id, formData) {
	await fetch(`http://127.0.0.1:8000/book/${id}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(formData),
	});
	redirect(`/admin/product`);
}
export async function deleteProduct({ id }) {
	await fetch(`http://127.0.0.1:8000/book/${id}`, {
		method: 'DELETE',
	});
}

export async function rentProduct(formData) {
	await fetch(`http://127.0.0.1:8000/rent`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(formData),
	});
	redirect(`/admin/product`);
}
