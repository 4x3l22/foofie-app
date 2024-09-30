import { Component } from '@angular/core';
import { MenuComponent } from "../menu/menu.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [MenuComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {

  constructor( private router: Router){}

  gotologin(){
    this.router.navigate(['login']);
  }
}
