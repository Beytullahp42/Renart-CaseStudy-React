import Product from "../models/Product.ts";
import axios from "axios";

export async function fetchProducts(): Promise<Product[]> {
    // const response = await axios.get("https://beytullahpaytar.online/products");
    const response = await axios.get("http://localhost:8000/products");
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