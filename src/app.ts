import express from "express"
import connectionDB from "./db.js";
import { Response, Request } from "express";
import Joi from "joi";

const server = express();
server.use(express.json())

server.get("/health", (req, res) => {
    res.send("OK")
})

const MovieSchema = Joi.object({
    title: Joi.string().required(),
    score: Joi.number().required()
})

type Movie = {
    id?: number,
    title: string,
    score: number
}

server.post("/movie", async (req: Request, res: Response) => {
    const newMovie = req.body as Movie

    const { error } = MovieSchema.validate(newMovie)

    if (error) {
        return res.status(400).send({
            message: error.message
        })
    }

    try {
        await connectionDB.query<Movie>(`INSERT INTO movies (title, score) VALUES ($1, $2);`, [newMovie.title, newMovie.score])
        res.sendStatus(201)
    } catch (err) {
        res.status(500).send(err.message)
    }
}) 

server.get("/movies", async (req: Request, res: Response) => {
    const { id } = req.query 

    try {
        if (!id) {
            const movies = (await connectionDB.query<Movie[]>(`SELECT * FROM movies`)).rows
            return res.send(movies)
        }
        
        const movie = (await connectionDB.query<Movie>(`SELECT * FROM movies WHERE id=$1`, [id])).rows[0] 
        
        if (!movie) {
            return res.sendStatus(404)
        }
        
        res.send(movie)
    } catch (err) {
        res.status(500).send(err.message)
    }   
})

const ScoreSchema = Joi.number()

server.patch("/movie/:id", async (req: Request, res: Response) => {
    const { id } = req.params 
    const newScore = req.body.score as Number

    const { error } = ScoreSchema.validate(newScore)

    if (error) {
        return res.status(400).send({
            message: error.message
        })
    }

    try {
        await connectionDB.query(`UPDATE movies SET score=$1 WHERE id=$2`, [newScore, id])
        res.sendStatus(200)
    } catch (err) {
        res.status(500).send(err.message)
    }
})

server.delete("/movie/:id", async (req: Request, res: Response) => {
    const { id } = req.params 

    try {
        await connectionDB.query(`DELETE FROM movies WHERE id=$1;`, [id])
        res.sendStatus(200)
    } catch (err) {
        res.status(500).send(err.message)
    }
})

server.listen(4000, () => {
    console.log("Aplicação em execução")
})