'use server';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export async function login(formData) {
	if (formData.usrname == 'admin@gmail.com') {
		if (formData.password == '123456') {
			cookies().set('currentUser', 'admin');
			redirect('/admin');
		} else {
			return false;
		}
	}
	let res = await fetch(`http://localhost:8000/account?email=${formData.usrname}`);
	if (res.ok) {
		res = (await res.json())[0];
		if (res === undefined) {
			return false;
		}
		if (res.password != formData.password) {
			return false;
		}
		cookies().set('currentUser', 'user');
		cookies().set('userID', res.id);
		redirect('/user');
	} else {
		return false;
	}
}
export async function signup(formData) {
	const res = await fetch(`http://localhost:8000/account`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(formData),
	});
}
export async function logout(formData) {
	cookies().set('currentUser', '');
	redirect('/login');
}
export async function changePassword(id, formData) {
	let res = await fetch(`http://localhost:8000/account/${id}`);
	res = (await res.json());
	if (formData.password != res.password) {
		return false;
	}
	await fetch(`http://localhost:8000/account/${id}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			password: formData.new_password,
		}),
	});
	redirect('/admin/user');
}
