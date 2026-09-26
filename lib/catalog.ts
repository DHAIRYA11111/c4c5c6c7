export type Fragrance = { slug: string; name: string; category: "Candle Fragrance" | "Aroma Oil"; notes: string; price: number; color: string };

// Replace or extend this seed catalogue with the verified entries from the supplied PDF.
export const fragrances: Fragrance[] = [
  { slug: "vanilla", name: "Vanilla", category: "Candle Fragrance", notes: "Soft · creamy · comforting", price: 450, color: "#e9dcc8" },
  { slug: "lavender", name: "Lavender", category: "Candle Fragrance", notes: "Floral · calm · herbaceous", price: 480, color: "#d8d0df" },
  { slug: "rose", name: "Rose", category: "Candle Fragrance", notes: "Petal · fresh · elegant", price: 500, color: "#e5c7c4" },
  { slug: "sandalwood", name: "Sandalwood", category: "Aroma Oil", notes: "Woody · warm · grounded", price: 575, color: "#d7c2a0" },
  { slug: "jasmine", name: "Jasmine", category: "Candle Fragrance", notes: "White floral · luminous · rich", price: 525, color: "#eee9d7" },
  { slug: "ocean-breeze", name: "Ocean Breeze", category: "Aroma Oil", notes: "Clean · airy · mineral", price: 490, color: "#c7dada" },
  { slug: "mogra", name: "Mogra", category: "Candle Fragrance", notes: "Indian jasmine · lush · sweet", price: 520, color: "#e5e1cb" },
  { slug: "oud", name: "Oud", category: "Aroma Oil", notes: "Deep · resinous · luxurious", price: 650, color: "#c5b19e" }
];

export const packSizes = ["500 ml", "1 kg", "2 kg", "3 kg", "4 kg", "5 kg", "6 kg", "7 kg", "8 kg", "9 kg", "10 kg", "Custom"];
