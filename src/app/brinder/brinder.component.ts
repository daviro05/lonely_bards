import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { BrinderService } from '../shared/services/brinder.service';
import { Router } from '@angular/router';
import { Utils } from '../shared/utils';

@Component({
  selector: 'app-brinder',
  templateUrl: './brinder.component.html',
  styleUrls: ['./brinder.component.css'],
})
export class BrinderComponent implements OnInit {
  utils: Utils;
  characters: any[] = []; // Ahora este arreglo se llenará con los personajes desde el backend.
  selectedCharacters: any[] = [null, null];
  canSubmit = false;
  draggedCharacter: any = null;
  optionalMessage: string = ''; // Nueva propiedad para el mensaje opcional
  selectedCharacterIndex: number | null = null; // Índice del personaje actualmente seleccionado

  constructor(
    private http: HttpClient,
    private dialog: MatDialog,
    private brinderService: BrinderService,
    private router: Router
  ) {
    this.utils = new Utils(this.router);
  }

  // Este método se ejecuta cuando el componente se inicializa
  ngOnInit() {
    this.loadCharacters();
  }

  // Método para cargar los personajes desde el backend
  loadCharacters() {
    this.brinderService.obtenerPersonajes().subscribe(
      (data) => {
        this.characters = data; // Asignamos los personajes obtenidos al arreglo characters
      },
      (error) => {
        console.error('Error al cargar los personajes:', error);
      }
    );
  }

  sendMatch() {
    this.saveUserId();

    if (this.selectedCharacters.every((character) => character !== null)) {
      const matchData = {
        personaje1_id: this.selectedCharacters[0].id,
        personaje2_id: this.selectedCharacters[1].id,
        ip: sessionStorage.getItem('userId') ?? '',
        message: this.optionalMessage || '',
      };

      this.brinderService.sendMatch(matchData).subscribe(
        (response) => {
          this.openDialog('Voto enviado', 'Pareja registrada con éxito');
          this.selectedCharacters = [null, null];
          this.optionalMessage = '';
          this.canSubmit = false;
        },
        (error) => {
          console.error('Error al registrar la pareja:', error);
          this.openDialog(
            'Error',
            'Hubo un error al enviar la pareja. Contacta con el Centurión.'
          );
        }
      );
    } else {
      this.openDialog(
        'Advertencia',
        'Por favor, selecciona dos personajes antes de enviar.'
      );
    }
  }

  // Drag & Drop (Escritorio)
  onDragStart(event: any, character: any) {
    this.draggedCharacter = character;
    event.dataTransfer.setData('id', character.id);
    this.selectedCharacterIndex = this.characters.indexOf(character);
  }

  onDrop(event: any, slotIndex: number) {
    event.preventDefault();
    const characterId =
      this.draggedCharacter?.id || event.dataTransfer.getData('id');
    const character = this.characters.find((c) => c.id == characterId);
    if (character) {
      this.selectedCharacters[slotIndex] = character;
      this.canSubmit = this.selectedCharacters.every((c) => c !== null);
    }
    this.draggedCharacter = null;
    this.selectedCharacterIndex = null; // Desmarcar después de colocarlo
  }

  onDragOver(event: any) {
    event.preventDefault();
  }

  // Manejo táctil (Móviles)
  onTouchStart(event: any, character: any) {
    this.draggedCharacter = character;
    this.selectedCharacterIndex = this.characters.indexOf(character);
  }

  onTouchEnd(event: any, slotIndex: number) {
    if (this.draggedCharacter) {
      this.selectedCharacters[slotIndex] = this.draggedCharacter;
      this.canSubmit = this.selectedCharacters.every((c) => c !== null);
      this.draggedCharacter = null;
      this.selectedCharacterIndex = null; // Desmarcar después de colocarlo
    }
  }

  openDialog(title: string, message: string): void {
    this.dialog.open(DialogComponent, {
      data: {
        title: title,
        message: message,
      },
    });
  }

  saveUserId(): void {
    // Verificar si ya existe un userId en sessionStorage
    let userId = sessionStorage.getItem('userId');
    if (!userId) {
      // Si no existe, generar uno nuevo
      userId = this.generateUserId(); // Puedes usar cualquier método para generar el ID
      sessionStorage.setItem('userId', userId); // Guardarlo en sessionStorage
    }
  }

  generateUserId(): string {
    // Generar un ID único (puedes usar una librería como uuid)
    return crypto.randomUUID();
  }

  navegar(ruta: string) {
    this.utils.navegar(ruta);
  }
}
