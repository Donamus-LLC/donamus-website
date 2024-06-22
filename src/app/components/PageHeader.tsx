export default function PageHeader({ pageTitle }: { pageTitle: string }) {
    return (
        <div className="min-h-48 justify-center items-center flex">
            <p className="uppercase text-neutral-950 md:text-9xl text-4xl">{pageTitle}</p>
        </div>
    );
}