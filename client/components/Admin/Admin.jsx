import { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Container, Typography } from '@mui/material';
import ItemTable from './ItemTable';

function Admin() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const response = await axios.get('http://localhost:4000/admin');
            setItems(response.data);
        }
        fetchData();
    }, []);

    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:4000/admin/${id}`);
        setItems((prevItems) => prevItems.filter((item) => item.id !== id));
    };

    const handleCreate = async (values) => {
        const response = await axios.post('http://localhost:4000/admin', values);
        setItems((prevItems) => [...prevItems, response.data]);
    };

    return (
        <Container>
            <Box sx={{ mb: 4 }}>
                <Typography variant="h1" sx={{ mb: 2 }}>
                    Admin Panel
                </Typography>
            </Box>
            <ItemTable items={items} handleDelete={handleDelete} />
        </Container>
    );
}

export default Admin;
