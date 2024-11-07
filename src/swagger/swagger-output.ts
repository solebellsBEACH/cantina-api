export const swaggerOutput = {
    "openapi": "3.0.0",
    "info": {
        "title": "Cantina & User API",
        "description": "API for managing products, establishments, orders in a cantina, and users.",
        "version": "1.0.0"
    },
    "servers": [
        {
            "url": "http://localhost:3000/api"
        }
    ],
    "paths": {
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
        },
        "/users": {
            "get": {
                "summary": "Get all users",
                "description": "Retrieves a paginated list of users.",
                "parameters": [
                    {
                        "name": "page",
                        "in": "query",
                        "description": "Page number to retrieve.",
                        "required": false,
                        "schema": {
                            "type": "integer",
                            "default": 1
                        }
                    },
                    {
                        "name": "limit",
                        "in": "query",
                        "description": "Number of users per page.",
                        "required": false,
                        "schema": {
                            "type": "integer",
                            "default": 10
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "A list of users.",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "users": {
                                            "type": "array",
                                            "items": {
                                                "$ref": "#/components/schemas/User"
                                            }
                                        },
                                        "count": {
                                            "type": "integer",
                                            "description": "Total count of users"
                                        },
                                        "totalPages": {
                                            "type": "integer",
                                            "description": "Total number of pages"
                                        },
                                        "next": {
                                            "type": "string",
                                            "description": "URL for the next page"
                                        },
                                        "previous": {
                                            "type": "string",
                                            "description": "URL for the previous page"
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "post": {
                "summary": "Create a new user",
                "description": "Creates a new user in the system.",
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/CreateUserDto"
                            }
                        }
                    }
                },
                "responses": {
                    "201": {
                        "description": "User successfully created.",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/User"
                                }
                            }
                        }
                    }
                }
            }
        },
        "/users/{id}": {
            "get": {
                "summary": "Get user by ID",
                "description": "Retrieves a specific user by their ID.",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "description": "ID of the user",
                        "schema": {
                            "type": "integer"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "User details.",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/User"
                                }
                            }
                        }
                    },
                    "404": {
                        "description": "User not found."
                    }
                }
            },
            "put": {
                "summary": "Update user by ID",
                "description": "Updates a specific user's information by their ID.",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "description": "ID of the user",
                        "schema": {
                            "type": "integer"
                        }
                    }
                ],
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/UpdateUserDto"
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "User updated successfully.",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/User"
                                }
                            }
                        }
                    },
                    "404": {
                        "description": "User not found."
                    }
                }
            },
            "delete": {
                "summary": "Delete a user by ID",
                "description": "Deletes a user by their ID.",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "description": "ID of the user to delete",
                        "schema": {
                            "type": "integer"
                        }
                    }
                ],
                "responses": {
                    "204": {
                        "description": "User successfully deleted."
                    },
                    "404": {
                        "description": "User not found."
                    }
                }
            }
        }
    },
    "components": {
        "schemas": {
            "CreateProductDto": {
                "type": "object",
                "properties": {
                    "name": {
                        "type": "string",
                        "example": "Pizza"
                    },
                    "price": {
                        "type": "number",
                        "example": 15.99
                    },
                    "description": {
                        "type": "string",
                        "example": "Delicious pizza"
                    },
                    "establishmentId": {
                        "type": "integer",
                        "example": 1
                    }
                },
                "required": [
                    "name",
                    "price",
                    "description",
                    "establishmentId"
                ]
            },
            "UpdateProductDto": {
                "type": "object",
                "properties": {
                    "name": {
                        "type": "string",
                        "example": "Updated Pizza"
                    },
                    "price": {
                        "type": "number",
                        "example": 18.99
                    },
                    "description": {
                        "type": "string",
                        "example": "Updated description"
                    },
                    "establishmentId": {
                        "type": "integer",
                        "example": 1
                    }
                },
                "required": [
                    "name",
                    "price",
                    "description",
                    "establishmentId"
                ]
            },
            "CreateUserDto": {
                "type": "object",
                "properties": {
                    "name": {
                        "type": "string",
                        "example": "John Doe"
                    },
                    "email": {
                        "type": "string",
                        "example": "john.doe@example.com"
                    },
                    "password": {
                        "type": "string",
                        "example": "securepassword"
                    }
                },
                "required": [
                    "name",
                    "email",
                    "password"
                ]
            },
            "UpdateUserDto": {
                "type": "object",
                "properties": {
                    "name": {
                        "type": "string",
                        "example": "John Doe Updated"
                    },
                    "email": {
                        "type": "string",
                        "example": "john.updated@example.com"
                    }
                }
            },
            "User": {
                "type": "object",
                "properties": {
                    "id": {
                        "type": "integer",
                        "example": 1
                    },
                    "name": {
                        "type": "string",
                        "example": "John Doe"
                    },
                    "email": {
                        "type": "string",
                        "example": "john.doe@example.com"
                    },
                    "createdAt": {
                        "type": "string",
                        "format": "date-time",
                        "example": "2024-11-06T12:00:00Z"
                    },
                    "updatedAt": {
                        "type": "string",
                        "format": "date-time",
                        "example": "2024-11-06T12:00:00Z"
                    }
                }
            }
        }
    }
}