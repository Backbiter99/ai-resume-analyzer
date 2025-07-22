import Navbar from "~/components/Navbar";
import type { Route } from "./+types/home";
import ResumeCard from "~/components/ResumeCard";
import { useEffect, useState } from "react";
import { usePuterStore } from "~/lib/puter";
import { Link, useNavigate } from "react-router";
import { resumes } from "constants/index";

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
    const { auth, kv } = usePuterStore();
    const navigate = useNavigate();
    const [allResumes, setAllResumes] = useState<Resume[]>(resumes); // Start with default resumes
    const [isLoadingResumes, setIsLoadingResumes] = useState(false);
    const [isPuter, setIsPuter] = useState(false);

    useEffect(() => {
        if (!auth.isAuthenticated) {
            navigate("/auth?next=/");
        }
    }, [auth.isAuthenticated, navigate]);

    useEffect(() => {
        const loadResume = async () => {
            // Only load user resumes if authenticated
            if (!auth.isAuthenticated || !auth.user) {
                setAllResumes(resumes); // Show only default resumes for unauthenticated users
                return;
            }

            setIsLoadingResumes(true);
            try {
                // Get all resume keys from KV store (this is where your upload component stores resume data)
                const resumeKeys = (await kv.list(
                    "resume:*",
                    false
                )) as string[];

                if (resumeKeys && resumeKeys.length > 0) {
                    const userResumes: Resume[] = [];

                    // Fetch each resume data from KV store
                    for (const key of resumeKeys) {
                        try {
                            const resumeDataStr = await kv.get(key);
                            if (resumeDataStr) {
                                const resumeData = JSON.parse(resumeDataStr);

                                // Create resume object that matches the Resume interface
                                const userResume: Resume = {
                                    id: resumeData.id,
                                    companyName: resumeData.companyName,
                                    jobTitle: resumeData.jobTitle,
                                    imagePath: resumeData.imagePath,
                                    resumePath: resumeData.resumePath,
                                    feedback: resumeData.feedback || {
                                        overallScore: 0,
                                        ATS: { score: 0, tips: [] },
                                        toneAndStyle: { score: 0, tips: [] },
                                        content: { score: 0, tips: [] },
                                        structure: { score: 0, tips: [] },
                                        skills: { score: 0, tips: [] },
                                    },
                                };

                                userResumes.push(userResume);
                            }
                        } catch (error) {
                            console.error(
                                `Error parsing resume data for key ${key}:`,
                                error
                            );
                        }
                    }

                    // Combine default resumes with user resumes
                    setAllResumes([...userResumes]);
                    setIsPuter(true);
                } else {
                    // No user resumes found, show only defaults
                    setAllResumes(resumes);
                }
            } catch (error) {
                console.log("Error loading user resumes:", error);
                // Keep only default resumes if there's an error
                setAllResumes(resumes);
            } finally {
                setIsLoadingResumes(false);
            }
        };

        loadResume();
    }, [auth.isAuthenticated, auth.user, kv]);

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

                {isLoadingResumes && (
                    <div className="loading-message">
                        Loading your resumes...
                    </div>
                )}

                {allResumes.length > 0 && (
                    <section className="resumes-section">
                        {allResumes.map((resume) => {
                            return (
                                <ResumeCard
                                    key={resume.id}
                                    resume={resume}
                                    isPuter={isPuter}
                                />
                            );
                        })}
                    </section>
                )}
            </section>
            <div className="mx-auto w-[90%] mb-6 mt-3">
                <Link
                    to="/logout"
                    className="secondary-gradient text-white rounded-full p-2 md:px-4 md:py-2 cursor-pointer w-full text-center sm:hidden inline-block"
                >
                    Logout
                </Link>
            </div>
        </main>
    );
}
