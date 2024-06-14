'use client';
import { useState, useEffect } from 'react';
import { mutate } from 'swr';

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

import ProductTableRow from './product-table-row';
import ProductTableHead from './product-table-head';
import ProductTableToolbar from './product-table-toolbar';
import { useDebouncedCallback } from 'use-debounce';
import { applyFilter, getComparator } from './utils';
import useBook, { useRentBook } from '@/app/hook/useBook';
import LoadingProgress from '@/components/loading';
import Link from 'next/link';
// ----------------------------------------------------------------------

export default function ProductPage({ id, names }) {
	const [page, setPage] = useState(0);

	const [order, setOrder] = useState('asc');

	const [selected, setSelected] = useState([]);

	const [orderBy, setOrderBy] = useState('name');

	const [filterName, setFilterName] = useState('');

	const [rowsPerPage, setRowsPerPage] = useState(5);

	const [dataFiltered, setDataFiltered] = useState([]);

	const { books, isLoading, isError } = useRentBook(id);

	useEffect(() => {
		if (books == undefined) return;
		setDataFiltered(
			applyFilter({
				inputData: books,
				comparator: getComparator(order, orderBy),
				filterName,
			})
		);
	}, [books]);

	const filterData = useDebouncedCallback(
		() =>
			setDataFiltered(
				applyFilter({
					inputData: books,
					comparator: getComparator(order, orderBy),
					filterName,
				})
			),
		100
	);

	useEffect(() => {
		if (books == undefined) return;
		filterData();
	}, [order, orderBy, filterName, books]);

	if (isLoading) {
		return <LoadingProgress />;
	}
	console.log(books);
	const handleSort = (event, id) => {
		const isAsc = orderBy === id && order === 'asc';
		if (id !== '') {
			setOrder(isAsc ? 'desc' : 'asc');
			setOrderBy(id);
		}
	};

	const handleSelectAllClick = (event) => {
		if (event.target.checked) {
			const newSelecteds = books.map((n) => n.id);
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
			<Stack spacing={2}>
				<Typography variant='h4'>Book rent by user {names}</Typography>
				<Card>
					{/* <ProductTableToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} /> */}
					<TableContainer sx={{ overflow: 'unset' }}>
						<Table sx={{ width: '100%' }}>
							<ProductTableHead
								order={order}
								orderBy={orderBy}
								rowCount={books.length}
								numSelected={selected.length}
								onRequestSort={handleSort}
								onSelectAllClick={handleSelectAllClick}
								headLabel={[{ id: 'Title', label: 'Title', width: '40%' }, { id: 'added_date', label: 'Added date' }, { id: 'max_date', label: 'Deadline' }, { id: '' }]}
							/>
							<TableBody>
								{dataFiltered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
									<ProductTableRow
										id={row.id}
										key={row.id}
										title={row.title}
										added_date={row.add_date}
										rent_date={row.dead_line}
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
						count={books.length}
						rowsPerPage={rowsPerPage}
						onPageChange={handleChangePage}
						rowsPerPageOptions={[5, 10, 25]}
						onRowsPerPageChange={handleChangeRowsPerPage}
					/>
				</Card>
			</Stack>
		</Container>
	);
}
