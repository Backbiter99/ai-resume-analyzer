import Navbar from "~/components/Navbar";
import type { Route } from "./+types/home";
import ResumeCard from "~/components/ResumeCard";
import { useEffect, useState } from "react";

export function meta(_: Route.MetaArgs) {
    return [
        { title: "ResumeReject" },
        {
            name: "description",
            content: "AI Powered Resume Analysis and Review",
        },
    ];
}

export default function Home() {
    const [resumes, setResumes] = useState<Resume[]>([]);
    const [id, setId] = useState<number>(1);

    const handleSetResumes = async () => {
        if (resumes.length >= 5) return;
        setResumes([
            ...resumes,
            {
                id: id.toString(),
                companyName: "Google",
                jobTitle: "Frontend Developer",
                imagePath: "/images/resume_01.png",
                resumePath: "/resumes/resume-1.pdf",
                feedback: {
                    overallScore: 85,
                    ATS: { score: 90, tips: [] },
                    toneAndStyle: { score: 90, tips: [] },
                    content: { score: 90, tips: [] },
                    structure: { score: 90, tips: [] },
                    skills: { score: 90, tips: [] },
                },
            },
        ]);
        setId(id + 1);
    };

    useEffect(() => {
        handleSetResumes();
    });

    return (
        <main className="bg-[url('/images/bg-main.svg')] bg-cover">
            <Navbar />

            <section className="main-section">
                <div className="page-heading">
                    <h1>The Place Where CVs Meet Their Match</h1>
                    <h2>
                        Get your resume grilled by AI and see why it goes
                        straight to the void.
                    </h2>
                </div>

                {resumes.length > 0 && (
                    <section className="resumes-section">
                        {resumes.map((resume) => {
                            return (
                                <ResumeCard key={resume.id} resume={resume} />
                            );
                        })}
                    </section>
                )}
            </section>
        </main>
    );
}
