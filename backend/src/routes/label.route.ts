import { Router } from 'express';
import Label, { LabelModel } from '../classes/label.class';
import { db } from '../database/db';
import { ILabel } from '../interfaces/label.interface';
import { verifyToken } from './contact.route';

export const labelRoute = Router();

/* 
 *
 * Prefix of this route is /labels
 * 
 * 
*/

/* 
 *
 * Return all labels of a specific user using userId which we get from jwt token after decrypting
 * 
 * 
*/
labelRoute.get('/', verifyToken, async (req, res) => {
    try {
        const userId: number = res.locals.user.subject;
        const labels = await Label.getByUserId(userId);
        res.json(labels);
    } catch(err) {
        throw new Error(err);
    }
});

/* 
 *
 * Return a specific label of a particular user using labelId from route parameter and userId from jwt token after decrypting
 * 
 * 
*/
labelRoute.get('/:labelId', verifyToken, async (req, res) => {
    try {
        const userId: number = res.locals.user.subject;
        const labelId: number = +req.params.labelId;

        const label = await Label.get(userId, labelId);
        res.json(label);
    } catch(err) {
        throw new Error(err);
    }
});

/* 
 *
 * Post a new label
 * 
 * 
*/
labelRoute.post('/', verifyToken, async (req, res) => {
    try {
        const label = req.body.label;
        const newLabel: ILabel = new LabelModel(label.userId, label.labelId, label.labelName);
        const newLabelResult =  await Label.create(newLabel);
        res.json(newLabelResult);
    } catch(err) {
        throw new Error(err);
    }
});

/* 
 *
 * Update an existing label using labelId
 *
 * 
*/
labelRoute.put('/:labelId', verifyToken, async (req, res) => {
    try {
        const userId: number = res.locals.user.subject;
        const labelId: number = +req.params.labelId;
        const label = req.body.label;
        const updatedLabel = new LabelModel(label.userId, label.labelId, label.labelName);
        updatedLabel.modifiedAt = new Date();
        const updatedLabelResult = await Label.update(userId, labelId, updatedLabel);
        res.json(updatedLabelResult);
    } catch(err) {
        throw new Error(err);
    }
});

/* 
 *
 * Delete a specific label using labelId
 * 
 * 
*/
labelRoute.delete('/:labelId',verifyToken, async (req, res) => {
    try {
        const userId: number = res.locals.user.subject;
        const labelId: number = +req.params.labelId;
        const labelResult = await Label.delete(userId, labelId);
        res.json(labelResult);
    } catch(err) {
        throw new Error(err);
    }
});