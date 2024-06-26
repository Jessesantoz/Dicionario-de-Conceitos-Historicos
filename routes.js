const noticias = require('./db/news')
const conceitos = require('./db/conceitos')
const conceito = require('./db/conceitos')

function routes(app) {
    
    app.get('/', (req, res) => {
        res.render('index', {
            conceito: conceitos
        })
    })
    
    app.get('/noticias/:indice', (req, res) => {
        const indice = req.params.indice
        //const conceito_selecionado = []

        for(let i = 0; i < conceitos.length; i++){
            if (indice.toLocaleUpperCase() == (conceitos[i].title).toLocaleUpperCase()){
            //conceito_selecionado.push(conceitos[i])
            res.render('noticias', { conceito: conceito[i] })
            }
        }
    })

    /** Admin */
    
    app.get('/admin', (req, res) => {
        const indice = req.params.indice
        res.render('admin')
    })

    /**Conceitos */

    app.get('/conceitos', (req, res) => {
        const letra = req.params.letra
        res.render('conceito', {conceitos: conceitos})
    })

    app.get('/conceitos/pesquisa', (req, res) => {
        const letra = req.query.letra
        const filtrada = []

        for(let i = 0; i < conceitos.length; i++){
            if (conceitos[i].title.toLowerCase().startsWith(letra.toLowerCase()))
            filtrada.push(conceitos[i])
        }
    

        res.render('conceito', {conceitos: filtrada})
    })

    app.post('/admin/news', (req, res) => {
        const {title, description} = req.body
        const errors = []

        console.log(req.body)

        if (!title) {
            errors.push("O titulo é obrigatorio")
        } 
        if (!description){
            errors.push("A descrição é obrigatoria")
        }
    
        const novaNoticia = {
            title,
            description
        }

        if (errors.length > 0) {
            res.status(401).json({msgs: errors})
            return
        }
    
        conceitos.push(novaNoticia)
        res.status(200).json({msg: 'dados gravados com sucesso'})
        //res.render('confirmação')
    })

    
}

module.exports = routes