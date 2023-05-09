//importar o model correspondente ao controller
const { Funcionario } = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const controller = {}  //objeto vazio

/*
    Métodos CRUD do controller
    create: cria um novo registro
    retrieve: lista (recupera) todos os registros
    retrieveOne: lista (recupera) apenas um registro
    update: atualiza um registro
    delete: deleta um registro
*/

controller.create = async (req, res) => {
    try{
        // Criptografa a senha
        req.body.senha = await bcrypt.hash(req.body.senha, 12)

        await Funcionario.create(req.body)
        //HTTP 201: Created
        res.status(201).end()
    }
    catch(error){
        console.error(error)
    }
}

controller.retrieve = async (req, res) => {
    try {
        const data = await Funcionario.findAll()
        //HTTP 200: OK (implícito)
        res.send(data)
    } 
    catch (error) {
        console.error(error)
    }
}

controller.retrieveOne = async (req, res) => {
    try {
        const data = await Funcionario.findByPk(req.params.id)

        //HTTP 200: OK (implícito)
        if(data) res.send(data)

        //HTTP 404: Not Found
        else res.status(404).end()

    } 
    catch (error) {
        console.error(error)
    }
}

controller.update = async (req,res) => {
    try {

        // Se houver sido passado o campo "senha",
        // criptografa a senha
        if(req.body.senha) {
            req.body.senha = await bcrypt.hash(req.body.senha, 12)
        }

        const response = await Funcionario.update(
            req.body,
            {where: {id: req.params.id}}
        )

        //response retorna um vetor.O primeiro elemento do vetor
        //indica quantos registros foram afetados pelo update
        if(response[0] > 0){
            //HTTP 204: No content
            res.status(204).end()
        }
        else { //Não encontrou o registro para atualizar
            //HTTP 404: Not found
            res.status(404).end()

        }
    } 
    catch (error) {
        console.error(error)
    }
}

controller.delete = async (req, res) => {
    try {
        const response = await Funcionario.destroy(
            { where: {id: req.params.id} }
        )

        if (response) { //Encontrou e excluiu
            //HTTP 404: Not found
            res.status(204).end()
        } else {
            //HTTP 404: Not found
            res.status(404).end()
        }
    } 
    catch (error) {
        
    }
}

controller.login = async (req, res) => {
    try {
      const funcionario = await Funcionario.scope('withPassword').findOne({ where: { email: req.body.email } })
  
      // Usuário não encontrado ~> HTTP 401: Unauthorized
      if(!funcionario) return res.status(401).end()
  
      const pwMatches = await bcrypt.compare(req.body.senha, funcionario.senha)
  
      if(pwMatches) {
        // A senha confere
        const token = jwt.sign({
            id: funcionario.id,
            nome: funcionario.nome,
            endereco: funcionario.endereco,
            email: funcionario.email,
            telefone: funcionario.telefone,
            cargo: funcionario.cargo,
            cpf: funcionario.cpf,
            data_nasc: funcionario.data_nasc

          },
          process.env.TOKEN_SECRET,    // Chave para criptografar o token
          { expiresIn: '24h' }         // Duração do token
        )
  
        // Retorna o token ~> HTTP 200: OK (implícito)
        res.json({ auth: true, token })
      }
      else {
        // Senha errada ~> HTTP 401: Unauthorized
        res.status(401).end()
      }
    }
    catch(error) {
      console.error(error)
    }
}


module.exports = controller