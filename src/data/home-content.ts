export const homeContent = {
    impactMetrics: [
        { value: "2,800", label: "Jobs Created", suffix: "+" },
        { value: "300,000", label: "Tonnes GHG Mitigated", suffix: "" },
        { value: "1,000", label: "Entrepreneurs Trained", suffix: "+" },
        { value: "60", label: "Solar Adoption Increase", suffix: "%" },
    ],
    theModel: {
        title: "The DREEM 3.0 Framework",
        subtitle: "A Hub-and-Spoke Model for Scalable Impact",
        description: "The DREEM Hub operates on a 'Hub-and-Spoke' model where a central coordination unit (The Hub) works with specialized partners (Spokes) to provide services across agricultural value chains. This ecosystem approach ensures that technology, finance, and skills development are delivered effectively to last-mile communities.",
        features: [
            {
                title: "The Hub",
                description: "Central coordination unit (KCIC/WWF) managing strategy, partnerships, and funding."
            },
            {
                title: "The Spokes",
                description: "Specialized partners providing finance, technology, and training services."
            },
            {
                title: "The Value Chains",
                description: "Bounded productive systems (Dairy, Horticulture, Fisheries) where impact is maximized."
            }
        ]
    },
    regions: [
        {
            id: "kenya",
            name: "Kenya",
            flag: "\u{1F1F0}\u{1F1EA}",
            organization: "KCIC",
            focus: "Horticulture & Dairy",
            about: "Launched in June 2024, the DREEM Hub Kenya is a flagship initiative by the Kenya Climate Innovation Center (KCIC). It focuses on reducing GHG emissions and transforming livelihoods in Kitui, Makueni, Isiolo, and Laikipia counties.",
            milestones: [
                "Partnerships established with 8 specialized spoke partners.",
                "Onboarded 23 dairy and horticulture farmer cooperatives.",
                "Mobilized USD 460,000 concessional loan facility.",
                "Established agrisolar demonstration farms in Kitui county."
            ],
            challenges: [
                { title: "Low technical capacity", solution: "Tailored training programs for 1,000+ entrepreneurs." },
                { title: "Financing barriers", solution: "Concessional loans and blended finance models." },
                { title: "Market awareness gaps", solution: "Demonstration farms and partner-led outreach." }
            ]
        },
        {
            id: "tanzania",
            name: "Tanzania",
            flag: "\u{1F1F9}\u{1F1FF}",
            organization: "WWF Tanzania",
            focus: "Fisheries (Dagaa) & Agriculture",
            about: "Coordinated by WWF Tanzania, the DREEM Hub Tanzania envisions a sustainable ecosystem for Productive Use of Solar Energy (PUSE). It initially focuses on the Mafia Island Dagaa value chain, replacing petrol generators with solar solutions.",
            milestones: [
                "Establishment of the 'DREEM Hub' to catalyse solar adoption.",
                "Catalysing use of solar dryers and lighting in Mafia Island.",
                "Developing capacity of entrepreneurs and aggregators.",
                "Scaling lessons from Dagaa pilot to other value chains."
            ],
            challenges: [
                { title: "Deforestation", solution: "Replacing wood-fuel drying with solar dryers." },
                { title: "Post-harvest losses (45%)", solution: "Efficient solar drying and cooling technologies." },
                { title: "GHG Emissions", solution: "Solar lanterns replacing petrol gensets for night fishing." }
            ]
        },
        {
            id: "uganda",
            name: "Uganda",
            flag: "\u{1F1FA}\u{1F1EC}",
            organization: "DREEM Hub Uganda",
            focus: "Fisheries & Agriculture",
            about: "Focusing on the fisheries value chain, DREEM Hub Uganda aims to modernize the sector through solar adoption, reducing post-harvest losses and improving livelihoods for fishing communities.",
            milestones: [
                "Mobilizing stakeholders in the fisheries sector.",
                "Identifying key barriers to solar adoption in aquaculture.",
                "Piloting solar cooling solutions for fish preservation."
            ],
            challenges: [
                { title: "Limited cold chain", solution: "Solar-powered ice making and cold storage." },
                { title: "High energy costs", solution: "Solar PV systems for processing facilities." },
                { title: "Access to finance", solution: "Linkages to green financing institutions." }
            ]
        }
    ],
    valueChains: [
        {
            id: "dairy",
            title: "Dairy",
            icon: "Milk",
            description: "Solarizing milk cooling and processing to reduce spoilage and increase income.",
            technologies: [
                "Solar-powered milking machines",
                "Refrigerated storage tanks",
                "Milk cooling systems",
                "Pasteurization equipment"
            ]
        },
        {
            id: "horticulture",
            title: "Horticulture",
            icon: "Sprout",
            description: "Empowering farmers with solar irrigation and cold storage for fruits and vegetables.",
            technologies: [
                "Solar irrigation systems",
                "Cold storage facilities",
                "Solar dryers (tunnel, cabinet)",
                "Solar-powered processing"
            ]
        },
        {
            id: "fisheries",
            title: "Fisheries",
            icon: "Fish",
            description: "Transforming the blue economy with solar fishing lights and drying technologies.",
            technologies: [
                "Solar lanterns for night fishing",
                "Solar-powered ice makers",
                "Fish drying equipment",
                "Electric outboard motors"
            ]
        }
    ],
    partners: [
        { name: "Mott Foundation", role: "Funder" },
        { name: "KCIC", role: "Hub Host (Kenya)" },
        { name: "WWF", role: "Hub Host (Tanzania)" },
        { name: "IKEA", role: "Strategic Partner" }
    ]
}
