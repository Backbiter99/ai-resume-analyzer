import { prepareInstructions } from "constants/index";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import FileUploader from "~/components/FileUploader";
import Navbar from "~/components/Navbar";
import { convertPdfToImage } from "~/lib/pdf2img";
import { usePuterStore } from "~/lib/puter";
import { generateUUID } from "~/lib/utils";

const Upload = () => {
    const { fs, kv, ai } = usePuterStore();
    const navigate = useNavigate();

    const [isProcessing, setIsProcessing] = useState(false);
    const [statusText, setStatusText] = useState("");
    const [file, setFile] = useState<File | null>(null);

    const handleAnalyze = async ({
        companyName,
        jobTitle,
        jobDescription,
        file,
    }: {
        companyName: string;
        jobTitle: string;
        jobDescription: string;
        file: File;
    }) => {
        setIsProcessing(true);
        setStatusText("Uploading the file...");

        const uploadedFile = await fs.upload([file]);
        if (!uploadedFile) {
            setIsProcessing(false);
            setStatusText("Failed to upload the file");
            return;
        }

        setStatusText("Converting to image...");

        const imageFile = await convertPdfToImage(file);
        if (!imageFile || !imageFile.file) {
            setIsProcessing(false);
            setStatusText("Failed to convert the file");
            return;
        }

        setStatusText("Uploading the image...");

        const uploadedImage = await fs.upload([imageFile.file]);
        if (!uploadedImage) {
            setIsProcessing(false);
            setStatusText("Failed to upload the image");
            return;
        }

        setStatusText("Preparing the data...");

        const uuid = generateUUID();
        const data = {
            id: uuid,
            resumePath: uploadedFile.path,
            imagePath: uploadedImage.path,
            companyName,
            jobTitle,
            jobDescription,
            feedback: "",
        };

        await kv.set(`resume: ${uuid}`, JSON.stringify(data));

        setStatusText("Analyzing the resume...");

        const feedback = await ai.feedback(
            uploadedFile.path,
            prepareInstructions({ jobTitle, jobDescription })
        );

        if (!feedback) {
            setIsProcessing(false);
            setStatusText("Failed to analyze the resume");
            return;
        }

        const feedbackText =
            typeof feedback.message.content === "string"
                ? feedback.message.content
                : (feedback.message.content[0] as { text: string }).text;

        data.feedback = JSON.parse(feedbackText);
        await kv.set(`resume: ${uuid}`, JSON.stringify(data));

        setStatusText("Analysis complete");
        navigate(`/resume/${uuid}`);
    };

    const handleSubmit = (formData: FormData) => {
        const companyName = formData.get("company-name") as string;
        const jobTitle = formData.get("job-title") as string;
        const jobDescription = formData.get("job-description") as string;

        if (!companyName || !jobTitle || !jobDescription || !file) {
            return;
        }

        handleAnalyze({ companyName, jobTitle, jobDescription, file });
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
            <div className="sm:hidden mb-8">
                <Link
                    to="/logout"
                    className="secondary-gradient text-white rounded-full py-2 px-4 cursor-pointer w-[95%] mx-auto text-center block"
                >
                    Logout
                </Link>
            </div>
        </main>
    );
};

export default Upload;
