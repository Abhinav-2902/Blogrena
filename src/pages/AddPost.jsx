import React from 'react'
import { Container, PostForm } from '../components'

const AddPost = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-4">
      <Container>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8 text-center">
          Add New Post
        </h1>
        <div className="max-w-4xl mx-auto">
          <PostForm />
        </div>
      </Container>
    </div>
  )
}

export default AddPost
