import { Head, Link } from '@inertiajs/react';

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="Welcome" />
            <div className="relative flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 selection:bg-red-500 selection:text-white">
                {auth.user ? (
                    <Link
                        href={route('dashboard')}
                        className="rounded-md bg-white/20 px-6 py-3 text-lg font-semibold text-white shadow-lg backdrop-blur-sm transition duration-300 ease-in-out hover:bg-white/30"
                    >
                        Dashboard
                    </Link>
                ) : (
                    <div className="flex items-center justify-center space-x-4">
                        <Link
                            href={route('login')}
                            className="inline-block rounded-md bg-white/20 px-6 py-3 text-lg font-semibold text-white shadow-lg backdrop-blur-sm transition duration-300 ease-in-out hover:bg-white/30"
                        >
                            Log In
                        </Link>
                        <Link
                            href={route('register')}
                            className="inline-block rounded-md bg-indigo-600 px-6 py-3 text-lg font-semibold text-white shadow-lg transition duration-300 ease-in-out hover:bg-indigo-500"
                        >
                            Register
                        </Link>
                    </div>
                )}
            </div>
        </>
    );
}
