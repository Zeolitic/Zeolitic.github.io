import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.scss']
})
export class WorkComponent {
  constructor(private readonly http: HttpClient) {}

  readonly jobs$ = this.http.get<Work[]>('/assets/jobs/jobs.json');
}

export interface Work {
  title: string;
  company: string;
  description: string | string[];
  dateRange: string;
  imagePath: string;
}
