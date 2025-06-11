import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const samplePosts = [
  {
    id: '1',
    title: 'Exploring the Hidden Gems of Paris',
    content: '<p>Discover the lesser-known spots in Paris that offer unique experiences away from the crowds.</p>',
    featured_image: 'https://placehold.co/1200x600?text=Paris',
    country: 'France',
    destination: 'Paris',
    created_at: '2023-06-15T12:00:00Z',
    author: {
      full_name: 'Alice Johnson',
      bio: 'Travel enthusiast and photographer.',
    },
    tags: ['Travel', 'Paris', 'Hidden Gems'],
  },
  {
    id: '2',
    title: 'A Culinary Journey Through Italy',
    content: '<p>Join us as we explore the rich flavors and traditional dishes of Italy\'s diverse regions.</p>',
    featured_image: 'https://placehold.co/1200x600?text=Italy',
    country: 'Italy',
    destination: 'Rome',
    created_at: '2023-07-10T15:30:00Z',
    author: {
      full_name: 'Marco Rossi',
      bio: 'Chef and food blogger.',
    },
    tags: ['Food', 'Italy', 'Culinary'],
  },
];

export default function BlogDetailMock() {
  const { id } = useParams();
  const post = samplePosts.find(p => p.id === id);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Post not found</h2>
          <Link to="/blogs" className="btn-primary">
            Back to Stories
          </Link>
        </div>
      </div>
    );
  }

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link to="/blogs" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors">
        <ArrowLeft size={20} className="mr-2" />
        Back to Stories
      </Link>

      <div className="relative rounded-xl overflow-hidden mb-8">
        <img
          src={post.featured_image}
          alt={post.title}
          className="w-full h-64 md:h-80 object-cover"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium">
            {post.country}
          </span>
        </div>
      </div>

      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">{post.title}</h1>
        <div className="flex items-center">
          <p className="font-medium text-gray-900">{post.author.full_name}</p>
          {post.author.bio && <p className="text-sm text-gray-600 ml-4">{post.author.bio}</p>}
        </div>
      </header>

      <div className="prose prose-lg max-w-none mb-12" dangerouslySetInnerHTML={{ __html: post.content }} />

      <footer className="border-t border-gray-200 pt-8">
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag, idx) => (
            <span key={idx} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
              #{tag}
            </span>
          ))}
        </div>
      </footer>
    </article>
  );
}
