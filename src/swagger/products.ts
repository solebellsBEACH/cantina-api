export const products = {
    "/products": {
        "get": {
            "summary": "Get all products",
            "description": "Retrieve all products with optional pagination and filtering by name, price, and establishment.",
            "parameters": [
                {
                    "name": "page",
                    "in": "query",
                    "required": false,
                    "schema": {
                        "type": "integer",
                        "default": 1,
                        "minimum": 1
                    },
                    "description": "Page number for pagination."
                },
                {
                    "name": "limit",
                    "in": "query",
                    "required": false,
                    "schema": {
                        "type": "integer",
                        "default": 10,
                        "minimum": 1
                    },
                    "description": "Number of items per page."
                },
                {
                    "name": "name",
                    "in": "query",
                    "required": false,
                    "schema": {
                        "type": "string"
                    },
                    "description": "Filter products by name."
                },
                {
                    "name": "price",
                    "in": "query",
                    "required": false,
                    "schema": {
                        "type": "number"
                    },
                    "description": "Filter products by price."
                },
                {
                    "name": "establishmentId",
                    "in": "query",
                    "required": false,
                    "schema": {
                        "type": "integer"
                    },
                    "description": "Filter products by establishment ID."
                }
            ],
            "responses": {
                "200": {
                    "description": "List of products with pagination information.",
                    "content": {
                        "application/json": {
                            "example": {
                                "products": [
                                    {
                                        "id": 1,
                                        "name": "Pizza",
                                        "price": 15.99,
                                        "description": "Delicious pizza",
                                        "establishmentId": 1
                                    },
                                    {
                                        "id": 2,
                                        "name": "Burger",
                                        "price": 8.99,
                                        "description": "Tasty burger",
                                        "establishmentId": 1
                                    }
                                ],
                                "count": 25,
                                "totalPages": 3,
                                "next": "/products?page=2&limit=10",
                                "previous": null
                            }
                        }
                    }
                },
                "400": {
                    "description": "Invalid parameters."
                }
            }
        },
        "post": {
            "summary": "Create a new product",
            "description": "Create a new product with the provided details.",
            "requestBody": {
                "required": true,
                "content": {
                    "application/json": {
                        "schema": {
                            "$ref": "#/components/schemas/CreateProductDto"
                        }
                    }
                }
            },
            "responses": {
                "201": {
                    "description": "Product created successfully.",
                    "content": {
                        "application/json": {
                            "example": {
                                "id": 1,
                                "name": "Pizza",
                                "price": 15.99,
                                "description": "Delicious pizza",
                                "establishmentId": 1
                            }
                        }
                    }
                }
            }
        }
    },
    "/products/{id}": {
        "get": {
            "summary": "Get product by ID",
            "description": "Retrieve a product by its unique ID.",
            "parameters": [
                {
                    "name": "id",
                    "in": "path",
                    "required": true,
                    "schema": {
                        "type": "integer"
                    },
                    "description": "ID of the product to retrieve."
                }
            ],
            "responses": {
                "200": {
                    "description": "Product found.",
                    "content": {
                        "application/json": {
                            "example": {
                                "id": 1,
                                "name": "Pizza",
                                "price": 15.99,
                                "description": "Delicious pizza",
                                "establishmentId": 1
                            }
                        }
                    }
                },
                "404": {
                    "description": "Product not found."
                }
            }
        },
        "put": {
            "summary": "Update a product",
            "description": "Update product details by its ID.",
            "parameters": [
                {
                    "name": "id",
                    "in": "path",
                    "required": true,
                    "schema": {
                        "type": "integer"
                    },
                    "description": "ID of the product to update."
                }
            ],
            "requestBody": {
                "required": true,
                "content": {
                    "application/json": {
                        "schema": {
                            "$ref": "#/components/schemas/UpdateProductDto"
                        }
                    }
                }
            },
            "responses": {
                "200": {
                    "description": "Product updated.",
                    "content": {
                        "application/json": {
                            "example": {
                                "id": 1,
                                "name": "Updated Pizza",
                                "price": 18.99,
                                "description": "Updated description",
                                "establishmentId": 1
                            }
                        }
                    }
                },
                "404": {
                    "description": "Product not found."
                }
            }
        },
        "delete": {
            "summary": "Delete a product",
            "description": "Delete a product by its ID.",
            "parameters": [
                {
                    "name": "id",
                    "in": "path",
                    "required": true,
                    "schema": {
                        "type": "integer"
                    },
                    "description": "ID of the product to delete."
                }
            ],
            "responses": {
                "204": {
                    "description": "Product deleted successfully."
                },
                "404": {
                    "description": "Product not found."
                }
            }
        }
    }
};
