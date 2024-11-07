export const components = {
    schemas: {
        CreateProductDto: {
            type: "object",
            properties: {
                name: { type: "string" },
                price: { type: "number" },
                description: { type: "string" },
                establishmentId: { type: "integer" }
            },
            required: ["name", "price", "establishmentId"]
        },
        UpdateProductDto: {
            type: "object",
            properties: {
                name: { type: "string" },
                price: { type: "number" },
                description: { type: "string" }
            }
        },
        User: {
            type: "object",
            properties: {
                id: { type: "integer" },
                name: { type: "string" },
                email: { type: "string" }
            }
        },
        CreateUserDto: {
            type: "object",
            properties: {
                name: { type: "string" },
                email: { type: "string" },
                password: { type: "string" }
            },
            required: ["name", "email", "password"]
        }
    }
};
