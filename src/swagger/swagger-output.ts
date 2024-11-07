import { categories } from "./categories";
import { components } from "./components";
import { products } from "./products";
import { users } from "./users";

export const swaggerOutput = {
    openapi: "3.0.0",
    info: {
        title: "Cantina & User API",
        description: "API for managing products, establishments, orders in a cantina, and users.",
        version: "1.0.0"
    },
    servers: [
        {
            url: "http://localhost:3000/api"
        }
    ],
    paths: {
        ...products,
        ...users,
        ...categories
    },
    components
};
