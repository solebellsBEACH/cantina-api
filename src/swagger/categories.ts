export const categories = {
    "/categories": {
        "get": {
            "summary": "Get all categories",
            "description": "Retrieve all categories with optional pagination and filtering by name.",
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
                    "description": "Filter categories by name."
                }
            ],
            "responses": {
                "200": {
                    "description": "List of categories with pagination information.",
                    "content": {
                        "application/json": {
                            "example": {
                                "categories": [
                                    {
                                        "id": 1,
                                        "name": "Beverages"
                                    },
                                    {
                                        "id": 2,
                                        "name": "Snacks"
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
            "summary": "Create a new category",
            "description": "Create a new category with the provided details.",
            "requestBody": {
                "required": true,
                "content": {
                    "application/json": {
                        "schema": {
                            "$ref": "#/components/schemas/CreateCategoryDto"
                        }
                    }
                }
            },
            "responses": {
                "201": {
                    "description": "Category created successfully.",
                    "content": {
                        "application/json": {
                            "example": {
                                "id": 1,
                                "name": "Beverages"
                            }
                        }
                    }
                }
            }
        }
    },
    "/categories/{id}": {
        "get": {
            "summary": "Get category by ID",
            "description": "Retrieve a category by its unique ID.",
            "parameters": [
                {
                    "name": "id",
                    "in": "path",
                    "required": true,
                    "schema": {
                        "type": "integer"
                    },
                    "description": "ID of the category to retrieve."
                }
            ],
            "responses": {
                "200": {
                    "description": "Category found.",
                    "content": {
                        "application/json": {
                            "example": {
                                "id": 1,
                                "name": "Beverages"
                            }
                        }
                    }
                },
                "404": {
                    "description": "Category not found."
                }
            }
        },
        "put": {
            "summary": "Update a category",
            "description": "Update category details by its ID.",
            "parameters": [
                {
                    "name": "id",
                    "in": "path",
                    "required": true,
                    "schema": {
                        "type": "integer"
                    },
                    "description": "ID of the category to update."
                }
            ],
            "requestBody": {
                "required": true,
                "content": {
                    "application/json": {
                        "schema": {
                            "$ref": "#/components/schemas/UpdateCategoryDto"
                        }
                    }
                }
            },
            "responses": {
                "200": {
                    "description": "Category updated.",
                    "content": {
                        "application/json": {
                            "example": {
                                "id": 1,
                                "name": "Updated Beverages"
                            }
                        }
                    }
                },
                "404": {
                    "description": "Category not found."
                }
            }
        },
        "delete": {
            "summary": "Delete a category",
            "description": "Delete a category by its ID.",
            "parameters": [
                {
                    "name": "id",
                    "in": "path",
                    "required": true,
                    "schema": {
                        "type": "integer"
                    },
                    "description": "ID of the category to delete."
                }
            ],
            "responses": {
                "204": {
                    "description": "Category deleted successfully."
                },
                "404": {
                    "description": "Category not found."
                }
            }
        }
    }
};
