"use client"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import Image from "next/image";
import {useEffect, useState} from "react";
import axios from "axios";
import Card from "@/components/Card";

interface swiper {
    titulo: string
}
interface Marca{
    "codMarca": number,
    "nome": string,
    "imagemMarca" : string,
    "typeMarca": string,

}

export default function SwiperMarcas({titulo} : swiper){
    const [dataAPI,setDataAPI] = useState<Marca[]>([]);
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
                scrollbar={{ draggable: false,hide: true }}
                style={{padding: "5px 0 10rem 0"}}

            >
                {dataAPI.map(dados =>{
                    return (<SwiperSlide style={{display: "grid", justifyItems: "center",minHeight: "100%"}} key={dados.codMarca}><Card srcImg={dados.imagemMarca} nome={""} id={dados.codMarca} tipo={"marca"} descricao={""} key={dados.codMarca}></Card>
                    </SwiperSlide>)
                })}
            </Swiper>
        </>
    )
}