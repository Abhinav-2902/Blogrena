import React, { useEffect, useState } from 'react'
import { Container, PostForm } from '../components'
import appwriteService from "../appwrite/config"
import { useNavigate, useParams } from 'react-router-dom'

function EditPost() {
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const { slug } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) {
        navigate('/')
        return
      }
      try {
        const res = await appwriteService.getPost(slug)
        if (res) setPost(res)
      } catch (err) {
        console.error(err)
        navigate('/')
      } finally {
        setLoading(false)
      }
    }
    fetchPost()
  }, [slug, navigate])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <p className="text-gray-600 dark:text-gray-400 text-lg">Loading post...</p>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <p className="text-red-600 dark:text-red-400 text-lg">Post not found.</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-4">
      <Container>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8 text-center">
          Edit Post
        </h1>
        <div className="max-w-4xl mx-auto">
          <PostForm post={post} />
        </div>
      </Container>
    </div>
  )
}

export default EditPost
