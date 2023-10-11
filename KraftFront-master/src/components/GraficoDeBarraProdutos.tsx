import React, { PureComponent } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from "axios";



interface DadosInterface {
    Notas1: number,
    produto: string,
    Notas2: number,
    Notas3: number,
    Notas4: number,
    Notas5: number
}



export default class GraficoDeBarraMarcas extends PureComponent {
    state = {
        data: []
    }


    getDados = async () => {
        const response = await axios.get("http://localhost:8080/produto/getNota");


        const dados = response.data;
        const data = dados.map((dado: DadosInterface) => ({
            marca: dado.produto,
            Notas1: dado.Notas1,
            Notas2: dado.Notas2,
            Notas3: dado.Notas3,
            Notas4: dado.Notas4,
            Notas5: dado.Notas5,
        }));

        this.setState({ data });
    }
    componentDidMount() {
        // Você precisa marcar o método como async para usar await
        (async () => {
            try {
                // Aguarde a promessa ser resolvida
                const dados = await this.getDados();
                // Faça algo com os dados
            } catch (erro) {
                // Trate ou reporte o erro
            }
        })();
    }

    render() {
        return (
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    width={500}
                    height={300}
                    data={this.state.data} // Use os dados do estado para o gráfico
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="marca" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Notas1"  fill="#C05780" />
                    <Bar dataKey="Notas2"  fill="#FFB2BB" />
                    <Bar dataKey="Notas3"  fill="#E7C582" />
                    <Bar dataKey="Notas4"  fill="#00B0BA" />
                    <Bar dataKey="Notas5"  fill="#00386F" />
                </BarChart>
            </ResponsiveContainer>
        );
    }
}