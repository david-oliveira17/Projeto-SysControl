import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import HeaderBar from './components/ui/HeaderBar'
import Box from '@mui/material/Box'
import ListaProdutos from './pages/produto/CadastroProdutos'
import CadastroProdutosForm from './pages/produto/CadastroProdutosForm'

function AuthGuard({children}) {
  // Estaremos autenticados se tivermos um token gravado no localStorage
  if(window.localStorage.getItem('token')) return children
  else return <Navigate to="/login" replace />
}

function App() {

  return (
    <BrowserRouter>
      <HeaderBar />
      <Box sx={{ m: '25px auto', p: '25px' }}>
        <Routes>

        <Route path="/login" element={<Login />} />

        <Route path="/" element={ 
          <AuthGuard> <Home /> </AuthGuard>
        } />

          
        <Route path="/produto" element={ 
          <AuthGuard> <ListaProdutos /> </AuthGuard> 
        } />

        <Route path="/produto/new" element={ 
          <AuthGuard> <CadastroProdutosForm /> </AuthGuard> 
        } />


        </Routes>
      </Box>
    </BrowserRouter>
  )
}

export default App