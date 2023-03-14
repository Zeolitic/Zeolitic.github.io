import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.scss']
})
export class WorkComponent {

  readonly jobs = [
    {
      title: "FSWEP Student",
      company: "Shared Services Canada",
      description: [
        "Created a PowerShell script which formatted SharePoint reports to be printed",
        "Worked in a secure environment using smart cards to get access to different environments",
        "Designed a web application which is used to securely import and export files to a server",
      ],
      dateRange: "July 2019 - April 2021",
      imagePath: "/assets/jobs/ssc.png",
    },
    {
      title: "Support Technician",
      company: "Shared Services Canada",
      description: [
        "Worked with colleagues on the development of an application which allowed secure transfer of files to be done overnight",
        "Developed application which allowed transfers of files through a CDS (Cross-domain solution) to be processed further",
        "Interacted with the clients about requirements for applications, while creating demos and refining ideas",
      ],
      dateRange: "June 2021 - December 2021",
      imagePath: "/assets/jobs/ssc.png",
    },
    {
      title: "Software Developer",
      company: "Government of Canada",
      description: [
        "Worked with colleagues to create multiple full stack applications in Spring, and Angular",
        "Thoroughly tested and documented code",
        "Performed upgrades to critical frameworks relied on by mutiple teams",
      ],
      dateRange: "January 2022 - Now",
      imagePath: "/assets/jobs/goc.png",
    },
  ] as WorkCard[];

}

interface WorkCard {
  title: string;
  company: string;
  description: string | string[];
  dateRange: string;
  imagePath: string;
}
