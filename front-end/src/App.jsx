import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import HeaderBar from './components/ui/HeaderBar'
import Box from '@mui/material/Box'
import ListaProdutos from './pages/produto/CadastroProdutos'
import CadastroProdutosForm from './pages/produto/CadastroProdutosForm'
import ListaFuncionarios from './pages/funcionario/CadastroFuncionario'
import CadastroFuncionariosForm from './pages/funcionario/CadastroFuncionarioForm'
import ListaFornecedores from './pages/fornecedor/CadastroFornecedor'
import CadastroFornecedoresForm from './pages/fornecedor/CadastroFornecedorForm'

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

        <Route path="/produto/:id" element={ 
            <AuthGuard> <CadastroProdutosForm /> </AuthGuard> 
        } />

        <Route path="/funcionario" element={ 
          <AuthGuard> <ListaFuncionarios /> </AuthGuard> 
        } />

        <Route path="/funcionario/new" element={ 
          <AuthGuard> <CadastroFuncionariosForm /> </AuthGuard> 
        } />

        <Route path="/funcionario/:id" element={ 
            <AuthGuard> <CadastroFuncionariosForm /> </AuthGuard> 
        } />

        <Route path="/fornecedor" element={ 
          <AuthGuard> <ListaFornecedores /> </AuthGuard> 
        } />

        <Route path="/fornecedor/new" element={ 
          <AuthGuard> <CadastroFornecedoresForm /> </AuthGuard> 
        } />

        <Route path="/fornecedor/:id" element={ 
            <AuthGuard> <CadastroFornecedoresForm /> </AuthGuard> 
        } />


        </Routes>
      </Box>
    </BrowserRouter>
  )
}

export default App