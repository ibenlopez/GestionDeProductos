import ProductList from "../components/ShowProducts";
import Banner from "../components/Banner";

function Home() {
    return (
        <div>
            <Banner/>
            <h2 className="my-5 fw-bold">Descubre lo que piensan los demás, <span className="text-info">comparte lo que amas</span></h2>
            <ProductList />
        </div>
    );

}

export default Home;
