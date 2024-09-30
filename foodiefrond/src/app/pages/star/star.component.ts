import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from "../menu/menu.component";

@Component({
  selector: 'app-star',
  standalone: true,
  imports: [RouterOutlet, MenuComponent],
  templateUrl: './star.component.html',
  styleUrl: './star.component.css'
})
export class StarComponent {

}
