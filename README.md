# Inventory System - API Documentation

## Base URL
http://localhost:8080

## Auth APIs
| API | Method | URL | Body |
|-----|--------|-----|------|
| Register | POST | /api/auth/register | {"name":"", "email":"", "password":""} |
| Login | POST | /api/auth/login | {"email":"", "password":""} |
| Profile dekho | GET | /api/auth/profile/{id} | — |
| Profile update | PUT | /api/auth/profile/{id} | {"name":"", "email":""} |

## Product APIs
| API | Method | URL |
|-----|--------|-----|
| Sab products | GET | /api/products |
| Ek product | GET | /api/products/{id} |
| Add | POST | /api/products |
| Update | PUT | /api/products/{id} |
| Delete | DELETE | /api/products/{id} |
| Search | GET | /api/products/search?q=naam |
| Low stock | GET | /api/products/low-stock |
| Legal filter | GET | /api/products/legal/{status} |

## Category APIs
| API | Method | URL |
|-----|--------|-----|
| Sab categories | GET | /api/categories |
| Add | POST | /api/categories |
| Delete | DELETE | /api/categories/{id} |

## Product JSON Format
{
  "name": "Paracetamol",
  "quantity": 50,
  "price": 50.0,
  "category": "Medicine",
  "licenseNumber": "LIC-001",
  "expiryDate": "2026-12-31",
  "legalStatus": "LICENSED",
  "lowStockThreshold": 10
}

## Legal Status Values
- LICENSED
- RESTRICTED
- BANNED