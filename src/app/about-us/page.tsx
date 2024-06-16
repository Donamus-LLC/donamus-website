import PageHeader from "../components/PageHeader"

export default function Page() {
    return (
        <div className="flex flex-col">
            <PageHeader pageTitle="About Us" />
            <p className="text-base">This is the main content</p>
        </div>
    )
}