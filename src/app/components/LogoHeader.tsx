'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LogoHeader() {
    let [goodSoftwareText, setGoodSoftwareText] = useState('Click here to see what good software can do.');
    let goodSoftwareOptions = [
        'allows healthcare workers to provide empathetic care',
        'allows teachers to educate each student uniquely',
        'enables financial inclusion',
        'reduces risks for financial lenders allowing them to give loans at cheaper rates to more people',
        'allows teachers to use artifical intelligence as an assistant to teach students',
        'allows teachers to focus on ensuring students learn rather than spending time on creating content',
    ];

    let handleGoodSoftwareTextClick = () => {
        let randomOption = goodSoftwareOptions[Math.floor(Math.random()*goodSoftwareOptions.length)];
        setGoodSoftwareText(`Good software ${randomOption}.`);
    }

    let router = useRouter();

    return (
        <div className="bg-donamus-secondary-500 p-4 flex justify-start">
            <span className="flex md:flex-row flex-col gap-4 justify-center items-center">
                <img src="/NavBarLogo.png" className="max-w-48" onClick={() => router.push('/')} />
                <div className="text-base hover:text-lg transition-all duration-300" onClick={handleGoodSoftwareTextClick}>{goodSoftwareText}</div>
            </span>
        </div>
    );
}