import Link from "next/link";

export default function Pricing() {
    return (
        <div className="flex flex-col items-center justify-center py-12 space-y-8">
            <div className="text-center">
                <h1 className="text-4xl font-bold">Pricing</h1>
                <p className="mt-2 text-lg text-gray-500 dark:text-gray-400">
                    Generate beautiful social media preview images for your
                    website or blog posts. Choose a plan that fits your needs.
                </p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
                <div className="flex flex-col items-center justify-between p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
                    <h2 className="text-2xl font-bold">Hobby</h2>
                    <ul className="mt-4 space-y-2 text-center">
                        <li>Up to 5 image generations per month</li>
                        <li>Email support</li>
                    </ul>
                    <p className="mt-6 text-3xl font-bold">$4.99/mo</p>
                </div>
                <div className="flex flex-col items-center justify-between p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
                    <h2 className="text-2xl font-bold">Pro</h2>
                    <ul className="mt-4 space-y-2 text-center">
                        <li>Up to 20 image generations per month</li>
                        <li>Priority email support</li>
                    </ul>
                    <p className="mt-6 text-3xl font-bold">$24.99/mo</p>
                </div>
                <div className="flex flex-col items-center justify-between p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
                    <h2 className="text-2xl font-bold">Enterprise</h2>
                    <ul className="mt-4 space-y-2 text-center">
                        <li>Unlimited image generations per month</li>
                        <li>Priority email support</li>
                    </ul>
                    <Link
                        href="/contact"
                        className="inline-flex items-center justify-center h-10 px-5 text-white bg-gray-600 rounded-md hover:bg-gray-700"
                    >
                        Get in touch
                    </Link>
                </div>
            </div>
            <Link
                className="inline-flex items-center justify-center h-10 px-5 text-white bg-blue-600 rounded-md hover:bg-blue-700"
                href="/api/auth/signin"
            >
                Get Started
            </Link>
        </div>
    );
}
