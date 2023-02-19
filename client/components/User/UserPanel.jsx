import { useState, useEffect } from 'react';
import { Grid, Paper, TextField, Typography, Button } from '@mui/material';
import { makeStyles } from "@material-ui/core/styles";
import Cookie from 'js-cookie';
import api from '../../config/axiosInstance'
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@mui/icons-material/Edit';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
    },
}));

function UserEditPage() {
    const classes = useStyles();
    const [editMode, setEditMode] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rua, setRua] = useState('');
    const [bairro, setBairro] = useState('');
    const [cidade, setCidade] = useState('');
    const [pais, setPais] = useState('');
    const [cep, setCep] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const Userid = Cookie.get('id_user');
        api.get(`/users/${Userid}`)
            .then((response) => {
                const { name, email, password, endereco } = response.data.user;
                setName(name);
                setEmail(email);
                setPassword(password);
                setRua(endereco.rua || '');
                setBairro(endereco.bairro || '');
                setCidade(endereco.cidade || '');
                setPais(endereco.pais || '');
                setCep(endereco.cep || '');
                setLoading(false); // atualiza o estado para indicar que as informações foram carregadas
                console.log(response.data.user)
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const handleEdit = () => {
        setEditMode(!editMode);
    }

    const handleSave = () => {
        const Userid = Cookie.get('id_user');
        api.patch(`/users/${Userid}`, {
            name,
            email,
            password,
            endereco: {
                rua,
                bairro,
                cidade,
                pais,
                cep,
            },
        })
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
    };


    return (
        <Grid container justify="center" alignItems="center">
            <Grid item xs={12} sm={8} md={6} lg={4}>
                <Paper className={classes.paper}>
                    <Typography variant="h5" gutterBottom>
                        Editar informações do usuário
                    </Typography>
                    {loading ? ( // condição para renderizar o formulário apenas quando as informações do usuário forem carregadas
                        <Typography>Carregando...</Typography>
                    ) : (
                        <form>
                            <IconButton onClick={handleEdit}>
                                <EditIcon />
                            </IconButton>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Nome"
                                        defaultValue={name}
                                        disabled={!editMode}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="E-mail"
                                        defaultValue={email}
                                        disabled={!editMode}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Senha"
                                        type="password"
                                        value={password}
                                        disabled={!editMode}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Rua"
                                        value={rua}
                                        disabled={!editMode}
                                        onChange={(e) => setRua(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Bairro"
                                        value={bairro}
                                        disabled={!editMode}
                                        onChange={(e) => setBairro(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Cidade"
                                        value={cidade}
                                        disabled={!editMode}
                                        onChange={(e) => setCidade(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="País"
                                        value={pais}
                                        disabled={!editMode}
                                        onChange={(e) => setPais(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="CEP"
                                        value={cep}
                                        disabled={!editMode}
                                        onChange={(e) => setCep(e.target.value)}
                                    />
                                    <br />
                                    <small>Apenas os números!</small>
                                </Grid>
                                <Grid item xs={12}>
                                    <Button variant="contained" color="primary" onClick={handleSave}>
                                        Salvar
                                    </Button>
                                </Grid>
                            </Grid>
                        </form >
                    )}
                </Paper>
            </Grid>
        </Grid >
    );
}

export default UserEditPage;
