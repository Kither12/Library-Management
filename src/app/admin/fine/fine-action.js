'use server';
import { redirect } from 'next/navigation';

export async function addFine(formData) {
    console.log(JSON.stringify(formData));
	await fetch(`http://127.0.0.1:3001/api/fines`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(formData),
	});
}
