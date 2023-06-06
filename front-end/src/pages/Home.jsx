import React from 'react'
import { Link } from 'react-router-dom'
import PageTitle from '../components/ui/PageTitle'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import PageName from '../components/ui/PageName'
import { Paper } from '@mui/material'


export default function Home() {
  return (
    <>
      <PageTitle title="SysControl" />
      <PageName title="Sistema de gerenciamento de estoque" />

      <Paper elevation={12} sx={{
        width: '350px',
        maxWidth: '90%',
        margin: '100px auto 80px auto',
        p: '30px 30px 50px 30px'
      }}>
        <Box sx={{
          display: "flex",
          justifyContent: "center",
          margin: "20px 0px 25px 0px"
        }}>
          <PageName title="Menu" />
        </Box>

        <Box sx={{
          display: "flex",
          justifyContent: "center",
          margin: "10px 0px 25px 0px"
        }}>
          <Link to="/login">
            <Button 
              variant="contained" 
              size="large" 
              color="primary"
            >
              Página de Login
            </Button>
          </Link>
        </Box>

        <Box sx={{
          display: "flex",
          justifyContent: "center",
          margin: "25px 0px 25px 0px"
        }}>
          <Link to="/funcionario">
            <Button 
              variant="contained" 
              size="large" 
              color="primary"
            >
              Cadastro Funcionários
            </Button>
          </Link>
        </Box>

        <Box sx={{
          display: "flex",
          justifyContent: "center",
          margin: "25px 0px 25px 0px"
        }}>
          <Link to="/produto">
            <Button 
              variant="contained" 
              size="large" 
              color="primary"
            >
            Cadastro Produtos
            </Button>
          </Link>
        </Box>

        <Box sx={{
          display: "flex",
          justifyContent: "center",
          margin: "25px 0px 25px 0px"
        }}>
          <Link to="/fornecedor">
            <Button 
              variant="contained" 
              size="large" 
              color="primary"
            >
              Cadastro Fornecedores
            </Button>
          </Link>
        </Box>
      </Paper>
    </>
  )
}