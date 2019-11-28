# Requests

## Client Profile

### **API URL**
https://us-central1-foodex-backend.cloudfunctions.net/client_profile

### **GET SINGLE**:
Parameters
* **id**

Example:
* Request:
````
https://us-central1-foodex-backend.cloudfunctions.net/client_profile?id=MYyrSfD7rIfAfjpNzad2sU0mOAu2
````
* Response:
````
{
    "reservation_ids": [
        "Dzk7q7Z4KGemFyNGWU7h"
    ],
    "favorites": {
        "establishment_ids": [],
        "dish_ids": [
            "BTWxrnWd2qqgi2VcJcc2"
        ]
    },
    "standalone_order_ids": [],
    "country_id": "I8YYT0Lx5hU5BlvFFbV8",
    "email": "20162614@aloe.ulima.edu.pe",
    "phone": 989176661,
    "last_name": "Vásquez Montes",
    "first_name": "Daniel R."
}
````

## Dishes

### **API URL**
https://us-central1-foodex-backend.cloudfunctions.net/dishes

### **GET LIST**: 
Parameters
* **menu_id**

Example:
* Request 
````
https://us-central1-foodex-backend.cloudfunctions.net/dishes?menu_id=YqlxMQ7ypQeUfJdSwDf4
````
* Response
````
[
    {
        "id": "8bE9x9GsM7Zi0WI3MevX",
        "name": "Cebiche",
        "menu_id": "YqlxMQ7ypQeUfJdSwDf4",
        "price": 10,
        "available": false,
        "description": "Prueba",
        "ingredients": []
    },
    {
        "id": "V7RttYnCxXP5CENlgIdG",
        "available": false,
        "description": "test 2",
        "ingredients": [],
        "name": "Test 2",
        "menu_id": "YqlxMQ7ypQeUfJdSwDf4",
        "price": 10
    }
]
````

### **GET SINGLE**
Parameters
* **id**

Example:
* Request
````
https://us-central1-foodex-backend.cloudfunctions.net/dishes?id=V7RttYnCxXP5CENlgIdG
````
* Response
````
{
    "id": "V7RttYnCxXP5CENlgIdG",
    "name": "Test 2",
    "menu_id": "YqlxMQ7ypQeUfJdSwDf4",
    "price": 10,
    "available": false,
    "description": "test 2",
    "ingredients": []
}
````

## Establishments

### **API URL**
````
https://us-central1-foodex-backend.cloudfunctions.net/establishments
````

### **GET LIST**
Example:
* Request
````
https://us-central1-foodex-backend.cloudfunctions.net/establishments
````
* Response
````
[
    {
        "id": "Ge5Bb4w0Zcb7sGhVAFfv",
        "menu_id": "E85ou2A6PIJ4lBmEAf9h",
        "reservation_limit": 0,
        "country_id": "I8YYT0Lx5hU5BlvFFbV8",
        "working_hours": {
            "sunday": {
                "close": "",
                "open": ""
            },
            "wednesday": {
                "close": "",
                "open": ""
            },
            "saturday": {
                "close": "",
                "open": ""
            },
            "thursday": {
                "close": "",
                "open": ""
            },
            "friday": {
                "open": "",
                "close": ""
            },
            "monday": {
                "close": "",
                "open": ""
            },
            "tuesday": {
                "close": "",
                "open": ""
            }
        },
        "phone": 992465000,
        "description": "3er test",
        "address": "Los pillines 123",
        "employees": {
            "order_handler_ids": [],
            "manager_ids": [],
            "receptionist_ids": []
        },
        "name": "test"
    },
    {
        "id": "yJk2gfbxpYzfZC5z7rdL",
        "name": "Test",
        "menu_id": "YqlxMQ7ypQeUfJdSwDf4",
        "country_id": "I8YYT0Lx5hU5BlvFFbV8",
        "working_hours": {
            "friday": {
                "close": "",
                "open": ""
            },
            "monday": {
                "close": "",
                "open": ""
            },
            "tuesday": {
                "open": "",
                "close": ""
            },
            "sunday": {
                "open": "",
                "close": ""
            },
            "wednesday": {
                "close": "",
                "open": ""
            },
            "saturday": {
                "close": "",
                "open": ""
            },
            "thursday": {
                "close": "",
                "open": ""
            }
        },
        "phone": "987654321",
        "description": "La mejor cevicheria de Lima",
        "address": "Av. Javier Prado Este 144",
        "employees": {
            "order_handler_ids": [
                "MYyrSfD7rIfAfjpNzad2sU0mOAu2"
            ],
            "manager_ids": [
                "MYyrSfD7rIfAfjpNzad2sU0mOAu2"
            ],
            "receptionist_ids": [
                "MYyrSfD7rIfAfjpNzad2sU0mOAu2"
            ]
        }
    }
]
````

### **GET SINGLE**
Parameters:
* **id**

