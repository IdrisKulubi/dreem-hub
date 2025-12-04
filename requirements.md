DREEM Hub Website - Requirements & Design Guide
Project Overview
A comprehensive website for the Distributed Renewable Energy Ecosystem Model (DREEM) Hub, showcasing the multi-country initiative (Kenya, Uganda, Tanzania) focused on scaling solar energy adoption in agricultural value chains across East Africa.

1. FUNCTIONAL REQUIREMENTS
1.1 Homepage
Purpose: Create an engaging entry point that communicates the DREEM Hub vision and impact
Components:

Hero Section

Compelling headline about solarizing agricultural value chains
Sub-headline emphasizing youth/women entrepreneurship and climate action
Call-to-action buttons: "Learn More" and "View Impact"
Background: High-quality imagery of solar installations in agricultural settings
Statistics ticker: Jobs created, GHG emissions reduced, entrepreneurs trained


Program Overview Cards

Three country cards (Kenya, Uganda, Tanzania) with:

Country flag/icon
Primary value chain focus
Key milestone number
"Learn More" link to detailed page


Hover effects showing additional quick stats


Impact Counter Section

Animated counters for:

Total entrepreneurs supported (target: 1,000+)
Jobs created (target: 2,800+)
GHG emissions mitigated (300,000 tonnes target)
Solar adoption increase percentage
Funding mobilized (USD amounts)




Latest News/Updates Feed

3-4 most recent updates
Date, thumbnail, headline, excerpt
Link to full Knowledge Hub



1.2 About Section
Purpose: Tell the DREEM Hub story, history, and vision
Sub-sections:
1.2.1 History & Context

PUSE Background

Definition of Productive Use of Solar Energy
Why PUSE matters for rural development
Economic and environmental rationale
Connection to SDGs


DREEM Framework Evolution

DREEM 3.0 framework explanation
Hub-and-spoke model visualization
Why bounded productive systems (value chains) approach works


Mott Foundation Partnership

Vision alignment with Mott Foundation
Grant details and support structure
Long-term sustainability goals



1.2.2 Country Programs
Kenya DREEM Hub

Launch date: June 2024
Lead organization: Kenya Climate Innovation Center (KCIC)
Grant amount: $750,000
Geographic focus: Kitui, Makueni, Laikipia, Isiolo counties
Value chains: Dairy and Horticulture
Key achievements:

8 spoke partners engaged
23 cooperatives/groups onboarded from 174 applicants
$460,000 concessional loan facility activated
Agrisolar demonstration farms partnership (REREC, CLASP)


Targets:

1,000 youth & women agrisolar entrepreneurs
2,800 jobs (direct/indirect)
30% income increase for farmers
300,000 tonnes GHG mitigation
4 operational demonstration farms



Uganda DREEM Hub

Lead organization: [To be specified]
Value chain focus: [From available data]
Key milestones and achievements
Target outcomes

Tanzania DREEM Hub

Lead organization: WWF Tanzania
Geographic focus: Mafia Island
Value chain: Dagaa (sardine fisheries)
Key innovations:

Solar lanterns replacing petrol generators for fishing
Community solar processing facility
Solar dryer capacity: 4+ tonnes
Post-harvest loss reduction (current: 45%)
Mangrove forest protection
Women and youth empowerment focus


Key challenges addressed:

Traditional processing methods
High post-harvest losses
GHG emissions (284.38 kg CO2eq per ton)
Poor processing hygiene
Limited business/financial skills







1.4 Knowledge Hub
Purpose: Central repository for research, data, reports, and learning resources
Components:
1.4.1 Resource Library

Reports & Publications

Annual reports
Impact assessments
Case studies
Research papers
Technical briefs
Policy briefs


Data & Analytics

Interactive dashboards showing:

Solar adoption rates by region
Economic impact metrics
GHG emissions reduction
Gender disaggregated data
Value chain performance indicators


Downloadable datasets (CSV/Excel)
Data visualization tools


Knowledge Products

Best practice guides
Technology briefs (solar equipment guides)
Training materials
Toolkits for entrepreneurs
Video tutorials
Webinar recordings



1.4.2 Blog/News Section

Success stories
Partner spotlights
Event announcements
Technical updates
Policy developments

1.4.3 Search & Filter System

By document type
By country
By value chain
By date
By topic/keyword
Full-text search

1.4.4 Interactive Elements

Embedded dashboards (consider Tableau/Power BI integration)
Infographics
Photo essays
Video content
Podcast episodes (if applicable)

1.5 Gallery
Purpose: Visual storytelling of DREEM Hub impact
Sections:
1.5.1 Photo Gallery

Categories:

