import Joi from 'joi'

const Funcionario = Joi.object({
    nome: Joi.string()
        .min(3)
        .max(999)
        .required()
        .messages({'*': 'O nome é obrigatório'}),

    endereco: Joi.string()
        .min(3)
        .max(100)
        .required()
        .messages({'*': 'O endereço deve ser informado'}),

    email: Joi.string()
        .min(6)
        .max(100)
        .required()
        .messages({'*': 'O  email deve ser informado'}),

    telefone: Joi.string()
        .min(8)
        .max(15)
        .required()
        .messages({'*': 'O telefone é obrigatório'}),

    cargo: Joi.string()
        .min(3)
        .max(12)
        .required()
        .messages({'*': 'O cargo é obrigatório'}),

    cpf: Joi.string()
        .min(11)
        .max(15)
        .required()
        .messages({'*': 'O cpf é obrigatório'}),

    data_nasc: Joi.date()
        .required()
        .messages({'*': 'A data de nascimento é obrigatória'}),

    senha: Joi.string()
        .min(4)
        .max(99)
        .required()
        .messages({'*': 'A senha é obrigatória'})

}).options({allowUnknown: true})


export default Funcionario