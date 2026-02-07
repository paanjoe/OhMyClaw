/**
 * All user-facing copy in one place for easier editing and i18n later.
 * Positioning: same value as “deploy in under 1 min”, but distinct with
 * open source, security, and privacy-first.
 */

export const COPY = {
  site: {
    brand: "OhMyClaw",
    title: "OhMyClaw — Your OpenClaw instance in under a minute",
    description:
      "SaaS simplicity with open-source transparency. Deploy a 24/7 OpenClaw assistant in under a minute — secure, privacy-first, and fully auditable.",
    nav: {
      pricing: "Pricing",
      contactSupport: "Contact Support",
      signIn: "Sign in",
      signOut: "Sign out",
    },
    githubUrl: "https://github.com/paanjoe/OhMyClaw",
    openSource: "Open source",
  },

  hero: {
    title: "Your OpenClaw instance in",
    titleHighlight: "under a minute",
    subtitle:
      "Get a 24/7 AI assistant without the DevOps. Choose your model, connect your channel, deploy — then use it like any SaaS. The difference: our stack is open source, secure, and privacy-first so you stay in control.",
  },

  deploy: {
    signInWithGoogle: "Sign in with Google",
    signInHint: "Sign in to choose your model and channel, then deploy in one go.",
    signedInAs: "You're signed in as",
    modelQuestion: "Which model do you want as default?",
    channelQuestion:
      "Which channel do you want to use for sending messages?",
    comingSoon: "Coming soon",
    deployButton: "Deploy",
    deployOpenClaw: "Deploy OpenClaw",
    connectChannelToContinue: "Connect {channel} to continue.",
    addOtherChannelsLater: "You can add more channels to the same account anytime.",
    limitedServers: "Limited cloud capacity — {count} slots left",
  },
  connectTelegram: {
    title: "Connect Telegram",
    howToGetToken: "How do I get a bot token?",
    botFatherNote: "Telegram’s official (and free) way to create a bot is via @BotFather — no signup or payment.",
    step1: "Open Telegram and search for @BotFather.",
    step2: "Start a chat and send /newbot.",
    step3: "Follow the prompts to name your bot and pick a username.",
    step4: "BotFather will reply with your bot token. Copy the full token (a long string of numbers and letters).",
    step5: "Paste it below and click Save & Connect.",
    tokenPlaceholder: "1234567890:ABCdefGHIjKLMNOpqrsTUVwxyz",
    tokenLabel: "Bot token",
    saveAndConnect: "Save & Connect",
    saving: "Saving…",
    saveError: "Connection failed. Check the token and try again.",
  },

  deploymentFlow: {
    startingTitle: "Starting your deployment",
    startingHint: "Do not switch to other tabs. This only takes a few seconds.",
    connectYourTelegram: "Connect your Telegram",
    connectStep1: "Open your bot by clicking the link in the BotFather message (e.g. t.me/YourBot).",
    connectStep2: "Tap Start to send the first message to your bot.",
    connectStep3: "Click the button below once you've sent the message.",
    confirmButton: "I've sent the first message",
    confirming: "Confirming…",
    successTitle: "Deployment success!",
    successMessage: "Your bot is live. Open Telegram and chat with your assistant; usage and credits are below.",
    remainingCredits: "Remaining credits",
    usedToday: "Used today",
    usedThisMonth: "Used this month",
    planPerMonth: "Per month plan",
    purchaseCredit: "Purchase credit",
    oneTimePurchase: "One-time purchase. Processing fees may apply.",
    startNewDeployment: "Deploy another",
  },

  comparison: {
    heading: "DIY setup vs OhMyClaw",
    subheading:
      "Same outcome: a running OpenClaw assistant. One path takes half an hour; ours takes under a minute.",
    traditional: "DIY",
    totalMin: "Total — 30 min",
    ohmyclaw: "OhMyClaw",
    underOneMin: "<1 min",
    ohmyclawBlurb1:
      "Pick a model, connect Telegram, deploy. Your assistant is live in under a minute.",
    ohmyclawBlurb2:
      "We handle servers and the OpenClaw environment. You get a simple, secure connection to your bot — and because the code is open source, you can audit and self-host whenever you want.",
    steps: [
      { label: "Buy or rent a server / VM", min: 10 },
      { label: "Create and store SSH keys", min: 3 },
      { label: "SSH into the server", min: 3 },
      { label: "Install Node.js and npm", min: 5 },
      { label: "Install OpenClaw", min: 2 },
      { label: "Configure OpenClaw", min: 5 },
      { label: "Connect Telegram", min: 2 },
    ] as const,
  },

  useCases: {
    heading: "What can OpenClaw do for you?",
    subheading: "One assistant, many use cases",
    footnote:
      "Describe what you need in plain language; you can add and change use cases anytime.",
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
    builtBy: "Built with care by PaanJoe",
    contactSupport: "Contact Support",
    openSource: "Open source",
    privacyFirst: "Privacy-first",
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

  dashboard: {
    title: "Dashboard",
    welcome: "Your assistant is being set up.",
    backToHome: "← Back to home",
  },
} as const;
