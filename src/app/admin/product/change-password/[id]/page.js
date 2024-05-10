import ChangePasswordUser from '../../change-password';

export default async function EditUserPage({ params }) {
	return <ChangePasswordUser id={params.id} />;
}
