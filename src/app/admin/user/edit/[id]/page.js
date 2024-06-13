import EditUser from '../../edit-form';
import { notFound } from 'next/navigation';

async function getData(id) {
	const res = await fetch(`http://localhost:3001/api/readers/${id}`);
	if (!res.ok) {
		return undefined;
	}
	return res.json();
}

export default async function EditUserPage({ params }) {
	const user = (await getData(params.id)).data;
	if (!user) {
		notFound();
	}
	return <EditUser id={params.id} name={user.name} email={user.email} address={user.address} phoneNumber={user.phoneNumber} bday={user.dateOfBirth} readerType={user.readerType.id}/>;
}
