import { Component, OnInit } from '@angular/core';
import { FilmService } from '../../services/film.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.page.html',
  styleUrls: ['./listado.page.scss'],
})
export class ListadoPage implements OnInit {

  peliculas: any = [];

  constructor(private filmService: FilmService,private router: Router) { }

  ngOnInit() :void{
   // this.getAllFilms();
  }

  ionViewWillEnter():void{
    this.getAllFilms();
  }




  getAllFilms() {
    this.filmService.getFilms().subscribe(response => {
      this.peliculas = response;
    });
  }
  deleteFilm(id) {

    this.filmService.deleteFilm(id).subscribe(data => {
      this.getAllFilms();
    });
   
  }
    addFilm(){
    this.router.navigateByUrl("/datos");
      }

}


