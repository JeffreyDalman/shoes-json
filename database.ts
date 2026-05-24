import mongoose, { Schema } from 'mongoose';
import type { Shoe, Brand } from './interfaces.js';

// Connectielink naar MongoDB
const MONGO_URI = 'mongodb+srv://jeffreydalman_db_user:latinas123@cluster0.ag1jiz1.mongodb.net/sneakerdb?appName=Cluster0';

export async function connectDB() {
    try {
        // Wachten tot de database echt verbinding maakt voor we verder gaan
        await mongoose.connect(MONGO_URI);
        console.log("Succesvol verbonden met MongoDB Atlas!");
    } catch (err) {
        console.error("MongoDB connectie fout:", err);
    }
}

// Brand Schema & Model instellen
const BrandSchema = new Schema<Brand>({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    originCountry: { type: String, required: true },
    logoUrl: { type: String, required: true },
    foundedYear: { type: Number, required: true },
    isHighEnd: { type: Boolean, required: true },
    headquarters: { type: String, required: true }
});

// Dit model gebruiken we later in index.ts om merken te zoeken of aan te maken
export const BrandModel = mongoose.model<Brand>('Brand', BrandSchema);

// Shoe Schema & Model instellen
const ShoeSchema = new Schema<Shoe>({
    id: { type: String, required: true, unique: true },
    modelName: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    inStock: { type: Boolean, required: true },
    releaseDate: { type: String, required: true },
    imageUrl: { type: String, required: true },
    category: { type: String, required: true },
    technologies: { type: [String], required: true },
    brandId: { type: String, required: true }
});

export const ShoeModel = mongoose.model<Shoe>('Shoe', ShoeSchema);

// Database vullen met startdata
export async function seedDatabase() {
    try {
        // Eerst tellen we hoeveel schoenen er zijn, zodat we niks dubbel gaan aanmaken
        const count = await ShoeModel.countDocuments();
        
        if (count === 0) {
            console.log("Database is leeg, testdata aanmaken...");
            
            // Als de DB leeg is, komt we er meteen een standaard merk in
            await BrandModel.create({
                id: "nike",
                name: "Nike",
                originCountry: "USA",
                logoUrl: "https://example.com/nike.png",
                foundedYear: 1964,
                isHighEnd: false,
                headquarters: "Beaverton, Oregon"
            });

            // En we voegen direct een startschoen toe die gekoppeld staat aan nike
            await ShoeModel.create({
                id: "1",
                modelName: "Air Max 1",
                description: "Klassieke sneaker van Nike met zichtbare Air unit.",
                price: 150,
                inStock: true,
                releaseDate: "1987-03-26",
                imageUrl: "https://example.com/airmax1.jpg",
                category: "Lifestyle",
                technologies: ["Air Bag", "Phylon"],
                brandId: "nike" // Moet exact matchen met de brand id hierboven
            });

            console.log("Database succesvol gevuld");
        } else {
            console.log("Er staat al data in de database. Seeden overgeslagen.");
        }
    } catch (err) {
        console.error("Fout bij het seeden van de database:", err);
    }
}