import {useState} from "react";
import type Product from "../models/Product.ts";

interface ProductTileProps {
    product: Product;
}

function ProductTile({ product }: ProductTileProps) {
    const [selectedColor, setSelectedColor] = useState<"yellow" | "rose" | "white">("yellow");

    // Calculate number of filled stars from popularityScore (0 to 5 stars)
    const starsCount = Math.round(product.popularityScore * 5);

    // Render stars (filled ★ and empty ☆)
    const renderStars = () => {
        return [...Array(5)].map((_, i) => (
            <span key={i} className="text-yellow-400 text-xl">
        {i < starsCount ? "★" : "☆"}
      </span>
        ));
    };

    return (
        <div className="product-tile w-80 p-4 border rounded-lg shadow-md bg-white flex flex-col items-center">
            <img
                src={product.images[selectedColor]}
                alt={`${product.name} - ${selectedColor}`}
                className="w-64 h-64 object-cover rounded-md mb-4"
            />
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-green-700 font-bold mb-2">${product.price.toFixed(2)}</p>

            <div className="mb-2 flex gap-4">
                {(["yellow", "rose", "white"] as const).map((color) => (
                    <label key={color} className="flex items-center cursor-pointer">
                        <input
                            type="radio"
                            name={`color-picker-${product.name}`}
                            value={color}
                            checked={selectedColor === color}
                            onChange={() => setSelectedColor(color)}
                            className="hidden"
                        />
                        <span
                            className={`w-6 h-6 rounded-full border-2 ${
                                selectedColor === color ? "border-amber-500" : "border-gray-300"
                            }`}
                            style={{
                                backgroundColor:
                                    color === "yellow" ? "#FFD700" :
                                        color === "rose" ? "#B76E79" :
                                            "#F0F0F0", // white fallback
                            }}
                        />
                    </label>
                ))}
            </div>

            <div className="stars">{renderStars()}</div>
        </div>
    );
}

export default ProductTile;