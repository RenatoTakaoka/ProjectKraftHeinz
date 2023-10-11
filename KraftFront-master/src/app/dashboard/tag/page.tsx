"use client"
import {z} from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from "react-hook-form";
import {useState} from "react";
import axios from "axios";


const RegistrerTagSchema = z.object({
    nomeTag: z.string().nonempty("não pode ser vazio!").min(3,"É necessário informar ao menos três caracteres").max(25,"Limite de 25 caracteres ")
});

type RegistrerTagSchema = z.infer<typeof RegistrerTagSchema>

export default function AdicionarTag(){

    const [sucesso,setSucesso] = useState(false);

    const {register, handleSubmit, formState: {errors}} = useForm<RegistrerTagSchema>({resolver: zodResolver(RegistrerTagSchema)});

    function registrarTag(data:RegistrerTagSchema){
        axios.post("http://localhost:8080/tags", data)
            .then(function (response) {
                setSucesso(true);
            }).catch(function (error) {
            console.log(error);
        });
    }

    return(
        <>
            <section className=" col-start-2 col-span-12 lg:col-start-3">
                <div className="flex flex-col items-center h-full  pt-0 mx-auto justify-center lg:py-0">
                    <div className="w-full bg-white rounded-lg  md:mt-0 sm:max-w-md xl:p-0  ">
                        <div className="  p-5">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                                Adicione uma tag
                            </h1>
                            <form className="space-y-4 md:space-y-6 py-12" onSubmit={handleSubmit(registrarTag)}>
                                <input type="text" placeholder="Digite o nome da tag" className="input input-bordered w-full" {...register('nomeTag')} />
                                {errors.nomeTag && <span className="text-red-700 border-rose-500">{errors.nomeTag.message}</span>}
                                {sucesso ? <span className="text-green-600">Cadastrado com sucesso!!!</span> : null}
                                <button type="submit" className="w-full text-white bg-indigo-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Enviar</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}