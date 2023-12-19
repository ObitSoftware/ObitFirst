export const formatePrice = (price) => { 
   const priceFormated =   '$' + (price).toLocaleString('es-AR') ;
   return priceFormated
}