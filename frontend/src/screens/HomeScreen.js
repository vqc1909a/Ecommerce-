import {useEffect} from 'react'
import {Row, Col} from "react-bootstrap";
import Product from 'components/Product';
import Message from 'components/Message';
import Loader from 'components/Loader';



import {useDispatch, useSelector} from "react-redux"

//!Actions
import * as PRODUCTS_ACTIONS from "redux/slices/products";

//!Selectors
import * as PRODUCTS_SELECTORS from "redux/selectors/products";

//!Services
import { getProducts } from "api/services/products";

function HomeScreen() {
  let dispatch = useDispatch();
  let isLoading = useSelector(PRODUCTS_SELECTORS.selectIsLoading);
  let isError = useSelector(PRODUCTS_SELECTORS.selectIsError);
  let message = useSelector(PRODUCTS_SELECTORS.selectMessage);
  let products = useSelector(PRODUCTS_SELECTORS.selectProducts);

  useEffect(() => {
    const fetchProducts = async () => {
      try{
        dispatch(PRODUCTS_ACTIONS.getProductsRequest());
        const {data} = await getProducts();
        dispatch(PRODUCTS_ACTIONS.getProductsSuccess(data));
      }catch(err){
        const {data} = err.response;
        dispatch(PRODUCTS_ACTIONS.getProductsError({message: data.message}));
      }
    }
    fetchProducts();
    //eslint-disable-next-line
  }, [])
  
  return (
    <>
        <h1>Latest Products</h1>
        <Row>
            {
              isLoading
              ?
              <Loader></Loader>
              :
              isError
              ?
              <Message variant="danger">{message}</Message>
              :
              products.length
              ?
              products.map(product => (
                <Col sm={12} md={6} lg={4} xl={3} key={product.id}>
                    <Product product={product}></Product>
                </Col>
              ))
              :
              <h3>Productos No Encontrados</h3>
            }
        </Row>
    </>
  )
}

export default HomeScreen