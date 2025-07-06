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

    getImage(color: 'yellow' | 'rose' | 'white'): string {
        return this.images[color];
    }
}

export default Product;
