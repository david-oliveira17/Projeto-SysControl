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
import Produto from '../../models/Produto'
import getValidationMessages from '../../utils/getValidationMessages'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { Link } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

export default function CadastroProdutosForm() {
  const API_PATH = '/produtos'

  const navigate = useNavigate()
  const params = useParams()

  const [state, setState] = React.useState({
    produto: {
      nome_prod: '',
      valor_compra: '',
      valor_venda: ''
    },
    errors: {},
    showWaiting: false,
    notif: {
      show: false,
    }
  })
  const {
    produto,
    errors,
    showWaiting,
    notif
  } = state

  function handleFormFieldChange(event) {
    const produtoCopy = {...produto}
    produtoCopy[event.target.name] = event.target.value
    setState({...state, produto: produtoCopy})
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
        produto: result,
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
       await Produto.validateAsync(produto, { abortEarly: false })

     // Registro já existe: chama PUT para atualizar
     if (params.id) await myfetch.put(`${API_PATH}/${params.id}`, produto)

     // Registro não existe: chama POST para criar
     else await myfetch.post(API_PATH, produto)

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
    if(notif.severity === 'success') navigate("/produto")

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

      <SectionTitle title={params.id ? "Editar produto" : "Cadastrar novo produto"} />

      <Box sx={{
        display: "flex",
        justifyContent: "left",
        margin: "25px 0px 25px 50px"
      }}>
        <Link to="/produto">
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
          label="Nome Produto" 
          variant="filled"
          required
          name="nome_prod"  // Nome do campo na tabela
          value={produto.nome_prod}   // Nome do campo na tabela
          onChange={handleFormFieldChange}
          error={errors?.description}
          helperText={errors?.description}
        />

        <TextField sx={{ margin: "30px 160px 30px 80px", width: "600px" }}
          label="Fornecedor" 
          variant="filled"
          required
          name="cod_forn"  // Nome do campo na tabela
          value={produto.cod_forn}   // Nome do campo na tabela
          onChange={handleFormFieldChange}
          error={errors?.cod_forn}
          helperText={errors?.cod_forn}
        />

        <TextField sx={{ margin: "30px 160px 30px 80px", width: "600px" }}
          label="Valor Compra" 
          variant="filled"
          type="number"
          required
          name="valor_compra"  // Nome do campo na tabela
          value={produto.valor_compra}   // Nome do campo na tabela
          onChange={handleFormFieldChange}
          error={errors?.valor_compra}
          helperText={errors?.valor_compra}
        />

        <TextField sx={{ margin: "30px 160px 30px 80px", width: "600px" }}
          label="Valor Venda" 
          variant="filled"
          type="number"
          required
          name="valor_venda"  // Nome do campo na tabela
          value={produto.valor_venda}   // Nome do campo na tabela
          onChange={handleFormFieldChange}
          error={errors?.valor_venda}
          helperText={errors?.valor_venda}
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