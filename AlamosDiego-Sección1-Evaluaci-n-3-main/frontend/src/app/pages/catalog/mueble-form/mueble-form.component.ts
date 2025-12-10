import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FurnitureService } from '../../../services/furniture.service';
import { Mueble } from '../../../models/mueble.model';

@Component({
  selector: 'app-mueble-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './mueble-form.component.html',
  styleUrls: ['./mueble-form.component.css']
})
export class MuebleFormComponent implements OnInit {
  mueble: Mueble = {
    nombre: '',
    tipo: 'Silla',
    precioBase: 0,
    stock: 0,
    estado: 'activo'
  };
  isEditMode = false;

  constructor(
    private furnitureService: FurnitureService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.furnitureService.getMueble(+id).subscribe({
        next: (data) => this.mueble = data,
        error: (err) => console.error(err)
      });
    }
  }

  saveMueble(): void {
    if (this.isEditMode && this.mueble.id) {
      this.furnitureService.updateMueble(this.mueble.id, this.mueble).subscribe(() => {
        this.router.navigate(['/admin/catalog']);
      });
    } else {
      this.furnitureService.createMueble(this.mueble).subscribe(() => {
        this.router.navigate(['/admin/catalog']);
      });
    }
  }
}
