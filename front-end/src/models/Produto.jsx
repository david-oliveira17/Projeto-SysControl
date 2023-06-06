import Joi from 'joi'

const Produto = Joi.object({
    cod_forn: Joi.number()
        .min(1)
        .max(999)
        .required()
        .messages({'*': 'O fornecedor é obrigatório'}),

    nome_prod: Joi.string()
        .min(0)
        .max(100)
        .required()
        .messages({'*': 'O nome do produto deve ser informado'}),

    valor_compra: Joi.number()
        .min(0)
        .max(100)
        .required()
        .messages({'*': 'O valor de compra é obrigatório'}),

    valor_venda: Joi.number()
        .min(0)
        .max(100)
        .required()
        .messages({'*': 'O valor de venda é obrigatório'}),

}).options({allowUnknown: true})


export default Produto