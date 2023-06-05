import React from 'react'
import { Link } from 'react-router-dom'
import PageTitle from '../components/ui/PageTitle'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'


export default function Home() {
  return (
    <>
      <PageTitle title="SysControl -
      Sistema de gerenciamento de estoque" />

      <Box sx={{
        display: "flex",
        justifyContent: "center",
        margin: "200px 0px 25px 50px"
      }}>
        <Link to="/login">
          <Button 
            variant="contained" 
            size="large" 
            color="secondary"
          >
            Página de Login
          </Button>
        </Link>
      </Box>

      <Box sx={{
        display: "flex",
        justifyContent: "center",
        margin: "25px 0px 25px 50px"
      }}>
        <Link to="/funcionario">
          <Button 
            variant="contained" 
            size="large" 
            color="secondary"
          >
            Cadastro Funcionários
          </Button>
        </Link>
      </Box>

      <Box sx={{
        display: "flex",
        justifyContent: "center",
        margin: "25px 0px 25px 50px"
      }}>
        <Link to="/produto">
          <Button 
            variant="contained" 
            size="large" 
            color="secondary"
          >
          Cadastro Produtos
          </Button>
        </Link>
      </Box>

      <Box sx={{
        display: "flex",
        justifyContent: "center",
        margin: "25px 0px 25px 50px"
      }}>
        <Link to="/fornecedor">
          <Button 
            variant="contained" 
            size="large" 
            color="secondary"
          >
            Cadastro Fornecedores
          </Button>
        </Link>
      </Box>
    </>
  )
}