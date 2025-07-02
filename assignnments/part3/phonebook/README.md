# Part 3 Project, Database-backed online Phonebook

## Frontend
Basic Vite + React Single Page App: 
- Gets information from homemade json database
- Display registry dynamically on page
- Has forms to add people to phonebook
- Warn of duplicates 
- Update previous users
- Filter list of people

## Backend
Basic Express JSON api:
- REST-'like' api
- Info page at `/info`
- Access phonebook db at `/api/persons`
- Supports HTTP GET, PATCH, DELETE
- Morgan midleware for console logging