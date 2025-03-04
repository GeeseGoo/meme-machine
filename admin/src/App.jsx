import { useState, useEffect } from 'react'
import './App.css'
import ReactMarkdown from 'react-markdown'

function App() {
  const [user, setUser] = useState(null)
  const [posts, setPosts] = useState([])
  const [selectedPost, setSelectedPost] = useState(null)
  const [isLogin, setIsLogin] = useState(true)
  
  // Post creation state
  const [isCreating, setIsCreating] = useState(false)
  const [newPostTitle, setNewPostTitle] = useState('')
  const [newPostContent, setNewPostContent] = useState('')
  
  useEffect(() => {
    fetch('http://localhost:3000/posts')
      .then(res => res.json())
      .then(data => setPosts(data))
  }, []);

  // Check if user is logged in on page load
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      fetchUserData(token);
    }
  }, []);

  function fetchUserData(token) {
    fetch('http://localhost:3000/api/users/me', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => {
        if (!res.ok) {
          // If token is invalid, clear it
          localStorage.removeItem('accessToken');
          throw new Error('Invalid token');
        }
        return res.json();
      })
      .then(userData => {
        setUser(userData);
      })
      .catch(err => {
        console.error('Error fetching user data:', err);
        setUser(null);
      });
  }

  function handleLogin(formData) {
    const username = formData.get('username')
    const password = formData.get('password')
  
    fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
      .then(res => res.json())
      .then(data => {
        localStorage.setItem('accessToken', data.accessToken)
        setUser({ username })
      }).catch(err => {
        if (err.status === 404) {
          alert('User not found')
        }
        if (err.status === 401) {
          alert('Incorrect password')
        }

      })
  }

  function handleRegister(formData) {
    const username = formData.get('username')
    const password = formData.get('password')
    const confirmPassword = formData.get('confirmPassword')
    
    // Basic validation
    if (password !== confirmPassword) {
      alert("Passwords don't match")
      return
    }
    
    fetch('http://localhost:3000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Registration failed')
        }
        return res.json()
      })
      .then(data => {
        // Automatically log in after successful registration
        localStorage.setItem('accessToken', data.accessToken)
        setUser({ username })
      })
      .catch(error => {
        alert(error.message)
      })
  }

  function createPost() {
    fetch('http://localhost:3000/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
      },
      body: JSON.stringify({
        title: newPostTitle,
        content: newPostContent,
        authorId: user.username
      })
    })
      .then(res => res.json())
      .then(data => {
        setPosts([data, ...posts])
        setIsCreating(false)
        setNewPostTitle('')
        setNewPostContent('')
      })
      .catch(err => {
        console.error('Error creating post:', err)
      })
  }

  function handleDeletePost(postId) {
    fetch(`http://localhost:3000/posts/${postId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
      }
    })
      .then(() => {
        setPosts(posts.filter(post => post.id !== postId))
        if (selectedPost && selectedPost.id === postId) {
          setSelectedPost(null)
        }
      })
  }

  function handleDeleteComment(postId, commentId) {
    try {
    fetch(`http://localhost:3000/posts/${postId}/comments/${commentId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
      }
    })
      .then(() => {
        if (selectedPost && selectedPost.id === postId) {
          setSelectedPost({
            ...selectedPost,
            comments: selectedPost.comments.filter(comment => comment.id !== commentId)
          })
        }
        
        setPosts(posts.map(post => {
          if (post.id === postId) {
            return {
              ...post,
              comments: post.comments.filter(comment => comment.id !== commentId)
            }
          }
          return post
        }))
      })
  } catch (error) {
    console.error('Error deleting comment:', error)
  }
  }

  function openPost(post) {
    // Fetch the full post with comments if needed
    fetch(`http://localhost:3000/posts/${post.id}`)
      .then(res => res.json())
      .then(data => setSelectedPost(data))
  }

  if (!user) {
    return (
      <div className="auth-container">
        {isLogin ? (
          <div className="login">
            <h2>Login</h2>
            <form action={handleLogin}>
              <label>
                Username
                <input type="text" name="username" />
              </label>
              <label>
                Password
                <input type="password" name="password" />
              </label>
              <button type="submit">Login</button>
            </form>
            <div className="auth-switch">
              <p>Don't have an account?</p>
              <button onClick={() => setIsLogin(false)}>Register</button>
            </div>
          </div>
        ) : (
          <div className="register">
            <h2>Register</h2>
            <form action={handleRegister}>
              <label>
                Username
                <input type="text" name="username" required />
              </label>
              <label>
                Password
                <input type="password" name="password" required />
              </label>
              <label>
                Confirm Password
                <input type="password" name="confirmPassword" required />
              </label>
              <button type="submit">Register</button>
            </form>
            <div className="auth-switch">
              <p>Already have an account?</p>
              <button onClick={() => setIsLogin(true)}>Login</button>
            </div>
          </div>
        )}
      </div>
    )
  }
  
  return (
    <div className="admin-layout">
      <header className="main-header">
        <div className="header-content">
          <h1>Creamy Boys Admin Panel</h1>
          <div className="user-controls">
            <span>Welcome, {user.username}</span>
            <button onClick={() => setUser(null)}>Logout</button>
          </div>
        </div>
      </header>

      <main className="admin-content">
        <aside className="sidebar">
          <div className="sidebar-header">
            <h2>Posts</h2>
            <button 
              className="create-button" 
              onClick={() => setIsCreating(true)}
            >
              + New
            </button>
          </div>
          
          <div className="post-list-container">
            {posts.map(post => (
              <div 
                key={post.id} 
                className={`post-item ${selectedPost?.id === post.id ? 'active' : ''}`}
                onClick={() => openPost(post)}
              >
                <span className="post-title">{post.title}</span>
                <div className="post-actions">
                  <button 
                    className="delete-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeletePost(post.id);
                    }}
                  >
                    ×
                  </button>
                </div>
              </div>
            ))}
          </div>
        </aside>

        <section className="content-area">
          {isCreating ? (
            <div className="post-editor">
              <h2>Create New Post</h2>
              <div className="editor-form">
                <div className="form-group">
                  <label htmlFor="title">Title</label>
                  <input 
                    type="text" 
                    id="title" 
                    value={newPostTitle}
                    onChange={(e) => setNewPostTitle(e.target.value)}
                    placeholder="Post Title"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="content">
                    Content 
                    <span className="markdown-hint">
                      (Use Markdown: # Header, **bold**, *italic*, - list items)
                    </span>
                  </label>
                  <textarea 
                    id="content"
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                    placeholder="Write your post content here using Markdown formatting..."
                    rows="15"
                  />
                  {newPostContent && (
                    <div className="preview-section">
                      <h3>Preview</h3>
                      <div className="markdown-preview">
                        <ReactMarkdown>{newPostContent}</ReactMarkdown>
                      </div>
                    </div>
                  )}
                </div>
                <div className="editor-actions">
                  <button onClick={() => setIsCreating(false)}>Cancel</button>
                  <button 
                    onClick={createPost}
                    disabled={!newPostTitle || !newPostContent}
                  >
                    Publish Post
                  </button>
                </div>
              </div>
            </div>
          ) : selectedPost ? (
            <div className="post-detail">
              <h2>{selectedPost.title}</h2>
              <div className="post-content">
                <ReactMarkdown>{selectedPost.content}</ReactMarkdown>
              </div>
              
              <h3>Comments</h3>
              {selectedPost.comments && selectedPost.comments.length > 0 ? (
                <div className="comment-list">
                  {selectedPost.comments.map(comment => (
                    <div key={comment.id} className="comment">
                      <p><strong>{comment.name || 'Anonymous'}:</strong> {comment.content}</p>
                      <button onClick={() => handleDeleteComment(selectedPost.id, comment.id)}>
                        Delete Comment
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No comments yet</p>
              )}
            </div>
          ) : (
            <div className="no-selection">
              <h2>Select a post or create a new one</h2>
              <p>Choose a post from the sidebar to view its details or click the New Post button to create content.</p>
            </div>
          )}
        </section>
      </main>
    </div>
  )
}

export default App
