import React, { useState, useEffect } from 'react'
import { Container, PostCard } from '../components'
import appwriteService from "../appwrite/config"

function AllPosts() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await appwriteService.getPosts([])
      if (res) setPosts(res.documents)
    }
    fetchPosts()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-4">
      <Container>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8 text-center">
          All Posts
        </h1>

        {posts.length === 0 ? (
          <p className="text-center text-gray-600 dark:text-gray-400">
            No posts available.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {posts.map((post) => (
              <PostCard key={post.$id} {...post} />
            ))}
          </div>
        )}
      </Container>
    </div>
  )
}

export default AllPosts
