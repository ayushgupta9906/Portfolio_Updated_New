"use client";

import { Timeline } from "@/components/ui/timeline";
import { education } from "@/lib/data";

export function Education() {
    const items = education.map(edu => ({
        date: edu.period,
        title: edu.degree,
        subtitle: edu.institution,
        description: edu.notes,
        status: edu.status
    }));

    return (
        <section id="education" className="py-16 md:py-24 bg-background relative overflow-hidden">
            <div className="container mx-auto px-4 md:px-6 max-w-5xl">
                <div className="text-center mb-10 sm:mb-16">
                    <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-primary/80">Background</span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading mt-1 text-white">
                        Educational <span className="text-primary">Journey</span>
                    </h2>
                </div>

                <Timeline items={items} />
            </div>
        </section>
    );
}
