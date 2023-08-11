export type Product = {
    _id: string;
    title: string;
    price: number;
    description: string;
    image: string;
    inStock: number;
    categories?: category[];
    deleted?: boolean;
    i?: number;
}

export interface NewProduct {
    title: string,
    price: number,
    description: string,
    image: string,
    inStock: number
}

export enum category{
    Action = 'Action',
    Comedy = 'Komedi',
    Drama = 'Drama',
    Fantasy = 'Fantasy',
    Horror = 'Skräck',
    Romance = 'Romantic',
    SciFi = 'Sci-Fi',
    Thriller = 'Thriller',
}

export type FilterCriteria = {
    category: string;
    minPrice: number;
    maxPrice: number;
}

export type buyProductBtn = {
    _id: string;
    cssClass: string;
  }