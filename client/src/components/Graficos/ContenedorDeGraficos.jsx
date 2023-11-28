import React from 'react'
import RankingDeUsuarios from './RankingDeUsuarios'
import VentasPorMes from './VentasPorMes'
import RankingVentaProductos from './RankingVentaProductos'

const ContenedorDeGraficos = () => {
  return (
    <div>
        <RankingDeUsuarios/>
        <VentasPorMes/>
        <RankingVentaProductos/>
    </div>
  )
}

export default ContenedorDeGraficos
