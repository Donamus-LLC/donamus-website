'use client';

import PageHeader from "../components/PageHeader";
import { InlineWidget } from "react-calendly";

export default function Page() {
    return (
        <section>
            <PageHeader pageTitle="Contact Us" />
            <p className="text-base">
            Humanity is at the center of everything we do. We create good software that empathizes with its users. Software is supposed to solve problems humans face – it shouldn’t become one of them. Leading with our human-centered design philosophy, we work with organizations to create products that bring a breath of fresh air, excitement, and, most importantly, happiness through ease of use and intuitiveness.
            If you are a business that needs help with solving palpable pain points for people either internal or external to the organization, then reach out. We guarantee to elicit a response of, “Wow! This software product is in tune with my needs and guides me in solving them easily.” <span className="font-semibold">Or we will give you a full refund.</span> Come take a leap of faith. Let us show you what good software can do to positively impact humanity.
            </p>
            <div className="min-w-1/2">
                <InlineWidget url="https://calendly.com/donamus/30min" />
            </div>
        </section>
    )
}