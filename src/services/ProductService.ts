import Product from "../models/Product.ts";
import axios from "axios";

export async function fetchProducts(): Promise<Product[]> {
    const response = await axios.get("https://beytullahpaytar.online/api/products");
    // const response = await axios.get("http://localhost:8000/api/products");
    const ringsData = response.data;
    return ringsData.map((ring: Product) => new Product(
        ring.name,
        ring.popularityScore,
        ring.weight,
        {
            yellow: ring.images.yellow,
            rose: ring.images.rose,
            white: ring.images.white
        },
        ring.price
    ));
}

export async function filterProducts(
    minPrice: number,
    maxPrice: number,
    minPopularity: number,
    maxPopularity: number
): Promise<Product[]> {
    // const response = await axios.post("http://localhost:8000/api/products", {
    //         minPrice,
    //         maxPrice,
    //         minPopularity,
    //         maxPopularity
    //     }
    // );

    const response = await axios.post("https://beytullahpaytar.online/api/products", {
        minPrice,
        maxPrice,
        minPopularity,
        maxPopularity
    });
    const filteredRingsData = response.data;
    return filteredRingsData.map((ring: Product) => new Product(
        ring.name,
        ring.popularityScore,
        ring.weight,
        {
            yellow: ring.images.yellow,
            rose: ring.images.rose,
            white: ring.images.white
        },
        ring.price
    ));
}