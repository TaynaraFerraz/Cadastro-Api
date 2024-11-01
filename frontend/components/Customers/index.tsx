import { useState } from "react";
import { FiTrash } from "react-icons/fi";
import { api } from "../../src/services/api";

type Customers = {
    id: string,
    name: string,
    email: string,
    status: boolean,
    created_at: string,
    updated_at: string
}

export function Customers({ customersProps }: { customersProps: Customers[] }) {

    const [customers, setCustomers] = useState<Customers[]>(customersProps)
    const [modal, setModal] = useState(false)
    const [id, setId] = useState<string>("")

    async function handleDelete(id: string) {
        try {
            await api.delete("/customer", {
                params: { id: id, }
            })

            const allCustomers = customers.filter((customers) => customers.id !== id) //devolve para a variável todos os itens menos aquele que eu deletei

            setCustomers(allCustomers)
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <section className="flex flex-col gap-4">
            {customersProps.map((item: Customers) => (
                <article className="w-full bg-white rounded p-2 relative hover:scale-105 duration-200">
                    <p><span className="font-medium">Nome:</span> {item.name}</p>
                    <p><span className="font-medium">Email:</span> {item.email}</p>
                    <p><span className="font-medium">Status:</span> {item.status}</p>

                    <button className="bg-red-600 w-7 h-7 flex items-center justify-center rounded-lg absolute right-0 -top-2"><FiTrash size={18} color="#FFF" onClick={() => {setModal(true); setId(item.id)}}/></button>
                </article>
            ))}
            {
                modal && (
                    <><div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center" onClick={() => setModal(false)} />
                        <div className='fixed inset-0 flex items-center justify-center'>
                            <div className="bg-white p-8 rounded-lg shadow-lg w-1/3 max-w-md">
                                <h2 className="text-2xl font-bold mb-4 text-center">Deseja mesmo deletar esse cliente?</h2>

                                <div className='flex justify-center items-center gap-4'>
                                    <button className="mt-4 px-4 py-2 bg-blue-800 text-white rounded" onClick={() => { setModal(false); handleDelete(id); window.location.reload() }}>Sim</button>
                                    <button className="mt-4 px-4 py-2 bg-blue-800 text-white rounded" onClick={() => setModal(false)}>Não</button>
                                </div>
                            </div>
                        </div></>
                )
            }
        </section>
    )
}