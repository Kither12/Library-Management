'use server';
import { signup } from '@/app/login/login-action';
import { redirect } from 'next/navigation';

export async function addUser(formData, ref) {
	let res = await fetch(`http://localhost:3001/api/readers`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(formData),
	});
    res = await res.json();
    await signup({
        id: String(res.data.id),
        email: formData.email,
        password: formData.password,
    })
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
