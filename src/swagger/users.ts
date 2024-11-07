export const users = {
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
            "description": "Retrieve user details by their ID.",
            "parameters": [
                {
                    "name": "id",
                    "in": "path",
                    "required": true,
                    "schema": {
                        "type": "integer"
                    },
                    "description": "ID of the user."
                }
            ],
            "responses": {
                "200": {
                    "description": "User found.",
                    "content": {
                        "application/json": {
                            "example": {
                                "id": 1,
                                "name": "John Doe",
                                "email": "john@example.com"
                            }
                        }
                    }
                },
                "404": {
                    "description": "User not found."
                }
            }
        }
    }
};
