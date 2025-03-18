//TestimonialsSection.jsx
import { motion } from 'framer-motion';
const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Data Scientist",
    text: "This platform gave me a clear roadmap to switch careers into data science!",
    img: "https://randomuser.me/api/portraits/women/45.jpg"
  },
  {
    name: "Mark Anderson",
    role: "Software Engineer",
    text: "The AI recommendations were spot-on! Helped me land my dream job.",
    img: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    name: "Emily Roberts",
    role: "Marketing Analyst",
    text: "I loved the career timeline feature! It made planning my career so easy.",
    img: "https://randomuser.me/api/portraits/women/29.jpg"
  }
];

const TestimonialsSection = () => {
  return (
    <motion.div 
    className="py-16 bg-gray-100"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 0.8 }}
    viewport={{ once: true }}
  >
    <div className="max-w-7xl mx-auto w-full px-4">

      <h2 className="text-4xl font-bold text-center mb-10 font-poppins">What Our Users Say</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mx-auto max-w-6xl">
        {testimonials.map((testimonial, index) => (
          <motion.div 
          key={index} 
          className="bg-white p-6 rounded-xl shadow-lg text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: index * 0.2 }}
          viewport={{ once: true }}
        >
            <img src={testimonial.img} alt={testimonial.name} className="w-16 h-16 mx-auto rounded-full mb-4"/>
            <p className="text-gray-700 italic">"{testimonial.text}"</p>
            <p className="text-indigo-600 font-semibold mt-2">{testimonial.name}</p>
            <p className="text-sm text-gray-500">{testimonial.role}</p>
            </motion.div>
        ))}
      </div>
      </div>
      </motion.div>
  );
};

export default TestimonialsSection;





