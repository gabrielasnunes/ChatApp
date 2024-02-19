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
                  <div className=" h-screen bg-amarelo flex flex-col justify-center items-center gap-16">
                        <label className="text-2xl font-bold text-white">Nome do utilizador:</label>
                        <input className="border-2 border-black rounded-sm w-3/5 h-10 " onChange={mudarEvento}></input>
                        <button onClick={enviarEvento} className="bg-azul rounded-none text-white font-bold text-center w-24 h-10 ">Enviar</button>
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

            <div  className="h-screen bg-amarelo flex flex-col justify-center items-center gap-16">
                  <div>
                        <h2 className="font-bold text-2xl">Lista de Contactos</h2>
                        {listaContactos.map((contacto, index) => (
                              <div className="flex flex-col items-center" key={index}>
                                    <button className="flex font-bold text-black justify-center items-center bg-white  w-4/5 mb-4 p-4  rounded-lg" onClick={() => setContactoSelecionado(contacto)} >{contacto}</button>

                              </div>
                        ))}
                  </div>
                  <div className="flex flex-col items-center">
                        <h2 className="font-bold text-2xl">Lista de Mensagens</h2>
                        {/* <div className="flex font-bold text-black justify-center bg-white  w-4/5 mb-4 p-4  rounded-lg gap-4 space-x-3"> */}
                        {mensagens.filter((m, i) =>
                              m.from == contactoSelecionado || m.to == contactoSelecionado)
                              .map((message, index) => (
                                    <div className="font-bold text-black  bg-white  w-4/5 mb-4 h-32 rounded-lg" key={index}>
                                          <p>De: {message.from}</p>
                                          <p>Para: {message.to}</p>
                                          <p>Conteúdo: {message.content}</p>

                                    </div>
                              ))}
                        {/* </div> */}
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
                  <button className="bg-azul rounded-none text-white font-bold text-center w-36 h-10" onClick={() => window.location.reload()  }>Voltar para Login</button>
            </div>

      )

}