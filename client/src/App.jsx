//// filepath: /C:/Users/chuang/test/blog/client/src/App.jsx
import './App.css'
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'

function PostsList() {
  const [posts, setPosts] = useState([])
  useEffect(() => {
    fetch(import.meta.env.VITE_API_BASE + '/posts')
      .then((res) => res.json())
      .then((data) => setPosts(data))
  }, [])

  return (
    <div className="post-list">
      {posts.map((post) => (
          <PostPreview key={post.id} post={post} />
      ))}
    </div>
  )
}

function AboutPage() {
  return (
    <div className="about">
      <h2>About</h2>
      <p>Welcome to <strong>Cream from my Meme</strong>, where we extract cultural significance from pixel-based hilarity like baristas crafting the perfect latte art. Founded in 2023 by a collective of reformed anthropology students who traded fieldwork for keyboard work, we're dedicated to the serious business of unserious content.</p>
      <p>We believe every meme is a tiny cultural artifact—a digital hieroglyph telling future historians what made us laugh, cry, and scroll mindlessly at 2 AM. When everyone was asking "what's that sound?" (IYKYK), we were already documenting the sonic phenomenon and its implications for contemporary communication patterns.</p>
      <p>Our team employs a proprietary analytical framework we call M.E.M.E. (Multilayered Examination of Media Expressions). Like investigators at a digital crime scene, we carefully dissect each viral moment—from the subtle nuances of distracted boyfriend's wandering gaze to the philosophical implications of "it's corn!"</p>
      <p>We refuse to shy away from complex topics. Yes, we've published a 3,000-word analysis on how the structural integrity of steel beams in certain conspiracy memes reflects our collective processing of national trauma. And yes, we spent an entire month studying the linguistic evolution of onomatopoeic expressions in viral content.</p>
      </div>
  )
}

function PostPage() {
  const { id } = useParams()
  const [post, setPost] = useState({})

  const date = new Date(post.createdAt);
  const formattedDate = date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric'
  }).toLowerCase();

  const [showModal, setShowModal] = useState(false)
  const [commentAuthor, setCommentAuthor] = useState("")
  const [commentContent, setCommentContent] = useState("")
  const [isLoaded, setIsLoaded] = useState(!!location.state?.postData)

  useEffect(() => {
    if (!isLoaded) {
      fetch(import.meta.env.VITE_API_BASE + `/posts/${id}`)
        .then(res => res.json())
        .then(data => {
          setPost(data)
          setIsLoaded(true)
        })
    }
  }, [id, isLoaded])

  const handleSubmitComment = () => {
    fetch(import.meta.env.VITE_API_BASE + `/posts/${id}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        name: commentAuthor, 
        content: commentContent,
      }),
    })
      .then(res => res.json())
      .then(data => {
        setPost({...post, comments: [...(post.comments || []), data]})
        setShowModal(false)
        setCommentAuthor("")
        setCommentContent("")
      })
  }

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <>
    <div className="post-container">
      <header>
        <time dateTime={post.createdAt}>{formattedDate}</time>
        <span className="author">By {post.author.username}</span>
      </header>
      <h2>{post.title}</h2>
      <ReactMarkdown>{post.content}</ReactMarkdown>

    </div>
    <div className="comments">
      <h3>Comments</h3>
      <div className="comment-count">

      </div>
      <div className="comment-button">
        <button onClick={() => setShowModal(true)}>Add Comment</button>
      </div>
      <div className="comment-list">
        {post.comments && post.comments.map((comment) => (
          <Comment key={comment.id} {...comment} />
        ))}
      </div>
    </div>

    {showModal && (
      <div className="modal-overlay">
        <div className="modal">
          <h3>Add a Comment</h3>
          <div className="modal-form">
            <div className="form-group">
              <label htmlFor="author">Name</label>
              <input 
                type="text" 
                id="author" 
                value={commentAuthor} 
                onChange={(e) => setCommentAuthor(e.target.value)} 
              />
            </div>
            <div className="form-group">
              <label htmlFor="content">Comment</label>
              <textarea 
                id="content" 
                value={commentContent} 
                onChange={(e) => setCommentContent(e.target.value)} 
              />
            </div>
            <div className="modal-buttons">
              <button onClick={() => setShowModal(false)}>Cancel</button>
              <button onClick={handleSubmitComment}>Submit</button>
            </div>
          </div>
        </div>
      </div>
    )}
    </>
  )
}

function Comment(comment) {
  const date = new Date(comment.createdAt);
  const formattedDate = date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric'
  }).toLowerCase();
  return (
      <div key={comment.id} className="comment">
       <div className="comment-header">
          <span className="comment-author">{comment.name}</span>
          <time dateTime={comment.createdAt}>{formattedDate}</time>
          
       </div>
        <p>{comment.content}</p>
      </div>
  )
}

 function PostPreview({ post }) {
  const date = new Date(post.createdAt);
  const formattedDate = date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric'
  }).toLowerCase();

  return (
      <div className="post-preview">
          <span>{formattedDate}</span>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          <div className="bottom">
              <div className="comment-indicator">
                  <span>{post.comments.length} Comments</span>
              </div>

              <Link to={`/posts/${post.id}`}>Read More</Link>
          </div>
      </div>
  );
}

function App() {
  return (
    <Router>
      <nav>
        <h1 className="title">Cream From My Meme</h1>
        <div className="nav-list">
          <Link to="/posts">Posts</Link>
          <Link to="/about">About</Link>
        </div>
      </nav>

      <Routes>
        <Route path="/posts" element={<PostsList />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/posts/:id" element={<PostPage />} />
        <Route path="*" element={<PostsList />} />
      </Routes>
    </Router>
  )
}




export default App