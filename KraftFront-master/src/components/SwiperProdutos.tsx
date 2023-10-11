"use client"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import Logo from "../../public/LogoKraftv2 1.svg";


import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import Image from "next/image";
import {useEffect, useState} from "react";
import axios from "axios";
import Card from "@/components/Card";

interface lista {
    titulo: string
}
interface Produto {
    codProduto: number;
    nome: string;
    descricao: string;
    imagemProduto: string;
    typeProduto: string;
    avaliacaoClientes: any[];
    avaliacaoFuncionarios: any[];
}


export default function SwiperProdutos({titulo} : lista){
    const [dataAPI,setDataAPI] = useState<Produto[]>([]);
    useEffect(() => {
        axios.get(`http://localhost:8080/${titulo}`)
            .then(function (response) {
                setDataAPI(response.data)
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);
    return(
        <>
            <h2 className="text-white px-32 py-10 text-4xl">{titulo}</h2>

        <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            autoHeight={true}
            spaceBetween={5}
            slidesPerView={3}
            updateOnWindowResize

            breakpoints={{
                400: {
                    slidesPerView: 1,
                },
                1000: {
                    slidesPerView: 2,
                },
                1300:{
                    slidesPerView: 3,
                }
            }}
            navigation
            pagination={{ clickable: true }}

            style={{padding: "5px 0 10rem 0"}}
        >
                {dataAPI.map(dados =>{
                    return (<SwiperSlide style={{display: "grid", justifyItems: "center",minHeight: "100%"}} key={dados.codProduto}><Card srcImg={dados.imagemProduto} nome={dados.nome} descricao={dados.descricao} key={dados.codProduto} tipo={"produto"} id={dados.codProduto}></Card>
                    </SwiperSlide>)
                })}
        </Swiper>
        </>
    )
}