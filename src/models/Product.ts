class Product {
    name: string;
    popularityScore: number;
    weight: number;
    images: {
        yellow: string;
        rose: string;
        white: string;
    };
    price: number;

    constructor(
        name: string,
        popularityScore: number,
        weight: number,
        images: { yellow: string; rose: string; white: string },
        price: number
    ) {
        this.name = name;
        this.popularityScore = popularityScore;
        this.weight = weight;
        this.images = images;
        this.price = price;
    }
}

export default Product;
