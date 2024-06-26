import express from "express";
import fs from "fs";
import path from "path";
import routeUser from "./routes/routeUser.js";
import routeAddresses from "./routes/routeAddresses.js";
import routeCategory from "./routes/routeCategory.js";
import routeCreditCard from "./routes/routeCreditCard.js";
import routeImages from "./routes/routeImages.js";
import routePaymentMethod from "./routes/routePaymentMethod.js";
import routePerfume from "./routes/routePerfume.js";
import routePerson from "./routes/routePerson.js";
import routeSell from "./routes/routeSell.js";
import routeRoll from "./routes/routeRoll.js"

const app = express();
app.use(express.json())

const uploadDir = path.join(import.meta.dirname, 'public/uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

var port = process.env.PORT || 3000

app.use("/api/users", routeUser);
app.use("/api/addresses", routeAddresses);
app.use("/api/category", routeCategory);
app.use("/api/creditCard", routeCreditCard);
app.use("/api/images", routeImages);
app.use("/api/paymentMethod", routePaymentMethod);
app.use("/api/perfume", routePerfume);
app.use("/api/person", routePerson);
app.use("/api/sell", routeSell);
app.use("/api/roll", routeRoll);

app.listen(port)
console.log('API escuchando en el puerto ' + port)