Example:
* Request
````
https://us-central1-foodex-backend.cloudfunctions.net/establishments?id=Ge5Bb4w0Zcb7sGhVAFfv
````
* Response
````
{
    "id": "Ge5Bb4w0Zcb7sGhVAFfv",
    "working_hours": {
        "tuesday": {
            "close": "",
            "open": ""
        },
        "sunday": {
            "open": "",
            "close": ""
        },
        "wednesday": {
            "close": "",
            "open": ""
        },
        "saturday": {
            "open": "",
            "close": ""
        },
        "thursday": {
            "open": "",
            "close": ""
        },
        "friday": {
            "close": "",
            "open": ""
        },
        "monday": {
            "close": "",
            "open": ""
        }
    },
    "phone": 992465000,
    "description": "3er test",
    "address": "Los pillines 123",
    "employees": {
        "order_handler_ids": [],
        "manager_ids": [],
        "receptionist_ids": []
    },
    "name": "test",
    "menu_id": "E85ou2A6PIJ4lBmEAf9h",
    "reservation_limit": 0,
    "country_id": "I8YYT0Lx5hU5BlvFFbV8"
}
````

## Orders

### **API c**
https://us-central1-foodex-backend.cloudfunctions.net/orders

### **GET LIST**
Parameters
* **client_id**

Example:
* Request
````
https://us-central1-foodex-backend.cloudfunctions.net/orders?client_id=MYyrSfD7rIfAfjpNzad2sU0mOAu2
````
* Response
````
[
    {
        "id": "8wZxNjaRr6rrn27dmil1",
        "comment": "",
        "dish_ids": {
            "8bE9x9GsM7Zi0WI3MevX": "1"
        },
        "client_id": "MYyrSfD7rIfAfjpNzad2sU0mOAu2",
        "discount": 5,
        "status": "paid",
        "total": 9,
        "total_to_pay": 4,
        "establishment_id": "yJk2gfbxpYzfZC5z7rdL",
        "time": "2019-09-25T20:00:00.000Z"
    }
]
````

### **GET SINGLE**
Parameters
* **id**

Example:
* Request
````
https://us-central1-foodex-backend.cloudfunctions.net/orders?id=8wZxNjaRr6rrn27dmil1
````
* Response
````
{
    "id": "8wZxNjaRr6rrn27dmil1",
    "status": "paid",
    "total": 9,
    "total_to_pay": 4,
    "establishment_id": "yJk2gfbxpYzfZC5z7rdL",
    "time": "2019-09-25T20:00:00.000Z",
    "comment": "",
    "dish_ids": {
        "8bE9x9GsM7Zi0WI3MevX": "1"
    },
    "client_id": "MYyrSfD7rIfAfjpNzad2sU0mOAu2",
    "discount": 5
}
````

### **POST**
Request Body
````
{
    "client_id": "MYyrSfD7rIfAfjpNzad2sU0mOAu2",
    "establishment_id": "yJk2gfbxpYzfZC5z7rdL",
    "comment": "",
    "dish_ids": {
        "BTWxrnWd2qqgi2VcJcc2": 2
    }
}
````

## Reservations

### **API URL**
https://us-central1-foodex-backend.cloudfunctions.net/reservations

### **GET LIST**
Parameters
* **client_id**

Examples
* Request
````
https://us-central1-foodex-backend.cloudfunctions.net/reservations?client_id=MYyrSfD7rIfAfjpNzad2sU0mOAu2
````
* Response
````
[
    {
        "id": "Dzk7q7Z4KGemFyNGWU7h",
        "client_id": "MYyrSfD7rIfAfjpNzad2sU0mOAu2",
        "attendees": 1,
        "status": "done",
        "order_ids": [
            "8wZxNjaRr6rrn27dmil1"
        ],
        "establishment_id": "yJk2gfbxpYzfZC5z7rdL",
        "time": "2019-09-25T20:00:00.000Z",
        "comment": ""
    }
]
````

### **GET SINGLE**
Parameters
* **id**

Examples
* Request
````
https://us-central1-foodex-backend.cloudfunctions.net/reservations?id=Dzk7q7Z4KGemFyNGWU7h
````
* Response
````
{
    "id": "Dzk7q7Z4KGemFyNGWU7h",
    "establishment_id": "yJk2gfbxpYzfZC5z7rdL",
    "time": "2019-09-25T20:00:00.000Z",
    "comment": "",
    "client_id": "MYyrSfD7rIfAfjpNzad2sU0mOAu2",
    "attendees": 1,
    "status": "done",
    "order_ids": [
        "8wZxNjaRr6rrn27dmil1"
    ]
}
````

### **POST**
Request Body
````
{
    client_id: "Dzk7q7Z4KGemFyNGWU7h",
    establishment_id: "yJk2gfbxpYzfZC5z7rdL",
    order_ids: [
        "8wZxNjaRr6rrn27dmil1"
    ],
    attendees: 1,
    comment: ""
}
````