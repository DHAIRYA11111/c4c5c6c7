export type QuantityOption = { label: string; amount: number; unit: "ml" | "kg"; custom?: boolean };

export const quantityOptions: QuantityOption[] = [
  { label: "500 ml", amount: 500, unit: "ml" },
  ...Array.from({ length: 10 }, (_, index) => ({ label: `${index + 1} kg`, amount: index + 1, unit: "kg" as const })),
];

export function parseQuantity(label: string): QuantityOption {
  const custom = label.match(/^custom:(\d+(?:\.\d+)?):(ml|kg)$/i);
  if (custom) return { label: `${custom[1]} ${custom[2]}`, amount: Number(custom[1]), unit: custom[2].toLowerCase() as "ml" | "kg", custom: true };
  const match = label.match(/^(\d+(?:\.\d+)?)\s*(ml|kg)$/i);
  if (!match) throw new Error("Choose a valid quantity.");
  return { label, amount: Number(match[1]), unit: match[2].toLowerCase() as "ml" | "kg" };
}

/** Starter pricing: replace with admin/database pricing before launch. */
export function calculatePrice(basePrice: number, quantity: QuantityOption): number {
  if (!Number.isFinite(basePrice) || basePrice < 0) throw new Error("Invalid base price.");
  if (!Number.isFinite(quantity.amount) || quantity.amount <= 0) throw new Error("Quantity must be greater than zero.");
  if (quantity.unit === "ml") return Math.round(basePrice * (quantity.amount / 500));
  return Math.round(basePrice * quantity.amount * 2.1);
}

export function formatPrice(value: number): string {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(value);
}
