import React, { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import appwriteService from "../appwrite/config"
import { Button, Container } from "../components"
import parse from "html-react-parser"
import { useSelector } from "react-redux"

export default function Post() {
  const [post, setPost] = useState(null)
  const { slug } = useParams()
  const navigate = useNavigate()
  const userData = useSelector((state) => state.auth.userData)
  const isAuthor = post && userData ? post.userId === userData.$id : false

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) {
        navigate("/")
        return
      }
      try {
        const res = await appwriteService.getPost(slug)
        if (res) setPost(res)
        else navigate("/")
      } catch (err) {
        console.error(err)
        navigate("/")
      }
    }
    fetchPost()
  }, [slug, navigate])

  const deletePost = async () => {
    if (!post) return
    try {
      const status = await appwriteService.deletePost(post.$id)
      if (status) {
        await appwriteService.deleteFile(post.featuredImage)
        navigate("/")
      }
    } catch (err) {
      console.error(err)
    }
  }

  if (!post) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <p className="text-gray-600 dark:text-gray-400 text-lg">Loading post...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-4">
      <Container>
        {/* Featured Image */}
        <div className="w-full relative mb-6 rounded-xl overflow-hidden shadow-lg">
          <img
            src={appwriteService.getFileView(post.featuredImage)}
            alt={post.title}
            className="w-full h-auto object-cover rounded-xl"
          />

          {isAuthor && (
            <div className="absolute top-4 right-4 flex space-x-2">
              <Link to={`/edit-post/${post.$id}`}>
                <Button bgColor="bg-green-500 hover:bg-green-600">Edit</Button>
              </Link>
              <Button bgColor="bg-red-500 hover:bg-red-600" onClick={deletePost}>
                Delete
              </Button>
            </div>
          )}
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
          {post.title}
        </h1>

        {/* Content */}
        <div className="prose max-w-full dark:prose-invert">
          {parse(post.content)}
        </div>
      </Container>
    </div>
  )
}
