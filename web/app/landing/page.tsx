export default function LandingPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-neutral-900 via-black to-neutral-900 text-white flex items-center justify-center p-8">
            <div className="max-w-7xl w-full">
                <div className="text-center mb-16">
                    <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-cyan-400">
                        Ayush Gupta
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-400">
                        Software Engineer • Full-Stack Developer • Problem Solver
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                        Click anywhere to explore my portfolio
                    </p>
                </div>

                <a href="/portfolio" className="block">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { title: "BosDB", tech: "Next.js • PostgreSQL • Docker" },
                            { title: "LaserX Store", tech: "React • MongoDB • Stripe" },
                            { title: "SafeMaX Security", tech: "Next.js • AI • Python" },
                            { title: "India's Got Latent", tech: "React • Node.js • Socket.io" },
                            { title: "LaserX Acad", tech: "Next.js • TypeScript • MongoDB" },
                            { title: "Portfolio Website", tech: "Next.js • Three.js • Framer Motion" },
                        ].map((project, idx) => (
                            <div
                                key={idx}
                                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 hover:border-primary/50 transition-all cursor-pointer group"
                            >
                                <div className="h-32 bg-gradient-to-br from-primary/20 to-cyan-500/20 rounded-lg mb-4 flex items-center justify-center group-hover:scale-105 transition-transform">
                                    <div className="text-4xl font-bold text-white/20">{idx + 1}</div>
                                </div>
                                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                                    {project.title}
                                </h3>
                                <p className="text-sm text-gray-400">{project.tech}</p>
                            </div>
                        ))}
                    </div>
                </a>

                <div className="text-center mt-12">
                    <a
                        href="/portfolio"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-bold rounded-lg hover:bg-primary/90 transition-all hover:shadow-lg"
                    >
                        View Full Portfolio
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    );
}
