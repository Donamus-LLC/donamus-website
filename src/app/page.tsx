import Link from "next/link";
import CompatibilityCheckBox from "./components/CompatibilityCheckBox";
import { ReactNode } from "react";

export default function Home() {

  let clientList: Client[] = [{
    'logoPath': '',
    'name': 'University of Pennsylvania',
    'websiteURL': 'https://www.upenn.edu/',
    'type': 'PAID'
  }, {
    'logoPath': '/Logo_ARFC.png',
    'name': 'AIDS Resource Foundation for Children',
    'websiteURL': 'https://aidsresource.org/',
    'type': 'PROBONO'
  }]

  let returnClientCards = (type: string, clientList:Array<Client>) => {
    let clientListCards =  clientList.filter((client:Client) => client.type === type).map((client:Client) => {
      return (
        <div className="flex flex-col items-center justify-center border shadow-lg rounded-lg p-4 hover:shadow-xl hover:scale-110 transition-transform duration-300" key={client.name}>
          {client.logoPath === ''? <div></div>: <img src={client.logoPath} className="h-32 w-48 pb-4" />}
          {client.websiteURL === ''? <div className="text-base">{client.name}</div>: <Link href={client.websiteURL} className="hover:text-donamus-primary-400">{client.name}</Link>}
        </div>
      );
    });
    return clientListCards;
  }

  return (
    <div>
      <div className="flex flex-col p-4">
        <div className="flex justify-items-center items-center flex-col md:text-6xl text-3xl font-semibold text-center pb-8 uppercase">
          <div>Good software empowers people.</div><div>We make good software.</div>
        </div>
        <p className="text-xl pb-3">We are a tech shop that believes in creating digital products that help shape lives. A particular team culture is required to develop good software, and we embody the culture entirely. Every team member is cross-functional in many areas of software development, paying particular attention to details and using empathy to build products that empower people positively.</p>
        <p className="text-xl pb-8">If your organization makes digital products and requires <u>personable, passionate, and performant</u> collaborators, contact us now!</p>
        <div className="pb-8"></div>
      </div>
      <div className="flex flex-col justify-center items-center">
        <div className="text-2xl font-semibold text-opacity-50 uppercase pb-5">Good software collaborators (so far)</div>
        <div className="flex md:flex-row flex-col justify-evenly items-center pb-8">
          {returnClientCards('PAID', clientList)} 
        </div>
        <div className="text-2xl font-semibold text-opacity-50 uppercase pb-5">Pro bono good software collaborators (so far)</div>
        <div className="flex md:flex-row flex-col justify-evenly items-center pb-8">
          {returnClientCards('PROBONO', clientList)} 
        </div>
      </div>
    </div>
  );
}


interface Client {
  logoPath: string,
  name: string,
  websiteURL: string,
  type: string
}