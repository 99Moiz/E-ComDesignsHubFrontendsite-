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
        className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2 }}
          role="dialog" aria-modal="true" aria-labelledby="apply-title" className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-md border border-line bg-white shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="border-b border-line p-6 md:px-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 id="apply-title" className="font-heading text-3xl font-semibold">
                  Apply for {job.title}
                </h2>
                <p className="text-muted-foreground mt-1">
                  {job.location} <span className="mx-1.5 text-foreground/25">|</span> {job.jobType}
                </p>
              </div>
              <button
                onClick={onClose}
                aria-label="Close"
                className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-mist hover:text-foreground"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          <div className="p-6 md:p-8">
            {submitStatus === 'success' ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-8"
              >
                <CheckCircle size={48} className="mx-auto mb-4 text-moss" />
                <h3 className="mb-2 font-heading text-2xl font-semibold">
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
                        className="h-8 w-8 rounded-md object-cover"
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                      <span className="text-sm font-semibold">
                        Submitting Application...
                      </span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-mist">
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
                    <label className="field-label">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className={`field-input ${errors.fullName ? '!border-destructive' : ''}`}
                      placeholder="Enter your full name"
                    />
                    {errors.fullName && (
                      <p className="mt-1 text-sm text-destructive">{errors.fullName}</p>
                    )}
                  </div>

                  <div>
                    <label className="field-label">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`field-input ${errors.email ? '!border-destructive' : ''}`}
                      placeholder="Enter your email"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-destructive">{errors.email}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="field-label">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`field-input ${errors.phone ? '!border-destructive' : ''}`}
                      placeholder="Enter your phone number"
                    />
                    {errors.phone && (
                      <p className="mt-1 text-sm text-destructive">{errors.phone}</p>
                    )}
                  </div>

                  <div>
                    <label className="field-label">
                      Years of Experience *
                    </label>
                    <select
                      name="experienceYears"
                      value={formData.experienceYears}
                      onChange={handleInputChange}
                      className={`field-input ${errors.experienceYears ? '!border-destructive' : ''}`}
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
                      <p className="mt-1 text-sm text-destructive">{errors.experienceYears}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="field-label">
                    Cover Letter
                  </label>
                  <textarea
                    name="coverLetter"
                    value={formData.coverLetter}
                    onChange={handleInputChange}
                    rows={4}
                    className="field-input resize-y"
                    placeholder="Tell us why you're interested in this position..."
                  />
                </div>

                <div>
                  <label className="field-label">
                    Resume/CV *
                  </label>
                  <div className="rounded-md border-2 border-dashed border-input p-5 transition-colors hover:border-moss hover:bg-mist">
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
                      <Upload size={24} className="mb-2 text-moss" />
                      <span className="text-sm text-muted-foreground">
                        {formData.resume ? formData.resume.name : 'Click to upload your resume (PDF, DOC, DOCX)'}
                      </span>
                      <span className="text-xs text-muted-foreground mt-1">
                        Maximum file size: 3MB
                      </span>
                    </label>
                  </div>
                  {errors.resume && (
                    <p className="mt-1 text-sm text-destructive">{errors.resume}</p>
                  )}
                </div>

                {submitStatus === 'error' && (
                  <div className="flex items-center gap-2 rounded-md border border-destructive/30 bg-destructive/5 p-3">
                    <AlertCircle size={16} className="text-destructive" />
                    <span className="text-sm text-destructive">
                      Failed to submit application. Please try again.
                    </span>
                  </div>
                )}

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={onClose}
                    className="btn-outline flex-1"
                    disabled={isSubmitting}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-dark flex-1"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
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