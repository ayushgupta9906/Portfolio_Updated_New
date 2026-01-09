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
        <section id="education" className="py-20 bg-background">
            <div className="container mx-auto px-4 md:px-6">
                <h2 className="text-3xl md:text-5xl font-bold font-heading mb-16 text-center">
                    Educational <span className="text-primary">Journey</span>
                </h2>

                <Timeline items={items} />
            </div>
        </section>
    );
}
