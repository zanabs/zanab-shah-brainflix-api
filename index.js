import express from "express"; 
import "dotenv/config"; 

import cors from "cors"; 
import router from "./routes/videoRoutes.js"; 

const app = express(); 
const { PORT, CORS_ORIGIN } = process.env; 

app.use(express.json()); 

app.use(express.static("public")); 

app.use(cors({ origin: CORS_ORIGIN}));

app.use(router); 

app.listen(PORT, ()=> {
    console.log(`Server is up and running at http://localhost:${PORT}`);
}); 
