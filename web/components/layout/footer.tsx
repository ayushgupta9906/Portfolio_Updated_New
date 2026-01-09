import { siteConfig } from "@/lib/data";

export function Footer() {
    return (
        <footer className="bg-secondary/30 border-t border-border py-12 mt-20">
            <div className="container mx-auto px-4 text-center">
                <div className="flex justify-center gap-6 mb-8">
                    {siteConfig.socials.map((social) => (
                        <a
                            key={social.name}
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 rounded-full bg-background hover:bg-primary hover:text-primary-foreground transition-all shadow-sm hover:shadow-md"
                            aria-label={social.name}
                        >
                            <social.icon className="w-5 h-5" />
                        </a>
                    ))}
                </div>
                <p className="text-muted-foreground">
                    &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
                </p>
            </div>
        </footer>
    );
}
