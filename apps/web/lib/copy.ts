/**
 * All user-facing copy in one place for easier editing and i18n later.
 */

export const COPY = {
  site: {
    brand: "OhMyClaw",
    title: "OhMyClaw — Deploy OpenClaw under 1 Minute",
    description:
      "Avoid all technical complexity and one click deploy your own 24/7 active OpenClaw instance under 1 minute.",
    nav: {
      pricing: "Pricing",
      contactSupport: "Contact Support",
    },
    githubUrl: "https://github.com/paanjoe/OhMyClaw",
  },

  hero: {
    title: "Deploy OpenClaw under",
    titleHighlight: "1 minute",
    subtitle:
      "Avoid all technical complexity and one-click deploy your own 24/7 active OpenClaw instance under 1 minute.",
  },

  deploy: {
    signInWithGoogle: "Sign in with Google",
    signInHint: "Sign in to deploy your AI assistant and connect your channels.",
    modelQuestion: "Which model do you want as default?",
    channelQuestion:
      "Which channel do you want to use for sending messages?",
    comingSoon: "Coming soon",
  },

  comparison: {
    heading: "Traditional Method vs OhMyClaw",
    subheading:
      "Same result. One path takes half an hour. The other takes under a minute.",
    traditional: "Traditional",
    totalMin: "Total — 30 min",
    ohmyclaw: "OhMyClaw",
    underOneMin: "<1 min",
    ohmyclawBlurb1:
      "Pick a model, connect Telegram, deploy — done under 1 minute.",
    ohmyclawBlurb2:
      "Servers, SSH and OpenClaw environment are already set up and waiting to get assigned. Simple, secure and fast connection to your bot.",
    steps: [
      { label: "Purchase local virtual machine", min: 10 },
      { label: "Creating SSH keys and storing securely", min: 3 },
      { label: "Connecting to the server via SSH", min: 3 },
      { label: "Installing Node.js and NPM", min: 5 },
      { label: "Installing OpenClaw", min: 2 },
      { label: "Setting up OpenClaw", min: 5 },
      { label: "Connecting to Telegram", min: 2 },
    ] as const,
  },

  useCases: {
    heading: "What can OpenClaw do for you?",
    subheading: "One assistant, thousands of use cases",
    footnote:
      "You can add as many use cases as you want via natural language.",
    items: [
      "Read & summarize email",
      "Draft replies and follow-ups",
      "Translate messages in real time",
      "Organize your inbox",
      "Answer support tickets",
      "Summarize long documents",
      "Notify before a meeting",
      "Schedule meetings from chat",
      "Remind you of deadlines",
      "Plan your week",
      "Take meeting notes",
      "Sync across time zones",
      "Do your taxes",
      "Track expenses and receipts",
      "Compare insurance quotes",
      "Manage subscriptions",
      "Run payroll calculations",
      "Negotiate refunds",
      "Find coupons",
      "Find best prices online",
      "Find discount codes",
      "Price-drop alerts",
      "Compare product specs",
      "Negotiate deals",
      "Write contracts and NDAs",
      "Research competitors",
      "Screen and prioritize leads",
      "Generate invoices",
      "Create presentations from bullet points",
      "Book travel and hotels",
      "Find recipes from ingredients",
      "Draft social posts",
      "Monitor news and alerts",
      "Set and track goals",
      "Screen cold outreach",
      "Draft job descriptions",
      "Run standup summaries",
      "Track OKRs and KPIs",
    ] as const,
  },

  footer: {
    builtBy: "Built with care by the OhMyClaw team",
    contactSupport: "Contact Support",
  },

  contact: {
    title: "Contact Support",
    description: "Need help? Reach out and we'll get back to you.",
    backToHome: "← Back to home",
  },

  pricing: {
    title: "Pricing",
    description: "Simple, transparent pricing to deploy your OpenClaw assistant.",
    comingSoon: "Plans and pricing are coming soon. Stay tuned.",
    backToHome: "← Back to home",
  },
} as const;
