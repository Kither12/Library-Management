import UserPage from './user';

async function getData() {
	const res = await fetch(`${process.env.API_ENDPOINT}/user`);
	if (!res.ok) {
    return undefined;
	}
	return res.json();
}

export default async function UserView() {
	const users = await getData();
	return <UserPage users={users} />;
}
