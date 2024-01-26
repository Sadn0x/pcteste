"use client"

import React, { useEffect, useState } from 'react';
import { useForm, Controller, useFormContext, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';
import { Container, Box, Typography, Grid, Paper, Snackbar, Slide, CircularProgress } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

interface Pessoa {
  id: number;
  nome: string;
}

function PersonAutoComplete() {
  const { control, setValue } = useFormContext();
  const [options, setOptions] = useState<Pessoa[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false); 

  useEffect(() => {
    let active = true;

    if (inputValue === '') {
      setOptions([]);
      return undefined;
    }

    setLoading(true); 

    const delayDebounce = setTimeout(() => {
      fetch(`http://localhost:5000/pessoas?nome_like=${inputValue}`)
        .then((response) => response.json())
        .then((pessoas) => {
          if (active) {
            setOptions(pessoas);
          }
        })
        .catch((error) => console.error('Erro ao buscar pessoas:', error))
        .finally(() => setLoading(false));
    }, 700); 

    return () => {
      active = false;
      clearTimeout(delayDebounce);
    };
  }, [inputValue]); 

  return (
    <Controller
      name="pessoa"
      control={control}
      render={({ field }) => (
        <Autocomplete
          {...field}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue); 
          }}
          onChange={(event, item) => {
            setValue('pessoa', item ? item.id : null);
          }}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          getOptionLabel={(option) => option.nome}
          options={options}
          loading={loading}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Pessoa"
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {loading ? <CircularProgress color="inherit" size={20} /> : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
              fullWidth
            />
          )}
        />
      )}
    />
  );
}

const formSchema = zod.object({
  pessoa: zod.number().nonnegative('ID de pessoa inválido').optional(), 
  telefone: zod.string()
                .min(10, 'O telefone deve ter pelo menos 10 dígitos') 
                .max(11, 'O telefone deve ter no máximo 11 dígitos')  
                .regex(/^\d*$/, 'Telefone deve conter apenas números'),
  email: zod.string().email('Email inválido') 
});


export default function Home() {
  const methods = useForm({
    resolver: zodResolver(formSchema)
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const onSubmit = (data: any) => {
    console.log(data);
    setOpenSnackbar(true); 
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container component="main" maxWidth="sm">
      <Paper elevation={6} sx={{ padding: 3, marginTop: 8 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Atualizar Cadastro de Pessoa
          </Typography>
          
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
              <Grid container spacing={2} sx={{ mt: 3 }}>
                <Grid item xs={12}>
                  <PersonAutoComplete />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    name="telefone"
                    control={methods.control}
                    render={({ field, fieldState }) => (
                      <TextField
                        {...field}
                        label="Telefone"
                        fullWidth
                        error={!!fieldState.error}
                        helperText={fieldState.error ? fieldState.error.message : ''}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    name="email"
                    control={methods.control}
                    render={({ field, fieldState }) => (
                      <TextField
                        {...field}
                        label="Email"
                        fullWidth
                        error={!!fieldState.error}
                        helperText={fieldState.error ? fieldState.error.message : ''}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button type="submit" fullWidth variant="contained" color="primary">
                    Enviar
                  </Button>
                </Grid>
              </Grid>
            </form>
          </FormProvider>
        </Box>
      </Paper>
      <Snackbar
        open={openSnackbar}
        onClose={handleCloseSnackbar}
        TransitionComponent={(props) => <Slide {...props} direction="up" />}
        message="Verificar console."
        autoHideDuration={3000}
      />
    </Container>
  );
}