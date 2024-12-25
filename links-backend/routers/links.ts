import express from 'express';
import Link from "../models/Links";
import {ILinkSWithoutID} from "../types";

const linksRouter = express.Router();

linksRouter.get('/', async (req, res) => {
    try {
        const links = await Link.find();
        res.status(200).send(links);
    } catch (error) {
        console.log(error);
    }
});

linksRouter.get('/:shortUrl', async (req, res) => {
    try {
        const { shortUrl } = req.params;

        const link = await Link.findOne({ shortUrl });

        if (!link) {
            res.status(404).send(link);
        }

        res.status(301).redirect("links id");
    } catch (error) {
        console.log(error);
    }
});

linksRouter.post('/', async (req, res) => {
    try {

        const { originalUrl } = req.body;

        if (!originalUrl) {
            res.status(404).send('link not found');
        }

        const newLink: ILinkSWithoutID = {
            originalUrl: req.body.originalUrl,
            shortUrl: req.body.originalUrl,
        };

        try{
            const link = new Link(newLink);
            await link.save();
            res.send(link);
        } catch (e) {
            console.error(e);
        }

        res.status(200).send(newLink);
    } catch (error) {
        console.log(error);
    }
});

export default linksRouter;