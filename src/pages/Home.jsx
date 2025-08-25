import React from 'react'
import { Container } from '../components'

function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center py-16 px-4">
      <Container>
        <div className="max-w-3xl mx-auto text-center">
          {/* Website Title */}
          <h1 className="text-5xl font-extrabold text-gray-900 dark:text-gray-100 mb-6">
            Welcome to Blogrena
          </h1>

          {/* Introductory Description */}
          <p className="text-gray-600 dark:text-gray-400 text-lg mb-6">
            Blogrena is a modern platform for sharing your ideas, stories, and insights. 
            Explore content from writers around the world or create your own post to engage with readers.
          </p>

          {/* Call to Action */}
          <a
            href="/signup"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition"
          >
            Get Started
          </a>
        </div>
      </Container>
    </div>
  )
}

export default Home
