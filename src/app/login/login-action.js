'use server';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export async function login(formData) {
	if (formData.usrname == 'admin@gmail.com' && formData.password == '123456') {
		cookies().set('currentUser', 'admin');
		redirect('/admin');
	}
    const res = await fetch(`http://localhost:8000/account?email=${formData.usrname}`);
    if(res.ok){
        cookies().set('currentUser', 'user');
        cookies().set('userID', formData.usrname);
		redirect('/user');
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
