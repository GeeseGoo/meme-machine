const express = require('express');
const router = express.Router({mergeParams: true});

const postController = require('../controllers/postController');
const commentRouter = require('./commentRouter');
const authenticate = require('../middleware/authenticate');

router.get('/', postController.getPosts);
router.get('/:id', postController.getPost);
router.post('/', authenticate, postController.createPost);
router.delete('/:id', authenticate, postController.deletePost);
router.put('/:id', authenticate, postController.updatePost);

router.use('/:postId/comments/', commentRouter);

module.exports = router;


