import { useEffect, useState } from "react";
import { useNavigate } from "react-router"; // React Router v7
import { usePuterStore } from "~/lib/puter";

// Add type definition if missing
interface FSItem {
    id: string;
    name: string;
    path: string;
    // Add other properties as needed
}

const Logout = () => {
    const { auth, isLoading, error, fs, kv } = usePuterStore();
    const navigate = useNavigate();
    const [files, setFiles] = useState<FSItem[]>([]);
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const [isWiping, setIsWiping] = useState(false);
    const [logoutComplete, setLogoutComplete] = useState(false);
    const [wipeComplete, setWipeComplete] = useState(false);

    // Load files on component mount
    useEffect(() => {
        const loadFiles = async () => {
            try {
                const files = (await fs.readDir("./")) as FSItem[];
                setFiles(files || []);
            } catch (err) {
                console.error("Failed to load files:", err);
                setFiles([]);
            }
        };

        if (auth.isAuthenticated && !isLoading) {
            loadFiles();
        }
    }, [fs, auth.isAuthenticated, isLoading]);

    // Redirect if not authenticated - Fixed for React Router v7
    useEffect(() => {
        if (!isLoading && !auth.isAuthenticated && !logoutComplete) {
            // Use immediate navigation without query params for v7
            navigate("/auth", { replace: true });
        }
    }, [isLoading, auth.isAuthenticated, navigate, logoutComplete]);

    // Handle post-logout redirect - Fixed for v7
    useEffect(() => {
        if (logoutComplete && !isLoading) {
            const timer = setTimeout(() => {
                navigate("/auth", { replace: true });
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [logoutComplete, navigate, isLoading]);

    const handleLogout = async () => {
        setIsLoggingOut(true);
        try {
            await auth.signOut();
            setLogoutComplete(true);
        } catch (err) {
            console.error("Logout failed:", err);
            setIsLoggingOut(false);
        }
    };

    const handleWipeData = async () => {
        setIsWiping(true);
        try {
            // Delete all files
            await Promise.all(files.map((file) => fs.delete(file.path)));

            // Clear key-value store
            await kv.flush();

            // Reload files to show empty state
            const updatedFiles = (await fs.readDir("./")) as FSItem[];
            setFiles(updatedFiles || []);

            setWipeComplete(true);

            // Reset wipe complete state after showing success
            setTimeout(() => {
                setWipeComplete(false);
            }, 3000);
        } catch (err) {
            console.error("Wipe failed:", err);
        } finally {
            setIsWiping(false);
        }
    };

    const handleCancel = () => {
        navigate("/", { replace: true });
    };

    // Show loading state
    if (isLoading) {
        return (
            <section className="bg-[url('/images/bg-main.svg')] h-screen">
                <div className="main-section">
                    <div className="gradient-border flex-col-center min-h-[200px] max-w-2xl">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                        <p className="mt-4 text-dark-200 loading-message">
                            Loading...
                        </p>
                    </div>
                </div>
            </section>
        );
    }

    // Show error state
    if (error) {
        return (
            <section className="bg-[url('/images/bg-main.svg')] h-screen">
                <div className="main-section">
                    <div className="gradient-border flex-col-center min-h-[200px] max-w-2xl">
                        <div className="text-red-500 text-xl mb-4">⚠️</div>
                        <h2 className="mb-2">Error</h2>
                        <p className="text-red-600 mb-6 text-center">{error}</p>
                        <button
                            type="button"
                            onClick={() => navigate("/auth", { replace: true })}
                            className="primary-button max-w-[200px]"
                        >
                            Go to Login
                        </button>
                    </div>
                </div>
            </section>
        );
    }

    // Show logout success state
    if (logoutComplete) {
        return (
            <section className="bg-[url('/images/bg-main.svg')] h-screen">
                <div className="main-section">
                    <div className="gradient-border flex-col-center min-h-[200px] max-w-2xl">
                        <div className="text-green-500 text-4xl mb-4">✓</div>
                        <h2 className="mb-2">Logged Out Successfully</h2>
                        <p className="text-dark-200 mb-4 text-center">
                            You have been signed out of your account.
                        </p>
                        <p className="text-sm text-gray-500">
                            Redirecting to login page...
                        </p>
                    </div>
                </div>
            </section>
        );
    }

    // Main logout interface
    return (
        <section className="bg-[url('/images/bg-main.svg')] h-screen">
            <div className="main-section">
                <div className="gradient-border max-w-6xl w-full">
                    {/* Header */}
                    <div className="page-heading mb-12">
                        <h1>Account Management</h1>
                        <p className="text-dark-200 text-xl">
                            Authenticated as:{" "}
                            <span className="text-gradient font-semibold">
                                {auth.user?.username}
                            </span>
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 w-full">
                        {/* Logout Section */}
                        <div className="gradient-border">
                            <div className="flex-col-center mb-8">
                                <div className="text-4xl mb-4">👋</div>
                                <h2 className="mb-2">Sign Out</h2>
                                <p className="text-dark-200 text-center">
                                    Sign out of your account while keeping your
                                    data safe.
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={handleLogout}
                                disabled={isLoggingOut}
                                className={`primary-button ${
                                    isLoggingOut
                                        ? "opacity-75 cursor-not-allowed"
                                        : "hover:primary-gradient-hover"
                                }`}
                            >
                                {isLoggingOut ? (
                                    <span className="flex-row-center gap-2">
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                        Signing Out...
                                    </span>
                                ) : (
                                    "Sign Out"
                                )}
                            </button>
                        </div>

                        {/* Wipe Data Section */}
                        <div className="gradient-border border-red-100">
                            <div className="flex-col-center mb-6">
                                <div className="text-4xl mb-4">🗑️</div>
                                <h2 className="mb-2 text-red-700">
                                    Wipe App Data
                                </h2>
                                <p className="text-dark-200 text-center">
                                    Permanently delete all your files and stored
                                    data.
                                </p>
                                {wipeComplete && (
                                    <div className="mt-3 text-green-600 font-medium">
                                        ✓ Data wiped successfully!
                                    </div>
                                )}
                            </div>

                            {/* Files List */}
                            <div className="mb-6">
                                <label className="font-semibold mb-3 block">
                                    Current Files ({files.length}):
                                </label>
                                <div className="max-h-32 overflow-y-auto inset-shadow rounded-2xl p-4 bg-white">
                                    {files.length > 0 ? (
                                        <div className="flex flex-col gap-2">
                                            {files.map((file) => (
                                                <div
                                                    key={file.id}
                                                    className="flex-row items-center gap-2 text-dark-200"
                                                >
                                                    <span className="text-blue-500">
                                                        📄
                                                    </span>
                                                    <span className="text-sm">
                                                        {file.name}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-gray-500 text-sm text-center py-2">
                                            No files found
                                        </p>
                                    )}
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={handleWipeData}
                                disabled={isWiping || files.length === 0}
                                className={`w-full rounded-full py-4 px-8 cursor-pointer text-white font-semibold transition-all ${
                                    isWiping || files.length === 0
                                        ? "bg-red-300 cursor-not-allowed"
                                        : "bg-red-500 hover:bg-red-600"
                                }`}
                            >
                                {isWiping ? (
                                    <span className="flex-row-center gap-2">
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                        Wiping Data...
                                    </span>
                                ) : (
                                    `Wipe All Data ${
                                        files.length > 0
                                            ? `(${files.length} files)`
                                            : ""
                                    }`
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Cancel Button */}
                    <div className="flex-row-center mt-8">
                        <button
                            type="button"
                            onClick={handleCancel}
                            disabled={isLoggingOut || isWiping}
                            className={`back-button px-8 py-3 ${
                                isLoggingOut || isWiping
                                    ? "opacity-50 cursor-not-allowed"
                                    : "hover:bg-gray-50"
                            }`}
                        >
                            ← Cancel
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Logout;
