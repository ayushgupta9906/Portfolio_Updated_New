"use client";

import { Timeline } from "@/components/ui/timeline";
import { experience } from "@/lib/data";

export function Experience() {
    const items = experience.map(exp => ({
        date: exp.period,
        title: exp.role,
        subtitle: exp.company,
        description: exp.description
    }));

    return (
        <section id="experience" className="py-20 bg-secondary/20">
            <div className="container mx-auto px-4 md:px-6">
                <h2 className="text-3xl md:text-5xl font-bold font-heading mb-16 text-center">
                    Professional <span className="text-primary">Experience</span>
                </h2>

                <Timeline items={items} />
            </div>
        </section>
    );
}
