import { useState } from 'react';
import PropTypes from 'prop-types';
import { mutate } from 'swr';

import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import Label from '@/components/label';
import Iconify from '@/components/iconify';
import { deleteUser, banUser } from './action/user-actions';

import Link from 'next/link';

// ----------------------------------------------------------------------

export default function UserTableRow({ id, selected, name, isMale, avatarUrl, email, registerDate, birthday, address, handleClick }) {
	const [open, setOpen] = useState(null);
	const handleOpenMenu = (event) => {
		setOpen(event.currentTarget);
	};

	const handleCloseMenu = () => {
		setOpen(null);
	};

    const handleBanUser = async () => {
        handleCloseMenu();
        await banUser({ id });
		mutate('http://localhost:3001/user');
    };


	const handleDeleteUser = async () => {
		handleCloseMenu();
		await deleteUser({ id });
		mutate('http://localhost:3001/user');
	};

	return (
		<>
			<TableRow hover tabIndex={-1} role='checkbox' selected={selected}>
				<TableCell padding='checkbox'>
					<Checkbox disableRipple checked={selected} onChange={handleClick} />
				</TableCell>

				<TableCell component='th' scope='row' padding='none'>
					<Stack direction='row' alignItems='center' spacing={2}>
						<Avatar alt={name} src={avatarUrl} />
						<Typography variant='subtitle2' noWrap>
							{name}
						</Typography>
					</Stack>
				</TableCell>

				<TableCell>{(isMale && 'Male') || 'Female'}</TableCell>

				<TableCell>{email}</TableCell>

				<TableCell>{registerDate}</TableCell>

				<TableCell>{birthday}</TableCell>

				<TableCell>{address}</TableCell>

				<TableCell align='right'>
					<IconButton onClick={handleOpenMenu}>
						<Iconify icon='eva:more-vertical-fill' />
					</IconButton>
				</TableCell>
			</TableRow>

			<Popover
				open={!!open}
				anchorEl={open}
				onClose={handleCloseMenu}
				anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
				transformOrigin={{ vertical: 'top', horizontal: 'right' }}
				PaperProps={{
					sx: { width: 200 },
				}}
			>
				<Link href={`/admin/user/edit/${id}`} style={{ textDecoration: 'none' }}>
					<MenuItem onClick={handleCloseMenu}>
						<Iconify icon='eva:edit-fill' sx={{ mr: 2 }} />
						Edit
					</MenuItem>
				</Link>

				<Link href={`/admin/user/change-password/${id}`} style={{ textDecoration: 'none' }}>
					<MenuItem onClick={handleCloseMenu} sx={{ color: 'warning.main' }}>
						<Iconify icon='formkit:password' sx={{ mr: 2 }} />
						Change password
					</MenuItem>
				</Link>

				{/* <MenuItem onClick={handleBanUser} sx={{ color: 'error.main' }}>
					<Iconify icon='eva:slash-fill' sx={{ mr: 2 }} />
					Ban
				</MenuItem> */}

				<MenuItem onClick={handleDeleteUser} sx={{ color: 'error.main' }}>
					<Iconify icon='eva:trash-2-outline' sx={{ mr: 2 }} />
					Delete
				</MenuItem>
			</Popover>
		</>
	);
}

UserTableRow.propTypes = {
	avatarUrl: PropTypes.any,
	company: PropTypes.any,
	handleClick: PropTypes.func,
	isVerified: PropTypes.any,
	name: PropTypes.any,
	role: PropTypes.any,
	selected: PropTypes.any,
	status: PropTypes.string,
};
