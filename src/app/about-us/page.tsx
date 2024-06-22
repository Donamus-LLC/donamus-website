import type { Metadata } from "next";
import PageHeader from "../components/PageHeader"

export const metadata: Metadata = {
    title: "About Donamus",
    description: "Donamus translates to \"to donate\" in Latin; learn more about our company.",
};

export default function Page() {
    return (
        <div className="flex flex-col">
            <PageHeader pageTitle="About Us" />
            <p className="md:text-4xl text-3xl">History</p>
            <p className="text-base">Started </p>
        </div>
    )
}