import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { usePuterStore } from "~/lib/puter";

export const meta = () => {
    return [
        { title: "ResumeReject | Auth" },
        { name: "description", content: "Login to ResumeReject" },
    ];
};

const Auth = () => {
    const { isLoading, auth } = usePuterStore();
    const location = useLocation();
    const next = location.search.split("next=")[1];
    const navigate = useNavigate();

    useEffect(() => {
        if (auth.isAuthenticated) {
            navigate(next || "/");
        }
    }, [auth.isAuthenticated, next, navigate]);

    return (
        <main className="bg-[url('/images/bg-auth.svg')] bg-cover min-h-screen flex items-center justify-center">
            <div className="gradient-border shadow-lg">
                <section className="flex flex-col gap-8 bg-white rounded-2xl p-10">
                    <div className="flex flex-col gap-2 items-center text-center">
                        <h1>Welcome</h1>
                        <h2>Login to ResumeReject</h2>
                    </div>
                    <div>
                        {isLoading ? (
                            <button
                                className="auth-button animate-pulse"
                                type="button"
                            >
                                <p>Signing in...</p>
                            </button>
                        ) : (
                            <>
                                {auth.isAuthenticated ? (
                                    <button
                                        className="auth-button"
                                        onClick={auth.signOut}
                                        type="button"
                                    >
                                        <p>Log out</p>
                                    </button>
                                ) : (
                                    <button
                                        className="auth-button"
                                        onClick={auth.signIn}
                                        type="button"
                                    >
                                        <p>Log In</p>
                                    </button>
                                )}
                            </>
                        )}
                    </div>
                </section>
            </div>
        </main>
    );
};

export default Auth;
