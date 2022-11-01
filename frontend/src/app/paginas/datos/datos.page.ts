import { Component, OnInit, NgZone  } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder,Validators } from "@angular/forms";
import { FilmService } from '../../services/film.service';
import { PhotoService } from '../../services/photo.service';


@Component({
  selector: 'app-datos',
  templateUrl: './datos.page.html',
  styleUrls: ['./datos.page.scss'],
})
export class DatosPage implements OnInit {
  
  filmForm: FormGroup;
  isSubmitted: boolean = false;
  capturedPhoto: string = "";
  
  constructor(public formBuilder: FormBuilder,
    private filmService: FilmService,
    private photoService: PhotoService,
    private router: Router,
    private zone: NgZone,
     
    
  ) {}
    
  ionViewWillEnter() {
    this.filmForm.reset();
    this.isSubmitted = false;
    this.capturedPhoto = "";
  }

    ngOnInit() {
    this.filmForm = this.formBuilder.group({
      titulo: ['',[Validators.required]],
      duracion: ['',[Validators.required]]
          })
  }

get errorControl() {
  return this.filmForm.controls;
}

  // onSubmit() {
  //   if (!this.filmForm.valid) {
  //     return false;
  //   } else {
  //     this.filmService.createFilm(this.filmForm.value)
  //       .subscribe((response) => {
  //         this.zone.run(() => {
  //           this.filmForm.reset();
  //           this.router.navigate(['/listado']);
  //         })
  //       });
  //   }
  // }
  takePhoto() {
   
    this.photoService.takePhoto().then(data => {
     this.capturedPhoto = data.webPath;
    });
  }

  pickImage() {
  
    this.photoService.pickImage().then(data => {
     this.capturedPhoto = data.webPath;
    });
  }

  discardImage() {
   
     this.capturedPhoto = null;
  }

  async submitForm() {
   
    this.isSubmitted = true;
    if (!this.filmForm.valid) {
      console.log('Please provide all the required values!')
      return false;
    } else {
      let blob = null;
      if (this.capturedPhoto != "") {
        const response = await fetch(this.capturedPhoto);
        blob = await response.blob();
      }

      this.filmService.createFilm(this.filmForm.value, blob).subscribe(data => {
        console.log("Photo sent!");
        this.router.navigateByUrl("/listado");
      })
    }
  }
}
