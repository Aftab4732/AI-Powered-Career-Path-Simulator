// FeaturesSection.jsx
import { Card } from "@mantine/core";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const features = [
  { title: "AI Career Recommendation", desc: "Get personalized career suggestions.", link: "/recommendations" },
  { title: "Interactive Timeline", desc: "Visualize career growth and salary potential.", link: "/profile" },
  { title: "Skill Gap Analysis", desc: "Find skill gaps and recommended courses.", link: "/profile" },
  { title: "Learning Path", desc: "Structured learning for your chosen career.", link: "/learning-path" },
  { title: "Job Market Trends", desc: "Stay updated with job market trends.", link: "/recommendations" },
  { title: "Simulation Scenarios", desc: "Experiment with different career paths.", link: "/recommendations" }
];

const FeaturesSection = () => {
  return (
    <section className="py-16 text-center">
      <div className="max-w-7xl mx-auto w-full px-4">
      <h2 className="text-4xl font-bold mb-10 font-poppins">Key Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <Card className="p-6 shadow-lg hover:shadow-2xl transition transform hover:scale-105 rounded-xl bg-gray-50">
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-700 mb-3">{feature.desc}</p>
              <Link to={feature.link} className="text-indigo-500 font-semibold hover:underline">
                Learn More
              </Link>
            </Card>
          </motion.div>
        ))}
      </div>
      </div>
    </section>
  );
};

export default FeaturesSection;




