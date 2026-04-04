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
  ChevronDown,
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
import { useActor } from "./hooks/useActor";
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

const VISA_SERVICES = [
  {
    emoji: "🎓",
    title: "F1 Student Visa",
    anchor: "#visa-f1",
    services: [
      "University admissions guidance",
      "Interview preparation",
      "Financial documentation support",
    ],
  },
  {
    emoji: "👨‍👩‍👧",
    title: "F2 Dependent Visa",
    anchor: "#visa-f2",
    services: [
      "Spouse & children application",
      "Documentation checklist",
      "Interview tips",
    ],
  },
  {
    emoji: "🌍",
    title: "J1 Exchange Visa",
    anchor: "#visa-j1",
    services: [
      "Internship & training programs",
      "Sponsor guidance",
      "Cultural exchange support",
    ],
  },
  {
    emoji: "✈️",
    title: "B1/B2 Visitor Visa",
    anchor: "#visa-b1b2",
    services: [
      "Tourism & business travel",
      "Invitation letter guidance",
      "Strong profile building",
    ],
  },
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

const CLIENT_STORIES: {
  name: string;
  origin: string;
  stars: number;
  badge: string;
  quote: string;
  timeAgo: string;
  school?: string;
}[] = [
  // ── Original 12 ──
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
  {
    name: "Priya Patel",
    origin: "India",
    stars: 5,
    badge: "I Got The Job!",
    quote:
      "I was struggling with my OPT timeline and had almost given up. The team at US Workforce Transition Services guided me through every step and I landed a full-time software role within 6 weeks. Truly life-changing!",
    timeAgo: "5 days ago",
  },
  {
    name: "Carlos Mendoza",
    origin: "Mexico",
    stars: 5,
    badge: "I Got The Job!",
    quote:
      "As an international student, the U.S. job market felt overwhelming. They helped me craft a resume that passed ATS filters and prepared me for interviews. I accepted an offer from a Fortune 500 company!",
    timeAgo: "1 week ago",
  },
  {
    name: "Aisha Al-Farsi",
    origin: "UAE",
    stars: 5,
    badge: "I Got The Job!",
    quote:
      "The team understood the H1B sponsorship challenges like no one else. They connected me with employers who were genuinely open to sponsoring visas. I start my new role in finance next month!",
    timeAgo: "2 weeks ago",
  },
  {
    name: "Wei Zhang",
    origin: "China",
    stars: 4,
    badge: "Client Feedback",
    quote:
      "Very professional and knowledgeable about CPT requirements. They helped me align my internship with my academic program seamlessly. The career coaching sessions were extremely valuable.",
    timeAgo: "3 weeks ago",
  },
  {
    name: "Sunita Krishnamurthy",
    origin: "India",
    stars: 5,
    badge: "I Got The Job!",
    quote:
      "From resume writing to mock interviews to job placement — US Workforce Transition Services was with me every single step. I got a sponsored position in healthcare IT. 100% recommend to any international student!",
    timeAgo: "1 month ago",
  },
  // ── 20 Westcliff University Students ──
  {
    name: "Riya Sharma",
    origin: "Westcliff University, MBA",
    stars: 5,
    badge: "I Got The Job!",
    quote:
      "As a Westcliff MBA student, the CPT process felt daunting until I found US Workforce Transition Services. They knew the Westcliff curriculum inside out and aligned my internship perfectly. Landed a business analyst role at a tech firm!",
    timeAgo: "1 week ago",
    school: "Westcliff University",
  },
  {
    name: "Ahmed Hassan",
    origin: "Westcliff University, MS Business Analytics",
    stars: 5,
    badge: "I Got The Job!",
    quote:
      "The team's knowledge of Westcliff's OPT requirements was impressive. They guided me through every document and connected me with a data analytics firm that sponsored my H1B. Incredible support!",
    timeAgo: "3 days ago",
    school: "Westcliff University",
  },
  {
    name: "Pooja Verma",
    origin: "Westcliff University, MS Project Management",
    stars: 5,
    badge: "I Got The Job!",
    quote:
      "Being a Westcliff PMP grad, I needed a placement that matched my certification. USWTS found me a project manager role in less than 3 weeks. They understand what Westcliff students bring to the table.",
    timeAgo: "5 days ago",
    school: "Westcliff University",
  },
  {
    name: "Liang Chen",
    origin: "Westcliff University, MBA Finance",
    stars: 5,
    badge: "I Got The Job!",
    quote:
      "US Workforce Transition Services helped me navigate CPT authorization while studying at Westcliff. The process was seamless and I secured a finance analyst position in Irvine. Truly alumni-led guidance.",
    timeAgo: "1 week ago",
    school: "Westcliff University",
  },
  {
    name: "Fatima Al-Rashid",
    origin: "Westcliff University, MS Marketing",
    stars: 4,
    badge: "I Got The Job!",
    quote:
      "Their understanding of Westcliff's semester structure helped me plan my CPT timeline without jeopardizing my coursework. Got a digital marketing manager role before graduating!",
    timeAgo: "2 weeks ago",
    school: "Westcliff University",
  },
  {
    name: "Rahul Nair",
    origin: "Westcliff University, MS Data Science",
    stars: 5,
    badge: "I Got The Job!",
    quote:
      "USWTS knew exactly which Westcliff courses satisfied CPT eligibility and helped me line up an OPT extension plan. Now I'm a data scientist at a healthcare company with H1B sponsorship in process!",
    timeAgo: "4 days ago",
    school: "Westcliff University",
  },
  {
    name: "Mei Lin",
    origin: "Westcliff University, MBA",
    stars: 5,
    badge: "I Got The Job!",
    quote:
      "The consultants at US Workforce are Westcliff alumni themselves. That shared experience made all the difference — they coached me through behavioral interviews and I landed a supply chain manager role!",
    timeAgo: "3 weeks ago",
    school: "Westcliff University",
  },
  {
    name: "Arjun Mehta",
    origin: "Westcliff University, MS IT Management",
    stars: 4,
    badge: "Client Feedback",
    quote:
      "Exceptional support tailored specifically to Westcliff students. They understood my IT Management degree requirements and matched me with a cybersecurity analyst internship that counted for CPT. Highly recommend!",
    timeAgo: "2 weeks ago",
    school: "Westcliff University",
  },
  {
    name: "Natalia Gomez",
    origin: "Westcliff University, MBA Healthcare",
    stars: 5,
    badge: "I Got The Job!",
    quote:
      "Being an international Westcliff student in healthcare administration, I thought placement would be near impossible. US Workforce Services proved me wrong — I'm now a hospital administrator in Los Angeles!",
    timeAgo: "1 month ago",
    school: "Westcliff University",
  },
  {
    name: "Siddharth Rao",
    origin: "Westcliff University, MS Accounting",
    stars: 5,
    badge: "I Got The Job!",
    quote:
      "My USWTS consultant had firsthand knowledge of Westcliff's accounting program. They helped me prepare for CPA-track roles and I received two job offers simultaneously. The alumni connection is real!",
    timeAgo: "6 days ago",
    school: "Westcliff University",
  },
  {
    name: "Lin Wei",
    origin: "Westcliff University, MS Human Resources",
    stars: 5,
    badge: "I Got The Job!",
    quote:
      "As a Westcliff HR student on OPT, the clock was ticking. USWTS connected me with an employer willing to sponsor H1B within days. Their Westcliff-specific knowledge saved my career in the US.",
    timeAgo: "1 week ago",
    school: "Westcliff University",
  },
  {
    name: "Preethi Subramaniam",
    origin: "Westcliff University, MBA Technology",
    stars: 4,
    badge: "Client Feedback",
    quote:
      "The team at US Workforce knew every step of Westcliff's CPT approval process. My product manager internship was perfectly aligned with my MBA requirements. Could not have done this without them!",
    timeAgo: "2 weeks ago",
    school: "Westcliff University",
  },
  {
    name: "Daniel Kim",
    origin: "Westcliff University, MS Entrepreneurship",
    stars: 5,
    badge: "I Got The Job!",
    quote:
      "Even with an unconventional MS Entrepreneurship degree from Westcliff, USWTS found me a startup operations role that sponsors H1B. They saw my potential when others didn't. Forever grateful!",
    timeAgo: "3 days ago",
    school: "Westcliff University",
  },
  {
    name: "Shreya Bhat",
    origin: "Westcliff University, MBA General Management",
    stars: 5,
    badge: "I Got The Job!",
    quote:
      "The alumni-to-alumni bond I felt with the USWTS team made job searching at Westcliff so much easier. They knew exactly what employers valued in Westcliff MBAs and I landed a management consultant role!",
    timeAgo: "5 days ago",
    school: "Westcliff University",
  },
  {
    name: "Vikram Singh",
    origin: "Westcliff University, MS Supply Chain",
    stars: 5,
    badge: "I Got The Job!",
    quote:
      "With USWTS's guidance, I navigated both CPT and OPT from Westcliff without any gaps in my authorization. Now working at a logistics company with an H1B petition filed. Professional excellence!",
    timeAgo: "2 weeks ago",
    school: "Westcliff University",
  },
  {
    name: "Yuna Park",
    origin: "Westcliff University, MBA International Business",
    stars: 4,
    badge: "I Got The Job!",
    quote:
      "USWTS helped me leverage my Westcliff MBA international business background for a role at a multinational in LA. Their knowledge of how Westcliff credentials are perceived by US employers is invaluable.",
    timeAgo: "1 month ago",
    school: "Westcliff University",
  },
  {
    name: "Omar Abdullah",
    origin: "Westcliff University, MS Operations Management",
    stars: 5,
    badge: "I Got The Job!",
    quote:
      "US Workforce Transition Services truly understands the Westcliff ecosystem. They helped me find an operations analyst position that perfectly used my degree, and the OPT filing was smooth and timely.",
    timeAgo: "4 days ago",
    school: "Westcliff University",
  },
  {
    name: "Ananya Krishnan",
    origin: "Westcliff University, MBA Strategy",
    stars: 5,
    badge: "I Got The Job!",
    quote:
      "As a Westcliff strategy MBA student, I needed someone who understood the value of my program. USWTS delivered — I now have a senior strategy analyst role with full H1B sponsorship. Amazing team!",
    timeAgo: "1 week ago",
    school: "Westcliff University",
  },
  {
    name: "Takashi Yamamoto",
    origin: "Westcliff University, MS Finance",
    stars: 4,
    badge: "Client Feedback",
    quote:
      "The attention to detail USWTS applied to my Westcliff OPT timeline was remarkable. They scheduled interviews to ensure I had an offer before my CPT expired. Now in investment banking in California!",
    timeAgo: "3 weeks ago",
    school: "Westcliff University",
  },
  {
    name: "Divya Pillai",
    origin: "Westcliff University, MS Business Intelligence",
    stars: 5,
    badge: "I Got The Job!",
    quote:
      "USWTS's alumni insight into Westcliff's BI program helped me position myself as a top candidate. Received a data engineer offer in 4 weeks with H1B sponsorship confirmed for the following year. Outstanding service!",
    timeAgo: "2 days ago",
    school: "Westcliff University",
  },
  // ── 10 UC Irvine Students ──
  {
    name: "Kevin Zhang",
    origin: "UC Irvine, MS Computer Science",
    stars: 5,
    badge: "I Got The Job!",
    quote:
      "As a UCI CS grad, I leveraged the UC Irvine network that USWTS helped me tap into. They connected me with an OPT-friendly software engineering role at a top tech firm in Irvine. The alumni insight into UCI's ecosystem was invaluable!",
    timeAgo: "3 days ago",
    school: "UC Irvine",
  },
  {
    name: "Priya Nair",
    origin: "UC Irvine, MBA",
    stars: 5,
    badge: "I Got The Job!",
    quote:
      "USWTS understood the UCI Paul Merage School of Business curriculum and helped me align my CPT internship with my MBA coursework. Landed a business development role at a Fortune 500 company in Orange County!",
    timeAgo: "5 days ago",
    school: "UC Irvine",
  },
  {
    name: "Carlos Mendoza",
    origin: "UC Irvine, MS Data Science",
    stars: 5,
    badge: "I Got The Job!",
    quote:
      "The team's knowledge of UCI's OPT STEM extension was outstanding. They guided me through the application process and connected me with a data analyst position that sponsored my H1B. Truly UCI alumni-level guidance!",
    timeAgo: "1 week ago",
    school: "UC Irvine",
  },
  {
    name: "Yuki Tanaka",
    origin: "UC Irvine, MS Information & Computer Science",
    stars: 5,
    badge: "I Got The Job!",
    quote:
      "UCI has a prestigious name but breaking into the OC tech scene as an international student felt impossible. USWTS leveraged UCI's industry connections and got me into a software development role within 6 weeks of graduation!",
    timeAgo: "2 weeks ago",
    school: "UC Irvine",
  },
  {
    name: "Aisha Rahman",
    origin: "UC Irvine, MS Finance",
    stars: 5,
    badge: "I Got The Job!",
    quote:
      "My USWTS consultant knew UCI's Paul Merage finance program inside out. They matched me with a financial analyst role at an investment firm in Newport Beach that valued UCI credentials. My CPT was approved seamlessly!",
    timeAgo: "10 days ago",
    school: "UC Irvine",
  },
  {
    name: "Liang Wei",
    origin: "UC Irvine, MS Electrical Engineering",
    stars: 5,
    badge: "I Got The Job!",
    quote:
      "As a UCI engineering student, I wanted to work in Southern California's growing tech corridor. USWTS matched me with a hardware engineering internship that counted for CPT and converted to a full-time H1B-sponsored role. Exceptional service!",
    timeAgo: "4 days ago",
    school: "UC Irvine",
  },
  {
    name: "Fatima Al-Hassan",
    origin: "UC Irvine, MPH Public Health",
    stars: 5,
    badge: "I Got The Job!",
    quote:
      "Breaking into U.S. healthcare as an international UCI graduate seemed daunting. USWTS knew exactly which employers partner with UCI's public health program and secured me a health policy analyst role in Los Angeles. Life-changing support!",
    timeAgo: "6 days ago",
    school: "UC Irvine",
  },
  {
    name: "Haruto Yamamoto",
    origin: "UC Irvine, MS Management",
    stars: 5,
    badge: "I Got The Job!",
    quote:
      "USWTS used UCI's strong alumni network in business and management to open doors I didn't even know existed. They prepared me for consulting interviews and I landed a management consulting role at a Big 4 firm. Incredible ROI!",
    timeAgo: "8 days ago",
    school: "UC Irvine",
  },
  {
    name: "Divya Sharma",
    origin: "UC Irvine, MS Statistics",
    stars: 5,
    badge: "I Got The Job!",
    quote:
      "UCI's statistics program is rigorous and USWTS knew how to position my degree for maximum impact. They connected me with a quantitative analyst role at a fintech company in Irvine, with H1B sponsorship already lined up. Amazing!",
    timeAgo: "3 weeks ago",
    school: "UC Irvine",
  },
  {
    name: "Omar Khalil",
    origin: "UC Irvine, MS Civil & Environmental Engineering",
    stars: 5,
    badge: "I Got The Job!",
    quote:
      "The USWTS team understood the value of a UCI engineering degree in California's infrastructure sector. They matched me with an environmental consulting firm that sponsored OPT and later filed my H1B. Highly recommend to all UCI international students!",
    timeAgo: "2 days ago",
    school: "UC Irvine",
  },
  // ── 68 More International Placements ──
  {
    name: "Rohan Kapoor",
    origin: "India",
    stars: 5,
    badge: "I Got The Job!",
    quote:
      "The resume rewrite alone was worth it. I went from zero callbacks to three interviews in a week. Landed a software engineering role at a SaaS startup in California!",
    timeAgo: "1 day ago",
  },
  {
    name: "Sofia Reyes",
    origin: "Colombia",
    stars: 5,
    badge: "I Got The Job!",
    quote:
      "My OPT was running out and I was panicking. USWTS stepped in, revamped my profile, and found me a marketing analyst position in two weeks. I can't recommend them enough!",
    timeAgo: "3 days ago",
  },
  {
    name: "Jae-Won Oh",
    origin: "South Korea",
    stars: 5,
    badge: "I Got The Job!",
    quote:
      "As a Korean international student, I struggled with cultural nuances in interviews. US Workforce coached me through mock sessions and I nailed my UX design role at a tech firm in San Jose!",
    timeAgo: "2 days ago",
  },
  {
    name: "Chioma Okafor",
    origin: "Nigeria",
    stars: 5,
    badge: "I Got The Job!",
    quote:
      "The team helped me reframe my Nigerian banking experience for the US finance market. I secured a financial analyst position in New York — something I thought would take years!",
    timeAgo: "1 week ago",
  },
  {
    name: "Haruto Tanaka",
    origin: "Japan",
    stars: 4,
    badge: "Client Feedback",
    quote:
      "Professional, efficient, and genuinely caring. They helped me understand the US work culture alongside the visa process. My CPT internship in data science is going brilliantly.",
    timeAgo: "1 week ago",
  },
  {
    name: "Isabella Santos",
    origin: "Brazil",
    stars: 5,
    badge: "I Got The Job!",
    quote:
      "US Workforce found me a business development role at a Fortune 500 before I even finished my OPT countdown. Their employer network is extensive and they truly advocate for international students.",
    timeAgo: "5 days ago",
  },
  {
    name: "Ayesha Malik",
    origin: "Pakistan",
    stars: 5,
    badge: "I Got The Job!",
    quote:
      "The cybersecurity job market looked closed to me as an international student. USWTS knew exactly which employers sponsored H1B in this field and I landed my dream role within a month!",
    timeAgo: "2 weeks ago",
  },
  {
    name: "Nguyen Thi Lan",
    origin: "Vietnam",
    stars: 4,
    badge: "I Got The Job!",
    quote:
      "Wonderful guidance on ATS-optimized resumes. I wasn't getting any callbacks before, but after their resume workshop I landed two software developer interviews and accepted an offer!",
    timeAgo: "3 weeks ago",
  },
  {
    name: "Mateo Garcia",
    origin: "Argentina",
    stars: 5,
    badge: "I Got The Job!",
    quote:
      "USWTS helped me translate my South American MBA experience into something U.S. employers understood. The interview preparation was incredibly thorough — got the supply chain manager role!",
    timeAgo: "4 days ago",
  },
  {
    name: "Amara Diallo",
    origin: "Senegal",
    stars: 5,
    badge: "I Got The Job!",
    quote:
      "From the first consultation to my first day at work, US Workforce was there. They secured me an accounting role with a firm that actively supports African talent. Grateful beyond words!",
    timeAgo: "1 week ago",
  },
  {
    name: "Raj Balachandran",
    origin: "India",
    stars: 5,
    badge: "I Got The Job!",
    quote:
      "After three months of failed job applications, USWTS identified the exact problem with my resume and interview approach. Changed everything — got a project manager role in tech within two weeks!",
    timeAgo: "6 days ago",
  },
  {
    name: "Zara Ahmed",
    origin: "Egypt",
    stars: 4,
    badge: "Client Feedback",
    quote:
      "The career coaching was unlike anything I had experienced. My consultant genuinely understood international barriers and helped me overcome them. Highly recommended for any international professional!",
    timeAgo: "2 weeks ago",
  },
  {
    name: "Sebastian Mueller",
    origin: "Germany",
    stars: 5,
    badge: "I Got The Job!",
    quote:
      "As a German engineer transitioning to the US job market, I needed help adapting my resume and communication style. USWTS nailed it — I'm now a senior mechanical engineer in LA!",
    timeAgo: "1 month ago",
  },
  {
    name: "Kavya Reddy",
    origin: "India",
    stars: 5,
    badge: "I Got The Job!",
    quote:
      "My OPT extension looked impossible until USWTS connected me with an employer willing to sponsor STEM OPT. Now working as a data scientist with full H1B sponsorship pending. True game changer!",
    timeAgo: "1 day ago",
  },
  {
    name: "Emmanuel Asante",
    origin: "Ghana",
    stars: 5,
    badge: "I Got The Job!",
    quote:
      "US Workforce Transition Services helped me break into the US healthcare IT market from Ghana. Their employer connections are genuine and the whole team rooted for my success. Amazing experience!",
    timeAgo: "3 days ago",
  },
  {
    name: "Min-Ji Lee",
    origin: "South Korea",
    stars: 4,
    badge: "I Got The Job!",
    quote:
      "The mock interview sessions prepared me so well. I walked into my UX research interview with total confidence. Got the offer from a top tech company in Seattle!",
    timeAgo: "2 weeks ago",
  },
  {
    name: "Aarav Shah",
    origin: "India",
    stars: 5,
    badge: "I Got The Job!",
    quote:
      "I was an IT project manager in India looking to break into the US market. USWTS bridged the gap with targeted coaching, ATS resume writing, and direct employer introductions. I'm now PMP-certified and employed!",
    timeAgo: "1 week ago",
  },
  {
    name: "Valentina Cruz",
    origin: "Mexico",
    stars: 5,
    badge: "I Got The Job!",
    quote:
      "The bilingual edge USWTS helped me leverage was incredible. They positioned my Spanish fluency as an asset in the US market, and I landed a bilingual business analyst role at a multinational!",
    timeAgo: "4 days ago",
  },
  {
    name: "Karan Mehrotra",
    origin: "India",
    stars: 5,
    badge: "I Got The Job!",
    quote:
      "Three failed H1B lottery attempts left me discouraged. USWTS knew employers with cap-exempt H1B options. I'm now working at a university research center — not a typical path but perfect for me!",
    timeAgo: "2 weeks ago",
  },
  {
    name: "Yuki Tanaka",
    origin: "Japan",
    stars: 4,
    badge: "Client Feedback",
    quote:
      "Extremely patient and professional. They took time to understand my career background in Japan and helped me present it effectively to US employers. The interview coaching in particular was excellent.",
    timeAgo: "3 weeks ago",
  },
  {
    name: "Aditi Joshi",
    origin: "India",
    stars: 5,
    badge: "I Got The Job!",
    quote:
      "I switched from engineering to product management with USWTS's help. They built a tailored resume that highlighted my transferable skills and I got a PM role at a Series B startup!",
    timeAgo: "5 days ago",
  },
  {
    name: "Felipe Alves",
    origin: "Brazil",
    stars: 5,
    badge: "I Got The Job!",
    quote:
      "Working with US Workforce felt like having a personal advisory board. They knew the US job market inside out and connected me with HR tech companies who value international perspectives.",
    timeAgo: "1 week ago",
  },
  {
    name: "Samira Patel",
    origin: "India",
    stars: 5,
    badge: "I Got The Job!",
    quote:
      "The job market in pharma for OPT students seemed impossible. USWTS proved otherwise — I'm now in a regulatory affairs role with a company filing my H1B this April!",
    timeAgo: "2 days ago",
  },
  {
    name: "Taehyun Kwon",
    origin: "South Korea",
    stars: 5,
    badge: "I Got The Job!",
    quote:
      "Straight out of my MS in finance, USWTS helped me understand what Wall Street firms look for. The cover letter they crafted was a masterpiece. Now working in investment banking in NYC!",
    timeAgo: "1 week ago",
  },
  {
    name: "Oluwaseun Adeyemi",
    origin: "Nigeria",
    stars: 4,
    badge: "I Got The Job!",
    quote:
      "The LinkedIn profile overhaul USWTS did for me was transformational. Recruiters started reaching out to me directly. Got three offers in one month and chose a senior software engineer role!",
    timeAgo: "3 weeks ago",
  },
  {
    name: "Nisha Gupta",
    origin: "India",
    stars: 5,
    badge: "I Got The Job!",
    quote:
      "After struggling for months with generic applications, USWTS custom-tailored every application I sent. Within 2 weeks I had callbacks and within 5 weeks I had a marketing director offer!",
    timeAgo: "2 weeks ago",
  },
  {
    name: "Anton Petrov",
    origin: "Russia",
    stars: 4,
    badge: "Client Feedback",
    quote:
      "As a Russian data engineer, I wasn't sure US companies would sponsor my visa. USWTS had a specific list of companies with strong H1B sponsorship records. I'm now at a cloud computing firm in Austin.",
    timeAgo: "1 month ago",
  },
  {
    name: "Laleh Hosseini",
    origin: "Iran",
    stars: 5,
    badge: "I Got The Job!",
    quote:
      "The USWTS team was incredibly sensitive to my unique visa situation and found employers familiar with Iranian international students. I secured a biotech research role in the Bay Area!",
    timeAgo: "3 days ago",
  },
  {
    name: "Pham Duc Anh",
    origin: "Vietnam",
    stars: 5,
    badge: "I Got The Job!",
    quote:
      "US Workforce Transition Services turned my confusion about the US job search into a clear action plan. Six weeks later I was signing an offer letter for a software developer role in Dallas!",
    timeAgo: "1 week ago",
  },
  {
    name: "Tunde Babatunde",
    origin: "Nigeria",
    stars: 5,
    badge: "I Got The Job!",
    quote:
      "My background in Nigerian telecom didn't naturally map to US jobs. USWTS reframed my entire career narrative and I landed a network engineer role at a major US carrier. Phenomenal support!",
    timeAgo: "5 days ago",
  },
  {
    name: "Elena Vasquez",
    origin: "Venezuela",
    stars: 4,
    badge: "Client Feedback",
    quote:
      "I was a qualified accountant in Venezuela but US firms kept rejecting me. USWTS helped me get a US CPA study plan alongside a placement, so I could work while getting US-certified. Smart strategy!",
    timeAgo: "2 weeks ago",
  },
  {
    name: "Ji-Ho Lim",
    origin: "South Korea",
    stars: 5,
    badge: "I Got The Job!",
    quote:
      "The combination of ATS resume writing, LinkedIn optimization, and mock interviews from USWTS is unbeatable. I went from no callbacks to five interviews in a week. Now a business analyst at a FAANG company!",
    timeAgo: "4 days ago",
  },
  {
    name: "Pallavi Nambiar",
    origin: "India",
    stars: 5,
    badge: "I Got The Job!",
    quote:
      "USWTS helped me navigate the OPT STEM extension process while simultaneously job hunting. Zero stress because they managed both. I accepted a data engineer offer with H1B commitment from day one!",
    timeAgo: "1 week ago",
  },
  {
    name: "Diego Herrera",
    origin: "Peru",
    stars: 5,
    badge: "I Got The Job!",
    quote:
      "The career change from civil engineering to project management seemed risky, but USWTS gave me a roadmap. I now lead projects at a construction tech firm in Phoenix. Best decision I ever made!",
    timeAgo: "3 weeks ago",
  },
  {
    name: "Rekha Pillai",
    origin: "India",
    stars: 5,
    badge: "I Got The Job!",
    quote:
      "My background in Indian banking was hard to present for US roles. USWTS helped me translate 10 years of experience into a compelling US banking resume. I'm now a relationship manager at a major US bank!",
    timeAgo: "6 days ago",
  },
  {
    name: "Mariam Seidu",
    origin: "Ghana",
    stars: 4,
    badge: "Client Feedback",
    quote:
      "The team treats you like family. They followed up weekly, celebrated my interview calls, and genuinely cared about the outcome. Got a public health analyst role — exactly what I dreamed of!",
    timeAgo: "2 weeks ago",
  },
  {
    name: "Xu Wei",
    origin: "China",
    stars: 5,
    badge: "I Got The Job!",
    quote:
      "I was on my last month of OPT and desperate. US Workforce Services worked around the clock to find me a CPT-eligible position. I'm now in a full-time machine learning role with H1B sponsorship!",
    timeAgo: "1 day ago",
  },
  {
    name: "Amira Ben Ali",
    origin: "Tunisia",
    stars: 5,
    badge: "I Got The Job!",
    quote:
      "As a Tunisian civil engineer in the US, I struggled to break into the local market. USWTS connected me with engineering firms that value international talent. Now leading infrastructure projects in California!",
    timeAgo: "3 days ago",
  },
  {
    name: "Kunal Mishra",
    origin: "India",
    stars: 5,
    badge: "I Got The Job!",
    quote:
      "Five months of silence turned into five interview calls in one week after USWTS revamped my resume and LinkedIn profile. The ROI on their service is incredible. Now a senior product manager at a unicorn!",
    timeAgo: "2 weeks ago",
  },
  {
    name: "Marie-Claire Dubois",
    origin: "France",
    stars: 4,
    badge: "I Got The Job!",
    quote:
      "Transitioning from the French corporate world to the US market required more than translation — it needed cultural context. USWTS provided exactly that and I landed a marketing VP role in NYC!",
    timeAgo: "1 month ago",
  },
  {
    name: "Vignesh Kumar",
    origin: "India",
    stars: 5,
    badge: "I Got The Job!",
    quote:
      "I specifically needed H1B cap-exempt employers and USWTS had a curated list ready. Within 3 weeks I had offers from two universities. Now happily employed and planning my green card journey!",
    timeAgo: "1 week ago",
  },
  {
    name: "Laila Farouk",
    origin: "Lebanon",
    stars: 5,
    badge: "I Got The Job!",
    quote:
      "Coming from a challenging background added complexity to my US job search. USWTS handled everything with sensitivity and expertise. I'm now an HR manager at a tech company — and finally feel settled!",
    timeAgo: "4 days ago",
  },
  {
    name: "Hiroshi Nakamura",
    origin: "Japan",
    stars: 4,
    badge: "Client Feedback",
    quote:
      "The strategic career mapping USWTS did for me clarified a 5-year path I hadn't seen before. My CPT internship at a consulting firm converted to a full-time offer. Structure and clarity — that's what they give you.",
    timeAgo: "3 weeks ago",
  },
  {
    name: "Aditya Sinha",
    origin: "India",
    stars: 5,
    badge: "I Got The Job!",
    quote:
      "USWTS helped me pivot from academia to industry in cloud computing. Their employer contacts in the SaaS world are golden. Now a solutions architect at a cloud company with great visa support!",
    timeAgo: "5 days ago",
  },
  {
    name: "Fernanda Lima",
    origin: "Brazil",
    stars: 5,
    badge: "I Got The Job!",
    quote:
      "I came to the US for my MBA and was scared about the job market. USWTS made me feel supported from day one. Secured a brand manager role at a consumer goods company before graduation!",
    timeAgo: "2 days ago",
  },
  {
    name: "Abdulaziz Al-Otaibi",
    origin: "Saudi Arabia",
    stars: 5,
    badge: "I Got The Job!",
    quote:
      "The US finance job market is competitive and complex for international students. USWTS navigated every challenge and I'm now a financial consultant in Chicago with an H1B on the way!",
    timeAgo: "1 week ago",
  },
  {
    name: "Seun Owolade",
    origin: "Nigeria",
    stars: 4,
    badge: "Client Feedback",
    quote:
      "Incredible level of personalization. My USWTS consultant knew my industry, my background, and what I needed. Secured a cybersecurity analyst role at a Fortune 100 company in Houston!",
    timeAgo: "2 weeks ago",
  },
  {
    name: "Yeon Ji Choi",
    origin: "South Korea",
    stars: 5,
    badge: "I Got The Job!",
    quote:
      "USWTS helped me break into UX research in the US despite having a Korean portfolio. They knew how to present my work to American hiring managers. Now at a top design agency in San Francisco!",
    timeAgo: "3 days ago",
  },
  {
    name: "Tanvir Islam",
    origin: "Bangladesh",
    stars: 5,
    badge: "I Got The Job!",
    quote:
      "The team's expertise in STEM OPT extension timing was critical for me. They found me an employer in AI research who not only hired me on OPT but also committed to H1B sponsorship. Life-changing!",
    timeAgo: "4 days ago",
  },
  {
    name: "Preethi Ramesh",
    origin: "India",
    stars: 5,
    badge: "I Got The Job!",
    quote:
      "I was skeptical at first but after my first consultation I was sold. The resume, the coaching, the network — all top tier. Now a senior accountant at a Big Four firm in California!",
    timeAgo: "1 week ago",
  },
  {
    name: "Lucas Schneider",
    origin: "Austria",
    stars: 4,
    badge: "I Got The Job!",
    quote:
      "US Workforce helped me understand why my European CV wasn't working in the US and how to fix it. Two months later I had a mechanical design engineer role in Michigan with visa sponsorship!",
    timeAgo: "3 weeks ago",
  },
  {
    name: "Sana Khan",
    origin: "Pakistan",
    stars: 5,
    badge: "I Got The Job!",
    quote:
      "From Pakistan to a pharma company in New Jersey — my journey seemed far-fetched, but USWTS made it possible. They understood every barrier and systematically removed each one. Truly professional!",
    timeAgo: "6 days ago",
  },
  {
    name: "Michiko Fujimoto",
    origin: "Japan",
    stars: 5,
    badge: "I Got The Job!",
    quote:
      "US Workforce Services understood Japanese professional culture and how to bridge it to American workplace expectations. I'm now a senior business analyst at a Japanese-American joint venture in California!",
    timeAgo: "2 weeks ago",
  },
  {
    name: "Ali Hassan",
    origin: "Iraq",
    stars: 5,
    badge: "I Got The Job!",
    quote:
      "Despite visa complications, USWTS found creative employment pathways for me. They connected me with a tech startup with experience navigating complex visa situations. Now thriving in Austin!",
    timeAgo: "5 days ago",
  },
  {
    name: "Chamara Perera",
    origin: "Sri Lanka",
    stars: 4,
    badge: "Client Feedback",
    quote:
      "Exceptional service from start to finish. My USWTS consultant understood the Sri Lankan education system and helped translate my qualifications for US employers. Got a quality engineer role in Chicago!",
    timeAgo: "1 month ago",
  },
  {
    name: "Neha Dubey",
    origin: "India",
    stars: 5,
    badge: "I Got The Job!",
    quote:
      "The only consultancy I've encountered that truly understands the H1B sponsorship landscape. They know which companies file H1B, which cap-exempt options exist, and how to time everything. Placed in healthcare consulting!",
    timeAgo: "3 days ago",
  },
  {
    name: "Wu Mingzhe",
    origin: "China",
    stars: 5,
    badge: "I Got The Job!",
    quote:
      "USWTS handled my CPT authorization, resume overhaul, and employer outreach simultaneously. Got a summer internship that converted to a full-time data analyst role. Zero stress, maximum results!",
    timeAgo: "1 week ago",
  },
  {
    name: "Oluwafemi Adegoke",
    origin: "Nigeria",
    stars: 5,
    badge: "I Got The Job!",
    quote:
      "My software engineering skills were strong but my US job search strategy was weak. USWTS fixed that in the first session. I accepted an offer from a fintech company in less than a month!",
    timeAgo: "4 days ago",
  },
  {
    name: "Anjali Menon",
    origin: "India",
    stars: 5,
    badge: "I Got The Job!",
    quote:
      "I was a nurse in India and wanted to transition into healthcare IT in the US. USWTS understood this unique crossover and found me a clinical systems analyst role. Exactly the pivot I needed!",
    timeAgo: "2 weeks ago",
  },
  {
    name: "Rafael Torres",
    origin: "Colombia",
    stars: 4,
    badge: "Client Feedback",
    quote:
      "The salary negotiation coaching from USWTS was worth the investment alone. They coached me to negotiate 18% above the initial offer. Plus, the job they found me is in my dream industry!",
    timeAgo: "2 weeks ago",
  },
  {
    name: "Alinta Watson",
    origin: "Australia",
    stars: 5,
    badge: "I Got The Job!",
    quote:
      "Even as an English-speaking international professional, navigating US hiring was confusing. USWTS gave me the structure and employer connections I needed. Now a senior consultant in Chicago!",
    timeAgo: "3 weeks ago",
  },
  {
    name: "Vivaan Chopra",
    origin: "India",
    stars: 5,
    badge: "I Got The Job!",
    quote:
      "USWTS helped me land a cybersecurity role at a defense contractor — not an easy feat for an international candidate. Their knowledge of security clearance-compatible visa situations is unique in this industry!",
    timeAgo: "1 day ago",
  },
  {
    name: "Sung-Min Park",
    origin: "South Korea",
    stars: 4,
    badge: "I Got The Job!",
    quote:
      "My F-1 visa student journey to US employment was smooth thanks to USWTS. They handled CPT, STEM OPT extension, and now my employer is filing H1B. Couldn't ask for better end-to-end support!",
    timeAgo: "5 days ago",
  },
  {
    name: "Gao Yan",
    origin: "China",
    stars: 5,
    badge: "I Got The Job!",
    quote:
      "The mock interviews USWTS conducted prepared me for every curveball. I walked into every interview with confidence and received offers from both companies I applied to. Accepted a UX design role at a top app company!",
    timeAgo: "1 week ago",
  },
  {
    name: "Tobi Ogunyemi",
    origin: "Nigeria",
    stars: 5,
    badge: "I Got The Job!",
    quote:
      "I had a strong technical background but kept failing interviews. USWTS's communication coaching made me realize I wasn't telling my story right. After coaching, I got three offers. Changed my life!",
    timeAgo: "3 days ago",
  },
  {
    name: "Kamila Nowak",
    origin: "Poland",
    stars: 4,
    badge: "Client Feedback",
    quote:
      "Professional service with a human touch. My consultant at USWTS genuinely understood European professional backgrounds and positioned mine effectively for American employers. Supply chain analyst in California!",
    timeAgo: "2 weeks ago",
  },
  {
    name: "Dev Patel",
    origin: "India",
    stars: 5,
    badge: "I Got The Job!",
    quote:
      "I was an embedded systems engineer from India trying to break into American automotive tech. USWTS found me a role at an EV startup in Detroit with strong H1B sponsorship. Incredible connections!",
    timeAgo: "2 days ago",
  },
  {
    name: "Lucia Fernandez",
    origin: "Spain",
    stars: 5,
    badge: "I Got The Job!",
    quote:
      "Moving from Madrid to Los Angeles for my MBA was a brave decision. USWTS made the job transition equally brave — with an offer before graduation. Now a senior strategy manager at a global consulting firm!",
    timeAgo: "1 week ago",
  },
  {
    name: "Ibrahim Al-Khatib",
    origin: "Jordan",
    stars: 5,
    badge: "I Got The Job!",
    quote:
      "US Workforce Services handled every aspect of my transition from Jordanian government work to US corporate finance. My background in public sector finance is now valued at a US infrastructure company!",
    timeAgo: "6 days ago",
  },
  {
    name: "Kofi Asante",
    origin: "Ghana",
    stars: 5,
    badge: "I Got The Job!",
    quote:
      "The US market for international MBAs can feel like a closed door. USWTS found me a management consulting role that values my African market expertise. Now I'm an asset, not an outsider!",
    timeAgo: "4 days ago",
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
  const [visaDropdownOpen, setVisaDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [activeFilter, setActiveFilter] = useState<"all" | "westcliff" | "uci">(
    "all",
  );
  const [formErrors, setFormErrors] = useState<{
    name?: string;
    email?: string;
    message?: string;
  }>({});

  const submitMutation = useSubmitContactForm();
  const { actor } = useActor();

  useEffect(() => {
    if (actor) actor.recordPageVisit().catch(() => {});
  }, [actor]);

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
              <img
                src="/assets/uploads/gemini_generated_image_k9e53pk9e53pk9e5-019d374d-4ef9-7359-b9c3-2ca60b3ec8ef-1.png"
                alt="USWTS Logo"
                className="h-10 w-auto object-contain"
              />
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

              {/* US Visa Services Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setVisaDropdownOpen(true)}
                onMouseLeave={() => setVisaDropdownOpen(false)}
              >
                <button
                  type="button"
                  data-ocid="nav.visa-services.button"
                  className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-navy transition-colors"
                  aria-haspopup="true"
                  aria-expanded={visaDropdownOpen}
                >
                  US Visa Services
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${visaDropdownOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {visaDropdownOpen && (
                  <div
                    className="absolute top-full left-0 mt-2 w-52 bg-white rounded-xl shadow-lg border border-border py-2 z-50"
                    data-ocid="nav.visa-services.dropdown_menu"
                  >
                    {VISA_SERVICES.map((visa) => (
                      <a
                        key={visa.title}
                        href="#visa-services"
                        data-ocid={`nav.visa.${visa.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.link`}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-foreground hover:bg-slate-50 hover:text-navy transition-colors"
                      >
                        <span className="text-base">{visa.emoji}</span>
                        <span className="font-medium">{visa.title}</span>
                      </a>
                    ))}
                  </div>
                )}
              </div>
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

            {/* Mobile Visa Services */}
            <div className="flex flex-col gap-2">
              <button
                type="button"
                data-ocid="nav.mobile.visa-services.toggle"
                className="flex items-center justify-between text-sm font-medium text-foreground w-full"
                onClick={() => setVisaDropdownOpen((prev) => !prev)}
                aria-expanded={visaDropdownOpen}
              >
                <span>US Visa Services</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${visaDropdownOpen ? "rotate-180" : ""}`}
                />
              </button>
              {visaDropdownOpen && (
                <div
                  className="flex flex-col gap-2 pl-4 border-l-2"
                  style={{ borderColor: "oklch(0.62 0.12 187)" }}
                >
                  {VISA_SERVICES.map((visa) => (
                    <a
                      key={visa.title}
                      href="#visa-services"
                      data-ocid={`nav.mobile.visa.${visa.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.link`}
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-navy transition-colors"
                    >
                      <span>{visa.emoji}</span>
                      <span>{visa.title}</span>
                    </a>
                  ))}
                </div>
              )}
            </div>

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
        className="relative w-full pt-28 pb-20 lg:pt-36 lg:pb-28 overflow-hidden"
        data-ocid="hero.section"
        style={{
          backgroundImage:
            "url('/assets/uploads/gemini_generated_image_q5lxnlq5lxnlq5lx-019d3773-ccd4-772a-a7dc-6845d0077020-1.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/60 to-black/40 pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <img
              src="/assets/uploads/gemini_generated_image_yaad8myaad8myaad-019d3792-2aac-7180-b7c4-0700123017c9-1.png"
              alt="US Workforce Transition Services Logo"
              className="w-56 object-contain mb-6"
            />
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-teal mb-4">
              <Star className="w-3.5 h-3.5" />
              California's Premier Employment Consultancy partnered with Beacon
              Hill
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-extrabold text-white leading-tight mb-4">
              Empowering Global Talent.
              <br />
              <span style={{ color: "oklch(0.72 0.14 187)" }}>
                Building Exceptional Careers.
              </span>
            </h1>
            <p className="text-sm font-bold text-white/90 mb-6">
              👉 &ldquo;Career + Financial Stability Solutions for Students
              &amp; Professionals in the U.S&rdquo;
            </p>
            <p className="text-base text-white/80 leading-relaxed mb-4 max-w-lg">
              At US Workforce Transition Services Ltd., we specialize in helping
              international students and professionals navigate the U.S. job
              market with confidence. From landing your first role to advancing
              your career, we connect you with trusted employers and real,
              verified opportunities across the United States.
            </p>
            <p className="text-base text-white/80 leading-relaxed mb-8 max-w-lg">
              Whether you&apos;re building your future or growing your team, we
              turn ambition into results.
            </p>
            <div className="flex flex-wrap gap-4 mb-10">
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
                  className="border-2 bg-white/10 text-white hover:bg-white hover:text-navy transition-all px-7"
                  style={{
                    borderColor: "oklch(0.72 0.14 187)",
                  }}
                >
                  Explore Opportunities
                </Button>
              </a>
            </div>
            {/* Stat badge */}
            <div className="inline-flex items-center gap-3 bg-white/15 backdrop-blur-sm border border-white/25 rounded-xl px-5 py-3">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "oklch(0.62 0.12 187 / 0.4)" }}
              >
                <CheckCircle2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">500+ Placements</p>
                <p className="text-xs text-white/70">Across California</p>
              </div>
            </div>
          </motion.div>
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

      {/* ───── US VISA SERVICES ───── */}
      <section
        id="visa-services"
        className="py-20 lg:py-28 bg-white"
        data-ocid="visa-services.section"
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
              Immigration Consulting
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy mb-4">
              US Visa Services
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Expert guidance for every US visa category — from student visas to
              visitor visas, we navigate the process with you.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VISA_SERVICES.map((visa, i) => (
              <motion.div
                key={visa.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-card hover:shadow-brand transition-all duration-300 border border-border group hover:-translate-y-1"
                data-ocid={`visa-services.item.${i + 1}`}
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 text-2xl"
                  style={{ backgroundColor: "oklch(0.22 0.055 218 / 0.07)" }}
                >
                  {visa.emoji}
                </div>
                <h3 className="text-base font-bold text-navy mb-4 leading-snug">
                  {visa.title}
                </h3>
                <ul className="space-y-2 mb-6">
                  {visa.services.map((service) => (
                    <li
                      key={service}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <CheckCircle2
                        className="w-4 h-4 mt-0.5 shrink-0"
                        style={{ color: "oklch(0.62 0.12 187)" }}
                      />
                      <span>{service}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold transition-all group-hover:gap-2"
                  style={{ color: "oklch(0.62 0.12 187)" }}
                  data-ocid={`visa-services.get-help.${i + 1}.link`}
                >
                  Get Help
                  <ArrowRight className="w-4 h-4" />
                </a>
              </motion.div>
            ))}
          </div>

          {/* CTA Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 rounded-2xl p-8 text-center text-white"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.22 0.055 218), oklch(0.35 0.1 218))",
            }}
          >
            <h3 className="text-xl font-bold mb-2">
              Ready to Start Your US Visa Journey?
            </h3>
            <p className="text-white/80 mb-6 max-w-xl mx-auto text-sm">
              Our visa consultants have helped hundreds of applicants achieve
              approval. Book a free consultation today.
            </p>
            <a href="#contact">
              <Button
                className="text-navy font-semibold px-6 py-2.5"
                style={{ backgroundColor: "oklch(0.82 0.15 85)" }}
                data-ocid="visa-services.cta.primary_button"
              >
                Book Free Consultation
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </a>
          </motion.div>
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

      {/* ───── FROM THE FOUNDER'S DESK ───── */}
      <section
        id="founders"
        className="py-20 lg:py-28"
        style={{ backgroundColor: "oklch(0.97 0.005 218)" }}
        data-ocid="founders.section"
      >
        <div className="max-w-6xl mx-auto px-6">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <p
              className="text-xs font-bold uppercase tracking-widest mb-3"
              style={{ color: "oklch(0.62 0.12 187)" }}
            >
              Leadership
            </p>
            <h2
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ color: "oklch(0.22 0.055 218)" }}
            >
              From the Founder&apos;s Desk
            </h2>
            {/* Shared message */}
            <div
              className="max-w-2xl mx-auto mt-6 rounded-2xl p-7 text-left shadow-sm"
              style={{
                backgroundColor: "oklch(1 0 0)",
                borderLeft: "4px solid oklch(0.62 0.12 187)",
              }}
            >
              <svg
                className="w-8 h-8 mb-4 opacity-30"
                style={{ color: "oklch(0.62 0.12 187)" }}
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
                role="presentation"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <p className="text-base text-foreground leading-relaxed mb-4">
                At US Workforce Transition Services, we believe that every
                individual deserves the opportunity to build a successful future
                in the United States.
              </p>
              <p className="text-base text-foreground leading-relaxed mb-4">
                As someone who has personally experienced the challenges of
                navigating careers, visas, and international transitions, I
                understand how overwhelming the process can be.
              </p>
              <p
                className="text-base font-medium leading-relaxed"
                style={{ color: "oklch(0.22 0.055 218)" }}
              >
                That is why we are committed to more than just consultancy.
              </p>
            </div>
          </motion.div>

          {/* Founder cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {/* Hassan Ameen */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-col items-center text-center bg-white rounded-2xl p-8 shadow-md"
              data-ocid="founders.item.1"
            >
              <div className="w-40 h-40 rounded-full overflow-hidden mb-5 ring-4 ring-teal-300/30">
                <img
                  src="/assets/whatsapp_image_2026-04-02_at_11.33.26_pm_2-019d5227-ce61-7501-a1ba-649a70ce82ba.jpeg"
                  alt="Hassan Ameen"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <h3
                className="text-xl font-bold mb-1"
                style={{ color: "oklch(0.22 0.055 218)" }}
              >
                Hassan Ameen
              </h3>
              <p
                className="text-sm font-semibold uppercase tracking-wider"
                style={{ color: "oklch(0.62 0.12 187)" }}
              >
                Co-Founder &amp; CEO
              </p>
              <div
                className="w-12 h-0.5 rounded-full mt-4"
                style={{ backgroundColor: "oklch(0.62 0.12 187)" }}
              />
            </motion.div>

            {/* Tyler Chi Wang */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col items-center text-center bg-white rounded-2xl p-8 shadow-md"
              data-ocid="founders.item.2"
            >
              <div className="w-40 h-40 rounded-full overflow-hidden mb-5 ring-4 ring-teal-300/30">
                <img
                  src="/assets/bc3d117d-9844-447e-bb0f-d94e4e7ed3c6-019d5228-0573-7183-9dab-5855dae65433.png"
                  alt="Tyler Chi Wang"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <h3
                className="text-xl font-bold mb-1"
                style={{ color: "oklch(0.22 0.055 218)" }}
              >
                Tyler Chi Wang
              </h3>
              <p
                className="text-sm font-semibold uppercase tracking-wider"
                style={{ color: "oklch(0.62 0.12 187)" }}
              >
                Co-Founder &amp; CEO
              </p>
              <div
                className="w-12 h-0.5 rounded-full mt-4"
                style={{ backgroundColor: "oklch(0.62 0.12 187)" }}
              />
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
          <div className="flex items-center justify-center gap-8 my-6">
            <img
              src="/assets/uploads/images_1-019d3768-98bc-736e-b862-7719d55676d0-2.jpg"
              alt="Westcliff University"
              className="w-20 h-20 rounded-full object-cover border-2 border-white/30 shadow-lg"
            />
            <img
              src="/assets/uploads/images_1-019d3768-98c6-770c-bb42-7390817e5e55-1.png"
              alt="UC Irvine"
              className="w-20 h-20 rounded-full object-cover border-2 border-white/30 shadow-lg"
            />
          </div>
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
                <img
                  src="/assets/uploads/images_1-019d3768-98bc-736e-b862-7719d55676d0-2.jpg"
                  alt="Westcliff University Logo"
                  className="w-16 h-16 rounded-full object-cover"
                />
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
                <img
                  src="/assets/uploads/images_1-019d3768-98c6-770c-bb42-7390817e5e55-1.png"
                  alt="UC Irvine Logo"
                  className="w-16 h-16 rounded-full object-cover"
                />
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
            className="text-center mb-8"
          >
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-3"
              style={{ color: "oklch(0.62 0.12 187)" }}
            >
              Real Success Stories
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy mb-3">
              Our Job Winners Share Their Experience
            </h2>
            <p
              className="text-2xl font-extrabold text-navy mb-1"
              style={{ color: "oklch(0.38 0.12 145)" }}
            >
              100+ Successful Placements Across the USA
            </p>
            <p className="text-sm text-muted-foreground">
              Including{" "}
              <span className="font-semibold text-navy">
                20 Westcliff University Students
              </span>
            </p>
          </motion.div>

          {/* Filter bar */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap justify-center gap-3 mb-10"
            data-ocid="testimonials.tab"
          >
            <button
              type="button"
              onClick={() => setActiveFilter("all")}
              data-ocid="testimonials.filter.tab"
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all border ${
                activeFilter === "all"
                  ? "text-white border-transparent shadow-md"
                  : "bg-white text-navy border-border hover:border-navy"
              }`}
              style={
                activeFilter === "all"
                  ? { backgroundColor: "oklch(0.22 0.055 218)" }
                  : {}
              }
            >
              All Placements (110)
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter("westcliff")}
              data-ocid="testimonials.filter.tab"
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all border ${
                activeFilter === "westcliff"
                  ? "text-white border-transparent shadow-md"
                  : "bg-white text-navy border-border hover:border-navy"
              }`}
              style={
                activeFilter === "westcliff"
                  ? {
                      backgroundColor: "oklch(0.75 0.15 85)",
                      color: "oklch(0.15 0.03 240)",
                    }
                  : {}
              }
            >
              🎓 Westcliff University (20)
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter("uci")}
              data-ocid="testimonials.filter.tab"
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all border ${
                activeFilter === "uci"
                  ? "text-white border-transparent shadow-md"
                  : "bg-white text-navy border-border hover:border-navy"
              }`}
              style={
                activeFilter === "uci"
                  ? {
                      backgroundColor: "oklch(0.45 0.18 240)",
                      color: "white",
                    }
                  : {}
              }
            >
              🎓 UC Irvine (10)
            </button>
          </motion.div>

          {/* Story cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
            {(activeFilter === "westcliff"
              ? CLIENT_STORIES.filter(
                  (s) => s.school === "Westcliff University",
                )
              : activeFilter === "uci"
                ? CLIENT_STORIES.filter((s) => s.school === "UC Irvine")
                : CLIENT_STORIES
            ).map((story, i) => (
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
              <a
                href="#visa-services"
                data-ocid="footer.visa-services.link"
                className="text-xs transition-opacity hover:opacity-75"
                style={{ color: "oklch(1 0 0 / 0.6)" }}
              >
                US Visa Services
              </a>
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
