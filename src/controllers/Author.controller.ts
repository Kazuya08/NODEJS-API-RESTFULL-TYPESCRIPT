import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Author from '../models/Author.model';

const createAuthor = (req: Request, res: Response, next: NextFunction) => {
    const { name } = req.body;

    const author = new Author({
        _id: new mongoose.Types.ObjectId(),
        name
    });

    return author
        .save()
        .then((author) => res.status(201).json({ author }))
        .catch((error) => res.status(500).json({ error }));
};
const readAuthor = (req: Request, res: Response, next: NextFunction) => {
    const authorId = req.params.authorId;

    return Author.findById(authorId)
        .then((author) => (author ? res.status(200).json({ author }) : res.status(404).json({ message: 'Not found' })))
        .catch((error) => res.status(500).json({ error }));
};
const readAll = (req: Request, res: Response, next: NextFunction) => {
    return Author.find()
        .then((authors) => {
            console.log(authors, 'authors');
            res.status(200).json({ authors });
        })
        .catch((error) => res.status(500).json({ error }));
};
const updateAuthor = (req: Request, res: Response, next: NextFunction) => {
    const authorId = req.params.authorId;

    return Author.findById(authorId)/// <reference path="" />
    
        .then((author) => {
            if (author) {
                author.set(req.body);

                return author
                    .save()
                    .then((author) => res.status(201).json({ author }))
                    .catch((error) => res.status(500).json({ error }));
            }
            return res.status(404).json({ message: 'Not found' });
        })
        .catch((error) => res.status(500).json({ error }));
};
const deleteAuthor = (req: Request, res: Response, next: NextFunction) => {
    const authorId = req.params.authorId;

    return Author.findByIdAndDelete(authorId)
        .then((author) => (author ? res.status(201).json({ message: 'Deleted' }) : res.status(404).json({ message: 'Not found' })))
        .catch((error) => res.status(500).json({ error }));
};

export default { createAuthor, readAuthor, readAll, updateAuthor, deleteAuthor };
