import { Component, ElementRef, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AsyncPipe, NgIf } from '@angular/common';
import { AuthService } from '../../services/auth.service'; // replace with the actual path to your auth service
import { gsap } from 'gsap';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
  @ViewChild('burgerButton', { static: false }) burgerButton!: ElementRef;
  isOpen: boolean = false;

  constructor(public authService: AuthService, private breakpointObserver: BreakpointObserver) {}

  menuItems = [
    { name: 'Index', active: true },
    { name: 'Work', active: false },
    { name: 'About', active: false }
  ];

  ngOnInit(): void {
    gsap.set(".menu-item p", { y: 225 });
  }

  toggleMenu() {
    this.burgerButton.nativeElement.classList.toggle('active');
  
    const timeline = gsap.timeline({ paused: true });
  
    timeline.to(".overlay", {
      duration: 1.5,
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      ease: "power4.inOut"
    });
  
    timeline.to(".menu-item p", {
      duration: 1.5,
      y: 0,
      stagger: 0.2,
      ease: "power4.out"
    }, "-=1");
  
    timeline.to(".sub-nav", {
      bottom: "10%",
      opacity: 1,
      duration: 0.5,
      delay: 0.5
    }, "<");
  
    if (!this.isOpen) {
      timeline.play();
      document.body.classList.add('no-scroll');
    } else {
      timeline.reverse();
      document.body.classList.remove('no-scroll');
    }
  
    this.isOpen = !this.isOpen;
  }
}