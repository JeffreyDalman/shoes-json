// Interface voor de merken (brands.json)
export interface Brand {
    id: string;
    name: string;
    originCountry: string;
    logoUrl: string;
    foundedYear: number;
    isHighEnd: boolean;
    headquarters: string;
}

// Interface voor de schoenen (shoes.json)
export interface Shoe {
    id: string;
    modelName: string;
    description: string;
    price: number;
    inStock: boolean;
    releaseDate: string;
    imageUrl: string;
    category: string;
    technologies: string[];
    brandId: string;
    
    
    brand?: Brand | undefined; 
}