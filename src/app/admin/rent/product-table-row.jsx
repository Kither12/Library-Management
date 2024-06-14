import { useState } from 'react';
import PropTypes from 'prop-types';
import { mutate } from 'swr';

import Stack from '@mui/material/Stack';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';

// ----------------------------------------------------------------------

export default function ProductTableRow({ id, selected, title, user_id, added_date, rent_date, handleClick }) {
	const [open, setOpen] = useState(null);

	const handleCloseMenu = () => {
		setOpen(null);
	};

	return (
		<>
			<TableRow hover tabIndex={-1} role='checkbox' selected={selected}>
				<TableCell padding='checkbox'>{/* <Checkbox disableRipple checked={selected} onChange={handleClick} /> */}</TableCell>

				<TableCell component='th' scope='row' padding='none'>
					<Stack direction='row' alignItems='center' spacing={2}>
						{/* <Avatar alt={name} src={avatarUrl} /> */}
						<Typography variant='subtitle2'>{title}</Typography>
					</Stack>
				</TableCell>

				<TableCell>{user_id}</TableCell>

				<TableCell>{dayjs(rent_date).format("YYYY-MM-DD")}</TableCell>

				<TableCell>{dayjs(added_date).format("YYYY-MM-DD")}</TableCell>
				<TableCell></TableCell>
			</TableRow>
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
