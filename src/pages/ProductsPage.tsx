import {useEffect, useState} from "react";
import type Product from "../models/Product";
import {fetchProducts} from "../services/ProductService";
import ProductTile from "../components/ProductTile";

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar'

import {Swiper, SwiperSlide} from 'swiper/react';
import {Navigation, Scrollbar} from 'swiper/modules';

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
        <div className="flex flex-col items-center justify-center min-h-screen px-4 py-10">
            <p className="text-[45px] text-black mb-10 font-avenir-book" >
                Product List
            </p>
            <Swiper
                scrollbar={{
                    hide: false,
                    draggable: true,
                    dragSize: 250,
                }}
                navigation={true}
                modules={[Scrollbar, Navigation]}
                slidesPerView={4}
                className="w-full"
            >
                {products.map((product) => (
                    <SwiperSlide key={product.name}>
                        <div className="flex justify-center mb-15">
                            <ProductTile product={product} />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

export default ProductsPage;