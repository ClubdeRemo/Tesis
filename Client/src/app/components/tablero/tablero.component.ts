import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tablero',
  standalone: true,
  imports: [],
  templateUrl: './tablero.component.html',
  styleUrl: './tablero.component.css'
})
export class TableroComponent implements OnInit {
  constructor(private router: Router) { }
  ngOnInit(): void {
  }
  siguiente(){this.router.navigate(['login']);}
}