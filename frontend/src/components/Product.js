import {Card} from "react-bootstrap";
import Rating from "components/Rating";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux"

//!Actions
import * as PRODUCTS_ACTIONS from "redux/slices/products";

//!Selectors
import * as PRODUCTS_SELECTORS from "redux/selectors/products";


function Product({product}) {
    let navigate = useNavigate();
    let dispatch = useDispatch();
	let products = useSelector(PRODUCTS_SELECTORS.selectProducts);
    
    const {id, slug, image, name, rating, numReviews, priceIVA} = product; 
    
    const handleSelectProduct = () => {        
        //!ESTA ES LA MAGIA PARA MEJORAR LA EXPERIENCIA DE USUARIO Y EVITAR LA MUESTRA PREVIA DEL PRODUCTO ANTERIOR
        const selectedProduct = products.find(product => product.id === id);
        dispatch(PRODUCTS_ACTIONS.getSelectedProduct(selectedProduct));
        navigate(`/product/${slug}`);
    }

  return (
    <Card className="my-3 p-3 rounded">
        <div style={{cursor: "pointer"}} onClick={handleSelectProduct}>
            <Card.Img src={image} variant="top"></Card.Img>
        </div>

        <Card.Body>
            <div style={{cursor: "pointer", textDecoration: "underline"}} onClick={handleSelectProduct}>
                <Card.Title as="div">
                    <strong>{name}</strong>
                </Card.Title>
            </div>
            <Card.Text as="div">
                <Rating value={rating} text={`${numReviews} reviews`}></Rating>
            </Card.Text>

            <Card.Text as="h3">${priceIVA}</Card.Text>
        </Card.Body>
    </Card>
  )
}

export default Product