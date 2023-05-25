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
import Produto from '../../models/Produto'
import getValidationMessages from '../../utils/getValidationMessages'

export default function CadastroProdutosForm() {
  const API_PATH = '/produtos'

  const navigate = useNavigate()

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

  async function sendData() {
    setState({...state, showWaiting: true, errors: {}})
    try {
       //Chama a validação da biblioteca Joi
       await Produto.validateAsync(produto, { abortEarly: false })

      await myfetch.post(API_PATH, produto)
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

      <PageTitle title="Cadastrar novo produto" />

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
          error={errors?.description}
          helperText={errors?.description}
        />

        <TextField sx={{ margin: "30px 160px 30px 80px", width: "600px" }}
          label="Valor Compra" 
          variant="filled"
          type="number"
          required
          name="valor_compra"  // Nome do campo na tabela
          value={produto.valor_compra}   // Nome do campo na tabela
          onChange={handleFormFieldChange}
          error={errors?.description}
          helperText={errors?.description}
        />

        <TextField sx={{ margin: "30px 160px 30px 80px", width: "600px" }}
          label="Valor Venda" 
          variant="filled"
          type="number"
          required
          name="valor_venda"  // Nome do campo na tabela
          value={produto.valor_venda}   // Nome do campo na tabela
          onChange={handleFormFieldChange}
          error={errors?.description}
          helperText={errors?.description}
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