// Case studies, keyed by the `slug` of a project in selectedWork.jsx.
// A project only gets a "Read case study" button if its slug appears here.
//
// DRAFT: every line below must be checked by you. Only keep what is true and
// current. No invented numbers, users or results. To add another case study,
// copy the block, change the key, and add `slug: '...'` to the project.
export const caseStudies = {
  'first-layer': {
    tagline: 'Hosted authentication for developers.',
    role: 'Solo: product, design and engineering',
    stack: ['SvelteKit', 'Fastify', 'Supabase', 'npm SDK'],
    links: [{ label: 'Live product', href: 'https://usefirstlayer.vercel.app/' }],
    sections: [
      {
        heading: 'The problem',
        body: [
          'Every app needs sign-up, login and sessions, and every team ends up building them again. It is repetitive, security-sensitive work that gets in the way of the product they actually want to make.',
        ],
      },
      {
        heading: 'What I built',
        list: [
          'A hosted authentication API that an app talks to with a single API key.',
          'A dashboard to manage projects, users and API keys, including bulk user management.',
          'An npm SDK (@firstlayer/sdk): create a client with nothing but an API key.',
          'A marketing site with pricing, a changelog and docs.',
        ],
      },
      {
        heading: 'Decisions that mattered',
        list: [
          'Opaque session tokens instead of JWTs. A token is just a lookup in a sessions table, so a session can be revoked instantly. A signed JWT is hard to take back before it expires.',
          'A Stripe-style SDK. The base URL is built in and the only thing a developer supplies is an API key, so setup is a couple of lines.',
          'Project-scoped dashboard routes (/dashboard/[project]). Every user, key and setting belongs to one project, and the URL always says which.',
          'Built for people who live in their tools: a ⌘K command palette and toast feedback on every action.',
        ],
      },
      {
        heading: 'Stack',
        body: [
          'SvelteKit for the dashboard, Fastify for the API and Supabase for the database. The dashboard is deployed on Vercel and the API on pxxl.app.',
        ],
      },
      {
        heading: 'What I learned',
        list: [
          'Linux hosts are case-sensitive. A file whose name differed only by letter case worked on my machine and broke the production build, so I now check file naming before every deploy.',
          'Fix bugs by category, not one at a time. A full audit of the dashboard found seven kinds of bug (table-name casing and a dark mode that never switched on, among them), and I fixed each kind everywhere at once.',
        ],
      },
    ],
  },

  // DRAFT, written from your Revolv case study. Still to check before you publish:
  //  - Reminders and spending insights are written as planned, not built. Only
  //    move them into "What I built" once you have confirmed they work.
  //  - The 100+ waitlist and 7+ testers are labelled as interest and testing,
  //    not adoption. Keep it that way.
  revolv: {
    tagline: 'A subscription manager that shows what renews next, so payments stop catching you off guard.',
    role: 'Solo: product, design and engineering',
    status: 'Working PWA, in early testing',
    stack: ['SvelteKit', 'Supabase', 'PWA', 'Figma'],
    links: [{ label: 'Live PWA', href: 'https://userevolv.vercel.app/' }],
    sections: [
      {
        heading: 'The problem',
        body: [
          'Money kept leaving my account at times I didn’t expect, because I had lost track of when my subscriptions renewed. Then I saw someone online whose Spotify had charged them without warning. I shared my idea for an app that helps people see recurring payments coming, and the replies suggested I wasn’t the only one.',
          'I first built it for myself. The people who responded were mostly young adults and working professionals juggling several subscriptions across different services.',
        ],
      },
      {
        heading: 'Early signals',
        body: [
          'Before going deeper into development I opened a waitlist to gauge interest, and more than 100 people signed up. What they raised most was unexpected deductions and forgotten renewal dates, followed by having too many subscriptions to track and not knowing the total they were spending.',
          'That is interest, not proof. The waitlist and the replies were not a usability study, and they don’t show product-market fit. They did tell me what to build first: visibility into upcoming payments, and one place to manage every subscription.',
        ],
      },
      {
        heading: 'What I built',
        list: [
          'Onboarding that ends on a clear empty state, with a single prompt to add a first subscription.',
          'A dashboard with a total monthly spend and a renewal countdown on every subscription. Annual plans are spread across twelve months in that total.',
          'Adding subscriptions by hand: a name, an amount, the first billing date and a billing cycle, with a free-trial toggle and a preview of the next renewal date. They can be edited and deleted afterwards.',
          'A calendar that marks each payment day with the service’s icon and totals what is scheduled this month and what is still to come, so due dates can be seen on a date instead of remembered.',
        ],
      },
      {
        heading: 'Decisions that mattered',
        list: [
          'Manual entry first. Asking for CSV exports or other documents means asking for personal financial data before a user has any reason to trust the app, so for now they enter the details themselves. Receipt-based entry is something I may explore later.',
          'Two ways to read the same money. The dashboard total is a monthly figure, so an annual charge like Snapchat or Yazio counts as one twelfth of its price. The calendar shows what actually falls due on each date. One answers what I am committed to, the other what leaves my account and when.',
          'An empty state with one next step, instead of empty charts that mean nothing until there is data.',
          'Purple, not blue. I started with blue because it signals trust, but it is everywhere among Nigerian fintech brands. I tried several shades and settled on purple: calm, still right for money, and recognisably its own.',
          'A more contemporary look than the subscription trackers I reviewed, which felt dated to me. I collected references into a mood board and went straight into high-fidelity design in Figma.',
        ],
      },
      {
        heading: 'From React Native to a PWA',
        body: [
          'Revolv started as a React Native app on Supabase. Partway through I rebuilt it as a Progressive Web App in SvelteKit and kept Supabase for the backend. Getting a native app onto iOS isn’t something I can afford right now, and a PWA is lighter, so I can keep testing and shipping updates on a working version while the longer-term platform stays open.',
        ],
      },
      {
        heading: 'Where it stands and what’s next',
        body: [
          'More than seven people are testing the PWA and helping me find bugs. The focus now is fixing those and refining what is already there.',
        ],
        list: [
          'Renewal reminders and spending insights are part of the original vision and are planned.',
          'Easier ways to add subscriptions, including receipt-based entry.',
          'A proper type system. Revolv uses a default sans-serif today, with no formal type scale yet.',
        ],
      },
      {
        heading: 'What I learned',
        list: [
          'A product isn’t finished when its main screens are built. Testing, refinement and clearer design foundations are part of the work.',
          'Designing screens was a small part of it. The harder calls were which problem to solve, what to leave out of the first version, and how to change the implementation as the project evolved.',
        ],
      },
    ],
  },
};