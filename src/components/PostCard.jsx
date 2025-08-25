import React from 'react'
import { Link } from 'react-router-dom'
import appwriteService from "../appwrite/config"

function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`} className="group">
      <div className="w-full bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
        {/* Image */}
        <div className="w-full h-48 overflow-hidden">
          <img
            src={appwriteService.getFileView(featuredImage)}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* Title */}
        <div className="p-4">
          <h2 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-gray-100 truncate">
            {title}
          </h2>
        </div>
      </div>
    </Link>
  )
}

export default PostCard
