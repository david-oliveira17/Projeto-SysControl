import React from 'react'
import SectionTitle from '../../components/ui/SectionTitle'
import TextField from '@mui/material/TextField'
import SendIcon from '@mui/icons-material/Send'
import Fab from '@mui/material/Fab'
import myfetch from '../../utils/myfetch'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'
import Notification from '../../components/ui/Notification'
import { useNavigate, useParams } from 'react-router-dom'
import Funcionario from '../../models/Funcionario'
import getValidationMessages from '../../utils/getValidationMessages'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { Link } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

export default function CadastroFuncionariosForm() {
  const API_PATH = '/funcionarios'

  const navigate = useNavigate()
  const params = useParams()

  const [state, setState] = React.useState({
    funcionario: {
      nome: '',
      endereco: '',
      email: '',
      telefone: '',
      cargo: '',
      cpf: '',
      data_nasc: '',
      senha: ''
    },
    errors: {},
    showWaiting: false,
    notif: {
      show: false,
    }
  })
  const {
    funcionario,
    errors,
    showWaiting,
    notif
  } = state

  function handleFormFieldChange(event) {
    const funcionarioCopy = {...funcionario}
    funcionarioCopy[event.target.name] = event.target.value
    setState({...state, funcionario: funcionarioCopy})
  }

  function handleFormSubmit(event) {
    event.preventDefault()    // Evita que a página seja recarregada

    // Envia os dados para o back-end
    sendData()
  }

  // Este useEffect será executando apenas durante o carregamento
  // inicial da página
  React.useEffect(() => {
    // Se houver parâmetro id na rota, devemos carregar um registro
    // existente para edição
    if(params.id) fetchData()
  }, [])

  async function fetchData() {
    setState({...state, showWaiting: true, errors:{}})
    try {
      const result = await myfetch.get(`${API_PATH}/${params.id}`)
      setState({
        ...state,
        funcionario: result,
        showWaiting: false
      })
    }
    catch(error) {
      console.error(error)
      setState({
        ...state, 
        showWaiting: false,
        errors: errorMessages,
        notif: {
          severity: 'error',
          show: true,
          message: 'ERRO: ' + error.message
        }
      })
    }
  }

  async function sendData() {
    setState({...state, showWaiting: true, errors: {}})
    try {
       //Chama a validação da biblioteca Joi
       await Funcionario.validateAsync(funcionario, { abortEarly: false })

      // Registro já existe: chama PUT para atualizar
      if (params.id) await myfetch.put(`${API_PATH}/${params.id}`, funcionario)

      // Registro não existe: chama POST para criar
      else await myfetch.post(API_PATH, funcionario)

      setState({
        ...state, 
        showWaiting: false,
        notif: {
          severity: 'success',
          show: true,
          message: 'Item salvo com sucesso'
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
    if(notif.severity === 'success') navigate("/funcionario")

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

      <SectionTitle title={params.id ? "Editar usuário" : "Cadastrar novo usuário"} />

      <Box sx={{
        display: "flex",
        justifyContent: "left",
        margin: "25px 0px 25px 50px"
      }}>
        <Link to="/funcionario">
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
          label="Nome Funcionario" 
          variant="filled"
          required
          name="nome"  // Nome do campo na tabela
          value={funcionario.nome}   // Nome do campo na tabela
          onChange={handleFormFieldChange}
          error={errors?.nome}
          helperText={errors?.nome}
        />

        <TextField sx={{ margin: "30px 160px 30px 80px", width: "600px" }}
          label="Endereço" 
          variant="filled"
          required
          name="endereco"  // Nome do campo na tabela
          value={funcionario.endereco}   // Nome do campo na tabela
          onChange={handleFormFieldChange}
          error={errors?.endereco}
          helperText={errors?.endereco}
        />

        <TextField sx={{ margin: "30px 160px 30px 80px", width: "600px" }}
          label="Email" 
          variant="filled"
          required
          name="email"  // Nome do campo na tabela
          value={funcionario.email}   // Nome do campo na tabela
          onChange={handleFormFieldChange}
          error={errors?.email}
          helperText={errors?.email}
        />

        <TextField sx={{ margin: "30px 160px 30px 80px", width: "600px" }}
          label="Telefone" 
          variant="filled"
          required
          name="telefone"  // Nome do campo na tabela
          value={funcionario.telefone}   // Nome do campo na tabela
          onChange={handleFormFieldChange}
          error={errors?.telefone}
          helperText={errors?.telefone}
        />

        <TextField sx={{ margin: "30px 160px 30px 80px", width: "600px" }}
          label="Cargo" 
          variant="filled"
          required
          name="cargo"  // Nome do campo na tabela
          value={funcionario.cargo}   // Nome do campo na tabela
          onChange={handleFormFieldChange}
          error={errors?.cargo}
          helperText={errors?.cargo}
        />

        <TextField sx={{ margin: "30px 160px 30px 80px", width: "600px" }}
          label="CPF" 
          variant="filled"
          required
          name="cpf"  // Nome do campo na tabela
          value={funcionario.cpf}   // Nome do campo na tabela
          onChange={handleFormFieldChange}
          error={errors?.cpf}
          helperText={errors?.cpf}
        />

        <TextField sx={{ margin: "30px 160px 30px 80px", width: "600px" }}
          label="Data Nasc" 
          variant="filled"
          required
          name="data_nasc"  // Nome do campo na tabela
          value={funcionario.data_nasc}   // Nome do campo na tabela
          onChange={handleFormFieldChange}
          error={errors?.data_nasc}
          helperText={errors?.data_nasc}
        />

        <TextField sx={{ margin: "30px 160px 30px 80px", width: "600px" }}
          label="Senha" 
          variant="filled"
          required
          name="senha"  // Nome do campo na tabela
          value={funcionario.senha}   // Nome do campo na tabela
          onChange={handleFormFieldChange}
          error={errors?.senha}
          helperText={errors?.senha}
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