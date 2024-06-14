import Link from "next/link"

export default function NavBar () {
    return (
        <nav className="w-1/4 bg-donamus-primary-400 text-white p-4">
            <p className="text-2xl">Explore</p>
            <ul className="list-none divide-y p-4">
                <li><Link href="/about-us">About Us</Link></li>
                <li><Link href="/case-studies">Case Studies</Link></li>
                <li><Link href="/contact-us">Contact Us</Link></li>
            </ul>
        </nav>
    )
}