export const orders = {
    "/orders": {
        "get": {
            "summary": "Get all orders",
            "description": "Retrieve all orders with optional pagination and filtering.",
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
                }
            ],
            "responses": {
                "200": {
                    "description": "List of orders with pagination information.",
                    "content": {
                        "application/json": {
                            "example": {
                                "orders": [
                                    {
                                        "id": 1,
                                        "userId": 1,
                                        "productId": 2,
                                        "status": "Completed",
                                        "orderDateTime": "2024-11-11T10:00:00Z",
                                        "qrCode": "some-qr-code",
                                        "product": {
                                            "id": 2,
                                            "name": "Guitar",
                                            "price": 150.0,
                                            "description": "Electric guitar",
                                            "categoryId": 1,
                                            "image_url": "https://example.com/guitar.jpg"
                                        }
                                    }
                                ],
                                "count": 5,
                                "totalPages": 1,
                                "next": null,
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
            "summary": "Create a new order",
            "description": "Create a new order for a product by providing user and product details.",
            "requestBody": {
                "required": true,
                "content": {
                    "application/json": {
                        "schema": {
                            "$ref": "#/components/schemas/CreateOrderDto"
                        }
                    }
                }
            },
            "responses": {
                "201": {
                    "description": "Order created successfully.",
                    "content": {
                        "application/json": {
                            "example": {
                                "id": 1,
                                "userId": 1,
                                "productId": 2,
                                "status": "Pending",
                                "orderDateTime": "2024-11-11T10:00:00Z",
                                "qrCode": "new-qr-code"
                            }
                        }
                    }
                },
                "400": {
                    "description": "Invalid request body."
                }
            }
        }
    },
    "/orders/{userId}": {
        "get": {
            "summary": "Get orders by user ID",
            "description": "Retrieve all orders placed by a specific user.",
            "parameters": [
                {
                    "name": "userId",
                    "in": "path",
                    "required": true,
                    "schema": {
                        "type": "integer"
                    },
                    "description": "ID of the user to retrieve their orders."
                }
            ],
            "responses": {
                "200": {
                    "description": "List of orders placed by the user.",
                    "content": {
                        "application/json": {
                            "example": [
                                {
                                    "id": 1,
                                    "userId": 1,
                                    "productId": 2,
                                    "status": "Completed",
                                    "orderDateTime": "2024-11-11T10:00:00Z",
                                    "qrCode": "some-qr-code",
                                    "product": {
                                        "id": 2,
                                        "name": "Guitar",
                                        "price": 150.0,
                                        "description": "Electric guitar",
                                        "categoryId": 1,
                                        "image_url": "https://example.com/guitar.jpg"
                                    }
                                },
                                {
                                    "id": 2,
                                    "userId": 1,
                                    "productId": 3,
                                    "status": "Pending",
                                    "orderDateTime": "2024-11-10T14:30:00Z",
                                    "qrCode": "some-other-qr-code",
                                    "product": {
                                        "id": 3,
                                        "name": "Drum Set",
                                        "price": 300.0,
                                        "description": "Acoustic drum set",
                                        "categoryId": 2,
                                        "image_url": "https://example.com/drum-set.jpg"
                                    }
                                }
                            ]
                        }
                    }
                },
                "404": {
                    "description": "User not found or no orders placed."
                },
                "500": {
                    "description": "Internal server error."
                }
            }
        }
    },
    "/orders/{id}": {
        "get": {
            "summary": "Get order by ID",
            "description": "Retrieve order details by its unique ID.",
            "parameters": [
                {
                    "name": "id",
                    "in": "path",
                    "required": true,
                    "schema": {
                        "type": "integer"
                    },
                    "description": "ID of the order to retrieve."
                }
            ],
            "responses": {
                "200": {
                    "description": "Order found.",
                    "content": {
                        "application/json": {
                            "example": {
                                "id": 1,
                                "userId": 1,
                                "productId": 2,
                                "status": "Completed",
                                "orderDateTime": "2024-11-11T10:00:00Z",
                                "qrCode": "some-qr-code",
                                "product": {
                                    "id": 2,
                                    "name": "Guitar",
                                    "price": 150.0,
                                    "description": "Electric guitar",
                                    "categoryId": 1,
                                    "image_url": "https://example.com/guitar.jpg"
                                }
                            }
                        }
                    }
                },
                "404": {
                    "description": "Order not found."
                }
            }
        },
        "put": {
            "summary": "Update an order",
            "description": "Update an order's details by its ID.",
            "parameters": [
                {
                    "name": "id",
                    "in": "path",
                    "required": true,
                    "schema": {
                        "type": "integer"
                    },
                    "description": "ID of the order to update."
                }
            ],
            "requestBody": {
                "required": true,
                "content": {
                    "application/json": {
                        "schema": {
                            "$ref": "#/components/schemas/UpdateOrderDto"
                        }
                    }
                }
            },
            "responses": {
                "200": {
                    "description": "Order updated.",
                    "content": {
                        "application/json": {
                            "example": {
                                "id": 1,
                                "userId": 1,
                                "productId": 2,
                                "status": "Shipped",
                                "orderDateTime": "2024-11-11T10:00:00Z",
                                "qrCode": "updated-qr-code"
                            }
                        }
                    }
                },
                "404": {
                    "description": "Order not found."
                }
            }
        },
        "delete": {
            "summary": "Delete an order",
            "description": "Delete an order by its ID.",
            "parameters": [
                {
                    "name": "id",
                    "in": "path",
                    "required": true,
                    "schema": {
                        "type": "integer"
                    },
                    "description": "ID of the order to delete."
                }
            ],
            "responses": {
                "204": {
                    "description": "Order deleted successfully."
                },
                "404": {
                    "description": "Order not found."
                }
            }
        }
    }
};
