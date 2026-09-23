import type { Project, ProjectTag } from "./types";

export const projectTags: ProjectTag[] = ["AI", "Cloud", "Full-stack", "Systems"];

export const projects: Project[] = [
  {
    slug: "hr-copilot",
    title: "AI HR Copilot",
    context: "Quadrant Technologies · Internship",
    year: "2026",
    summary:
      "An agentic HR assistant that screens résumés, routes tickets and tracks regulatory compliance, with a human approving every consequential action.",
    tags: ["AI", "Cloud", "Full-stack"],
    stack: ["Python", "FastAPI", "Next.js", "Azure Cosmos DB", "MCP", "OpenHands", "Terraform"],
    metrics: [
      { value: "1st of 9", label: "teams, selected for production rollout" },
      { value: "149", label: "tool capabilities" },
      { value: "11", label: "MCP integrations" },
      { value: "400+", label: "employees served" },
    ],
    problem:
      "Résumé screening, HR ticketing and regulatory compliance tracking needed automating for an organisation of 400+ employees, without letting an AI agent act on anything a person had not approved.",
    role: "I led backend engineering on a team of interns.",
    built: [
      "A Python FastAPI backend connected to a Next.js frontend and Azure Cosmos DB.",
      "A tool-calling architecture exposing 149 capabilities across 11 MCP integrations.",
      "Human-in-the-loop guardrails so the agent proposes and a person approves.",
      "Data flow and availability work using OpenHands, sized for 400+ employees.",
    ],
    hardPart:
      "Giving the agent 149 tools while keeping it safe and cheap: every consequential action waits for human approval, and monthly cloud cost had to stay under budget.",
    whyItMatters:
      "It placed 1st among 9 teams and was selected for live production rollout, so the design had to hold up for real employees rather than a demo.",
    evaluation:
      "Judged against 8 other intern teams and chosen for rollout, with monthly cloud overhead held under budget.",
    architecture: [
      { label: "Next.js app", detail: "Chat, intake and checklist views" },
      { label: "FastAPI", detail: "Agent orchestration and auth" },
      { label: "MCP tools", detail: "149 capabilities, 11 integrations" },
      { label: "Human approval", detail: "Nothing consequential runs unapproved" },
      { label: "Cosmos DB", detail: "Candidates, tickets, compliance state" },
    ],
    links: [{ label: "Source on GitHub", href: "https://github.com/IsheteDGr8/HR-Copilot" }],
    featured: true,
  },
  {
    slug: "permitpilot",
    title: "PermitPilot",
    context: "Team of 4",
    year: "2026",
    summary:
      "A compliance dashboard that checks a small-business permit application against 5 city agencies at once, cites the municipal law behind each rule and flags conflicts between agencies.",
    tags: ["AI", "Full-stack"],
    stack: ["React", "Tailwind CSS", "Node.js", "Express", "Supabase", "Claude Sonnet 4"],
    metrics: [
      { value: "14 wk → <30 s", label: "applicant research time" },
      { value: "5", label: "city agencies checked in parallel" },
    ],
    problem:
      "Opening a small business means satisfying zoning, health, fire, building and licensing departments separately, each with its own rules and no view of what the others require.",
    role: "One of 4 engineers.",
    built: [
      "A React and Tailwind intake flow and review dashboard.",
      "A Node and Express gateway that fans each application out to 5 agency agents in parallel.",
      "Conflict detection across agencies and a generated checklist citing municipal law.",
      "Supabase persistence for applications and results.",
    ],
    hardPart:
      "Agencies disagree. The system had to reason about each department independently, then find where their requirements collide before producing one checklist.",
    whyItMatters:
      "Applicant research that typically takes weeks becomes a single reviewable report with sources.",
    evaluation:
      "Measured on research time for an applicant: about 14 weeks by hand against under 30 seconds with PermitPilot.",
    architecture: [
      { label: "Intake form", detail: "Business details and location" },
      { label: "Orchestrator", detail: "Node and Express gateway" },
      { label: "5 agency agents", detail: "Zoning, health, fire, building, licensing" },
      { label: "Conflict detection", detail: "Cross-agency collisions" },
      { label: "Checklist", detail: "Cited, unified next steps" },
    ],
    links: [
      { label: "Live demo", href: "https://permit-pilot-liard.vercel.app/" },
      { label: "Source on GitHub", href: "https://github.com/IsheteDGr8/PermitPilot" },
    ],
    featured: true,
  },
  {
    slug: "taal-ai",
    title: "Taal AI",
    context: "Personal project",
    year: "2026",
    summary:
      "A model that listens to tabla audio and names the taal (rhythm cycle): Teentaal, Dadra or Bhajani. Trained on a dataset I built from 1,266 clips.",
    tags: ["AI", "Full-stack"],
    stack: ["TensorFlow", "Keras", "Librosa", "FastAPI", "Next.js", "Supabase"],
    metrics: [
      { value: "81.8%", label: "validation accuracy" },
      { value: "1,266", label: "labelled audio clips" },
      { value: "3", label: "taals classified" },
    ],
    problem:
      "Recognising a taal by ear takes years of training. I wanted a tool that could tell a student which cycle a recording is in.",
    role: "Solo: data, model, backend and frontend.",
    built: [
      "A Librosa pipeline that turns audio into Mel-spectrograms.",
      "A 4-layer CNN in TensorFlow and Keras.",
      "Browser-side smart slicing into 20-second chunks, with voting across chunks for the final answer.",
      "A FastAPI async inference backend and a Next.js frontend.",
      "Supabase logging of user corrections to feed future training.",
    ],
    hardPart:
      "A long recording can drift between sections. Classifying 20-second chunks independently and voting made the prediction stable without a larger model.",
    whyItMatters:
      "It turns something I have practised for 18 years into a system other learners can use, and every correction improves the dataset.",
    evaluation:
      "81.8% validation accuracy across 3 taals on a proprietary set of 1,266 clips. The dataset is not published.",
    architecture: [
      { label: "Browser", detail: "Slices audio into 20 s chunks" },
      { label: "FastAPI", detail: "Async inference per chunk" },
      { label: "Librosa", detail: "Mel-spectrogram features" },
      { label: "4-layer CNN", detail: "Per-chunk prediction, then a vote" },
      { label: "Supabase", detail: "User corrections for retraining" },
    ],
    links: [
      { label: "Live demo", href: "https://taal-ai-one.vercel.app" },
      { label: "Source on GitHub", href: "https://github.com/IsheteDGr8/TaalAI" },
    ],
    featured: true,
  },
  {
    slug: "cricky",
    title: "Cricky",
    context: "Cricket Club UWB · Lead developer",
    year: "2026",
    summary:
      "A mobile-first cricket scoring and tournament app for the university cricket club, syncing every ball across devices in real time.",
    tags: ["Full-stack", "Cloud"],
    stack: ["JavaScript", "Firebase", "NoSQL"],
    metrics: [
      { value: "3,600+", label: "ball-by-ball updates" },
      { value: "100+", label: "active users" },
      { value: "<1 s", label: "sync latency" },
    ],
    problem:
      "The club needed one place to score matches ball by ball, run tournaments and keep player statistics, visible live on everyone's phone.",
    role: "Lead developer.",
    built: [
      "A mobile-first web app for scorers and spectators.",
      "A Firebase NoSQL backend that syncs game state across devices with sub-second latency.",
      "Scoring logic for cricket rules: striker rotation, extras and wickets.",
      "Role-based access so only admins can enter match data.",
    ],
    hardPart:
      "Cricket's rules are full of edge cases. Striker rotation, extras and wickets all change state differently, and every device has to agree on the result.",
    whyItMatters: "Over 100 club members use it, and it has recorded more than 3,600 balls live.",
    evaluation: "3,600+ real-time updates from 100+ active users, synced in under a second.",
    architecture: [
      { label: "Scorer device", detail: "Admin-only entry, role checked" },
      { label: "Rules engine", detail: "Rotation, extras, wickets" },
      { label: "Firebase", detail: "Real-time NoSQL game state" },
      { label: "Spectators", detail: "Live on every device" },
    ],
    links: [],
    featured: true,
  },
  {
    slug: "road-sign-detection",
    title: "Road sign detection",
    context: "CSS 487 · Built with Manish",
    year: "2026",
    summary:
      "Detects US road signs in still images and dashcam video using colour masks and shape rules, in C++ with OpenCV 4 and nothing else.",
    tags: ["Systems"],
    stack: ["C++", "OpenCV 4", "CMake"],
    metrics: [
      { value: "5", label: "sign families detected" },
      { value: "Live", label: "on dashcam video" },
    ],
    problem:
      "Classic computer vision, without a neural network: find construction, guide, service, warning and regulatory signs from colour and geometry alone.",
    role: "Co-author with Manish.",
    built: [
      "Colour masks for orange, green, blue and yellow sign families.",
      "Shape rules for diamonds, rectangles and regulatory signs such as stop and speed limit.",
      "The same pipeline running live on dashcam video.",
    ],
    hardPart:
      "Colour thresholds that work in one frame fail in the next as light changes, so shape rules have to reject what the masks let through.",
    whyItMatters:
      "It shows how far careful classical vision gets before a learned model is needed, and it runs anywhere OpenCV does.",
    evaluation: "Run against a still-image set for each sign family and a dashcam clip.",
    architecture: [
      { label: "Frame", detail: "Still image or dashcam video" },
      { label: "Colour masks", detail: "Per sign family" },
      { label: "Shape rules", detail: "Diamonds, rectangles, octagons" },
      { label: "Detections", detail: "Drawn onto the frame" },
    ],
    links: [
      { label: "Source on GitHub", href: "https://github.com/IsheteDGr8/Road-Sign-Detection" },
    ],
    featured: false,
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
