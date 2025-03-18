// HowItWorksSection.jsx
import { CheckCircleIcon, UserCircleIcon, RocketLaunchIcon } from "@heroicons/react/24/solid";
import { motion } from 'framer-motion';
const steps = [
  { 
    icon: <UserCircleIcon className="w-12 h-12 text-indigo-600" />, 
    title: "Create Profile", 
    desc: "Input your skills, education, and interests." 
  },
  { 
    icon: <CheckCircleIcon className="w-12 h-12 text-green-500" />, 
    title: "Get AI Recommendations", 
    desc: "Receive personalized career suggestions based on your profile." 
  },
  { 
    icon: <RocketLaunchIcon className="w-12 h-12 text-purple-600" />, 
    title: "Take Action", 
    desc: "Explore courses, job trends, and skill gaps to progress in your career." 
  }
];

const HowItWorksSection = () => {
  return (
    <motion.div 
      className="py-16 bg-gray-100"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="max-w-7xl mx-auto w-full px-4">

      <h2 className="text-4xl font-bold text-center mb-10 font-poppins">How It Works</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mx-auto max-w-6xl">
        {steps.map((step, index) => (
          <motion.div 
          key={index} 
          className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: index * 0.2 }}
          viewport={{ once: true }}
        >
            {step.icon}
            <h3 className="text-xl font-semibold mt-4">{step.title}</h3>
            <p className="text-gray-700 mt-2">{step.desc}</p>
          </motion.div>
        ))}
      </div>
      </div>
      </motion.div>
  );
};

export default HowItWorksSection;



