import Joi from 'joi'

const Fornecedor = Joi.object({
    cnpj: Joi.string()
        .min(14)
        .max(18)
        .required()
        .messages({'*': 'O cnpj é obrigatório'}),
    
    nome_empresa: Joi.string()
        .min(3)
        .max(999)
        .required()
        .messages({'*': 'O nome da empresa é obrigatório'}),

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

    site: Joi.string()
        .min(8)
        .max(99),

    telefone: Joi.string()
        .min(8)
        .max(12)
        .required()
        .messages({'*': 'O telefone é obrigatório'})

})


export default Fornecedor