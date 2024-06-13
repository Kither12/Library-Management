'use server';
import { redirect } from 'next/navigation';

export async function addUser(formData) {
	const res = await fetch(`http://localhost:3001/api/readers`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(formData),
	});
	redirect(`/admin/user`);
}
export async function editUser(id, formData) {
	await fetch(`http://localhost:3001/api/readers/${id}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(formData),
	});
	redirect(`/admin/user`);
}
export async function deleteUser({ id }) {
	await fetch(`http://localhost:3001/api/readers/${id}`, {
		method: 'DELETE',
	});
}
export async function changePassword(id, formData) {
	await fetch(`http://localhost:3001/user/${id}/account`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(formData),
	});
}
export async function banUser({ id }) {
    await fetch(`http://localhost:3001/bans/${id}`, {
		method: 'POST',
	});
}
