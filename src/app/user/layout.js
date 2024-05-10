'use client';

import { useState } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';

import Nav from './nav';
import Main from './main';
import Header from './header';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

// ----------------------------------------------------------------------

export default function DashboardLayout({ children }) {
	const [openNav, setOpenNav] = useState(false);
	
	return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<Header onOpenNav={() => setOpenNav(true)} />

			<Box
				sx={{
					minHeight: 1,
					display: 'flex',
					flexDirection: { xs: 'column', lg: 'row' },
				}}
			>
				<Nav openNav={openNav} onCloseNav={() => setOpenNav(false)} />

				<Main>{children}</Main>
			</Box>
		</LocalizationProvider>
	);
}

DashboardLayout.propTypes = {
	children: PropTypes.node,
};
