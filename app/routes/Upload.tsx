import { useState } from "react";
import FileUploader from "~/components/FileUploader";
import Navbar from "~/components/Navbar";

const Upload = () => {
    const [isProcessing] = useState(false);
    const [statusText] = useState("");
    const [file, setFile] = useState<File | null>(null);

    const handleSubmit = (formData: FormData) => {
        const companyName = formData.get("company-name") as string;
        const jobTitle = formData.get("job-title") as string;
        const jobDescription = formData.get("job-description") as string;

        if (!companyName || !jobTitle || !jobDescription) {
            return;
        }

        console.log("Company Name:", companyName);
        console.log("Job Title:", jobTitle);
        console.log("Job Description:", jobDescription);
        console.log("File:", file);
    };

    const handleFileSelect = (file: File | null) => {
        setFile(file);
    };

    return (
        <main className="bg-[url('/images/bg-main.svg')] bg-cover">
            <Navbar />
            <section className="main-section">
                <div className="page-heading py-16">
                    <h1>Smart Feedback for Your Resume</h1>
                    {isProcessing ? (
                        <>
                            <h2>{statusText}</h2>
                            <img
                                src="/public/images/resume-scan.gif"
                                className="w-full"
                            />
                        </>
                    ) : (
                        <h2>
                            Drop your resume for an ATS Score and Improvement
                            Tips
                        </h2>
                    )}

                    {!isProcessing && (
                        <form
                            id="upload-form"
                            action={handleSubmit}
                            className="flex flex-col gap-4 mt-8"
                        >
                            <div className="form-div">
                                <label htmlFor="company-name">
                                    Company Name
                                </label>
                                <input
                                    type="text"
                                    name="company-name"
                                    placeholder="Company Name"
                                    id="company-name"
                                />
                            </div>
                            <div className="form-div">
                                <label htmlFor="job-title">Job Title</label>
                                <input
                                    type="text"
                                    name="job-title"
                                    placeholder="Job Title"
                                    id="job-title"
                                />
                            </div>
                            <div className="form-div">
                                <label htmlFor="job-description">
                                    Job Description
                                </label>
                                <textarea
                                    rows={5}
                                    name="job-description"
                                    placeholder="Job Description"
                                    id="job-description"
                                />
                            </div>
                            <div className="form-div">
                                <label htmlFor="job-description">
                                    Upload Resume
                                </label>
                                <FileUploader onFileSelect={handleFileSelect} />
                            </div>
                            <button className="primary-button" type="submit">
                                Analyze Resume
                            </button>
                        </form>
                    )}
                </div>
            </section>
        </main>
    );
};

export default Upload;
