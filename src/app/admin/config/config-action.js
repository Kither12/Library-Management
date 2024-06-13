'use server';
import { redirect } from 'next/navigation';

export async function addConfig(formData) {
    console.log(JSON.stringify(formData));
	await fetch(`http://127.0.0.1:3001/api/configLibrary`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(formData),
	});
}
