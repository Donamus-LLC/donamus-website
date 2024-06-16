import Link from "next/link"

export default function NavBar () {
    return (
        <nav className="w-1/4 bg-donamus-primary-500 text-white p-4">
            <p className="text-4xl">Explore</p>
            <ul className="list-none divide-y p-4 text-xl">
                <li><Link href="/">Home</Link></li>
                <li><Link href="/about-us">About Us</Link></li>
                <li><Link href="/donamus-labs">Donamus Labs</Link></li>
                <li><Link href="/case-studies">Case Studies</Link></li>
                <li><Link href="/contact-us">Contact Us</Link></li>
                <li>{/*This empty list item exists so a divider can show up below the last visible item */}</li>
            </ul>
        </nav>
    )
}