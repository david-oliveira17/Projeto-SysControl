import React from 'react'
import PageTitle from '../../components/ui/PageTitle'
import TextField from '@mui/material/TextField'
import SendIcon from '@mui/icons-material/Send'
import Fab from '@mui/material/Fab'
import myfetch from '../../utils/myfetch'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'
import Notification from '../../components/ui/Notification'
import { useNavigate } from 'react-router-dom'
import Fornecedor from '../../models/Fornecedor'
import getValidationMessages from '../../utils/getValidationMessages'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { Link } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

export default function CadastroFornecedoresForm() {
  const API_PATH = '/fornecedores'

  const navigate = useNavigate()

  const [state, setState] = React.useState({
    fornecedor: {
      cnpj: '',
      nome_empresa: '',
      endereco: '',
      email: '',
      site: '',
      telefone: ''
    },
    errors: {},
    showWaiting: false,
    notif: {
      show: false,
    }
  })
  const {
    fornecedor,
    errors,
    showWaiting,
    notif
  } = state

  function handleFormFieldChange(event) {
    const fornecedorCopy = {...fornecedor}
    fornecedorCopy[event.target.name] = event.target.value
    setState({...state, fornecedor: fornecedorCopy})
  }

  function handleFormSubmit(event) {
    event.preventDefault()    // Evita que a página seja recarregada

    // Envia os dados para o back-end
    sendData()
  }

  async function sendData() {
    setState({...state, showWaiting: true, errors: {}})
    try {
       //Chama a validação da biblioteca Joi
       await Fornecedor.validateAsync(fornecedor, { abortEarly: false })

      await myfetch.post(API_PATH, fornecedor)
      // DAR FEEDBACK POSITIVO E VOLTAR PARA A LISTAGEM
      setState({
        ...state, 
        showWaiting: false,
        notif: {
          severity: 'success',
          show: true,
          message: 'Novo item salvo com sucesso'
        }
      })
    }
    catch(error) {
      const { validationError, errorMessages } = getValidationMessages(error)

      console.error(error)
      // DAR FEEDBACK NEGATIVO
      setState({
        ...state, 
        showWaiting: false,
        errors: errorMessages,
        notif: {
          severity: 'error',
          show: !validationError,
          message: 'ERRO: ' + error.message
        }
      })
    }
  }

  function handleNotifClose(event, reason) {
    if (reason === 'clickaway') {
      return;
    }

    //Se o item foi salvo com sucesso, retorna a pagina de listagem
    if(notif.severity === 'success') navigate("/fornecedor")

    setState({ ...state, notif: { ...notif, show: false } })
  };

  return (
    <>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={showWaiting}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Notification 
        show={notif.show} 
        severity={notif.severity} 
        onClose={handleNotifClose}
      >
        {notif.message}
      </Notification>

      <PageTitle title="Cadastrar novo fornecedor" />

      <Box sx={{
        display: "flex",
        justifyContent: "left",
        margin: "25px 0px 25px 50px"
      }}>
        <Link to="/fornecedor">
          <Button 
            variant="contained" 
            size="large" 
            color="primary"
            startIcon={<ArrowBackIcon />}
          >
            Voltar
          </Button>
        </Link>
      </Box>

      <form onSubmit={handleFormSubmit}>
        <TextField sx={{ margin: "30px 160px 30px 80px", width: "600px" }}
          label="CNPJ" 
          variant="filled"
          required
          name="cnpj"  // Nome do campo na tabela
          value={fornecedor.cnpj}   // Nome do campo na tabela
          onChange={handleFormFieldChange}
          error={errors?.cnpj}
          helperText={errors?.cnpj}
        />

        <TextField sx={{ margin: "30px 160px 30px 80px", width: "600px" }}
          label="Nome Fornecedor" 
          variant="filled"
          required
          name="nome_empresa"  // Nome do campo na tabela
          value={fornecedor.nome_empresa}   // Nome do campo na tabela
          onChange={handleFormFieldChange}
          error={errors?.nome_empresa}
          helperText={errors?.nome_empresa}
        />

        <TextField sx={{ margin: "30px 160px 30px 80px", width: "600px" }}
          label="Endereço" 
          variant="filled"
          required
          name="endereco"  // Nome do campo na tabela
          value={fornecedor.endereco}   // Nome do campo na tabela
          onChange={handleFormFieldChange}
          error={errors?.endereco}
          helperText={errors?.endereco}
        />

        <TextField sx={{ margin: "30px 160px 30px 80px", width: "600px" }}
          label="Email" 
          variant="filled"
          required
          name="email"  // Nome do campo na tabela
          value={fornecedor.email}   // Nome do campo na tabela
          onChange={handleFormFieldChange}
          error={errors?.email}
          helperText={errors?.email}
        />

        <TextField sx={{ margin: "30px 160px 30px 80px", width: "600px" }}
          label="Site" 
          variant="filled"
          name="site"  // Nome do campo na tabela
          value={fornecedor.site}   // Nome do campo na tabela
          onChange={handleFormFieldChange}
          error={errors?.site}
          helperText={errors?.site}
        />

        <TextField sx={{ margin: "30px 160px 30px 80px", width: "600px" }}
          label="Telefone" 
          variant="filled"
          required
          name="telefone"  // Nome do campo na tabela
          value={fornecedor.telefone}   // Nome do campo na tabela
          onChange={handleFormFieldChange}
          error={errors?.telefone}
          helperText={errors?.telefone}
        />

        <Fab sx={{ margin: "50px 0px 50px 60px", width: "300px" }}
          variant="extended" 
          color="primary"
          type="submit"
        >
          <SendIcon sx={{ mr: 1 }} />
          Enviar
        </Fab>

      </form>
    </>
  )
}