Solar installations
Farmer cooperatives
Training sessions
Demonstration farms
Before/After transformations
Country-specific galleries
Value chain activities


Features:

Lightbox viewing
Captions with context
Location tags
Date stamps
Downloadable high-res images (with permissions)
Social media sharing buttons



1.5.2 Video Gallery

Documentary-style videos
Testimonials from beneficiaries
Technology demonstrations
Event coverage
Partner interviews
Time-lapse installations

1.5.3 Technology Showcase

Current methods vs. proposed technology comparisons
Tanzania examples:

Traditional boiling vs. solar alternatives
Open-air drying vs. solar dryers
Petrol generators vs. solar lanterns


Equipment specifications
Cost-benefit analyses
Environmental impact comparisons

1.5.4 Impact Stories

Photo essays with narrative
Entrepreneur profiles
Community transformation stories
Gender impact stories

1.6 Additional Pages
1.6.1 Contact Page

Country-specific contact forms
Office addresses and maps
General inquiries form
Partnership inquiries
Media contact
Social media links

1.6.2 Partners Page

Spoke partners by category
Funding partners (Mott Foundation prominent)
Government partners
Technology providers
Financial institutions
Research partners
Partner logos with links
Partnership opportunities section

1.6.3 Get Involved

For entrepreneurs (application information)
For investors
For technology providers
For researchers
For policymakers
Volunteer opportunities


2. TECHNICAL REQUIREMENTS
2.1 Platform & Technology Stack
Recommended: Modern web framework
Options:

Next.js (React-based, optimal for SEO and performance)
WordPress with custom theme (easier content management for non-technical team)
Webflow (no-code option with professional design capabilities)

Core Technologies:

Responsive HTML5/CSS3
JavaScript (ES6+)
Mobile-first approach
Progressive Web App capabilities (optional)

2.2 Content Management

CMS Requirements:

Easy content updates by non-technical staff
Multi-user access with role-based permissions
Media library management
Version control
Scheduled publishing
Multilingual support capability (English primary, future expansion)



2.3 Performance Requirements

Page load time: < 3 seconds
Lighthouse score: 90+ across all metrics
Optimized images (WebP format, lazy loading)
Minified CSS/JS
CDN integration for global reach
Caching strategy

2.4 SEO Requirements

Semantic HTML structure
Meta tags optimization
Open Graph tags for social sharing
XML sitemap
Schema.org markup for organizations, events, articles
Google Analytics integration
Search Console setup

2.5 Accessibility (WCAG 2.1 AA Compliance)

Keyboard navigation
Screen reader compatibility
Alt text for all images
Proper heading hierarchy
Color contrast compliance
Focus indicators
ARIA labels where needed

2.6 Security

HTTPS/SSL certificate
Regular security updates
Form spam protection (reCAPTCHA)
Secure file uploads
Data privacy compliance (GDPR considerations)
Regular backups

2.7 Hosting & Domain

Reliable hosting provider (consider AWS, DigitalOcean, or specialized providers)
Domain: dreemhub.org or similar
Email hosting for contact forms
Bandwidth for media-rich content

2.8 Integrations

Analytics:

Google Analytics 4
Custom event tracking
Conversion tracking


Data Visualization:

Dashboard embedding (Tableau Public, Power BI, or custom D3.js)
Interactive charts (Chart.js or similar)


Social Media:

Social sharing buttons
Social feed embedding (optional)


Email Marketing:

Newsletter signup integration (Mailchimp, SendGrid, etc.)


Forms:

Contact form backend
Application form system (if needed)



2.9 Browser Compatibility

Chrome (last 2 versions)
Firefox (last 2 versions)
Safari (last 2 versions)
Edge (last 2 versions)
Mobile browsers (iOS Safari, Chrome Mobile)

2.10 Responsive Breakpoints

Mobile: 320px - 767px
Tablet: 768px - 1023px
Desktop: 1024px - 1439px
Large Desktop: 1440px+


3. DESIGN GUIDE
3.1 Brand Identity
Primary Brand: KCIC

Blue: #00ADDD
Green: #80C738
Gray: #8B8D90

Secondary Brand: DREEM Hub

Orange: #F7931E

3.2 Color System
Primary Palette:
DREEM Orange (Primary CTA): #F7931E
├─ Light variant: #FDBA5E
└─ Dark variant: #C77205

KCIC Blue (Secondary): #00ADDD
├─ Light variant: #33C4E8
└─ Dark variant: #0096C4

KCIC Green (Accent): #80C738
├─ Light variant: #9FDB5C
└─ Dark variant: #6BAF1F
Neutral Palette:
Gray Primary: #8B8D90
├─ Light Gray: #E5E5E6
├─ Medium Gray: #C4C5C7
└─ Dark Gray: #5A5C5E

