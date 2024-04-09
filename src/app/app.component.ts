import { Component, AfterViewInit, Renderer2 } from '@angular/core';
import { gsap } from 'gsap';
import { Router, NavigationStart } from '@angular/router'; // Import NavigationStart

import { HttpClient } from '@angular/common/http';
import { Meta, Title } from '@angular/platform-browser'; // Import both Meta and Title from '@angular/platform-browser'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'Saarlift';
  
  constructor(
    private renderer: Renderer2,
    private titleService: Title,
    private metaService: Meta,
    private router: Router  // Inject the Router service
  ) {
    // Listen to router events
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        // If the menu is open, close it
        if (this.isOpen) {
          this.closeMenu();
        }
      }
    });
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        // If the menu is open, close it
        if (this.isOpen) {
          this.closeMenu();
          this.resetBurger();
          this.isOpen = false; // Add this line
        }
      }
    });
  }
  ngOnInit() {
    this.titleService.setTitle(this.title);
    this.metaService.addTags([
      { name: 'keywords', content: 'Saarlift,Saar Lift, Hubsteiger, Saarland, Hebebühne, Bühne, Dacharbeit, Steiger, Saar' },
      { name: 'description', content: 'Saarlift bietet Hubsteiger Dienstleistungen, inklusiv Personal im Saarland.' },
      { name: 'robots', content: 'index, follow' }
    ]);
  }


  isOpen: boolean = false;
  timeline: any; // Declare timeline variable

  menuItems = [
    { name: 'Anmelden', route: '/login', active: true },
    { name: 'Home', route: '/main', active: false },
    { name: 'Account', route: '/account', active: false }
  ];



  ngAfterViewInit(): void {
    this.timeline = gsap.timeline({ paused: true, reversed: true }); // Set reversed to true
    this.renderer.listen('window', 'load', () => {
      gsap.set(".menu-item p", { y: 225 });
    });
  }                                                                                                                        
  toggleMenu() {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.openMenu();
    } else {
      this.closeMenu();
    }
  }
  resetBurger() {
    const burger = document.querySelector('.burger');
    if (burger) {
      burger.classList.remove('active');
    }
  }
  openMenu() {
    this.timeline
      .to(".overlay", {
        duration: 1.5,
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        ease: "power4.inOut"
      })
      .to(".menu-item p", {
        duration: 1.5,
        y: 0,
        stagger: 0.2,
        ease: "power4.out"
      }, "-=1")
      .to(".sub-nav", {
        bottom: "10%",
        opacity: 1,
        duration: 0.5,
        delay: 0.5
      }, "<")
      .play();
  
    document.body.style.overflow = 'hidden'; // Disable scroll
  }
  
  closeMenu() {
    this.timeline.reverse();
    document.body.style.overflow = ''; // Enable scroll
  }
}
