import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-admin',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule, MatIconModule],
  templateUrl: './menu-admin.component.html',
  styleUrl: './menu-admin.component.css'
  
})
export class MenuAdminComponent {
    constructor(private router: Router) { }

  onHome(): void {
    this.router.navigate(['/']);  
  }


}

