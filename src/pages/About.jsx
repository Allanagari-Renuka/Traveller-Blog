import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Globe, Users, Camera, PenTool, ArrowRight, Award, MapPin, Compass } from 'lucide-react';

const About = () => {
  const teamMembers = [
    {
      name: 'Sarah Chen',
      role: 'Founder & Travel Writer',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Passionate traveler with 50+ countries visited and a love for cultural immersion.',
    },
    {
      name: 'Marcus Rodriguez',
      role: 'Photography Director',
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Award-winning travel photographer capturing the essence of destinations worldwide.',
    },
    {
      name: 'Aisha Patel',
      role: 'Community Manager',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Building connections between travelers and fostering our global community.',
    },
  ];

  const values = [
    {
      icon: Heart,
      title: 'Authentic Stories',
      description: 'We believe in sharing genuine, unfiltered travel experiences that inspire and inform.',
    },
    {
      icon: Globe,
      title: 'Global Community',
      description: 'Connecting travelers from all corners of the world to share knowledge and experiences.',
    },
    {
      icon: Users,
      title: 'Inclusive Travel',
      description: 'Making travel accessible and welcoming for everyone, regardless of background or budget.',
    },
    {
      icon: Camera,
      title: 'Visual Storytelling',
      description: 'Combining compelling narratives with stunning photography to bring destinations to life.',
    },
  ];

  const stats = [
    { number: '10,000+', label: 'Travel Stories', icon: PenTool },
    { number: '150+', label: 'Countries Covered', icon: MapPin },
    { number: '25,000+', label: 'Community Members', icon: Users },
    { number: '5 Years', label: 'Inspiring Travelers', icon: Award },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <div className="relative rounded-2xl overflow-hidden mb-8">
          <img
            src="https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg?auto=compress&cs=tinysrgb&w=1200"
            alt="Travel community"
            className="w-full h-64 md:h-80 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white text-center">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
              About Boundless Horizons
            </h1>
            <p className="text-xl opacity-90 max-w-2xl">
              Connecting travelers worldwide through authentic stories and shared experiences
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-6">
              Our Mission
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              At Boundless Horizons, we believe that every journey has a story worth telling. Our mission is to create 
              a platform where travelers can share their authentic experiences, discover hidden gems, and 
              connect with like-minded adventurers from around the globe.
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              We're more than just a travel blog – we're a community of storytellers, dreamers, and explorers 
              who believe that travel has the power to transform lives, break down barriers, and create 
              lasting connections between people and cultures.
            </p>
            <Link to="/register" className="btn-primary inline-flex items-center">
              Join Our Community
              <ArrowRight size={20} className="ml-2" />
            </Link>
          </div>
          <div className="relative">
            <img
              src="https://images.pexels.com/photos/1371360/pexels-photo-1371360.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Travel planning"
              className="rounded-xl shadow-lg"
            />
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg">
              <div className="flex items-center space-x-2">
                <Compass size={24} className="text-primary-600" />
                <span className="font-semibold text-gray-900">Since 2019</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="mb-16">
        <div className="bg-gradient-to-r from-primary-600 to-accent-600 rounded-2xl text-white p-8 md:p-12">
          <h2 className="text-3xl font-display font-bold text-center mb-12">
            Our Impact in Numbers
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <Icon size={32} className="mx-auto mb-3 opacity-90" />
                  <div className="text-3xl md:text-4xl font-bold mb-2">{stat.number}</div>
                  <div className="text-sm md:text-base opacity-90">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="mb-16">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 text-center mb-12">
          What We Stand For
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <div key={index} className="card p-8 text-center hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon size={32} className="text-primary-600" />
                </div>
                <h3 className="text-xl font-display font-semibold mb-3">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Team Section */}
      <section className="mb-16">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 text-center mb-12">
          Meet Our Team
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="card text-center hover:shadow-lg transition-shadow">
              <div className="p-6">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-display font-semibold mb-1">{member.name}</h3>
                <p className="text-primary-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Story Section */}
      <section className="mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <img
              src="https://images.pexels.com/photos/1174732/pexels-photo-1174732.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Travel memories"
              className="rounded-xl shadow-lg"
            />
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-6">
              Our Story
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Boundless Horizons was born from a simple idea: that travel stories have the power to inspire, 
              educate, and connect people across cultures and continents. Founded in 2019 by a group 
              of passionate travelers, we started as a small blog sharing personal adventures.
            </p>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Today, we've grown into a thriving community of over 25,000 travelers from around the world, 
              each contributing their unique perspectives and experiences to our ever-growing collection 
              of travel stories.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Whether you're planning your first solo trip or you're a seasoned globetrotter, 
              Boundless Horizons is here to inspire your next adventure and help you share your own stories 
              with the world.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gray-100 rounded-2xl p-8 md:p-12 text-center">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
          Ready to Share Your Story?
        </h2>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Join thousands of travelers who have already shared their adventures and inspired others to explore the world.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/create-post"
            className="btn-primary inline-flex items-center justify-center"
          >
            <PenTool size={20} className="mr-2" />
            Write Your Story
          </Link>
          <Link
            to="/blogs"
            className="btn-secondary inline-flex items-center justify-center"
          >
            Explore Stories
            <ArrowRight size={20} className="ml-2" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;
