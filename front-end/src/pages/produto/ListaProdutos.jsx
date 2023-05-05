import React from 'react'
import Typography from '@mui/material/Typography'
import myfetch from '../../utils/myfetch'

export default function ListaProdutos() {

  const [produtos, setProdutos] = React.useState([])

  async function fetchData() {
    try {
      const result = await myfetch.get('/produto')
      setProdutos(result)
    }
    catch(error) {
      console.log(error)
    }
  }

  React.useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      <Typography variant="h3" component="h1" sx={{ textAlign: 'center' }}>
        Listagem de produtos
      </Typography>

      <div>{JSON.stringify(produtos)}</div>
    </>
  )
}