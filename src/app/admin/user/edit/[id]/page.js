import EditUser from '../../edit-form';
import { notFound } from 'next/navigation';

async function getData(id) {
	const res = await fetch(`${process.env.API_ENDPOINT}/user?id=${id}`);
	if (!res.ok) {
		return undefined;
	}
	return res.json();
}

export default async function EditUserPage({ params }) {
	const user = (await getData(params.id))[0];
	if (!user) {
		notFound();
	}
	return <EditUser id={params.id} name={user.name} email={user.email} isMale={user.is_male} birthday={user.birthday} />;
}
