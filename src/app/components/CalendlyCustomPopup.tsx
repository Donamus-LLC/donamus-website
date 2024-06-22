'use client';

import { useEffect, useState } from "react";
import { PopupWidget } from "react-calendly";

export default function CalendlyCustomPopup() {
    
    let [documentReady, setDocumentReady] = useState(false);
    useEffect(()  => {
        if(typeof document !== 'undefined') {
            setDocumentReady(true);
        }
    }, []);

    return (
        <div className="calendly-custom-popup">
            {documentReady === true ? 
                <PopupWidget 
                    url="https://calendly.com/donamus/30min" 
                    rootElement={document.body} 
                    text="Collaborate"
                    textColor="#ffffff"
                    color="#CD7659"
                />: <div></div>
            }
        </div>
    )
}