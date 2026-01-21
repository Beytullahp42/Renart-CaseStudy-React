import Product from "../models/Product.ts";
import axios from "axios";

const api = axios.create({
    baseURL: "https://renart-cs-laravel.beytullahp.com",
});

export async function fetchProducts(): Promise<Product[]> {
    const response = await api.get("/api/products");
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
    const response = await api.post("/api/products", {
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

