import React from 'react'
import RankingDeUsuarios from './RankingDeUsuarios'
import VentasPorMes from './VentasPorMes'
import RankingVentaProductos from './RankingVentaProductos'
import GastoAProveedores from './GastoAProveedores'

const ContenedorDeGraficos = () => {
  return (
    <div>
        <RankingDeUsuarios/>
        <VentasPorMes/>
        <RankingVentaProductos/>
        <GastoAProveedores/>
    </div>
  )
}

export default ContenedorDeGraficos
