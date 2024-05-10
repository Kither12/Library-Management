'use server';
import { redirect } from 'next/navigation';

export async function addUser(formData) {
	await fetch(`${process.env.API_ENDPOINT}/user`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(formData),
	});
	redirect(`/admin/user`);
}
export async function editUser(id, formData) {
	await fetch(`${process.env.API_ENDPOINT}/user/${id}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(formData),
	});
	redirect(`/admin/user`);
}
export async function deleteUser({ id }) {
	await fetch(`${process.env.API_ENDPOINT}/user/${id}`, {
		method: 'DELETE',
	});
}
export async function changePassword(id, formData) {
	await fetch(`${process.env.API_ENDPOINT}/user/${id}/account`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(formData),
	});
}
export async function banUser({ id }) {
    await fetch(`${process.env.API_ENDPOINT}/bans/${id}`, {
		method: 'POST',
	});
}
