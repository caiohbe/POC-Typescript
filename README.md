# How to run the API

## Download dependencies 

```
npm i
```

## Run the aplication with nodemon or node 

```
npx nodemon src/app.ts
```

# API CRUD Documentation:

- **POST**: `/movie`
    - body: { "title": "movieTitleString", "score": 6 }

- **GET**: `/movies?id=1`
    - optional query for filtering movie by id (must be a number)

- **PATCH** `/movie/:id`
    - body: { "score": 6 }

- **DELETE** `/movie:id`
    - params must be a number