import zobo from '../assets/work/zobo.JPG';
import firstLayer from '../assets/work/firstLayer.JPG';
import routly from '../assets/work/Routly.JPG';
import naira from '../assets/work/naira.JPG';
import tix from '../assets/work/tix.JPG';
import revolvAdd from '../assets/work/addFlow.jpg';
import revolvMain from '../assets/work/main.jpg';
import revolvCalendar from '../assets/work/calendar.jpg';

// Descriptions say what each product does, in plain words, using only things the
// products themselves show. Check each one is still accurate. Optional fields:
//   slug: opens the matching case study in data/caseStudies.js
//   kind: 'mobile' shows up to three phone frames from `screens`. The middle one is the
//         hero (largest, in front), so put the main screen second.
//   wide: true makes the card span the full row
//   href: leave out for projects with no live link (the card then opens the case study)
//   year: shown at the end of the tag row (hidden when empty)
export const projects = [
  {
    name: 'Buy Me Zobo',
    description:
      'Tipping pages for Nigerian creators. Free to set up, and fans don’t need an account to support.',
    tags: ['Fintech', 'Creators'],
    kind: 'profile',
    image: zobo,
    alt: 'Buy Me Zobo landing page: “Your creativity. Their kindness. A little zobo.”',
    href: 'https://buyymezobo.vercel.app/',
  },
  {
    name: 'First Layer',
    slug: 'first-layer',
    description:
      'Hosted authentication for developers: sign-up, sessions and API keys behind one SDK.',
    tags: ['Developer tools', 'Authentication'],
    kind: 'dashboard',
    image: firstLayer,
    alt: 'First Layer dashboard showing projects, app users and API keys',
    href: 'https://usefirstlayer.vercel.app/',
  },
  {
    name: 'Routly',
    description:
      'Plans multi-stop routes with trip times and fuel estimates before you leave. Built for last-mile delivery.',
    tags: ['Travel', 'Navigation'],
    kind: 'landing',
    image: routly,
    alt: 'Routly landing page: “More drops. Fewer detours.” with a route map',
    href: 'https://useroutly.vercel.app/',
  },
  {
    name: 'Naira Savvy',
    description:
      'Plain-language money guides, tools and news for Nigerians. No financial jargon.',
    tags: ['News', 'Finance'],
    kind: 'landing',
    image: naira,
    alt: 'Naira Savvy homepage: “More power to your naira.”',
    href: 'https://nairasavvy-mu.vercel.app/',
  },
  {
    name: 'Tix',
    description:
      'Event ticketing across Nigeria: find concerts, comedy, football and festivals, and get a ticket in a tap.',
    tags: ['Events', 'Tickets'],
    kind: 'landing',
    image: tix,
    alt: 'Tix landing page: “Every ticket. Every city. One tap away.”',
    href: 'https://tix-ten.vercel.app/',
  },
  {
    name: 'Revolv',
    slug: 'revolv',
    description:
      'Keeps every subscription in one place and shows when each one renews, so payments don’t catch you off guard.',
    tags: ['Personal finance', 'PWA'],
    kind: 'mobile',
    wide: true,
    href: 'https://userevolv.vercel.app/',
    // Order is the frame order: add flow, dashboard (centre), calendar.
    screens: [revolvAdd, revolvMain, revolvCalendar],
    alt: 'Revolv screens: adding a subscription, the dashboard with total monthly spend and renewal countdowns, and the calendar of scheduled payments',
  },
];
