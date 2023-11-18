import mongoose from 'mongoose';

const compraSchema = new mongoose.Schema ({

    compraId: {
        type:String,
        required: true,
    },
    productosComprados : {
            type:Array,
            required: true
    },
    total: {
        type:Number,
        required: true
    }
})

const Compra = mongoose.model('Compras', compraSchema);

export default Compra;
