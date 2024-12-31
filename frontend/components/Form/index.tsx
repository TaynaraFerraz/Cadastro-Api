import { FormEvent, useRef, useState } from "react";
import { api } from "../../src/services/api";
import { FormValues, formSchema } from "../../src/schemas/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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

    const [isSubmitSuccessful, setIsSubmitSuccessful] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { handleSubmit, register, formState: { errors }, reset } = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
        },
    });


    async function addCustomers(data: FormValues) {

        if (!data.name || !data.email) return;


        const response = await api.post("/customer", {
            name: data.name,
            email: data.email
        })

        setCustomers(allCustomers => [...allCustomers, response.data])

        data.name = ""
        data.email = ""

        if (response.status === 200) {
            setIsSubmitSuccessful(true);
            reset();
        } else {
            setError("Ocorreu um erro ao enviar o email, tente novamente mais tarde!");
        }

        setTimeout(function() {
            window.location.reload();
          }, 1800);
    
    }

    return (
        <div>
            <div className="flex items-center justify-center">
                {isSubmitSuccessful && <span className="text-lg text-white text-center font-semibold p-2 bg-green-500 block mb-4 rounded-md max-w-sm">Dados inseridos com sucesso!</span>}
                {error && <span className="text-lg text-white text-center font-bold p-2 bg-red-500 block mb-4 max-w-sm">{error}</span>}
            </div>
            <h1 className="text-4xl font-medium text-white">Clientes</h1>
            <form action="" className="flex flex-col my-6" onSubmit={handleSubmit(addCustomers)}>
                <label htmlFor="" className="font-medium text-white">Nome:</label>

                <input type="text" placeholder="Digite seu nome completo..." className="w-full mb-3 p-2 rounded" {...register("name")} />
                <label className="text-red-500 mb-3">{errors.name?.message}</label>

                <label htmlFor="" className="font-medium text-white">Email:</label>

                <input placeholder="Digite seu email completo..." className="w-full mb-3 p-2 rounded " {...register("email")} />
                <label className="text-red-500 mb-3">{errors.email?.message}</label>

                <button type="submit" className="cursor-pointer w-full p-2 bg-green-500 rounded font-medium mb-4" > Cadastrar</button>
            </form>

        </div>
    )
}
