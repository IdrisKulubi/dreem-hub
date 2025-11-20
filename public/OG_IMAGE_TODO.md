# Open Graph Image - TODO

## Current Status
A placeholder SVG image (`og-image.svg`) is currently being used for social media sharing.

## Action Required
Create a professional Open Graph image to replace the placeholder.

## Specifications

### Technical Requirements
- **Dimensions**: 1200 x 630 pixels (exact)
- **Format**: JPEG or PNG (JPEG recommended for smaller file size)
- **File size**: Under 1MB (ideally under 500KB)
- **Filename**: `og-image.jpg` or `og-image.png`
- **Location**: `/public/` folder

### Design Requirements

#### Must Include
1. **DREEM Hub Logo/Branding**
   - Prominent placement
   - Use brand colors

2. **Main Headline**
   - "Solarizing Agricultural Value Chains Across East Africa"
   - Or similar impactful tagline

3. **Country Representation**
   - Kenya 🇰🇪, Uganda 🇺🇬, Tanzania 🇹🇿
   - Can use flags or country outlines

4. **Visual Elements**
   - Solar panels
   - Agricultural imagery (crops, livestock, fish)
   - Entrepreneurs/farmers (if available)

#### Brand Colors
- **DREEM Orange**: #F7931E
- **KCIC Blue**: #00ADDD
- **KCIC Green**: #80C738

### Design Tools

#### Option 1: Canva (Recommended for non-designers)
1. Go to [Canva.com](https://canva.com)
2. Search for "Open Graph" or create custom 1200x630px design
3. Use DREEM Hub brand colors
4. Add text and imagery
5. Download as JPEG

#### Option 2: Figma (For designers)
1. Create 1200x630px frame
2. Design with brand guidelines
3. Export as JPEG or PNG

#### Option 3: Photoshop/GIMP
1. Create new document: 1200x630px, 72 DPI
2. Design with layers
3. Export optimized for web

### Content Suggestions

#### Text Options
- Primary: "DREEM Hub"
- Secondary: "Solarizing Agricultural Value Chains Across East Africa"
- Tertiary: "Kenya • Uganda • Tanzania"

#### Visual Composition
```
┌─────────────────────────────────────────┐
│                                         │
│         [DREEM Hub Logo/Text]           │
│                                         │
│   Solarizing Agricultural Value Chains  │
│         Across East Africa              │
│                                         │
│     [Solar/Agriculture Imagery]         │
│                                         │
│        🇰🇪    🇺🇬    🇹🇿                │
│                                         │
└─────────────────────────────────────────┘
```

### After Creating the Image

1. Save as `og-image.jpg` in `/public/` folder
2. Update `src/app/layout.tsx` if filename changed:
   ```tsx
   images: [
     {
       url: "/og-image.jpg",  // Update if using .png
       width: 1200,
       height: 630,
       alt: "DREEM Hub - Solarizing Agricultural Value Chains",
     },
   ],
   ```
3. Test the image:
   - [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
   - [Twitter Card Validator](https://cards-dev.twitter.com/validator)
   - [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)

### Testing Checklist
- [ ] Image displays correctly on Facebook
- [ ] Image displays correctly on Twitter
- [ ] Image displays correctly on LinkedIn
- [ ] Text is readable at small sizes
- [ ] Colors match brand guidelines
- [ ] File size is under 1MB
- [ ] Image looks good in both light and dark themes

### Resources
- [Open Graph Protocol](https://ogp.me/)
- [Social Media Image Sizes Guide](https://sproutsocial.com/insights/social-media-image-sizes-guide/)
- [Canva OG Image Templates](https://www.canva.com/templates/s/open-graph/)
