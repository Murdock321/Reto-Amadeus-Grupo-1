import {
  AfterViewInit,
  Component,
  ElementRef,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { DestinoService } from '@services/destino.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

enum AvatarImages {
  AVATAR1 = 'assets/img/img-avatar/ava11.png',
  AVATAR2 = 'assets/img/img-avatar/ava12.png',
  AVATAR3 = 'assets/img/img-avatar/ava13.png',
  AVATAR4 = 'assets/img/img-avatar/ava14.png',
}

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent implements AfterViewInit {
  // Seleccionar elementos del DOM con @ViewChildren para evitar manipulación directa del DOM
  @ViewChildren('slidesElements') slidesElements!: QueryList<ElementRef>;
  @ViewChildren('dotElement') dotElemets!: QueryList<ElementRef>;

  constructor(public destinoService: DestinoService) {}

  slideIndex: number = 1;

  // ngAfterViewInit se ejecuta después de que Angular haya inicializado las vistas del componente
  ngAfterViewInit(): void {
    this.showSlides(this.slideIndex);
  }

  plusSlides(n: number): void {
    this.showSlides(this.slideIndex += n);
  }

  currentSlide(n: number): void {
    this.showSlides(this.slideIndex = n);
  }

  showSlides(n: number): void {
    /**
     * Convertir QueryList en un array para poder iterar sobre cada elemento del DOM, 
     * en este caso los slides y los dots.
     */
    const slides = this.slidesElements.toArray();
    const dots = this.dotElemets.toArray();

    if (n > slides.length) {
      this.slideIndex = 1;
    }
    if (n < 1) {
      this.slideIndex = slides.length;
    }

    slides.forEach((slide) => {
      slide.nativeElement.style.display = 'none';
    });

    dots.forEach((dot) => {
      dot.nativeElement.className = dot.nativeElement.className.replace(
        ' active',
        ''
      );
    });

    slides[this.slideIndex - 1].nativeElement.style.display = 'block';
    dots[this.slideIndex - 1].nativeElement.className += ' active';
  }

  nombre = new FormControl();
  correo = new FormControl(); 

  datosUsuario(){

    this.destinoService.nombreS = this.nombre.value;
    this.destinoService.correoS = this.correo.value;
    
    switch(this.slideIndex){
      case 1: {
        this.destinoService.avatar = AvatarImages.AVATAR1;
        break;
      }
      case 2: {
        this.destinoService.avatar = AvatarImages.AVATAR2;
        break;
      }
      case 3: {
        this.destinoService.avatar = AvatarImages.AVATAR3;
        break;
      }
      case 4: {
        this.destinoService.avatar = AvatarImages.AVATAR4;
        break;
      }
    }

  }

  estadoCorreo = "";
  controlBoton = true;

  verificarNomb(event: Event){

    let nomUsuario = this.nombre.value;

    if (nomUsuario == ""){
      this.estadoCorreo = 'Escribe su nombre';
    }
  }

  verificarCorreo(event: Event){

    let correoUsuario = this.correo.value;

    if (correoUsuario == ""){
      this.estadoCorreo = 'Escribe un correo electrónico';
    } else{
      let regEmail = /^(([^<>()\[\]\.,;:\s@\”]+(\.[^<>()\[\]\.,;:\s@\”]+)*)|(\”.+\”))@(([^<>()[\]\.,;:\s@\”]+\.)+[^<>()[\]\.,;:\s@\”]{2,})$/;
      
      if(regEmail.test(correoUsuario)){
        
        this.estadoCorreo = "";
        this.controlBoton = false;
        
      } else{
        this.estadoCorreo = "Escriba un Correo Valido"
      }

    }

  }

}

