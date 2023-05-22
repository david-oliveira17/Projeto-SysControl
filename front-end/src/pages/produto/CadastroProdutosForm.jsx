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

export default function CadastroProdutosForm() {
  const API_PATH = '/produtos'

  const navigate = useNavigate()

  const [state, setState] = React.useState({
    produto: {}, // Objeto vazio
    showWaiting: false,
    notif: {
      show: false,
      severity: 'success',
      message: ''
    }
  })
  const {
    produto,
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
    setState({...state, showWaiting: true})
    try {
       //Chama a validação da biblioteca Joi
       await Produto.validateAsync(produto)

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
      console.error(error)
      // DAR FEEDBACK NEGATIVO
      setState({
        ...state, 
        showWaiting: false,
        notif: {
          severity: 'error',
          show: true,
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

      <PageTitle title="Cadastrar novo método de pagamento" />

      <form onSubmit={handleFormSubmit}>
        <TextField 
          label="Nome Produto" 
          variant="filled"
          fullWidth
          required
          name="nome_prod"  // Nome do campo na tabela
          value={produto.nome_prod}   // Nome do campo na tabela
          onChange={handleFormFieldChange}
        />

        <TextField 
          label="Fornecedor" 
          variant="filled"
          fullWidth
          required
          name="cod_forn"  // Nome do campo na tabela
          value={produto.cod_forn}   // Nome do campo na tabela
          onChange={handleFormFieldChange}
        />

        <TextField 
          label="Valor Compra" 
          variant="filled"
          type="number"
          fullWidth
          required
          name="valor_compra"  // Nome do campo na tabela
          value={produto.valor_compra}   // Nome do campo na tabela
          onChange={handleFormFieldChange}
        />

        <TextField 
          label="Valor Venda" 
          variant="filled"
          type="number"
          fullWidth
          required
          name="valor_venda"  // Nome do campo na tabela
          value={produto.valor_venda}   // Nome do campo na tabela
          onChange={handleFormFieldChange}
        />

        <TextField 
          label="Descrição" 
          variant="filled"
          fullWidth
          name="descricao"  // Nome do campo na tabela
          value={produto.descricao}   // Nome do campo na tabela
          onChange={handleFormFieldChange}
        />

        <Fab 
          variant="extended" 
          color="secondary"
          type="submit"
        >
          <SendIcon sx={{ mr: 1 }} />
          Enviar
        </Fab>

      </form>
    </>
  )
}