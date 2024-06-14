import UserPage from './user';

export default async function UserView({ params }) {
	return <UserPage id={params.id} />;
}
