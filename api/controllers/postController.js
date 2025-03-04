
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getPosts = async (req, res) => {
    const posts = await prisma.post.findMany({
        include: {
            comments: true,
            author: true
        }
    });
    res.json(posts);
}

const getPost = async (req, res) => {
    const postId = parseInt(req.params.id);

    const post = await prisma.post.findUnique({
        where: {
            id: postId
        },
        include: {
            comments: true,
            author: true
        }
    });

    res.json(post);
}

const createPost = async (req, res) => {
    const { title, content } = req.body;

    const post = await prisma.post.create({
        data: {
            title,
            content,
            authorId: req.user.id
        }
    });

    res.json(post);
}

const deletePost = async (req, res) => {
    const postId = parseInt(req.params.id);

    const post = await prisma.post.delete({
        where: {
            id: postId
        }
    });

    res.json(post);
}

const updatePost = async (req, res) => {
    const postId = parseInt(req.params.id);
    const { title, content } = req.body;

    const post = await prisma.post.update({
        where: {
            id: postId
        },
        data: {
            title,
            content
        }
    });

    res.json(post);
}

module.exports = {
    getPosts,
    getPost,
    createPost,
    deletePost,
    updatePost,
}