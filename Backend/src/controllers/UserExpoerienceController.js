const Experience = require("../models/UserExperience");

const newUserExperienceAdder = async(req, res) => {
    const { name, job_title, company_name, salary_range, journey_description, image_url } = req.body;

    try {
        const newExperience = new Experience ({
          name,
          job_title,
          company_name,
          salary_range,
          journey_description,
          image_url,
        });

        await newExperience.save();
        res.status(201).json({ message: 'Experience added successfully', data: newExperience });
      } catch (error) {
        res.status(500).json({ error: 'Error creating experience', details: error });
      }
    
}


const getAllExperiences = async(req, res) => {
    try {
      const experiences = await Experience.find();
      res.status(200).json({ message: 'Experiences fetched successfully', data: experiences });
    } catch (error) {
      res.status(500).json({ error: 'Error fetching experiences', details: error });
    }
  }

module.exports = { newUserExperienceAdder, getAllExperiences }