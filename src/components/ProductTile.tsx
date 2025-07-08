import {useState} from "react";
import type Product from "../models/Product.ts";
import StarRatings from 'react-star-ratings';


interface ProductTileProps {
    product: Product;
}

const colorOptions = {
    yellow: {label: "Yellow Gold", hex: "#E6CA97"},
    white: {label: "White Gold", hex: "#D9D9D9"},
    rose: {label: "Rose Gold", hex: "#E1A4A9"},
};

export default function ProductTile({product}: ProductTileProps) {
    const [selectedColor, setSelectedColor] = useState<"yellow" | "white" | "rose">("yellow");

    const stars = Math.round(product.popularityScore * 5 * 10) / 10;

    return (
        <div className="w-[290px] flex flex-col items-start">
            <div className="w-[220px] h-[220px] rounded-xl overflow-hidden bg-gray-100 mb-4">
                <img
                    src={product.images[selectedColor]}
                    alt={`${product.name} - ${selectedColor}`}
                    className="w-full h-full object-cover"
                />
            </div>

            <p className="font-montserrat-medium text-[15px] mb-1">{product.name}</p>
            <p className="font-montserrat-regular text-[15px] mb-3">${product.price.toFixed(2)} USD</p>

            <div className="flex items-center gap-2 mb-2">
                {(["yellow", "white", "rose"] as const).map((color) => (
                    <label key={color} className="relative cursor-pointer">
                        <input
                            type="radio"
                            name={`color-${product.name}`}
                            value={color}
                            checked={selectedColor === color}
                            onChange={() => setSelectedColor(color)}
                            className="peer hidden"
                        />
                        <span
                            className={`
          p-[3px] rounded-full 
          ${selectedColor === color ? "border-1 border-black" : ""}
          flex items-center justify-center
        `}
                        >
        <span
            className="w-5 h-5 rounded-full"
            style={{backgroundColor: colorOptions[color].hex}}
        />
      </span>
                    </label>
                ))}
            </div>


            <p className="text-[12px] font-avenir-book">{colorOptions[selectedColor].label}</p>

            <div className={"flex items-center gap-2"}>
            <StarRatings
                rating={stars}
                starRatedColor="#FFD700"
                starEmptyColor="#D9D9D9"
                starDimension="20px"
                starSpacing="2px"
                numberOfStars={5}
                name="rating"

            />
                <p className={"font-avenir-book text-[14px]"}>{stars}</p>
            </div>
        </div>
    );
}
