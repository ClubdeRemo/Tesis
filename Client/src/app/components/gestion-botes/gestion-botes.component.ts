import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Bote {
  reference: string;
  name: string;
  id?: string;
}
@Component({
  selector: 'app-gestion-botes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gestion-botes.component.html',
  styleUrl: './gestion-botes.component.css'
})
export class GestionBotesComponent {
// Datos de los botes
  boatData: Bote[] = [
    { reference: '1', name: 'A1 Rojo', id: '1' },
    { reference: '2', name: 'Pegaso', id: '2' }
  ];

  constructor() { }

  ngOnInit(): void {
    // Inicialización del componente
    this.loadBoats();
  }

  /**
   * Carga los datos de los botes
   * Aquí puedes conectar con tu servicio para obtener datos reales
   */
  loadBoats(): void {
    // TODO: Implementar llamada al servicio
    // this.boatService.getBoats().subscribe(boats => {
    //   this.boatData = boats;
    // });
  }

  /**
   * Maneja el evento de agregar un nuevo bote
   */
  onAddBoat(): void {
    console.log('Agregar nuevo bote');
    
    // Ejemplo de cómo agregar un nuevo bote
    const newBoat: Bote = {
      reference: (this.boatData.length + 1).toString(),
      name: `Nuevo Bote ${this.boatData.length + 1}`,
      id: `new-${Date.now()}`
    };
    
    // Agregar temporalmente (en una app real, esto se haría a través de un servicio)
    this.boatData.push(newBoat);
    
    // TODO: Implementar lógica real
    // - Abrir modal/formulario para crear bote
    // - Llamar al servicio para guardar
    // - Actualizar la lista
  }

  /**
   * Maneja el evento de editar un bote
   * @param boat - El bote a editar
   * @param index - El índice del bote en el array
   */
  onEditBoat(boat: Bote, index: number): void {
    console.log('Editar bote:', boat, 'en índice:', index);
    
    // TODO: Implementar lógica de edición
    // - Abrir modal/formulario con datos del bote
    // - Permitir edición de campos
    // - Guardar cambios a través del servicio
    // - Actualizar la lista
  }

  /**
   * Maneja el evento de eliminar un bote
   * @param boat - El bote a eliminar
   * @param index - El índice del bote en el array
   */
  onDeleteBoat(boat: Bote, index: number): void {
    console.log('Eliminar bote:', boat, 'en índice:', index);
    
    // Confirmación antes de eliminar
    if (confirm(`¿Estás seguro de que deseas eliminar el bote "${boat.name}"?`)) {
      // Eliminar del array local (en una app real, esto se haría a través de un servicio)
      this.boatData.splice(index, 1);
      
      // TODO: Implementar lógica real
      // - Llamar al servicio para eliminar del backend
      // - Manejar errores
      // - Mostrar mensaje de confirmación
    }
  }

  /**
   * Método auxiliar para trackear elementos en *ngFor
   * Mejora el rendimiento de la tabla
   */
  trackByBoat(index: number, boat: Bote): string {
    return boat.id || boat.reference;
  }

  /**
   * Método para refrescar la lista de botes
   */
  refreshBoats(): void {
    this.loadBoats();
  }

  /**
   * Método para buscar botes (para implementar funcionalidad de búsqueda)
   */
  searchBoats(searchTerm: string): void {
    if (!searchTerm.trim()) {
      this.loadBoats();
      return;
    }

    // Filtrar botes basado en el término de búsqueda
    this.boatData = this.boatData.filter(boat => 
      boat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      boat.reference.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  /**
   * Método para ordenar botes por campo
   */
  sortBoats(field: keyof Bote, ascending: boolean = true): void {
    this.boatData.sort((a, b) => {
      const aValue = a[field] || '';
      const bValue = b[field] || '';
      
      if (ascending) {
        return aValue.toString().localeCompare(bValue.toString());
      } else {
        return bValue.toString().localeCompare(aValue.toString());
      }
    });
  }
}
