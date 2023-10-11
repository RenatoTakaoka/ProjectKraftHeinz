"use client"
import Image from 'next/image'
import Logo from '../../../public/LogoKraftv2 1.svg'
import Link from "next/link";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import axios from "axios";
import {setCookie } from 'typescript-cookie'
import {useState} from "react";
import { useRouter } from 'next/navigation'
interface user{
    codFuncionario: number,
    primeroNome: string,
    ultimoNome: string,
    senha: string,
    cargo: string,
    emailFuncionario: string,
    dataRegistro: string,
    cpfFuncionario: number,
    avaliacaoClientes: [],
}

const LogarUserSchema = z.object({
    email: z.string().email(),
    senha: z.string().nonempty()
});

type LogarUserSchema = z.infer<typeof LogarUserSchema>

export default function SinginDashBord() {
    const router = useRouter()
    const {register, handleSubmit, formState: {errors}} = useForm<LogarUserSchema>({resolver: zodResolver(LogarUserSchema)});
    const [error, setError] = useState("");
    function logarSubmit(data:LogarUserSchema){
        const params = new URLSearchParams();
        params.append('email', data.email);
        params.append('senha', data.senha);

        axios.post("http://localhost:8080/funcionarios/login", params).then(function (response:any) {
            const data:user = response.data;
            setCookie('UserFuncCod', JSON.stringify(data.codFuncionario), { expires: 1,path: "/",sameSite:"Lax"  })
            setCookie('EmailFun', JSON.stringify(data.emailFuncionario), { expires: 1,path: "/",sameSite:"Lax"  })
            setCookie('senhaFun', JSON.stringify(data.senha), { expires: 1, path: "/",sameSite:"Lax"})
            router.replace('/dashboard', { scroll: false })
        }).catch(function (error:any) {
          setError(error.response.data)
        });
    }
    return (
            <div className="flex min-h-full flex-1 flex-col  px-6 py-12 lg:px-8 bg-white">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm flex flex-col justify-center">
                    <a className="m-auto"><Image src={Logo} alt={"Logo"} width={325} height={82}/></a>
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Login
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={handleSubmit(logarSubmit)}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Login
                            </label>
                            <div className="mt-2">
                                <input
                                    {...register("email")}
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900 ">
                                    Senha
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    {...register("senha")}
                                    type="password"
                                    id="password"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                                />
                            </div>
                            {error === "" ?  null : <span className="text-red-600">{error}</span>}
                        </div>
                        <div>

                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Entrar
                            </button>

                            <Link href="/registration"><span className="text-sm ml-2 hover:text-blue-500 cursor-pointer">Precisa criar uma conta?</span></Link>
                        </div>
                        <Link href="/"><button type="submit" className="block w-28 bg-indigo-600 text-white hover:bg-indigo-500 mt-4 py-2 rounded-2xl font-bold mb-2">Voltar</button></Link>
                    </form>
                </div>
            </div>

    )
}