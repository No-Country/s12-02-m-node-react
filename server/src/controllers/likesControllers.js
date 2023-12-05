import { query } from "express";
import ManagerLikes from "../dao/manegerLikes.js";
import Likes from "../models/likesModel.js";

import { ObjectId } from "mongodb"

const likesmanager = new ManagerLikes();

async function createLikeController(req, res) {
    try {
        const data = req.body
        const validateError = Likes(data).validateSync()

        if (validateError) {
            throw validateError;
        }
        await likesmanager.createNewlikes(data)
        return res.status(200).json({ data: data, status: 0, message: "Like creado con exito" })
    } catch (error) {
        return res.status(400).json({ data: {}, status: 1, message: error.message })
    }
}

async function getLikesController(req, res) {
    try {
        const { publication_ID } = req.query;
        let query;
        if (publication_ID) {
            query = { publication_ID: publication_ID }
        } else {
            query = {}
        }

        const allLikes = await likesmanager.getAllLikes(query)
        if (allLikes.length === 0) {

            throw new Error("No likes")


        }
        return res.status(200).json({ data: allLikes, status: 0, message: "Likes encontrados" })
    } catch (error) {

        return res.status(404).json({ data: {}, status: 1, message: error.message })

    }

}

async function deleteLikes(req, res) {
    try {
        const { id } = req.query;
        let query;
        const likesId = new ObjectId(id)
        query = { _id: likesId }

        const result = await likesmanager.deletelikes(query)

        if (result.deletedCount > 0) {
            return res.status(204).json({ data: {}, status: 0, message: "se elimino el like" })
        } else {
            throw new Error("No likes")
        }
    } catch (error) {

        return res.status(404).json({ data: {}, status: 1, message: error.message })

    }

}





export { createLikeController, getLikesController, deleteLikes }