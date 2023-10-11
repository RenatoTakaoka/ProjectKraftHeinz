"use client"
import Image from 'next/image'
import Logo from '../../../public/LogoKraftv2 1.svg'
import Link from "next/link";
import {z} from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from "react-hook-form";
import {useState} from "react";
import axios from "axios";
import {useRouter} from "next/navigation";

const RegistrerUserSchema = z.object({
    primeroNome: z.string().nonempty("O primeiro nome não pode estar vazio").max(20, "No maximo 20 letras"),
    ultimoNome: z.string().nonempty("O ultimo nome não pode estar vazio").min(4, "No minimo 4 letras").max(20, "No maximo 20 letras"),
    senha: z.string().nonempty("Senha não pode estar vazio"),
    userName: z.string().nonempty("O nome não pode estar vazio").min(4, "No minimo 4 letras").max(20, "No maximo 20 letras"),
    emailCliente: z.string().email().nonempty("O nome não pode estar vazio"),
    senhaConfirm: z.string().nonempty("O nome não pode estar vazio")
}).refine((data) => data.senha === data.senhaConfirm,{
    message: "Senhas não coicidem!",
    path: ["senhaConfirm"]
});
type RegistrerUserSchema = z.infer<typeof RegistrerUserSchema>

export default function Registration() {
    const [sucesso,setSucesso] = useState(false);
    const {register, handleSubmit, formState: {errors}} = useForm<RegistrerUserSchema>({resolver: zodResolver(RegistrerUserSchema)});
    const router = useRouter()
    function registrarUsuario(data:RegistrerUserSchema){
        axios.post("http://localhost:8080/clientes", data)
            .then(function (response) {
                setSucesso(true)
            }).catch(function (error) {
            console.log(error);
        });
    }


    return (
        <>
            <div className="h-screen md:flex">
                <div
                    className="relative overflow-hidden md:flex w-1/2 bg-gradient-to-tr bg-MainColor to-purple-700 i justify-around items-center hidden" style={{backgroundImage: "url(/BackGround.jpg)",  backgroundSize: "cover"}}>
                    <div className="px-32">
                        <Image src={Logo} alt={"Logo"} width={325} height={82}/>
                        <p className="text-black mt-1 text-lg" >Sua opinião importa! 📣 Ajude-nos a melhorar nossos produtos, marcas e práticas ESG. Compartilhe suas sugestões e juntos podemos construir um futuro melhor.</p>

                        <Link href="/"><button type="submit" className="block w-28 bg-white text-indigo-800 mt-4 py-2 rounded-2xl font-bold mb-2 hover:bg-indigo-500">Voltar</button></Link>
                    </div>
                    <div className="absolute -bottom-32 -left-40 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
                    <div className="absolute -bottom-40 -left-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
                    <div className="absolute -top-40 -right-0 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
                    <div className="absolute -top-20 -right-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
                </div>
                <div className="flex md:w-1/2 justify-center py-10 items-center  bg-white">
                    <form className="bg-white w-1/2" onSubmit={handleSubmit(registrarUsuario)}>
                        <h1 className="text-gray-800 font-bold text-2xl mb-1">Bem vindo!</h1>
                        <p className="text-sm font-normal text-gray-600 mb-7">Criar conta</p>
                        {errors.primeroNome && <span className="text-red-700 border-rose-500">{errors.primeroNome.message}</span>}
                        <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20"
                                 fill="currentColor">
                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                      clipRule="evenodd" />
                            </svg>
                            <input className="pl-2 outline-none border-none w-full" type="text"  placeholder="Primeiro nome" {...register('primeroNome')}/>
                        </div>
                        {errors.ultimoNome && <span className="text-red-700">{errors.ultimoNome.message}</span>}
                        <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20"
                                 fill="currentColor">
                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                      clipRule="evenodd" />
                            </svg>
                            <input className="pl-2 outline-none border-none w-full" type="text"  placeholder="Ultimo nome" required {...register('ultimoNome')}/>
                        </div>
                        {errors.userName && <span className="text-red-700">{errors.userName.message}</span>}
                        <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none"
                                 viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                            </svg>
                            <input className="pl-2 outline-none border-none w-full" type="text" placeholder="Usuário" required {...register('userName')}/>
                        </div>
                        {errors.emailCliente && <span className="text-red-700">{errors.emailCliente.message}</span>}
                        <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none"
                                 viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                            </svg>
                            <input className="pl-2 outline-none border-none w-full" type="email" placeholder="Email" required {...register('emailCliente')}/>
                        </div>
                        {errors.senha && <span className="text-red-700">{errors.senha.message}</span>}
                        <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20"
                                 fill="currentColor">
                                <path fillRule="evenodd"
                                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                                      clipRule="evenodd" />
                            </svg>
                            <input className="pl-2 outline-none border-none w-full" type="password" placeholder="Senha" required {...register('senha')}/>
                        </div>
                        {errors.senhaConfirm?.message && <span className="text-red-700">{errors.senhaConfirm.message}</span>}
                        <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-6">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20"
                                 fill="currentColor">
                                <path fillRule="evenodd"
                                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                                      clipRule="evenodd" />
                            </svg>
                            <input className="pl-2 outline-none border-none w-full" type="password"  placeholder="Confirmar senha" required {...register('senhaConfirm')}/>
                        </div>
                        <div className="flex items-start mb-6 px-3">
                            <div className="flex items-center h-5">
                                <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" required/>
                            </div>
                            <label htmlFor="remember" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">I agree with the <a href="#" className="text-blue-600 hover:underline dark:text-blue-500" >terms and conditions</a>.</label>
                        </div>
                        {sucesso ? <span className="text-green-600 ">Sucesso!!!</span> : null}
                        <button type="submit" className="block w-full bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2 hover:bg-indigo-500">Registrar</button>

                        <Link href="/signin"><span className="text-sm ml-2 hover:text-blue-500 cursor-pointer">Já possui uma conta ?</span></Link>
                    </form>
                </div>
            </div>
        </>
    )
}