const express = require('express')
const app = express()
const port = 6868

const bodyParser = require('body-parser');

app.use(bodyParser.json());


const  messages = [
    {
    from: "rafael",
    to: "claudio",
    content: "Oi Claudio, tudo bem?",
    
}, 
    {
    from: "rafael",
    to: "joana",
    content: "Oi Claudio, tudo bem?",
    
}, 
{
    from: "claudio",
    to: "rafael",
    content: "Oi, tudo bem?",
    
},
{
    from: "madalena",
    to: "rafael",
    content: "Oi, tudo bem?",
    
},
{
    from: "fernando",
    to: "joao",
    content: "Oi, tudo bem?",
    
},
{
    from: "joao",
    to: "fernando",
    content: "Oi, tudo bem?",
    
}

]

//GET /api/messages/:user //Carrega todas as conversas de um utilizador
app.get('/api/messages/:user', (req, res) => {
    const user = req.params.user

    const userMessages = messages.filter(message => message.from === user || message.to === user);
      
    res.json({messages : userMessages});
})

//POST /api/messages/send/:from/:to //Guarda uma mensagem de um utilizador para outro

app.post('/api/messages/send/:from/:to', (req, res) => {
    const { from, to } = req.params;
    const { content } = req.body;

    // Verifica se o corpo da requisição contém o campo 'content'
    if (!content) {
        return res.status(400).json({ error: "O corpo da mensagem não pode estar vazio."});
   }

    // Cria um novo objeto de mensagem
    const newMessage = {
        from: from,
        to: to,
        content: content,
    };

    // Adiciona a nova mensagem ao array de mensagens
    messages.push(newMessage);

    // Retorna a mensagem enviada como resposta
    res.json({sentMessage: newMessage });
});




app.listen(port, () => {
  console.log(`À escuta em http://localhost:${port}`)
})