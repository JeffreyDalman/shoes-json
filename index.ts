import express from 'express';
import { connectDB, seedDatabase, ShoeModel, BrandModel } from './database.js';

const app = express();
const PORT = 3000;

// Zorgt ervoor dat Express binnenkomende JSON-data snapt
app.use(express.json());

// hiermee kunnen we data uit HTML-formulieren uitlezen
app.use(express.urlencoded({ extended: true }));

// Dashboard Route
// Haalt alle schoenen op uit de database en plakt ze in een simpele HTML-lijst
app.get('/dashboard', async (req, res) => {
    try {
        
        const shoes = await ShoeModel.find();
        
        
        let html = `
            
        `;

        // We loopen door de array van schoenen heen en plakken voor elke schoen een <li> in de HTML
        shoes.forEach(shoe => {
            html += `
                <li>
                    <b>${shoe.modelName}</b> - €${shoe.price} 
                    <a href="/shoes/edit/${shoe.id}"><button>Edit</button></a>
                </li>
            `;
        });

        html += `</ul>`;
        
        // Stuur de complete HTML-string terug naar de browser van de gebruiker
        res.send(html);
    } catch (err) {
        
        res.status(500).send("Fout bij het laden van het dashboard.");
    }
});

// Edit Pagina Route
app.get('/shoes/edit/:id', async (req, res) => {
    res.send(`
        <h1> Edit pagina voor schoen ID: ${req.params.id}</h1>
        
    `);
});

// Server opstarten
async function startServer() {
    
    await connectDB();       
    await seedDatabase();    
    

    app.listen(PORT, () => {
        console.log(`Server draait succesvol op http://localhost:${PORT}`);

    });
}

// De functie triggeren om alles aan te zetten
startServer();