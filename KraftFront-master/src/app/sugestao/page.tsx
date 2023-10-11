"use client"
import Image from 'next/image'
import Logo from 'public/LogoKraftv2 1.svg'
import Link from "next/link";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import axios from "axios";
import {getCookie} from "typescript-cookie";
import { useRouter } from 'next/navigation'
import {useState} from "react";

const RegistrerSugestaoSchema = z.object({
    sugestao: z.object({
            mensagem: z.string().nonempty("Não pode estar vazio!"),
            tagCliente: z.array(z.object({
                codTag: z.number().int().positive()
            })).default([{codTag: 6}]),
        clientes: z.object({
                codCliente: z.number().int().positive().optional()
            }).default({}),
        }
    ),

});
type RegistrerSugestaoSchema = z.infer<typeof RegistrerSugestaoSchema>

export default function Sugestao() {
    const router = useRouter()
    const {register, handleSubmit, formState: {errors}} = useForm<RegistrerSugestaoSchema>({resolver: zodResolver(RegistrerSugestaoSchema)});
    const [sucesso, setSucesso] = useState(false);
    function registrarSugestao(data:RegistrerSugestaoSchema){
        const userCod =  parseInt(getCookie('UserCod') as string);
        data.sugestao.clientes.codCliente = userCod;
        axios.post("http://localhost:8080/avaliacaoclientes", data.sugestao).then(function (response) {
            setSucesso(true);
        }).catch(function (error) {
            router.push('/signin', { scroll: false })
        });
    }

    return(
        <div className="h-screen w-full ">
        <section className="gradient-form h-full    bg-MainColor dark:bg-neutral-700">
            <div className="h-full w-full  grid justify-center align-middle ">
                <div className="flex h-full flex-wrap  text-neutral-800 dark:text-neutral-200 ">
                    <div className="w-full ">
                        <div
                            className="h-screen w-screen  grid place-items-center  rounded-lg bg-MainColor shadow-lg dark:bg-neutral-800 ">
                            <div className="w-4/5 sm:w-3/5 ">
                                <div className="">
                                    <div className="">
                                        <div className="text-center mb-12">
                                            <a className="m-auto grid justify-center"><Image src={Logo} alt={"Logo"} width={325} height={82}/></a>
                                        </div>

                                        <form onSubmit={handleSubmit(registrarSugestao)}>

                                            <div className="mb-4 w-full flex justify-center">
                                                <div className="w-4/5">
                                                    <p className="mb-4 text-white">Sugestão</p>
                                                    <textarea maxLength={200}  rows={2} cols={4} placeholder="Digite aqui" className="input input-bordered input-lg w-full   h-52   align-text-top resize-none" {...register('sugestao.mensagem')}/>
                                                    {errors.sugestao?.message && <span className="text-red-700 border-rose-500">{errors.sugestao.message}</span>}
                                                    {sucesso ? <span className="text-green-500">Enviada com sucesso!</span>:null}
                                                    <button
                                                        className="my-4 bg-indigo-600 mb-3 inline-block  w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
                                                        type="submit"
                                                        data-te-ripple-color="light"
                                                        disabled={sucesso}
                                                    >
                                                        ENVIAR
                                                    </button>
                                                    <Link href="/"><button type="button" className="block w-28 bg-indigo-600 text-white hover:bg-indigo-500 mt-4 py-2 rounded-2xl font-bold mb-2">Voltar</button></Link>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
</div>
    )
}