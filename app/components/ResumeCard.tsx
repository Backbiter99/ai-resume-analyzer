import { Link } from "react-router";
import ResumeCardHelper from "./ResumeCardHelper";
import { useEffect, useRef, useState } from "react";
import { usePuterStore } from "~/lib/puter";

const ResumeCard = ({
    resume: { id, companyName, jobTitle, imagePath, feedback },
    isPuter,
}: {
    resume: Resume;
    isPuter: boolean;
}) => {
    const { fs, kv } = usePuterStore();
    const [imgUrl, setImgUrl] = useState("");
    const previousBlobUrlRef = useRef<string | null>(null);

    useEffect(() => {
        const loadResume = async () => {
            const resume = await kv.get(`resume: ${id}`);
            if (!resume) return;

            const data = JSON.parse(resume);
            const imageBlob = await fs.read(data.imagePath);
            if (!imageBlob) return;

            const url = URL.createObjectURL(imageBlob);

            // Clean up the old blob URL
            if (previousBlobUrlRef.current) {
                URL.revokeObjectURL(previousBlobUrlRef.current);
            }

            previousBlobUrlRef.current = url;
            setImgUrl(url);
        };

        loadResume();

        return () => {
            if (previousBlobUrlRef.current) {
                URL.revokeObjectURL(previousBlobUrlRef.current);
                previousBlobUrlRef.current = null;
            }
        };
    }, [id, fs, kv]);

    return (
        <>
            {isPuter ? (
                <Link to={`/resume/${id}`}>
                    <ResumeCardHelper
                        companyName={companyName}
                        jobTitle={jobTitle}
                        imagePath={imgUrl}
                        feedback={feedback}
                    />
                </Link>
            ) : (
                <div className="resume-card animate-in fade-in duration-1000">
                    <ResumeCardHelper
                        companyName={companyName}
                        jobTitle={jobTitle}
                        imagePath={imagePath}
                        feedback={feedback}
                    />
                </div>
            )}
        </>
    );
};

export default ResumeCard;
