import { useState } from 'react';
import PropTypes from 'prop-types';
import { mutate } from 'swr';

import Stack from '@mui/material/Stack';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import Iconify from '@/components/iconify';
import { deleteProduct } from './action/product-actions';
import Notiflix from 'notiflix';

import Link from 'next/link';

// ----------------------------------------------------------------------

export default function ProductTableRow({ id, selected, title, author, publisher, genre, added_date, handleClick }) {
	const [open, setOpen] = useState(null);
	const handleOpenMenu = (event) => {
		setOpen(event.currentTarget);
	};

	const handleCloseMenu = () => {
		setOpen(null);
	};

	const handleDeleteProduct = async () => {
		handleCloseMenu();
		await deleteProduct({ id });
		mutate('http://localhost:8000/book');
        Notiflix.Notify.success("Delete successfully");
	};

	return (
		<>
			<TableRow hover tabIndex={-1} role='checkbox' selected={selected}>
				<TableCell padding='checkbox'>
					<Checkbox disableRipple checked={selected} onChange={handleClick} />
				</TableCell>

				<TableCell component='th' scope='row' padding='none'>
					<Stack direction='row' alignItems='center' spacing={2}>
						{/* <Avatar alt={name} src={avatarUrl} /> */}
						<Typography variant='subtitle2'>{title}</Typography>
					</Stack>
				</TableCell>

				<TableCell>{author}</TableCell>

				<TableCell>{publisher}</TableCell>

				<TableCell>{genre}</TableCell>

				<TableCell>{added_date}</TableCell>

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
				<Link href={`/admin/product/edit/${id}`} style={{ textDecoration: 'none' }}>
					<MenuItem onClick={handleCloseMenu}>
						<Iconify icon='eva:edit-fill' sx={{ mr: 2 }} />
						Edit
					</MenuItem>
				</Link>
				<Link href={`/admin/product/rent/${id}`} style={{ textDecoration: 'none' }}>
					<MenuItem onClick={handleCloseMenu}>
						<Iconify icon='material-symbols:book-outline' sx={{ mr: 2 }} />
						Rent
					</MenuItem>
				</Link>

				<MenuItem onClick={handleDeleteProduct} sx={{ color: 'error.main' }}>
					<Iconify icon='eva:trash-2-outline' sx={{ mr: 2 }} />
					Delete
				</MenuItem>
			</Popover>
		</>
	);
}

ProductTableRow.propTypes = {
	avatarUrl: PropTypes.any,
	company: PropTypes.any,
	handleClick: PropTypes.func,
	isVerified: PropTypes.any,
	name: PropTypes.any,
	role: PropTypes.any,
	selected: PropTypes.any,
	status: PropTypes.string,
};