White: #FFFFFF
Off-White: #F8F9FA
Black: #1A1A1A
Semantic Colors:
Success: #80C738 (KCIC Green)
Warning: #FFA726
Error: #EF5350
Info: #00ADDD (KCIC Blue)
3.3 Typography
Primary Font Stack:
cssfont-family: 'Inter', 'Helvetica Neue', Arial, sans-serif;
Rationale: Inter is modern, highly readable, and excellent for UI/web. Free and open-source.
Alternative (if brand specific):
cssfont-family: 'Poppins', 'Segoe UI', Tahoma, sans-serif;
```

**Type Scale:**
```
H1: 48px / 56px (Desktop), 32px / 40px (Mobile)
H2: 40px / 48px (Desktop), 28px / 36px (Mobile)
H3: 32px / 40px (Desktop), 24px / 32px (Mobile)
H4: 24px / 32px (Desktop), 20px / 28px (Mobile)
H5: 20px / 28px
H6: 18px / 26px

Body Large: 18px / 28px
Body Regular: 16px / 26px
Body Small: 14px / 22px
Caption: 12px / 18px
```

**Font Weights:**
- Regular: 400
- Medium: 500
- Semi-Bold: 600
- Bold: 700

### 3.4 Spacing System
**Based on 8px grid:**
```
XS: 4px
SM: 8px
MD: 16px
LG: 24px
XL: 32px
2XL: 48px
3XL: 64px
4XL: 96px
3.5 Component Styles
Buttons:
/* Primary Button (DREEM Orange) */
.btn-primary {
  background: #F7931E;
  color: #FFFFFF;
  padding: 12px 32px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 16px;
  transition: all 0.3s ease;
}
.btn-primary:hover {
  background: #C77205;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(247, 147, 30, 0.3);
}

/* Secondary Button (KCIC Blue) */
.btn-secondary {
  background: transparent;
  color: #00ADDD;
  border: 2px solid #00ADDD;
  padding: 12px 32px;
  border-radius: 8px;
  font-weight: 600;
}
.btn-secondary:hover {
  background: #00ADDD;
  color: #FFFFFF;
}

/* Tertiary Button (Outline) */
.btn-tertiary {
  background: transparent;
  color: #8B8D90;
  border: 2px solid #C4C5C7;
  padding: 12px 32px;
  border-radius: 8px;
}
Cards:
css.card {
  background: #FFFFFF;
  border-radius: 12px;
  padding: 32px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}
.card:hover {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  transform: translateY(-4px);
}

/* Country Card Variants */
.card-kenya {
  border-top: 4px solid #F7931E;
}
.card-uganda {
  border-top: 4px solid #00ADDD;
}
.card-tanzania {
  border-top: 4px solid #80C738;
}
Forms:
css.form-input {
  border: 2px solid #C4C5C7;
  border-radius: 8px;
  padding: 12px 16px;
  font-size: 16px;
  transition: border-color 0.3s;
}
.form-input:focus {
  border-color: #00ADDD;
  outline: none;
  box-shadow: 0 0 0 3px rgba(0, 173, 221, 0.1);
}
3.6 Layout Patterns
Container:
css.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 24px;
}
Grid System:
css.grid {
  display: grid;
  gap: 24px;
}
.grid-2 { grid-template-columns: repeat(2, 1fr); }
.grid-3 { grid-template-columns: repeat(3, 1fr); }
.grid-4 { grid-template-columns: repeat(4, 1fr); }

@media (max-width: 768px) {
  .grid-2, .grid-3, .grid-4 {
    grid-template-columns: 1fr;
  }
}
3.7 Navigation Design
Primary Navigation:

Sticky header on scroll
Background: White with subtle shadow
Logo: DREEM Hub (with KCIC co-branding)
Menu items: About | Team | Knowledge Hub | Gallery | Partners | Contact
Mobile: Hamburger menu with slide-out drawer
CTA button: "Get Involved" (Orange)

Footer:

