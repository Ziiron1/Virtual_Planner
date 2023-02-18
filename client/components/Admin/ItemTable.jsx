import { useState, useEffect } from 'react';
import axios from 'axios'
import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Table, TableBody, TableCell, TableContainer, tableCellClasses, TableHead, TableRow, Paper, IconButton, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const EditButton = styled(IconButton)(({ theme }) => ({
    color: theme.palette.warning.main,
    '&:hover': {
        backgroundColor: theme.palette.warning.main,
        color: theme.palette.common.white,
    },
}));

const DeleteButton = styled(IconButton)(({ theme }) => ({
    color: theme.palette.error.main,
    '&:hover': {
        backgroundColor: theme.palette.error.main,
        color: theme.palette.common.white,
    },
}));

export function ItemTable(props) {
    const { data, setData } = props;

    const handleDelete = async (id) => {
        const response = await axios.delete(`http://localhost:4000/admin/${id}`);
        setData(data.filter(item => item.id !== id));
    };

    const handleEdit = (item) => {
        // TODO
    };

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>ID</StyledTableCell>
                        <StyledTableCell align="right">Title</StyledTableCell>
                        <StyledTableCell align="right">Description</StyledTableCell>
                        <StyledTableCell align="right">Actions</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data && data.map((row) => (
                        <StyledTableRow
                            key={row.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <StyledTableCell component="th" scope="row">
                                {row.id}
                            </StyledTableCell>
                            <StyledTableCell align="right">{row.title}</StyledTableCell>
                            <StyledTableCell align="right">{row.description}</StyledTableCell>
                            <StyledTableCell align="right">
                                <EditButton onClick={() => handleEdit(row)} size="large" title="Edit">
                                    <EditIcon />
                                </EditButton>
                                <DeleteButton onClick={() => handleDelete(row.id)} size="large" title="Delete">
                                    <DeleteIcon />
                                </DeleteButton>
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default ItemTable;