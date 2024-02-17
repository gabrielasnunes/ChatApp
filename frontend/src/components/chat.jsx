import { useState } from "react"

export function Chat() {

      const [utilizador, setUtilizador] = useState("")
      const [mensagens, setMensagens] = useState([])
      const [contactoSelecionado, setContactoSelecionado] = useState()

      let listaContactos = []


      const mudarEvento = (event) => {

            setUtilizador(event.target.value)
      }

      const enviarEvento = (event) => {
            loadUser()
      }

      //carregar o user 

      const loadUser = async () => {
            //Espera por qualquer feedback 
            const res = await fetch(`/api/messages/${utilizador}`)
            if (res.status >= 400) return

            //Espera que a resposta chegue a 100%
            const body = await res.json()
            setMensagens(body.messages)
            // setUtilizador(body.counter)
      }



      if (mensagens.length === 0) {
            return (
                  <div>
                        <label>Nome do utilizador:</label>
                        <input onChange={mudarEvento}></input>
                        <button onClick={enviarEvento}>Enviar</button>
                  </div>
            )

      }

      //criar condição para mostrar os contactos que o utilizador mandou ou recebeu mensagem,
      // criar outra condição para mostrar mensagens em que o user seja diferente dele mesmo
      for (let i = 0; i < mensagens.length; i++) {
            if (mensagens[i].from != utilizador && !listaContactos.includes(mensagens[i].from)) {
                  listaContactos.push(mensagens[i].from)
            } if (mensagens[i].to != utilizador && !listaContactos.includes(mensagens[i].to)) {
                  listaContactos.push(mensagens[i].to)
            }
      }



      return (

            <div>
                  <div>
                        <h2>Lista de Contactos</h2>
                        {listaContactos.map((contacto, index) => (
                              <div key={index}>
                                    <button onClick={() => setContactoSelecionado(contacto)} >{contacto}</button>

                              </div>
                        ))}
                  </div>
                  <div>
                        <h2>Lista de Mensagens</h2>
                        {mensagens.filter((m, i) =>
                              m.from == contactoSelecionado || m.to == contactoSelecionado)
                              .map((message, index) => (
                                    <div key={index}>
                                          <p>De: {message.from}</p>
                                          <p>Para: {message.to}</p>
                                          <p>Conteúdo: {message.content}</p>
                                          <hr />
                                    </div>
                              ))}
                  </div>
                  {/* <div>
                        <h2>Lista de Mensagens</h2>
                        {mensagens.map((message, index) => (
                              <div key={index}>
                                    <p>De: {message.from}</p>
                                    <p>Para: {message.to}</p>
                                    <p>Conteúdo: {message.content}</p>
                                    <hr />
                              </div>
                        ))}
                  </div> */}
                  <button  onClick={() => window.location.reload() }>Voltar para Login</button>
            </div>

      )

}