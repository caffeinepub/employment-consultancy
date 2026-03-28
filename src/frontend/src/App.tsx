import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Toaster } from "@/components/ui/sonner";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Briefcase,
  CheckCircle2,
  FileText,
  GraduationCap,
  Heart,
  Lightbulb,
  Linkedin,
  MapPin,
  Menu,
  MessageSquare,
  Phone,
  PiggyBank,
  Shield,
  Star,
  TrendingUp,
  Users,
  X,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useSubmitContactForm } from "./hooks/useQueries";

const LINKEDIN_URL =
  "https://www.linkedin.com/company/us-workforce-transition-services-ltd/?viewAsMember=true";

const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Media", href: "#media" },
  { label: "About", href: "#about" },
  { label: "Why Trust Us", href: "#why-trust-us" },
  { label: "Process", href: "#how-process-works" },
  { label: "Alumni Promise", href: "#alumni-promise" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

const MEDIA_IMAGES = [
  {
    src: "/assets/uploads/chatgpt_image_feb_20_2026_12_44_59_pm-019d340d-6d20-772b-a840-1aa699bbf3df-1.png",
    alt: "US Workforce Transition Services promotional banner",
  },
  {
    src: "/assets/uploads/99bd1bcb-f277-404e-b9d5-ae7908413346-019d340d-84c6-774a-ace1-033ab02a55d7-2.png",
    alt: "Career services and job placement resources",
  },
  {
    src: "/assets/uploads/chatgpt_image_feb_16_2026_12_19_16_pm-019d340d-9dfc-736e-9884-c85dd862c276-3.png",
    alt: "Employment consultancy services overview",
  },
  {
    src: "/assets/uploads/d6d6b773-90c0-4d16-882a-5f2fea92ee42-019d340d-9f9a-73b9-83f9-6e8b24e7cca1-4.png",
    alt: "Workforce transition and career development",
  },
];

const SERVICES = [
  {
    icon: Briefcase,
    title: "Executive Recruiting",
    description:
      "We identify and place top-tier executives and senior leaders who drive organizational growth and align with your company culture.",
  },
  {
    icon: Users,
    title: "Career Placement",
    description:
      "From entry-level to mid-management roles, we match talented professionals with opportunities that accelerate their careers.",
  },
  {
    icon: BarChart3,
    title: "HR & Staffing Solutions",
    description:
      "Comprehensive workforce planning, temporary staffing, and HR consulting tailored to California's dynamic employment landscape.",
  },
  {
    icon: BookOpen,
    title: "International Student CPT/OPT Jobs",
    description:
      "Dedicated job placement support for international students on F-1 visas seeking CPT and OPT-eligible positions. We connect you with employers who are experienced in sponsoring and hiring international talent.",
  },
  {
    icon: FileText,
    title: "ATS-Friendly Resume Writing & Review",
    description:
      "Professional resume writing and in-depth review services that optimize your resume to pass Applicant Tracking Systems and impress hiring managers.",
  },
  {
    icon: Heart,
    title: "Health Insurance",
    description:
      "Guidance and support in selecting the right health insurance plans for individuals, families, and employer groups to keep your workforce protected.",
  },
  {
    icon: Shield,
    title: "Life Insurance",
    description:
      "Personalized life insurance solutions that provide financial security for your loved ones and peace of mind for your future.",
  },
  {
    icon: Shield,
    title: "Insurance Services",
    description:
      "Comprehensive insurance consulting across multiple coverage types — helping you find the right policies to protect what matters most.",
  },
  {
    icon: MessageSquare,
    title: "Interview Preparation",
    description:
      "One-on-one coaching sessions to help you master behavioral and technical interviews, build confidence, and present your best self to employers.",
  },
  {
    icon: TrendingUp,
    title: "Career Development Coaching",
    description:
      "Strategic career coaching to help you identify goals, build skills, navigate promotions, and unlock your full professional potential.",
  },
  {
    icon: GraduationCap,
    title: "Student Private Loans",
    description:
      "Expert guidance on private student loan options to help students and families fund higher education with favorable terms and clear repayment plans.",
  },
  {
    icon: PiggyBank,
    title: "Retirement Planning",
    description:
      "Tailored retirement strategies — from 401(k) optimization to IRA planning — designed to secure your financial independence for the years ahead.",
  },
  {
    icon: Lightbulb,
    title: "Life Coaching",
    description:
      "Holistic life coaching to help you achieve balance, clarity, and fulfillment — aligning your personal values with your professional and life goals.",
  },
];

const STATS = [
  { value: "500+", label: "Successful Placements" },
  { value: "15+", label: "Years Experience" },
  { value: "98%", label: "Client Satisfaction" },
];

const TRUST_ITEMS = [
  {
    icon: CheckCircle2,
    title: "Verified Job Opportunities",
    description:
      "Every opportunity we present is thoroughly vetted and confirmed with real employers — no ghost listings, no surprises.",
  },
  {
    icon: Shield,
    title: "Structured & Transparent Process",
    description:
      "We keep you informed at every step with a clear, organized process so you always know exactly where you stand.",
  },
  {
    icon: Users,
    title: "Personalized Career Support",
    description:
      "Our dedicated consultants tailor guidance to your unique background, goals, and industry so you get support that actually fits.",
  },
  {
    icon: TrendingUp,
    title: "Long-Term Success Focus",
    description:
      "We measure our success by yours — building lasting relationships and career trajectories, not just quick placements.",
  },
];

const CLIENT_STORIES = [
  {
    name: "Khushi Sheth",
    origin: "India",
    stars: 5,
    badge: "I Got The Job!",
    quote:
      "I can't thank US Workforce Transition Services Ltd enough. They have been so helpful during the entire process. Genuine and reliable!!",
    timeAgo: "4 days ago",
  },
  {
    name: "Md. Tamjeedur Rahman",
    origin: "Bangladesh",
    stars: 5,
    badge: "I Got The Job!",
    quote:
      "I did it! US Workforce Transition Services Ltd made the job search process so easy and they're super genuine. Got a Visa-sponsored job and I couldn't be more grateful!",
    timeAgo: "6 days ago",
  },
  {
    name: "Deepak Chauhan",
    origin: "India",
    stars: 4,
    badge: "I Got The Job!",
    quote:
      "I am beyond grateful to the US Workforce Transition Services Ltd team for believing in me and making my dream job come true! They rock!",
    timeAgo: "2 weeks ago",
  },
  {
    name: "Manish Agarwal",
    origin: "India",
    stars: 5,
    badge: "I Got The Job!",
    quote:
      "I landed the job! US Workforce Transition Services Ltd helped me every step of the way. I feel so thankful!",
    timeAgo: "1 week ago",
  },
  {
    name: "Keerti Garg Kohli",
    origin: "USA",
    stars: 5,
    badge: "I Got The Job!",
    quote:
      "So excited, I got the job! US Workforce Transition Services Ltd is legit! From start to finish, they were super supportive.",
    timeAgo: "3 weeks ago",
  },
  {
    name: "Dipti Narang",
    origin: "MBA Candidate in Strategic Marketing",
    stars: 4,
    badge: "Client Feedback",
    quote:
      "Hastan helped me find the right job opportunity. He was supportive, responsive, and invested in my success. Thanks to him, I secured a position that truly fits me.",
    timeAgo: "",
  },
  {
    name: "Charmi Gandhi",
    origin: "Aspiring Financial Analyst | MBA Candidate",
    stars: 4,
    badge: "Client Feedback",
    quote:
      "Excellent guidance and support throughout the entire job search process. Highly recommend US Workforce Transition Services.",
    timeAgo: "",
  },
];

function StarRating({ count, total = 5 }: { count: number; total?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: total }, (_, i) => `star-${i}`).map(
        (starKey, i) => (
          <Star
            key={starKey}
            className="w-3.5 h-3.5"
            fill={i < count ? "oklch(0.82 0.15 85)" : "none"}
            stroke={i < count ? "oklch(0.82 0.15 85)" : "oklch(0.75 0 0)"}
          />
        ),
      )}
    </div>
  );
}

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [formErrors, setFormErrors] = useState<{
    name?: string;
    email?: string;
    message?: string;
  }>({});

  const submitMutation = useSubmitContactForm();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  function validateForm() {
    const errors: typeof formErrors = {};
    if (!form.name.trim()) errors.name = "Name is required";
    if (!form.email.trim()) errors.email = "Email is required";
    else if (!/^[^@]+@[^@]+\.[^@]+$/.test(form.email))
      errors.email = "Enter a valid email address";
    if (!form.message.trim()) errors.message = "Message is required";
    return errors;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    setFormErrors({});
    submitMutation.mutate(
      {
        name: form.name,
        email: form.email,
        phone: form.phone || null,
        message: form.message,
      },
      {
        onSuccess: () => {
          toast.success("Message sent! We'll be in touch shortly.");
          setForm({ name: "", email: "", phone: "", message: "" });
        },
        onError: () => {
          toast.error("Failed to send message. Please try again.");
        },
      },
    );
  }

  return (
    <div className="min-h-screen bg-background font-sans">
      <Toaster />

      {/* ───── NAVBAR ───── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-white shadow-card" : "bg-white/95 backdrop-blur-sm"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <a href="#hero" className="flex items-center gap-2.5 shrink-0">
              <div className="w-8 h-8 rounded-lg bg-navy flex items-center justify-center">
                <Briefcase className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold text-navy leading-tight">
                USWTS
                <span className="block text-xs font-medium text-teal tracking-widest uppercase leading-none">
                  Workforce Services
                </span>
              </span>
            </a>

            {/* Desktop Nav */}
            <nav
              className="hidden md:flex items-center gap-8"
              aria-label="Main navigation"
            >
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  data-ocid={`nav.${link.label.toLowerCase().replace(/\s+/g, "-")}.link`}
                  className="text-sm font-medium text-muted-foreground hover:text-navy transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-3">
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-muted-foreground hover:text-teal transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#contact">
                <Button
                  variant="outline"
                  size="sm"
                  data-ocid="nav.consultation.button"
                  className="border-navy text-navy hover:bg-navy hover:text-white transition-all"
                >
                  Request a Consultation
                </Button>
              </a>
            </div>

            {/* Mobile menu toggle */}
            <button
              type="button"
              className="md:hidden text-foreground p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              data-ocid="nav.menu.toggle"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-border px-4 py-4 flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                data-ocid={`nav.mobile.${link.label.toLowerCase().replace(/\s+/g, "-")}.link`}
                className="text-sm font-medium text-foreground"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <Button
              variant="outline"
              size="sm"
              className="w-full border-navy text-navy"
              onClick={() => {
                setMobileMenuOpen(false);
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Request a Consultation
            </Button>
          </div>
        )}
      </header>

      {/* ───── HERO ───── */}
      <section
        id="hero"
        className="pt-28 pb-20 lg:pt-36 lg:pb-28 bg-white"
        data-ocid="hero.section"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left copy */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-teal mb-4">
                <Star className="w-3.5 h-3.5" />
                California's Premier Employment Consultancy partnered with
                Beacon Hill
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-extrabold text-navy leading-tight mb-4">
                Empowering Global Talent.
                <br />
                <span style={{ color: "oklch(0.62 0.12 187)" }}>
                  Building Exceptional Careers.
                </span>
              </h1>
              <p className="text-sm font-bold text-navy mb-6">
                👉 &ldquo;Career + Financial Stability Solutions for Students
                &amp; Professionals in the U.S&rdquo;
              </p>
              <p className="text-base text-muted-foreground leading-relaxed mb-4 max-w-lg">
                At US Workforce Transition Services Ltd., we specialize in
                helping international students and professionals navigate the
                U.S. job market with confidence. From landing your first role to
                advancing your career, we connect you with trusted employers and
                real, verified opportunities across the United States.
              </p>
              <p className="text-base text-muted-foreground leading-relaxed mb-8 max-w-lg">
                Whether you're building your future or growing your team, we
                turn ambition into results.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="#contact">
                  <Button
                    size="lg"
                    data-ocid="hero.find_talent.button"
                    className="text-white hover:opacity-90 transition-opacity px-7"
                    style={{
                      backgroundColor: "oklch(0.22 0.055 218)",
                    }}
                  >
                    Find Talent
                  </Button>
                </a>
                <a href="#services">
                  <Button
                    size="lg"
                    variant="outline"
                    data-ocid="hero.explore.button"
                    className="border-2 hover:text-white transition-all px-7"
                    style={{
                      borderColor: "oklch(0.62 0.12 187)",
                      color: "oklch(0.62 0.12 187)",
                    }}
                  >
                    Explore Opportunities
                  </Button>
                </a>
              </div>
            </motion.div>

            {/* Right image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="relative"
            >
              <div className="rounded-2xl overflow-hidden shadow-brand">
                <img
                  src="/assets/generated/hero-office.dim_800x600.jpg"
                  alt="Professional office environment"
                  className="w-full h-80 lg:h-[440px] object-cover"
                />
              </div>
              {/* Floating stat card */}
              <div className="absolute -bottom-5 -left-5 bg-white rounded-xl px-5 py-4 shadow-brand flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "oklch(0.62 0.12 187 / 0.15)" }}
                >
                  <CheckCircle2
                    className="w-5 h-5"
                    style={{ color: "oklch(0.62 0.12 187)" }}
                  />
                </div>
                <div>
                  <p className="text-sm font-bold text-navy">500+ Placements</p>
                  <p className="text-xs text-muted-foreground">
                    Across California
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ───── SERVICES ───── */}
      <section
        id="services"
        className="py-20 lg:py-28"
        style={{ backgroundColor: "oklch(0.97 0.01 228)" }}
        data-ocid="services.section"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-3"
              style={{ color: "oklch(0.62 0.12 187)" }}
            >
              What We Offer
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy">
              Our Core Services
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {SERVICES.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (i % 4) * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-card hover:shadow-brand transition-shadow group"
                data-ocid={`services.item.${i + 1}`}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: "oklch(0.22 0.055 218 / 0.08)" }}
                >
                  <service.icon
                    className="w-5 h-5"
                    style={{ color: "oklch(0.22 0.055 218)" }}
                  />
                </div>
                <h3 className="text-base font-bold text-navy mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {service.description}
                </p>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold transition-all"
                  style={{ color: "oklch(0.62 0.12 187)" }}
                  data-ocid={`services.learn_more.${i + 1}.link`}
                >
                  Learn More
                  <ArrowRight className="w-4 h-4" />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── MEDIA ───── */}
      <section
        id="media"
        className="py-20 lg:py-28 bg-white"
        data-ocid="media.section"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-3"
              style={{ color: "oklch(0.62 0.12 187)" }}
            >
              Media & Resources
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy">
              Our Featured Resources
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {MEDIA_IMAGES.map((image, i) => (
              <motion.div
                key={image.src}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-2xl shadow-brand bg-white overflow-hidden border border-border"
                data-ocid={`media.item.${i + 1}`}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-auto object-contain"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── ABOUT ───── */}
      <section
        id="about"
        className="py-20 lg:py-28"
        style={{ backgroundColor: "oklch(0.97 0.01 228)" }}
        data-ocid="about.section"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            {/* Left text */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p
                className="text-xs font-semibold uppercase tracking-widest mb-3"
                style={{ color: "oklch(0.62 0.12 187)" }}
              >
                Who We Are
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-navy mb-6">
                About US Workforce Transition Services Ltd.
              </h2>
              <div className="space-y-4 mb-8">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  US Workforce Transition Services Ltd. is a California-based
                  employment consultancy dedicated to helping international
                  students and professionals transition successfully into the
                  U.S. workforce.
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  We understand that entering a competitive job
                  market—especially in a new country—can be challenging. That is
                  why we provide personalized career guidance, professional
                  development services, and employment support designed to help
                  our clients stand out and succeed.
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Our team works closely with candidates to develop strong
                  professional profiles while also connecting employers with
                  skilled individuals ready to contribute to their
                  organizations.
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Through strategic career support, industry insights, and
                  professional coaching, we empower our clients to move
                  confidently toward their career goals.
                </p>
              </div>

              {/* Mission & Vision cards */}
              <div className="space-y-4">
                <div
                  className="rounded-xl p-5"
                  style={{
                    borderLeft: "4px solid oklch(0.62 0.12 187)",
                    backgroundColor: "oklch(0.62 0.12 187 / 0.06)",
                  }}
                >
                  <p
                    className="text-xs font-bold uppercase tracking-widest mb-1.5"
                    style={{ color: "oklch(0.62 0.12 187)" }}
                  >
                    Our Mission
                  </p>
                  <p className="text-sm text-foreground leading-relaxed">
                    To bridge the gap between global talent and meaningful
                    career opportunities in the United States.
                  </p>
                </div>
                <div
                  className="rounded-xl p-5"
                  style={{
                    borderLeft: "4px solid oklch(0.22 0.055 218)",
                    backgroundColor: "oklch(0.22 0.055 218 / 0.06)",
                  }}
                >
                  <p
                    className="text-xs font-bold uppercase tracking-widest mb-1.5"
                    style={{ color: "oklch(0.22 0.055 218)" }}
                  >
                    Our Vision
                  </p>
                  <p className="text-sm text-foreground leading-relaxed">
                    To become one of the most trusted employment consultancies
                    supporting international talent and innovative employers
                    across the U.S.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Right stats + image */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="space-y-5"
            >
              <div className="rounded-2xl overflow-hidden shadow-brand">
                <img
                  src="/assets/generated/about-team.dim_600x450.jpg"
                  alt="Professional team meeting"
                  className="w-full h-64 object-cover"
                />
              </div>
              <div
                className="rounded-2xl p-7 grid grid-cols-3 gap-4"
                style={{ backgroundColor: "oklch(0.22 0.055 218)" }}
              >
                {STATS.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <p className="text-3xl font-extrabold text-white">
                      {stat.value}
                    </p>
                    <p
                      className="text-xs mt-1 leading-tight"
                      style={{ color: "oklch(1 0 0 / 0.65)" }}
                    >
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ───── WHY TRUST US ───── */}
      <section
        id="why-trust-us"
        className="py-20 lg:py-28 bg-white"
        data-ocid="why-trust-us.section"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-3"
              style={{ color: "oklch(0.62 0.12 187)" }}
            >
              Our Commitment
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy mb-4">
              Why Trust Us
            </h2>
            <p className="text-base text-muted-foreground max-w-xl mx-auto">
              In today's job market, trust is everything. That's why our
              approach is different:
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TRUST_ITEMS.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-card hover:shadow-brand transition-shadow border border-border"
                data-ocid={`why-trust-us.item.${i + 1}`}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{ backgroundColor: "oklch(0.22 0.055 218 / 0.08)" }}
                >
                  <item.icon
                    className="w-6 h-6"
                    style={{ color: "oklch(0.22 0.055 218)" }}
                  />
                </div>
                <h3 className="text-base font-bold text-navy mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-14 max-w-3xl mx-auto"
          >
            <img
              src="/assets/uploads/gemini_generated_image_waf45mwaf45mwaf4-019d355e-7f7b-708f-b59c-5a21d9849cac-2.png"
              alt="Why Trust Us — US Workforce Transition Services"
              className="w-full rounded-2xl shadow-lg object-contain"
            />
          </motion.div>
        </div>
      </section>

      {/* ───── HOW PROCESS WORKS ───── */}
      <section
        id="how-process-works"
        className="py-20 lg:py-28"
        style={{ backgroundColor: "oklch(0.97 0.01 228)" }}
        data-ocid="how-process-works.section"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-3"
              style={{ color: "oklch(0.62 0.12 187)" }}
            >
              How Our Process Works
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy mb-4">
              Our Verified Journey: From Resume to Placement
            </h2>
            <p className="text-base text-muted-foreground max-w-xl mx-auto">
              From resume review to placement support — a clear, structured
              7-step journey designed to get you hired.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-3xl mx-auto mb-14"
          >
            <img
              src="/assets/uploads/gemini_generated_image_waf45mwaf45mwaf4-019d355e-7df1-7278-9008-5295127617a9-1.png"
              alt="Our Verified Journey — 7-Step Process"
              className="w-full rounded-2xl shadow-lg object-contain"
            />
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {[
              {
                step: 1,
                title: "Resume Review",
                desc: "Deconstruction & analysis of your current resume",
              },
              {
                step: 2,
                title: "Resume Crafting",
                desc: "Professional writing tailored to your target role",
              },
              {
                step: 3,
                title: "Cover Letter Formation",
                desc: "Personalized & impactful cover letter",
              },
              {
                step: 4,
                title: "JD Alignment",
                desc: "Resume & cover letter matched to job descriptions",
              },
              {
                step: 5,
                title: "Selective Matching",
                desc: "Pick from curated top job options",
              },
              {
                step: 6,
                title: "Targeted Application",
                desc: "Precision submission to the right employers",
              },
              {
                step: 7,
                title: "Interview Preparation",
                desc: "Mock interviews & practical tips",
              },
            ].map(({ step, title, desc }, i) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="bg-white rounded-2xl p-5 shadow-card hover:shadow-brand transition-shadow border border-border"
                data-ocid={`how-process-works.item.${step}`}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 text-sm font-bold"
                  style={{
                    backgroundColor: "oklch(0.22 0.055 218 / 0.08)",
                    color: "oklch(0.22 0.055 218)",
                  }}
                >
                  {step}
                </div>
                <h3 className="text-sm font-bold text-navy mb-1">{title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {desc}
                </p>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 7 * 0.07 }}
              className="bg-navy rounded-2xl p-5 shadow-card col-span-2 sm:col-span-1 lg:col-span-2"
              data-ocid="how-process-works.item.8"
              style={{ backgroundColor: "oklch(0.22 0.055 218)" }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 text-sm font-bold"
                style={{
                  backgroundColor: "oklch(1 0 0 / 0.15)",
                  color: "white",
                }}
              >
                ★
              </div>
              <h3 className="text-sm font-bold text-white mb-1">
                Placement Support
              </h3>
              <p
                className="text-xs leading-relaxed"
                style={{ color: "oklch(0.85 0.03 228)" }}
              >
                Ongoing support until you land the job
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ───── ALUMNI PROMISE ───── */}
      <section
        id="alumni-promise"
        className="py-20 lg:py-28"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.18 0.04 240) 0%, oklch(0.22 0.05 250) 100%)",
        }}
        data-ocid="alumni-promise.section"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <img
              src="/assets/uploads/gemini_generated_image_2enywp2enywp2eny_1-019d35da-be0e-757e-8257-4fd9709e3b7a-1.png"
              alt="Alumni Career Bridge Banner"
              className="w-full rounded-2xl object-cover"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <span
              className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-4"
              style={{
                backgroundColor: "oklch(0.75 0.15 85)",
                color: "oklch(0.15 0.03 240)",
              }}
            >
              Alumni Advantage
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-4">
              The Alumni Promise
            </h2>
            <p
              className="text-lg md:text-xl font-medium max-w-3xl mx-auto"
              style={{ color: "oklch(0.85 0.08 85)" }}
            >
              "We didn't just study at schools—we understand the whole process."
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-4xl mx-auto text-center mb-14"
          >
            <p
              className="text-base md:text-lg leading-relaxed mb-6"
              style={{ color: "oklch(0.82 0.03 230)" }}
            >
              As alumni of{" "}
              <strong className="text-white">Westcliff University</strong> and{" "}
              <strong className="text-white">UC Irvine</strong>, we understand
              the unique challenges international students face. We remember the
              stress of CPT deadlines, the pressure of the OPT clock, and the
              complexity of H1B sponsorship.
            </p>
            <p
              className="text-base md:text-lg leading-relaxed mb-6"
              style={{ color: "oklch(0.82 0.03 230)" }}
            >
              We founded US Workforce Transition Services Ltd to be the resource
              we wish we had. Because we've sat in your classrooms and walked
              your campus, we provide more than just consulting — we provide a
              roadmap based on real, lived experience and government-verified
              data. We aren't just your consultants; we are your fellow alumni,
              and your success is our mission.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="rounded-2xl p-8 border"
              style={{
                backgroundColor: "oklch(0.25 0.05 250)",
                borderColor: "oklch(0.75 0.15 85 / 0.3)",
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm"
                  style={{
                    backgroundColor: "oklch(0.75 0.15 85)",
                    color: "oklch(0.15 0.03 240)",
                  }}
                >
                  WU
                </div>
                <h3 className="text-xl font-bold text-white">
                  Westcliff Specific Mastery
                </h3>
              </div>
              <p
                style={{ color: "oklch(0.82 0.03 230)" }}
                className="leading-relaxed"
              >
                We understand the Westcliff curriculum and how to align your
                professional development with your academic requirements for
                seamless CPT/OPT compliance.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="rounded-2xl p-8 border"
              style={{
                backgroundColor: "oklch(0.25 0.05 250)",
                borderColor: "oklch(0.75 0.15 85 / 0.3)",
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm"
                  style={{
                    backgroundColor: "oklch(0.55 0.18 240)",
                    color: "white",
                  }}
                >
                  UCI
                </div>
                <h3 className="text-xl font-bold text-white">
                  UCI Innovation & Network
                </h3>
              </div>
              <p
                style={{ color: "oklch(0.82 0.03 230)" }}
                className="leading-relaxed"
              >
                Leveraging the prestige and high-tier professional networks of
                the UC Irvine ecosystem to open doors in IT, business,
                engineering, and finance.
              </p>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center rounded-2xl py-8 px-6"
            style={{
              backgroundColor: "oklch(0.75 0.15 85 / 0.12)",
              border: "1px solid oklch(0.75 0.15 85 / 0.4)",
            }}
          >
            <p className="text-lg md:text-xl font-semibold text-white">
              "Ask us about our experience transitioning from Westcliff/UCI to
              the professional workforce during your first call!"
            </p>
          </motion.div>
        </div>
      </section>

      {/* ───── TESTIMONIALS ───── */}
      <section
        id="testimonials"
        className="py-20 lg:py-28"
        style={{ backgroundColor: "oklch(0.97 0.01 228)" }}
        data-ocid="testimonials.section"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-3"
              style={{ color: "oklch(0.62 0.12 187)" }}
            >
              Real Success Stories
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy">
              Our Job Winners Share Their Experience
            </h2>
          </motion.div>

          {/* Story cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
            {CLIENT_STORIES.map((story, i) => (
              <motion.div
                key={story.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-card flex flex-col gap-4 hover:shadow-brand transition-shadow"
                data-ocid={`testimonials.item.${i + 1}`}
              >
                {/* Badge */}
                {story.badge === "I Got The Job!" ? (
                  <span
                    className="inline-flex items-center gap-1.5 self-start text-xs font-bold px-3 py-1.5 rounded-full"
                    style={{
                      backgroundColor: "oklch(0.94 0.1 145)",
                      color: "oklch(0.38 0.12 145)",
                    }}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {story.badge}
                  </span>
                ) : (
                  <span
                    className="inline-flex items-center gap-1.5 self-start text-xs font-bold px-3 py-1.5 rounded-full"
                    style={{
                      backgroundColor: "oklch(0.92 0.06 228)",
                      color: "oklch(0.35 0.08 228)",
                    }}
                  >
                    <Star className="w-3.5 h-3.5" fill="currentColor" />
                    {story.badge}
                  </span>
                )}

                {/* Stars */}
                <StarRating count={story.stars} />

                {/* Quote */}
                <p className="text-sm text-foreground leading-relaxed flex-1">
                  &ldquo;{story.quote}&rdquo;
                </p>

                {/* Footer */}
                <div className="pt-3 border-t border-border flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-navy">
                      {story.name}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {story.origin}
                    </p>
                  </div>
                  {story.timeAgo && (
                    <span className="text-xs text-muted-foreground">
                      {story.timeAgo}
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* ── Proof Wall ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center mb-8">
              <p
                className="text-xs font-semibold uppercase tracking-widest mb-2"
                style={{ color: "oklch(0.62 0.12 187)" }}
              >
                Social Proof
              </p>
              <h3 className="text-xl font-bold text-navy">
                Real Client Feedback
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="rounded-2xl overflow-hidden shadow-brand border border-border bg-white"
                data-ocid="testimonials.item.6"
              >
                <img
                  src="/assets/uploads/f1793cdd-9820-415a-b456-1a92bf213814-019d33b1-db11-747b-936c-5618af7f79f7-1.png"
                  alt="Client feedback from Dipti Narang and Charmi Gandhi"
                  className="w-full h-auto object-contain"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="rounded-2xl overflow-hidden shadow-brand border border-border bg-white"
                data-ocid="testimonials.item.7"
              >
                <img
                  src="/assets/uploads/40cb5416-8be3-4b54-91f4-3d369b65fe6a-019d33b1-e40b-725b-bbc7-f1f4f2570ce8-2.png"
                  alt="Real success stories - 5 job winners"
                  className="w-full h-auto object-contain"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ───── CONTACT ───── */}
      <section
        id="contact"
        className="py-20 lg:py-28"
        style={{ backgroundColor: "oklch(0.97 0.01 228)" }}
        data-ocid="contact.section"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl p-8 lg:p-12"
            style={{ backgroundColor: "oklch(0.22 0.055 218)" }}
            data-ocid="contact.panel"
          >
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
              {/* Left: form */}
              <div className="lg:col-span-3">
                <p
                  className="text-xs font-semibold uppercase tracking-widest mb-2"
                  style={{ color: "oklch(0.62 0.12 187)" }}
                >
                  Reach Out
                </p>
                <h2 className="text-3xl font-bold text-white mb-8">
                  Get In Touch
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label
                        htmlFor="contact-name"
                        className="text-xs font-medium"
                        style={{ color: "oklch(1 0 0 / 0.75)" }}
                      >
                        Full Name *
                      </Label>
                      <Input
                        id="contact-name"
                        data-ocid="contact.name.input"
                        placeholder="Jane Smith"
                        value={form.name}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, name: e.target.value }))
                        }
                        className="text-white placeholder:text-white/30 border-white/20 focus:border-white/60"
                        style={{ backgroundColor: "oklch(1 0 0 / 0.08)" }}
                      />
                      {formErrors.name && (
                        <p
                          className="text-xs"
                          style={{ color: "oklch(0.75 0.18 30)" }}
                          data-ocid="contact.name.error_state"
                        >
                          {formErrors.name}
                        </p>
                      )}
                    </div>
                    <div className="space-y-1.5">
                      <Label
                        htmlFor="contact-email"
                        className="text-xs font-medium"
                        style={{ color: "oklch(1 0 0 / 0.75)" }}
                      >
                        Email Address *
                      </Label>
                      <Input
                        id="contact-email"
                        type="email"
                        data-ocid="contact.email.input"
                        placeholder="jane@example.com"
                        value={form.email}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, email: e.target.value }))
                        }
                        className="text-white placeholder:text-white/30 border-white/20 focus:border-white/60"
                        style={{ backgroundColor: "oklch(1 0 0 / 0.08)" }}
                      />
                      {formErrors.email && (
                        <p
                          className="text-xs"
                          style={{ color: "oklch(0.75 0.18 30)" }}
                          data-ocid="contact.email.error_state"
                        >
                          {formErrors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label
                      htmlFor="contact-phone"
                      className="text-xs font-medium"
                      style={{ color: "oklch(1 0 0 / 0.75)" }}
                    >
                      Phone Number (optional)
                    </Label>
                    <Input
                      id="contact-phone"
                      type="tel"
                      data-ocid="contact.phone.input"
                      placeholder="+1 (555) 000-0000"
                      value={form.phone}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, phone: e.target.value }))
                      }
                      className="text-white placeholder:text-white/30 border-white/20 focus:border-white/60"
                      style={{ backgroundColor: "oklch(1 0 0 / 0.08)" }}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label
                      htmlFor="contact-message"
                      className="text-xs font-medium"
                      style={{ color: "oklch(1 0 0 / 0.75)" }}
                    >
                      Message *
                    </Label>
                    <Textarea
                      id="contact-message"
                      data-ocid="contact.message.textarea"
                      placeholder="Tell us about your hiring needs or career goals..."
                      value={form.message}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, message: e.target.value }))
                      }
                      rows={4}
                      className="text-white placeholder:text-white/30 border-white/20 focus:border-white/60 resize-none"
                      style={{ backgroundColor: "oklch(1 0 0 / 0.08)" }}
                    />
                    {formErrors.message && (
                      <p
                        className="text-xs"
                        style={{ color: "oklch(0.75 0.18 30)" }}
                        data-ocid="contact.message.error_state"
                      >
                        {formErrors.message}
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    disabled={submitMutation.isPending}
                    data-ocid="contact.submit.button"
                    className="w-full sm:w-auto px-10 font-semibold text-white transition-opacity hover:opacity-90"
                    style={{ backgroundColor: "oklch(0.62 0.12 187)" }}
                  >
                    {submitMutation.isPending ? "Sending..." : "Send Message"}
                  </Button>

                  {submitMutation.isSuccess && (
                    <p
                      className="text-sm"
                      style={{ color: "oklch(0.75 0.15 155)" }}
                      data-ocid="contact.success_state"
                    >
                      ✓ Message received! We'll follow up within 24 hours.
                    </p>
                  )}
                </form>
              </div>

              {/* Right: contact info */}
              <div
                className="lg:col-span-2 rounded-2xl p-7 space-y-6"
                style={{ backgroundColor: "oklch(1 0 0 / 0.06)" }}
              >
                <div>
                  <p className="text-sm font-bold text-white mb-5">
                    Contact Information
                  </p>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <MapPin
                        className="w-5 h-5 mt-0.5 shrink-0"
                        style={{ color: "oklch(0.62 0.12 187)" }}
                      />
                      <span
                        className="text-sm leading-relaxed"
                        style={{ color: "oklch(1 0 0 / 0.75)" }}
                      >
                        1 San Leon, Irvine
                        <br />
                        CA 92616, California, USA
                      </span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Phone
                        className="w-5 h-5 shrink-0"
                        style={{ color: "oklch(0.62 0.12 187)" }}
                      />
                      <a
                        href="tel:+16577448270"
                        className="text-sm transition-opacity hover:opacity-75"
                        style={{ color: "oklch(1 0 0 / 0.75)" }}
                      >
                        (657) 744-8270
                      </a>
                    </li>
                    <li className="flex items-center gap-3">
                      <Phone
                        className="w-5 h-5 shrink-0"
                        style={{ color: "oklch(0.62 0.12 187)" }}
                      />
                      <a
                        href="tel:+16693045047"
                        className="text-sm transition-opacity hover:opacity-75"
                        style={{ color: "oklch(1 0 0 / 0.75)" }}
                      >
                        (669) 304-5047
                      </a>
                    </li>
                    <li className="flex items-center gap-3">
                      <Linkedin
                        className="w-5 h-5 shrink-0"
                        style={{ color: "oklch(0.62 0.12 187)" }}
                      />
                      <a
                        href={LINKEDIN_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm transition-opacity hover:opacity-75"
                        style={{ color: "oklch(1 0 0 / 0.75)" }}
                        data-ocid="contact.linkedin.link"
                      >
                        linkedin.com/company/us-workforce-transition-services-ltd
                      </a>
                    </li>
                  </ul>
                </div>

                <div
                  className="pt-5 border-t"
                  style={{ borderColor: "oklch(1 0 0 / 0.12)" }}
                >
                  <p
                    className="text-xs mb-3"
                    style={{ color: "oklch(1 0 0 / 0.5)" }}
                  >
                    Office Hours
                  </p>
                  <p
                    className="text-sm"
                    style={{ color: "oklch(1 0 0 / 0.75)" }}
                  >
                    Mon – Fri: 8:00 AM – 6:00 PM PT
                    <br />
                    Sat: 9:00 AM – 1:00 PM PT
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ───── FOOTER ───── */}
      <footer
        className="py-10"
        style={{ backgroundColor: "oklch(0.18 0.05 218)" }}
        data-ocid="footer.section"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b"
            style={{ borderColor: "oklch(1 0 0 / 0.1)" }}
          >
            {/* Brand */}
            <div className="flex items-center gap-2.5">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: "oklch(0.62 0.12 187 / 0.2)" }}
              >
                <Briefcase
                  className="w-4 h-4"
                  style={{ color: "oklch(0.62 0.12 187)" }}
                />
              </div>
              <div>
                <p className="text-sm font-bold text-white">
                  US Workforce Transition Services Ltd.
                </p>
                <p className="text-xs" style={{ color: "oklch(1 0 0 / 0.5)" }}>
                  California's Employment Partner
                </p>
              </div>
            </div>

            {/* Footer nav */}
            <nav
              className="flex items-center gap-6"
              aria-label="Footer navigation"
            >
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  data-ocid={`footer.${link.label.toLowerCase().replace(/\s+/g, "-")}.link`}
                  className="text-xs transition-opacity hover:opacity-75"
                  style={{ color: "oklch(1 0 0 / 0.6)" }}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Social */}
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              data-ocid="footer.linkedin.link"
              className="p-2 rounded-lg transition-colors hover:bg-white/10"
              style={{ color: "oklch(1 0 0 / 0.6)" }}
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs" style={{ color: "oklch(1 0 0 / 0.4)" }}>
              © {new Date().getFullYear()} US Workforce Transition Services Ltd.
              All rights reserved.
            </p>
            <p className="text-xs" style={{ color: "oklch(1 0 0 / 0.35)" }}>
              Built with ♥ using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:opacity-75 transition-opacity"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
