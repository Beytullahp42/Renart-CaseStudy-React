import {useEffect, useState} from "react";
import type Product from "../models/Product";
import {fetchProducts, filterProducts} from "../services/ProductService";
import ProductTile from "../components/ProductTile";

// @ts-ignore
import 'swiper/css';
// @ts-ignore
import 'swiper/css/pagination';
// @ts-ignore
import 'swiper/css/navigation';
// @ts-ignore
import 'swiper/css/scrollbar'

import {Swiper, SwiperSlide} from 'swiper/react';
import {Navigation, Scrollbar} from 'swiper/modules';
import FilterModal from "../components/FilterModal.tsx";

function ProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(5000);

    const [minPopularity, setMinPopularity] = useState(0);
    const [maxPopularity, setMaxPopularity] = useState(5);

    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const [isFilterApplied, setIsFilterApplied] = useState(false);

    const handleFilter = async () => {
        setLoading(true);
        setError(null);

        try {
            const filteredProducts = await filterProducts(minPrice, maxPrice, minPopularity, maxPopularity);
            setProducts(filteredProducts);
            setIsFilterApplied(true);
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

    const clearFilters = () => {
        setMinPrice(0);
        setMaxPrice(5000);
        setMinPopularity(0);
        setMaxPopularity(5);
        setIsFilterApplied(false);
        fetchAllProducts();
    }


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
        <div className="flex flex-col items-center justify-center min-h-screen px-4 pb-10">
            <p className="text-[45px] text-black font-avenir-book">
                Product List
            </p>
            <div className={"flex flex-row items-center justify-center gap-4"}>
                <button
                    onClick={() => setIsFilterOpen(true)}
                    className="bg-white text-black border-black border-1 px-4 py-2 rounded mb-8"
                >
                    Filter
                </button>
                {isFilterApplied && (
                    <button
                    onClick={() => clearFilters()}
                    className="bg-black text-white px-4 py-2 rounded mb-8"
                    >
                        Clear Filters
                    </button>
                )}
            </div>
            {products.length === 0 && !loading && (
                <p className="text-center text-gray-600 text-lg mt-4">No products match your filters.</p>
            )}

            <Swiper
                scrollbar={{
                    hide: false,
                    draggable: true,
                    dragSize: 100,
                }}
                navigation={true}
                modules={[Scrollbar, Navigation]}
                breakpoints={{
                    0: {
                        slidesPerView: 1,
                    },
                    640: {
                        slidesPerView: 2,
                    },
                    900: {
                        slidesPerView: 3,
                    },
                    1280: {
                        slidesPerView: 4,
                    },
                }}
                className="w-full"
            >
                {products.map((product) => (
                    <SwiperSlide key={product.name}>
                        <div className="flex justify-center mb-15">
                            <ProductTile product={product}/>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            <FilterModal
                isOpen={isFilterOpen}
                closeModal={() => setIsFilterOpen(false)}
                minPrice={minPrice}
                maxPrice={maxPrice}
                minPopularity={minPopularity}
                maxPopularity={maxPopularity}
                setMinPrice={setMinPrice}
                setMaxPrice={setMaxPrice}
                setMinPopularity={setMinPopularity}
                setMaxPopularity={setMaxPopularity}
                handleFilter={handleFilter}
            />
        </div>
    );
}

export default ProductsPage;