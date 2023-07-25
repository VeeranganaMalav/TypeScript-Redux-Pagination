import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../Redux/store';
import { Product } from '../utils/type';
import { getProducts } from '../Redux/app/app.action';

const useCurrentParamProduct = () => {

    const { productId } = useParams();
    const products = useAppSelector((store) => store.appReducer.data);
    const dispatch = useAppDispatch();
    const [currentProduct, setCurrentProduct] = useState<Product>();

    useEffect(() => {
        if(products.length === 0){
            dispatch(getProducts());
        }
    }, [dispatch, products.length])

    useEffect(() => {
        if(productId){
            const product = products.find((item) => item.id === Number(productId));
            setCurrentProduct(product);
        }
    }, [productId, products])

    return { currentProduct, id: productId }
}

export default useCurrentParamProduct