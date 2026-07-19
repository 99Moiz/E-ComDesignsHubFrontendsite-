Project Name

A modern and scalable web application built with a performance-focused frontend stack. This project emphasizes clean architecture, maintainable code structure, and responsive UI design.

🌐 Live Preview

Project URL:
https://your-live-url.com

📌 Project Overview

This application is developed using modern frontend technologies to ensure high performance, scalability, and an optimized user experience. It supports efficient development workflows and smooth deployment processes.

🛠️ Tech Stack

This project is built with:

⚡ Vite

🟦 TypeScript

⚛️ React

🎨 shadcn-ui

💨 Tailwind CSS

💻 Local Development Setup

Ensure you have Node.js and npm installed on your system.

Installation Steps
# Clone the repository
git clone <YOUR_GIT_URL> contact moiz for code 

# Navigate to the project directory
cd <YOUR_PROJECT_NAME>

# Install dependencies
npm install

# Start the development server
npm run dev

The development server includes hot reloading for efficient development.

📂 Project Structure
├── src/
│   ├── components/
│   ├── pages/
│   ├── hooks/
│   ├── lib/
│   └── assets/
├── public/
├── package.json
└── vite.config.ts

The structure is organized to maintain scalability and separation of concerns.

� EmailJS Setup for Job Applications

The Careers page includes job application functionality with email notifications. To set up email notifications, you need to create EmailJS templates:

1. **Company Notification Template** (`template_job_application`):
   - Subject: `New Job Application: {{job_title}}`
   - Body:
     ```
     New job application received!

     Position: {{job_title}}
     Applicant: {{applicant_name}}
     Email: {{applicant_email}}
     Phone: {{applicant_phone}}
     Experience: {{experience_years}} years
     Cover Letter: {{cover_letter}}
     Application Date: {{application_date}}

     Please review the application in the admin panel.
     ```

2. **Applicant Confirmation Template** (`template_job_application_confirm`):
   - To: `{{to_email}}`
   - Subject: `Application Received - {{job_title}}`
   - Body:
     ```
     Dear {{to_name}},

     Thank you for applying for the {{job_title}} position at {{company_name}}!

     We have received your application and will review it carefully. Our team will contact you within 3-5 business days with an update on your application status.

     Best regards,
     {{company_name}} Hiring Team
     ```

Make sure your EmailJS service is properly configured with the correct email addresses for sending and receiving notifications.

�🚀 Deployment

To deploy this project:

Build the production bundle:

npm run build

Deploy the generated dist folder to your preferred hosting platform
(e.g., Vercel, Netlify, VPS, or any static hosting provider).

🌍 Custom Domain

You can configure a custom domain directly through your hosting provider’s domain management settings.

📄 License

This project is intended for development and production use. Modify and distribute as needed.

👨‍💻 Design & Development

Design & Developed by Muhammad Moiz