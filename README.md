# SnapChef

This project was built in 24 hours as a part of Michigan State University's SpartaHacks Hackathon. 

The purpose of this project is to generate easy to make recipes with just a picture of the ingredients you have. 

This project is still a work in progress, I expect to be done with the main functionality of the app within a month. 

## Tech Stack

For the front-end, I used React and TailwindCSS, along with the daisyui component library for quick UI/UX design. 
For the back-end, I used supabase for user authentication and file storage along with node.js to handle API calls. 
To process the images and extract the ingredients from them, I utilized the GPT-4 Vision API. Once the images were retrieved, I used the GPT-3.5-Turbo API to generate step-by-step recipes that the user can use. 

By Sanjit Vijay <sanjitv@umich.edu>, Anish Shanbhag <shanbhag@umich.edu>, Vishnu Parthiban <vishnupa@umich.edu>
