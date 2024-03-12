import UserPage from './user';

async function getData() {
	const res = await fetch(process.env.API_ENDPOINT + '/user');
	if (!res.ok) {
		throw new Error('Failed to fetch data');
	}
	return res.json();
}

export default async function UserView() {
	const users = await getData();
	return <UserPage users={users} />;
}
