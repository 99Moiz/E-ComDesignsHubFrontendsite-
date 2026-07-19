import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Upload, Send, CheckCircle, AlertCircle } from "lucide-react";
import emailjs from "@emailjs/browser";

interface Job {
  jobId: number;
  title: string;
  description: string;
  location: string;
  jobType: string;
  experienceRequired: number;
  postedDate: string;
  dueDate: string;
  isActive: boolean;
}

interface JobApplicationProps {
  job: Job;
  onClose: () => void;
}

const JobApplication = ({ job, onClose }: JobApplicationProps) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    experienceYears: '',
    coverLetter: '',
    resume: null as File | null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitProgress, setSubmitProgress] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Progress bar animation during submission
  useEffect(() => {
    if (isSubmitting && submitStatus === 'idle') {
      const interval = setInterval(() => {
        setSubmitProgress((prev) => {
          if (prev >= 90) {
            clearInterval(interval);
            return 90;
          }
          return prev + 5;
        });
      }, 100);
      return () => clearInterval(interval);
    }
  }, [isSubmitting, submitStatus]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, resume: file }));
    if (errors.resume) {
      setErrors(prev => ({ ...prev, resume: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.experienceYears) newErrors.experienceYears = 'Experience is required';
    if (!formData.resume) newErrors.resume = 'Resume is required';
    else if (formData.resume.size > 3 * 1024 * 1024) newErrors.resume = 'Resume must be less than 3MB';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const sendEmailNotification = async () => {
    try {
      // Send notification to company (owner mail)
      await emailjs.send(
        "service_gu6hcdr",
        "template_668fmzq", // Using same template as contact page
        {
          from_name: formData.fullName,
          from_email: formData.email,
          subject: `Job Application: ${job.title}`,
          message: `
New job application received!

Position: ${job.title}
Location: ${job.location}
Job Type: ${job.jobType}

Applicant Details:
- Name: ${formData.fullName}
- Email: ${formData.email}
- Phone: ${formData.phone}
- Experience: ${formData.experienceYears} years
- Cover Letter: ${formData.coverLetter || 'Not provided'}

Application Date: ${new Date().toLocaleDateString()}
          `,
        },
        "BCE3DhDXp2I-6C0Pe"
      );

      // Send confirmation to applicant (client auto reply)
      await emailjs.send(
        "service_gu6hcdr",
        "template_2ifb2e8", // Using same template as contact page
        {
          from_name: formData.fullName,
          from_email: formData.email,
          subject: `Application Received - ${job.title}`,
          message: `Thank you for applying for the ${job.title} position at E-ComDesignsHub. We have received your application and will review it carefully.`,
        },
        "BCE3DhDXp2I-6C0Pe"
      );
    } catch (error) {
      console.error('Email sending failed:', error);
      // Don't fail the application if email fails
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const submitData = new FormData();
      submitData.append('FullName', formData.fullName);
      submitData.append('Email', formData.email);
      submitData.append('Phone', formData.phone);
      submitData.append('ExperienceYears', formData.experienceYears);
      submitData.append('CoverLetter', formData.coverLetter);
      submitData.append('JobId', job.jobId.toString());
      if (formData.resume) {
        submitData.append('Resume', formData.resume);
      }

      const response = await fetch('https://ecomdesignshub.runasp.net/api/applications/Apply', {
        method: 'POST',
        body: submitData,
      });

      if (!response.ok) {
        throw new Error('Failed to submit application');
      }

      // Send email notifications
      await sendEmailNotification();

      setSubmitProgress(100);
      setSubmitStatus('success');
      setTimeout(() => {
        onClose();
      }, 3000);

    } catch (error) {
      console.error('Application submission failed:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2 }}
          className="bg-card border border-border rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6 border-b border-border">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-heading font-bold text-foreground">
                  Apply for {job.title}
                </h2>
                <p className="text-muted-foreground mt-1">
                  {job.location} • {job.jobType}
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          <div className="p-6">
            {submitStatus === 'success' ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-8"
              >
                <CheckCircle size={48} className="mx-auto text-green-500 mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Application Submitted Successfully!
                </h3>
                <p className="text-muted-foreground">
                  Thank you for your interest. We'll review your application and get back to you soon.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Progress Bar */}
                {isSubmitting && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6"
                  >
                    <div className="flex items-center justify-center gap-3 mb-3">
                      <motion.img
                        src="/images/logo.jpeg"
                        alt="e-comdesignshub"
                        className="h-8 w-8 rounded-lg object-cover"
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                      <span className="font-heading font-semibold text-sm text-foreground">
                        Submitting Application...
                      </span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
                      <motion.div
                        className="h-full bg-primary rounded-full"
                        style={{ width: `${submitProgress}%` }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground text-center mt-2">
                      {submitProgress < 30 && "Validating your information..."}
                      {submitProgress >= 30 && submitProgress < 60 && "Uploading your resume..."}
                      {submitProgress >= 60 && submitProgress < 90 && "Submitting application..."}
                      {submitProgress >= 90 && "Sending confirmation emails..."}
                    </p>
                  </motion.div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary ${
                        errors.fullName ? 'border-red-500' : 'border-border'
                      }`}
                      placeholder="Enter your full name"
                    />
                    {errors.fullName && (
                      <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary ${
                        errors.email ? 'border-red-500' : 'border-border'
                      }`}
                      placeholder="Enter your email"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary ${
                        errors.phone ? 'border-red-500' : 'border-border'
                      }`}
                      placeholder="Enter your phone number"
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Years of Experience *
                    </label>
                    <select
                      name="experienceYears"
                      value={formData.experienceYears}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary ${
                        errors.experienceYears ? 'border-red-500' : 'border-border'
                      }`}
                    >
                      <option value="">Select experience</option>
                      <option value="0">Less than 1 year</option>
                      <option value="1">1 year</option>
                      <option value="2">2 years</option>
                      <option value="3">3 years</option>
                      <option value="4">4 years</option>
                      <option value="5">5+ years</option>
                    </select>
                    {errors.experienceYears && (
                      <p className="text-red-500 text-sm mt-1">{errors.experienceYears}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Cover Letter
                  </label>
                  <textarea
                    name="coverLetter"
                    value={formData.coverLetter}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                    placeholder="Tell us why you're interested in this position..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Resume/CV *
                  </label>
                  <div className="border-2 border-dashed border-border rounded-lg p-4">
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      className="hidden"
                      id="resume-upload"
                    />
                    <label
                      htmlFor="resume-upload"
                      className="cursor-pointer flex flex-col items-center justify-center text-center"
                    >
                      <Upload size={24} className="text-muted-foreground mb-2" />
                      <span className="text-sm text-muted-foreground">
                        {formData.resume ? formData.resume.name : 'Click to upload your resume (PDF, DOC, DOCX)'}
                      </span>
                      <span className="text-xs text-muted-foreground mt-1">
                        Maximum file size: 3MB
                      </span>
                    </label>
                  </div>
                  {errors.resume && (
                    <p className="text-red-500 text-sm mt-1">{errors.resume}</p>
                  )}
                </div>

                {submitStatus === 'error' && (
                  <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <AlertCircle size={16} className="text-red-500" />
                    <span className="text-red-700 text-sm">
                      Failed to submit application. Please try again.
                    </span>
                  </div>
                )}

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors"
                    disabled={isSubmitting}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground"></div>
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        Submit Application
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default JobApplication;