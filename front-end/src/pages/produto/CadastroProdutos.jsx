import React from 'react'
import myfetch from '../../utils/myfetch'
import PageTitle from '../../components/ui/PageTitle'
import SectionTitle from '../../components/ui/SectionTitle'
import Paper from '@mui/material/Paper';
import { DataGrid } from '@mui/x-data-grid'
import EditIcon from '@mui/icons-material/Edit'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import IconButton from '@mui/material/IconButton'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'

export default function ListaProdutos() {

  const [produtos, setProdutos] = React.useState([])
  const [showWaiting, setShowWaiting] = React.useState(false)

  async function fetchData() {
    setShowWaiting(true)
    try {
      const result = await myfetch.get('/produtos')
      setProdutos(result)
    }
    catch(error) {
      console.log(error)
    }
    finally {
      setShowWaiting(false)
    }
  }

  React.useEffect(() => {
    fetchData()
  }, [])

  const columns = [
    { field: 'id', headerName: 'Código', width: 90 },
    {
      field: 'nome_prod',
      headerName: 'Nome do Produto',
      width: 300
    },
    {
      field: 'fornecedor.nome_empresa',
      headerName: 'Fornecedor',
      width: 250
    },
    {
      field: 'valor_venda',
      headerName: 'Valor Venda',
      width: 150
    },
    {
      field: 'valor_compra',
      headerName: 'Valor Compra',
      width: 150
    },
    /*
    {
      field: 'edit',
      headerName: 'Editar',
      headerAlign: 'center',
      align: 'center',
      width: 90,
      renderCell: params => (
        <IconButton aria-label="Editar">
          <EditIcon />
        </IconButton>
      )
    },
    {
      field: 'delete',
      headerName: 'Excluir',
      headerAlign: 'center',
      align: 'center',
      width: 90,
      renderCell: params => (
        <IconButton aria-label="excluir">
          <DeleteForeverIcon color="error" />
        </IconButton>
      )
    }*/
  ];

  return (
    <>
      <Backdrop
        sx={{ color: '#000', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={showWaiting}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      

      <Paper elevation={4} sx={{ height: 400, width: '1000px', margin: '0 auto' }}>
        <SectionTitle title="Produtos cadastrados"  />
        <DataGrid
          rows={produtos}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          disableRowSelectionOnClick
        />
      </Paper>
    </>
  )
}