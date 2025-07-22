import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import ATS from "~/components/ATS";
import Details from "~/components/Details";
import Summary from "~/components/Summary";
import { usePuterStore } from "~/lib/puter";

export const meta = () => {
    return [
        { title: "ResumeReject | Review" },
        { name: "description", content: "Detailed Review of Resume" },
    ];
};

const Resume = () => {
    const { auth, isLoading, fs, kv } = usePuterStore();
    const { id } = useParams();
    const navigate = useNavigate();

    const [imgUrl, setImgUrl] = useState("");
    const [resumeUrl, setResumeUrl] = useState("");
    const [feedback, setFeedback] = useState<Feedback | null>(null);

    useEffect(() => {
        if (!isLoading && !auth.isAuthenticated) {
            navigate(`/auth?next=/resume/${id}`);
        }
    }, [auth.isAuthenticated, navigate, id, isLoading]);

    useEffect(() => {
        const loadResume = async () => {
            const resume = await kv.get(`resume: ${id}`);
            if (!resume) {
                return;
            }

            const data = JSON.parse(resume);

            const resumeBlob = await fs.read(data.resumePath);
            if (!resumeBlob) {
                return;
            }

            const pdfBlob = new Blob([resumeBlob], { type: "application/pdf" });
            setResumeUrl(URL.createObjectURL(pdfBlob));

            const imageBlob = await fs.read(data.imagePath);
            if (!imageBlob) {
                return;
            }
            setImgUrl(URL.createObjectURL(imageBlob));

            setFeedback(data.feedback);
        };

        loadResume();
    }, [id, fs, kv]);

    return (
        <main className="!pt-0">
            <nav className="resume-nav">
                <Link to="/" className="back-button">
                    <img
                        src="/icons/back.svg"
                        alt="back-logo"
                        className="w-2.5 h-2.5"
                    />
                    <span className="text-gray-800 text-sm font-semibold">
                        Back to Homepage
                    </span>
                </Link>
            </nav>

            <div className="flex flex-row w-full max-lg max-lg:flex-col-reverse">
                {/* Resume Image */}
                <section className="feedback-section bg-[url('/images/bg-small.svg')] bg-cover h-[100vh] sticky top-0 items-center justify-center">
                    {imgUrl && resumeUrl && (
                        <div className="animate-in fade-in duration-1000 gradient-border max-sm:m-0 h-[90%] max-wxl:h-fit w-fit">
                            <a
                                href={resumeUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <img
                                    src={imgUrl}
                                    alt="resume-image"
                                    className="w-full h-full object-contain rounded-2xl"
                                    title="resume"
                                />
                            </a>
                        </div>
                    )}
                </section>
                {/* Feedback */}
                <section className="feedback-section">
                    <h2 className="text-4xl !text-black font-bold">
                        Resume Review
                    </h2>
                    {feedback ? (
                        <div className="flex flex-col gap-8 animate-in fade-in duration-1000">
                            Summary ATS Details
                            <Summary feedback={feedback} />
                            <ATS
                                score={feedback.ATS.score || 0}
                                suggestions={feedback.ATS.tips || []}
                            />
                            <Details feedback={feedback} />
                        </div>
                    ) : (
                        <img
                            src="/images/resume-scan-2.gif"
                            alt="resume-scan"
                            className="w-full"
                        />
                    )}
                </section>
            </div>
        </main>
    );
};

export default Resume;
