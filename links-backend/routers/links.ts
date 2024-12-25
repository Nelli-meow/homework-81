import express from 'express';


const linksRouter = express.Router();

linksRouter.get('/', async (req, res) => {
    try {
        res.status(200).send("links");
    } catch (error) {
        console.log(error);
    }
});

linksRouter.get('/:id', async (req, res) => {
    try {
        res.status(200).send("links id");
    } catch (error) {
        console.log(error);
    }
});

linksRouter.post('/', async (req, res) => {
    try {
        res.status(200).send("links posts");
    } catch (error) {
        console.log(error);
    }
});

export default linksRouter;