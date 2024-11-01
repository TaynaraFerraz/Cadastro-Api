import { FormEvent, useRef, useState } from "react";
import { api } from "../../src/services/api";

type Customers = {
    id: string,
    name: string,
    email: string,
    status: boolean,
    created_at: string,
    updated_at: string
  }

export function Form() {

    const [customers, setCustomers] = useState<Customers[]>([])
    const nameRef = useRef<HTMLInputElement | null>(null)
    const emailRef = useRef<HTMLInputElement | null>(null)

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();

        if (!nameRef.current?.value || !emailRef.current?.value) return;

        const response = await api.post("/customer", {
            name: nameRef.current?.value,
            email: emailRef.current?.value
        })

        setCustomers(allCustomers => [...allCustomers, response.data])

        nameRef.current.value = ""
        emailRef.current.value = ""

        window.location.reload()
    }

    return (
        <div>
            <h1 className="text-4xl font-medium text-white">Clientes</h1>

            <form action="" className="flex flex-col my-6">
                <label htmlFor="" className="font-medium text-white">Nome:</label>

                <input type="text" placeholder="Digite seu nome completo..." className="w-full mb-5 p-2 rounded" ref={nameRef}/>

                <label htmlFor="" className="font-medium text-white">Email:</label>

                <input type="email" placeholder="Digite seu email completo..." className="w-full mb-10 p-2 rounded " ref={emailRef}/>

                <button type="submit" className="cursor-pointer w-full p-2 bg-green-500 rounded font-medium mb-4" onClick={handleSubmit}> Cadastrar</button>
            </form>
        </div>
    )
}
