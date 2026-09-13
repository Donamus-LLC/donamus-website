export const companyTagline = "Good software empowers people";

export const bookingUrl = "https://calendly.com/donamus/30min";

export const consultations = [
  {
    number: "01",
    question: "What should we build first?",
    outcome: "A focused first version, the assumptions to test, and the decisions to make before development.",
    title: "Plan a new product",
    description:
      "Turn an early idea into a practical starting point. Explore who it’s for, what it needs to do, and what belongs in the first version.",
    topics: "Product scope and priorities · Prototypes and first versions · Build or buy decisions",
  },
  {
    number: "02",
    question: "Where will improvements make the biggest difference?",
    outcome: "A clearer set of priorities for improving the experience, reducing manual work, and keeping your software maintainable.",
    title: "Improve existing software",
    description:
      "Find a path forward when your software is getting in the way. Talk through the friction for your users, your team, and your business.",
    topics: "Usability and workflow reviews · Maintenance and modernization · Opportunities for automation",
  },
  {
    number: "03",
    question: "Which approach makes sense for us?",
    outcome: "An understanding of the tradeoffs, integration needs, and ongoing costs behind your technology choices.",
    title: "Choose the right technology",
    description:
      "Get a second perspective before a technical commitment. Compare approaches against your goals, constraints, and the cost of maintaining them.",
    topics: "Architecture and tool selection · Integrations between systems · Technical risks and tradeoffs",
  },
];

export type App = {
  name: string;
  description: string;
  status?: string;
  category: string;
  links: { label: string; url: string }[];
};

// Add verified product descriptions and official download destinations here.
export const apps: App[] = [
  {
    name: "Meet",
    description: "Have a meaningful meet one at a time",
    status: "Coming soon",
    category: "An app by Donamus",
    links: [],
  },
];
