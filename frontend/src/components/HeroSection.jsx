// HeroSection.jsx
import { motion } from 'framer-motion';
import { Button } from '@mantine/core';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <motion.div 
    className="w-full text-center py-20 px-0 bg-gradient-to-r from-blue-500 to-purple-600 text-white"
    initial={{ opacity: 0, y: -50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
  >
  
      <h1 className="text-4xl font-bold mb-4">Shape Your Future with AI Guidance</h1>
      <p className="text-lg mb-6">Get personalized career paths, skill gap analysis, and real-time job trends tailored to your aspirations.</p>
      <Link to="/profile-form">
        <Button size="lg" color="yellow" radius="xl">Get Started</Button>
      </Link>
    </motion.div>
  );
};

export default HeroSection;




