'use client';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import Iconify from '@/components/iconify';

import TableNoData from './table-no-data';
import UserTableRow from './user-table-row';
import UserTableHead from './user-table-head';
import TableEmptyRows from './table-empty-rows';
import UserTableToolbar from './user-table-toolbar';
import { applyFilter, getComparator } from './utils';
import Link from 'next/link';

import { debounce } from 'lodash';

// ----------------------------------------------------------------------

export default function UserPage({ users }) {
	const [page, setPage] = useState(0);

	const [order, setOrder] = useState('asc');

	const [selected, setSelected] = useState([]);

	const [orderBy, setOrderBy] = useState('name');

	const [filterName, setFilterName] = useState('');

	const [rowsPerPage, setRowsPerPage] = useState(5);

	const [hasMounted, setHasMounted] = useState(false);

	const [dataFiltered, setDataFiltered] = useState([]);

	const filterData = debounce(
		() =>
			setDataFiltered(
				applyFilter({
					inputData: users,
					comparator: getComparator(order, orderBy),
					filterName,
				})
			),
		100
	);

	useEffect(() => {
		filterData();
	}, [order, orderBy, filterName]);

	useEffect(() => {
		setHasMounted(true);
	}, []);
	if (!hasMounted) {
		return null;
	}

	const handleSort = (event, id) => {
		const isAsc = orderBy === id && order === 'asc';
		if (id !== '') {
			setOrder(isAsc ? 'desc' : 'asc');
			setOrderBy(id);
		}
	};

	const handleSelectAllClick = (event) => {
		if (event.target.checked) {
			const newSelecteds = users.map((n) => n.name);
			setSelected(newSelecteds);
			return;
		}
		setSelected([]);
	};

	const handleClick = (event, name) => {
		const selectedIndex = selected.indexOf(name);
		let newSelected = [];
		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, name);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1));
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
		}
		setSelected(newSelected);
	};

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setPage(0);
		setRowsPerPage(parseInt(event.target.value, 10));
	};

	const handleFilterByName = (event) => {
		setPage(0);
		setFilterName(event.target.value);
	};

	const notFound = !dataFiltered.length && !!filterName;

	return (
		<Container>
			<Stack direction='row' alignItems='center' justifyContent='space-between' mb={5}>
				<Typography variant='h4'>Users</Typography>
				<Link href='/admin/user/add'>
					<Button variant='contained' color='inherit' startIcon={<Iconify icon='eva:plus-fill' />}>
						New User
					</Button>
				</Link>
			</Stack>

			<Card>
				<UserTableToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />
				<TableContainer sx={{ overflow: 'unset' }}>
					<Table sx={{ minWidth: 800 }}>
						<UserTableHead
							order={order}
							orderBy={orderBy}
							rowCount={users.length}
							numSelected={selected.length}
							onRequestSort={handleSort}
							onSelectAllClick={handleSelectAllClick}
							headLabel={[{ id: 'name', label: 'Name' }, { id: 'email', label: 'Email' }, { id: 'registerDate', label: 'Register Date' }, { id: 'status', label: 'Status' }, { id: '' }]}
						/>
						<TableBody>
							{dataFiltered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
								<UserTableRow
									key={row.id}
									name={row.name}
                  email={row.email}
                  registerDate={row.register_date}
									banned={row.banned}
									avatarUrl="/assets/images/avatar-default.svg"
									selected={selected.indexOf(row.name) !== -1}
									handleClick={(event) => handleClick(event, row.name)}
								/>
							))}
							{notFound && <TableNoData query={filterName} />}
						</TableBody>
					</Table>
				</TableContainer>

				<TablePagination
					page={page}
					component='div'
					count={users.length}
					rowsPerPage={rowsPerPage}
					onPageChange={handleChangePage}
					rowsPerPageOptions={[5, 10, 25]}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
			</Card>
		</Container>
	);
}
