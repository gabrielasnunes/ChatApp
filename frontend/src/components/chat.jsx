import { useState } from "react"

export function Chat() {

      const [utilizador, setUtilizador] = useState("")
      const [mensagens, setMensagens] = useState([])




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

      if (mensagens.length <= 0) {
            return (
                  <div>
                        <label>Nome do utilizador:</label>
                        <input onChange={mudarEvento}></input>
                        <button onClick={enviarEvento}>Enviar</button>
                  </div>
            )
      }

      return (
            
                  <div>
                        <div>
                              <h2>Lista de Mensagens</h2>
                              {mensagens.map((message, index) => (
                                    <div key={index}>
                                          <p>De: {message.from}</p>
                                          <p>Para: {message.to}</p>
                                          <p>Conteúdo: {message.content}</p>
                                          <hr />
                                    </div>
                              ))}
                        </div>

                  </div>
            
      )

}