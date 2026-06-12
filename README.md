# SIMS - Smart Inventory Management System


## Auth APIs
| Method | URL | Body | Kaam |
|--------|-----|------|------|
| POST | /api/auth/register | {"name":"", "email":"", "password":""} | Register |
| POST | /api/auth/login | {"email":"", "password":""} | Login |
| GET | /api/auth/profile/{id} | — | Profile dekho |
| PUT | /api/auth/profile/{id} | {"name":"", "email":""} | Profile update |
| PUT | /api/auth/change-password/{id} | {"oldPassword":"", "newPassword":""} | Password change |

## Product APIs
| Method | URL | Kaam |
|--------|-----|------|
| GET | /api/products | Sab products |
| GET | /api/products/{id} | Ek product |
| POST | /api/products | Add product |
| PUT | /api/products/{id} | Update product |
| DELETE | /api/products/{id} | Delete product |
| GET | /api/products/search?q=naam | Search |
| GET | /api/products/low-stock | Low stock |
| GET | /api/products/legal/{status} | Legal filter |

## Category APIs
| Method | URL | Kaam |
|--------|-----|------|
| GET | /api/categories | Sab categories |
| POST | /api/categories | Add category |
| DELETE | /api/categories/{id} | Delete category |

## Transaction APIs
| Method | URL | Kaam |
|--------|-----|------|
| GET | /api/transactions | Sab transactions |
| POST | /api/transactions | Naya transaction |
| GET | /api/transactions/product/{id} | Product ki transactions |
| GET | /api/transactions/type/IN | Stock IN |
| GET | /api/transactions/type/OUT | Stock OUT |

## Order APIs
| Method | URL | Kaam |
|--------|-----|------|
| GET | /api/orders | Sab orders |
| GET | /api/orders/{id} | Ek order |
| POST | /api/orders | Naya order |
| PUT | /api/orders/{id} | Status update |
| DELETE | /api/orders/{id} | Delete order |
| GET | /api/orders/status/{status} | Status filter |

## Dashboard API
| Method | URL | Kaam |
|--------|-----|------|
| GET | /api/dashboard/{userId} | Poora dashboard data |

## Product Body Example
```json
{
  "name": "Paracetamol",
  "quantity": 50,
  "price": 50.0,
  "category": "Medicine",
  "companyName": "Johnson & Johnson",
  "licenseNumber": "LIC-001",
  "expiryDate": "2026-12-31",
  "legalStatus": "LICENSED"
}
```

## Order Body Example
```json
{
  "customerName": "John Doe",
  "productId": 1,
  "quantity": 5
}
```

## Transaction Body Example
json
{
  "productId": 1,
  "type": "IN",
  "quantity": 10,
  "note": "New stock arrived"
}


