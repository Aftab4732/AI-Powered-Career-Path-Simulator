const mongoose = require("mongoose");
const dotenv = require("dotenv");
const CareerSkills = require("../models/CareerSkillsModel");

dotenv.config();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const careerSkillsData = [
  { career: "Software Engineer", skills: ["Java", "React.js", "Algorithms", "Data Structures", "Cloud Computing"] },
  { career: "Data Scientist", skills: ["Python", "Machine Learning", "Deep Learning", "Statistics", "Data Visualization"] },
  { career: "Cloud Architect", skills: ["AWS", "Azure", "Google Cloud", "DevOps", "Kubernetes"] }
];

const insertData = async () => {
  try {
    await CareerSkills.insertMany(careerSkillsData);
    console.log("Career skills data inserted successfully!");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error inserting career skills data:", error);
  }
};

insertData();
