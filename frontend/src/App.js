import Header from "components/Header";
import Footer from "components/Footer";
import HomeScreen from "screens/HomeScreen";
import ProductScreen from "screens/ProductScreen";
import CartScreen from "screens/CartScreen";


import {Routes, Route} from "react-router-dom";
import {Container} from "react-bootstrap";

function App() {
    return (
        <>  
            <Header></Header>
            <main className="py-3">
                <Container>
                    <Routes>
                        <Route path="/" element={<HomeScreen></HomeScreen>}></Route>
                        <Route path="/product/:slug" element={<ProductScreen></ProductScreen>}></Route>
                        <Route path="/cart" element={<CartScreen></CartScreen>}></Route>

                    </Routes>
                </Container>
            </main>
            <Footer></Footer>
        </>
    );
}

export default App;
