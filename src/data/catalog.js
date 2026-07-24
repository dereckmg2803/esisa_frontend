import { categories } from "./categories";
import { products } from "./products";

export function getCategories() {
  return categories;
}

export function getProducts(categorySlug) {
  if (!categorySlug || categorySlug === "all") {
    return products;
  }
  return products.filter((product) => product.category === categorySlug);
}

export function getFeaturedProducts() {
  return products.filter((product) => product.featured);
}

export function getProductBySlug(slug) {
  return products.find((product) => product.slug === slug) || null;
}
