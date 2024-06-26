'use client';
import { useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';

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
import { deleteUser } from './action/user-actions';
import UserTableToolbar from './user-table-toolbar';
import { useDebouncedCallback } from 'use-debounce';
import { applyFilter, getComparator } from './utils';
import useUser from '@/app/hook/useUser';
import LoadingProgress from '@/components/loading';
import Link from 'next/link';
import { mutate } from 'swr';
import Notiflix from 'notiflix';
// ----------------------------------------------------------------------

export default function UserPage() {
	const [page, setPage] = useState(0);

	const [order, setOrder] = useState('asc');

	const [selected, setSelected] = useState([]);

	const [orderBy, setOrderBy] = useState('name');

	const [filterName, setFilterName] = useState('');

	const [rowsPerPage, setRowsPerPage] = useState(5);

	const [dataFiltered, setDataFiltered] = useState([]);

	const { users, isLoading, isError } = useUser();

	useEffect(() => {
        if(users == undefined) return;
		setDataFiltered(
			applyFilter({
				inputData: users,
				comparator: getComparator(order, orderBy),
				filterName,
			})
		);
	}, [users]);

	const filterData = useDebouncedCallback(
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
        if(users == undefined) return;
		filterData();
	}, [users, order, orderBy, filterName]);

	if (isLoading) {
		return <LoadingProgress />;
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
			const newSelecteds = users.map((n) => n.id);
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

    const HandleDeleteSelected = () => {
        selected.forEach(async (id) => {
            await deleteUser({ id });
            mutate('http://localhost:3001/api/readers');
        })
        setSelected([]);
        Notiflix.Notify.success("Delete successfully");
    }

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
				<UserTableToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} onDeleted={HandleDeleteSelected}/>
				<TableContainer sx={{ overflow: 'unset' }}>
					<Table sx={{ minWidth: 800 }}>
						<UserTableHead
							order={order}
							orderBy={orderBy}
							rowCount={users.length}
							numSelected={selected.length}
							onRequestSort={handleSort}
							onSelectAllClick={handleSelectAllClick}
							headLabel={[
								{ id: 'id', label: 'id' },
								{ id: 'name', label: 'Name' },
								{ id: 'email', label: 'Email' },
								{ id: 'phoneNumber', label: 'PhoneNumber' },
								{ id: 'birthday', label: 'Birthday' },
								{ id: 'type', label: 'Reader Type' },
								{ id: 'address', label: 'Address' },
								{ id: '' },
							]}
						/>
						<TableBody>
							{dataFiltered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
								<UserTableRow
									id={row.id}
									key={row.id}
									name={row.name}
									email={row.email}
                                    phoneNumber={row.phoneNumber}
                                    readerType={row.readerType.name}
									birthday={row.dateOfBirth}
									address={row.address}
									avatarUrl='/assets/images/avatar-default.svg'
									selected={selected.indexOf(row.id) !== -1}
									handleClick={(event) => handleClick(event, row.id)}
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
