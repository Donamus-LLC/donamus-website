import PageHeader from "../components/PageHeader"

export default function Page() {
    return (
        <div className="flex flex-col">
            <PageHeader pageTitle="About Us" />
            <div className="bg-donamus-secondary-400">This is the main content</div>
        </div>
    )
}