Dark background (#1A1A1A)
Three columns: About, Quick Links, Contact
Partner logos
Social media icons
Copyright and legal links

3.8 Imagery Guidelines
Photography Style:

Authentic, documentary-style photos
Focus on people (farmers, entrepreneurs, communities)
Show solar technology in action
Diverse representation (gender, age, geography)
Natural lighting preferred
Avoid overly staged shots

Image Specifications:

Hero images: 1920x1080px minimum
Card thumbnails: 800x600px
Team photos: 400x400px (square)
Gallery images: 1200x800px minimum
Optimization: WebP format, max 200KB per image

Iconography:

Line-style icons
24px standard size
Match brand colors
Consider: Feather Icons or Heroicons

3.9 Animation & Interactions
Micro-interactions:

Smooth transitions (0.3s ease)
Hover states on all clickable elements
Loading indicators for data fetching
Scroll-triggered animations (fade-in, slide-up)
Progress bars for forms

Page Transitions:

Fade between pages
Smooth scrolling for anchor links
Skeleton screens for loading content

3.10 Country-Specific Design Elements
Color Coding:

Kenya: DREEM Orange (#F7931E) accent
Uganda: KCIC Blue (#00ADDD) accent
Tanzania: KCIC Green (#80C738) accent

Visual Differentiation:

Subtle patterns or textures per country
Flag integration in headers
Country-specific imagery in backgrounds

3.11 Accessibility Considerations
Color Contrast:

All text on background: minimum 4.5:1 ratio
Large text (18px+): minimum 3:1 ratio
Interactive elements clearly distinguished

Focus States:
css*:focus {
  outline: 3px solid #00ADDD;
  outline-offset: 2px;
}
```

**Interactive Targets:**
- Minimum 44x44px touch targets
- Adequate spacing between clickable elements

### 3.12 Dashboard Design (Knowledge Hub)

**Data Visualization Palette:**
```
Chart Primary: #F7931E (Orange)
Chart Secondary: #00ADDD (Blue)
Chart Tertiary: #80C738 (Green)
Chart Quaternary: #FFA726 (Yellow)
Chart Quinary: #AB47BC (Purple)
Dashboard Components:

Clean, minimal styling
Card-based layout
Clear labels and legends
Tooltips on hover
Export functionality
Responsive tables


4. CONTENT REQUIREMENTS
4.1 Copy Guidelines

Tone: Professional, optimistic, action-oriented
Voice: Authoritative but accessible
Language: Clear, jargon-free (or explained)
Length:

Homepage hero: 20-30 words
Section descriptions: 100-150 words
Blog posts: 600-1000 words
Case studies: 800-1200 words



4.2 SEO Keywords (Primary)

Productive use of solar energy
Agricultural solar solutions East Africa
Solar-powered farming Kenya/Uganda/Tanzania
Climate innovation agriculture
Renewable energy value chains
Agrisolar entrepreneurship
DREEM Hub
PUSE technology

4.3 Required Content Items

 About DREEM Hub (500 words)
 PUSE explanation (300 words)
 Country program descriptions (400 words each)
 3 PM quotes with bios
 Team member profiles (20-30 expected)
 At least 10 case studies/success stories
 5-10 technical briefs
 50+ high-quality images
 10+ videos
 Interactive dashboard data sources


5. PROJECT PHASES
Phase 1: Foundation (Weeks 1-2)

 Finalize requirements
 Create detailed sitemap
 Develop wireframes for key pages
 Set up development environment
 Domain and hosting setup

Phase 2: Design (Weeks 3-4)

 Homepage design mockup
 Inner page templates
 Mobile responsive designs
 Component library creation
 Client review and approval

Phase 3: Development (Weeks 5-8)

 Frontend development
 CMS integration
 Responsive implementation
 Interactive elements
 Dashboard integration
 Form functionality

Phase 4: Content Population (Weeks 7-9)

 Content migration
 Image optimization and upload
 Team profiles
 Knowledge Hub resources
 Gallery population

Phase 5: Testing & QA (Week 10)

 Cross-browser testing
 Mobile device testing
 Accessibility audit
 Performance optimization
 SEO audit
 Security review

Phase 6: Launch (Week 11)

 Final client review
 Deployment to production
 DNS configuration
 Analytics setup
 Submit to search engines
 Launch announcement

Phase 7: Post-Launch (Week 12)

 Monitor performance
 Fix any issues
 Training for content managers
 Documentation delivery
 30-day support


6. DELIVERABLES
6.1 Design Deliverables

 Design system documentation
 High-fidelity mockups (all key pages)
 Component library (Figma/Sketch)
 Brand guidelines document
 Icon set
 Image templates

6.2 Development Deliverables

 Fully functional website
 CMS with documentation
 Responsive across all devices
 Source code repository
 Deployment documentation
 Admin training materials

6.3 Documentation

 Technical documentation
 Content management guide
 SEO guidelines
 Maintenance procedures
 Backup procedures
 Troubleshooting guide


7. SUCCESS METRICS
7.1 Launch Targets

Page load speed: < 3 seconds
Lighthouse score: 90+
Mobile usability: 100%
Accessibility score: AA compliant
Zero critical bugs