import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { FilmService } from './../services/film.service';
import { PhotoService } from '../services/photo.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.page.html',
  styleUrls: ['./update.page.scss'],
})

export class UpdatePage implements OnInit {

  updateFilmFg: FormGroup;
  id: any;
  isSubmitted: boolean = false;
  capturedPhoto: string = "";
  pelicula: any;

  constructor(
    private filmService: FilmService,
    private photoService: PhotoService,
    private activatedRoute: ActivatedRoute,
    public formBuilder: FormBuilder,
    private router: Router
   

  ) {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.getFilm();
  }

  ngOnInit() {
    this.fetchUser(this.id);//traerme cosas :-)
    this.updateFilmFg = this.formBuilder.group({
      titulo: ['',[Validators.required]],
      duracion: ['',[Validators.required]],

     // filename: ['',[Validators.required]]

                
    })
  //  this.getFilm();
  }

  getFilm() {
    this.filmService.getFilm(this.id).subscribe(response => {
      this.pelicula = response;
    });
  }




  fetchUser(id) {
    this.filmService.getFilm(id).subscribe((data) => {
      this.updateFilmFg.setValue({
        titulo: data['titulo'],
        duracion: data['duracion'],
      //  filename: data['filename'] //no estoy seguro de esta linea
       
      });
    });
    //console.log("Registro a editar:" + this.filmService.getFilm(id))
    
  }
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
  get errorControl() {
    return this.updateFilmFg.controls;
  }



  onSubmit() {
    if (!this.updateFilmFg.valid) {
      return false;
    } else {
      this.filmService.updateFilm(this.id, this.updateFilmFg.value)
        .subscribe(() => {
          this.updateFilmFg.reset();
          this.router.navigate(['/listado']);
        })
    }
  }
  // async submitForm() {
   
  //   this.isSubmitted = true;
  //   if (!this.updateFilmFg.valid) {
  //     console.log('Please provide all the required values!')
  //     return false;
  //   } else {
  //     let blob = null;
  //     if (this.capturedPhoto != "") {
  //       const response = await fetch(this.capturedPhoto);
  //       blob = await response.blob();//transforma en un objeto que puedas enviar por http
  //     }
  //     this.filmService.updateFilm(this.updateFilmFg.value,blob).subscribe(data => {
  //       console.log("Photo sent!");
  //       this.router.navigateByUrl("/listado");
  //     })
  //   }
  // }




}