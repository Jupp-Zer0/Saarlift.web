import { Component, AfterViewInit, Renderer2 } from '@angular/core';
import { gsap } from 'gsap';
import { HttpClient } from '@angular/common/http';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  {
  title = 'Saarlift';
  workData: any = [];

  constructor(private http: HttpClient, private meta: Meta) {}

  ngOnInit() {
    this.http.get<any>('https://saarlift.eu/php/database.php').subscribe(data => {
      console.log(data); // Add this line
      this.workData = data;
    });

    this.meta.addTags([
      { name: 'keywords', content: 'Dacharbeit, Holzarbeit, Dachsäuberung,Hubsteiger, Hebebühne, Saarland' },
      { name: 'description', content: 'Saarlift stellt Dienstleistungen wie, Dacharbeit, Holzarbeit, and Dachsäuberung...' },
      { name: 'robots', content: 'index, follow' }
    ]);
  }
  services = [
    {
      title: 'Dacharbeit',
      description: 'Dacharbeiten bis zu 24m ',
      image: 'assets/images/hubsteiger1.JPG'
      
    },
    {
      title: 'Holzarbeit',
      description: 'Ein Baum der weg soll ? Wir erledigen das ohne Probleme.',
      image: 'assets/images/hubsteiger2.JPG'                     
    },
    {
      title: 'Dachsäuberung',
      description: 'Gründliche säuberung ihres Dachs',
      image: 'assets/images/hubsteiger3.JPG'
    }
  ];
}
