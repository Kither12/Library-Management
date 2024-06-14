import { useState } from 'react';
import PropTypes from 'prop-types';

import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import dayjs from 'dayjs';

// ----------------------------------------------------------------------

export default function UserTableRow({ id, selected, user_id, dead_line, add_date }) {
	return (
		<>
			<TableRow hover tabIndex={-1} role='checkbox' selected={selected}>
                <TableCell></TableCell>

				<TableCell>{user_id}</TableCell>

				<TableCell>{dayjs(dead_line).format('YYYY-MM-DD')}</TableCell>

				<TableCell>{dayjs(add_date).format('YYYY-MM-DD')}</TableCell>
				<TableCell align='right'>
				</TableCell>
			</TableRow>
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
