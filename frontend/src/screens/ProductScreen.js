import {useEffect,useState} from "react";
import {Link, useParams, useNavigate} from "react-router-dom";
import {Row, Col, Image, ListGroup, Card, Button, Form} from "react-bootstrap";
import Rating from "../components/Rating";
import {useDispatch, useSelector} from "react-redux";

import Message from 'components/Message';
import Loader from 'components/Loader';

//!Actions
import * as PRODUCTS_ACTIONS from "redux/slices/products";
import * as CART_ACTIONS from "redux/slices/cart";


//!Selectors
import * as PRODUCTS_SELECTORS from "redux/selectors/products";

//!services
import { getProduct } from "api/services/products";

function ProductScreen() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [qty, setQty] = useState(1);
	let isLoading = useSelector(PRODUCTS_SELECTORS.selectIsLoading);
	let isError = useSelector(PRODUCTS_SELECTORS.selectIsError);
	let message = useSelector(PRODUCTS_SELECTORS.selectMessage);
	let selectedProduct = useSelector(PRODUCTS_SELECTORS.selectSelectedProduct);
    const {image, name, rating, numReviews, priceIVA, description, countInStock} = selectedProduct; 

	let {slug} = useParams();

	const handleAddToCart = () => {

		let {userId, description, __v, createdAt, updatedAt, rating, numReviews, ...newSelectedProduct} = selectedProduct;
		dispatch(CART_ACTIONS.addItem({...newSelectedProduct, qty}));
		navigate("/cart");
	}
	useEffect(() => {
		if(Object.keys(selectedProduct).length) return;
		const fetchProduct = async () => {
			try{
				dispatch(PRODUCTS_ACTIONS.getProductRequest())
				const { data } = await getProduct(slug);
				dispatch(PRODUCTS_ACTIONS.getProductSuccess(data));
			}catch(err){
				const message = err.response ? err.response.data.message : err.message;
				dispatch(PRODUCTS_ACTIONS.getProductError({message}));
			}	
		}
		fetchProduct();
		//eslint-disable-next-line
	}, []);

	return (
		<>
			{isLoading 
				? 
				<Loader></Loader>
				:
				isError
				?
				<Message variant="danger">{message}</Message>
				:
				(
				<>
					<Link className="btn btn-light my-3" to="/">
						Go Back
					</Link>
					<Row>
						<Col md={6}>
							<Image
								src={image}
								alt={name}
								fluid
							/>
						</Col>
						<Col md={3}>
							<ListGroup variant="flush">
								<ListGroup.Item>
									<h3>{name}</h3>
								</ListGroup.Item>
								<ListGroup.Item>
									<Rating
										value={rating}
										text={`${numReviews} reviews`}
									></Rating>
								</ListGroup.Item>
                                <ListGroup.Item>
									Price: ${priceIVA}
								</ListGroup.Item>
                                <ListGroup.Item>
									Description: {description}
								</ListGroup.Item>
							</ListGroup>
						</Col>
                        <Col md={3}>
                            <Card>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>
                                                Price: 
                                            </Col>
                                            <Col>
                                                <strong>${priceIVA}</strong>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>
                                                Status: 
                                            </Col>
                                            <Col>
                                                {countInStock > 0 ? "In Stock": "Out Of Stock"}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>

									{countInStock > 0 && (
										<ListGroup.Item>
											<Row>
												<Col xs={4}>Qty</Col>
												<Col xs={8}>
													<Form.Select aria-label="Default select example" value={qty} onChange={(e) => setQty(parseInt(e.target.value))}>
													{
														[...Array(countInStock).keys()].map((x) => (
															<option key={x + 1} value={x + 1}>
																{x + 1}
															</option>
														))
													}
													</Form.Select>
												</Col>
											</Row>
										</ListGroup.Item>
									)}
                                    <ListGroup.Item>
                                        <Button onClick={handleAddToCart} className="btn btn-block w-100" disabled={countInStock === 0} type="button">
                                            Add To Cart
                                        </Button>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card>
                        </Col>
					</Row>
				</>
				)
			}
		</>
	);
}

export default ProductScreen;
