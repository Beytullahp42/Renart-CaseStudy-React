import { useEffect, useState } from "react";
import type Product from "../models/Product";
import { fetchProducts } from "../services/ProductService";
import ProductTile from "../components/ProductTile";

function ProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchAllProducts = async () => {
        setLoading(true);
        setError(null);

        try {
            const fetchedProducts = await fetchProducts();
            setProducts(fetchedProducts);
        } catch (error: unknown) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError("An unexpected error occurred.");
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllProducts();
    }, []);

    if (loading) {
        return <p className="text-center mt-10 text-lg">Loading products...</p>;
    }

    if (error) {
        return <p className="text-center mt-10 text-red-600">{error}</p>;
    }

    return (
        <div className="p-4 flex flex-wrap justify-center gap-6">
            {products.map((product) => (
                <ProductTile key={product.name} product={product} />
            ))}
        </div>
    );
}

export default ProductsPage;
