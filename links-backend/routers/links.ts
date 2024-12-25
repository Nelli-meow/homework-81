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

        console.log(shortUrl);

        if (!link) {
            res.status(404).send('not found');
            return;
        }

        res.status(301).redirect(link.originalUrl);

    } catch (error) {
        console.log(error);
        res.status(500).send('Server Error');
    }
});

linksRouter.post('/', async (req, res) => {
    try {

        const { originalUrl } = req.body;

        if (!originalUrl) {
            res.status(404).send('link not found');
        }

        const abc = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let shortWordForLink = '';

        for (let i = 0; i < 7; i++) {
            shortWordForLink += abc[Math.floor(Math.random() * abc.length)];
        }

        const newLink: ILinkSWithoutID = {
            originalUrl: originalUrl,
            shortUrl: shortWordForLink,
        };

        try{
            const link = new Link(newLink);
            await link.save();

            res.status(200).send(link);
        } catch (e) {
            console.error(e);
        }

        res.status(200).send(newLink);
    } catch (error) {
        console.log(error);
    }
});

export default linksRouter;