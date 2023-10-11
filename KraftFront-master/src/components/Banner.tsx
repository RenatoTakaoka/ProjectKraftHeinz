import Image from "next/image";
import meioAmbiente from "../../public/Meio ambiente.png"
import govenaca from "../../public/govenaça.png"
import social from "../../public/social.png"
import Logo from "../../public/LogoKraftv2 1.svg"
import React from "react";
import Link from "next/link";

export default function Banner(){
    return(
        <section>
            <div className="text-white py-20 " style={{backgroundImage: "url(/BackGround.jpg)",  backgroundSize: "cover"}}>
                <div className="container mx-auto flex flex-col md:flex-row items-center my-12 md:my-24 bg-gray-900 rounded-md bg-opacity-50">
                    <div className="flex flex-col w-full lg:w-1/3 justify-center items-start p-8">
                        <Image className="text-3xl md:text-5xl" src={Logo} alt={"Logo"} width={325} height={82} />
                        <div className="flex">
                            <h2 className="text-3xl md:text-5xl leading-relaxed md:leading-snug mb-2 text-green-700 ">E</h2>
                            <h2 className="text-3xl md:text-5xl leading-relaxed md:leading-snug mb-2 text-red-700  ">S</h2>
                            <h2 className="text-3xl md:text-5xl leading-relaxed md:leading-snug mb-2 text-yellow-400 ">G</h2>
                        </div>
                        <p className="textarea-md md:text-base text-gray-50 mb-4">Sua opinião importa! 📣 Ajude-nos a melhorar nossos produtos, marcas e práticas ESG. Compartilhe suas sugestões e juntos podemos construir um futuro melhor.</p>
                        <Link className="bg-transparent hover:bg-MainColor text-white hover:text-white rounded shadow hover:shadow-lg py-4 px-4 border border-MainColor hover:border-transparent" href="/sugestao">Ajude-nos a melhorar nosso ESG</Link>
                    </div>
                    <div className="p-8 mt-12 mb-6 md:mb-0 md:mt-0 ml-0 md:ml-12 lg:w-2/3 w-full   justify-center">
                        <div className="h-48 grid grid-cols-3 gap-4 content-center ">
                                <Image className="inline-block  lg:block" src={meioAmbiente} alt={"Imagem de icone de meip ambiente"} width={250} height={250}/>
                                <Image className="inline-block lg:block" src={social} alt={"Imagem de icone de grupo de pessoas indicando social"} width={250} height={250}/>
                                <Image className="inline-block  lg:block" src={govenaca} alt={"Imagem de icone globo indicando govenaça"} width={250} height={250}/>
                    </div>
                </div>
            </div>
                </div>

        </section>
    )
}