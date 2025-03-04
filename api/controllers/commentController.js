const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getComments = async (req, res) => {

    const comments = await prisma.comment.findMany({
        where: {
            postId: parseInt(req.params.postId)
        }
    });

    res.json(comments);
}

const createComment = async (req, res) => {
    const { content, name } = req.body;
    const postId = parseInt(req.params.postId);

    // Check if postId is valid
    if (isNaN(postId)) {
        return res.status(400).json({ error: "Invalid post ID" });
    }

    try {
        const comment = await prisma.comment.create({
            data: {
                content,
                name,
                postId: postId
            }
        });

        res.json(comment);
    } catch (error) {
        console.error('Error creating comment:', error);
        res.status(500).json({ error: "Failed to create comment" });
    }
}

const deleteComment = async (req, res) => {
    const commentId = parseInt(req.params.id);

    const comment = await prisma.comment.delete({
        where: {
            id: commentId
        }
    });

    res.json(comment);
}

const updateComment = async (req, res) => {

    const commentId = parseInt(req.params.id);
    const { content } = req.body;

    const comment = await prisma.comment.update({
        where: {
            id: commentId   
        },
        data: {
            content
        }
    });

    res.json(comment);
}

module.exports = {
    getComments,
    createComment,
    deleteComment,
    updateComment,
}