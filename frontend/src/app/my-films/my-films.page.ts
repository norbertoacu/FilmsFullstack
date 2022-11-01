import { Component, OnInit } from '@angular/core';
import { FilmService } from '../services/film.service';

@Component({
  selector: 'app-my-films',
  templateUrl: './my-films.page.html',
  styleUrls: ['./my-films.page.scss'],
})
export class MyFilmsPage implements OnInit {

  peliculas: any = [];

  constructor(private filmService: FilmService) { }

  ngOnInit() {
    this.getAllFilms();
  }

  getAllFilms() {
    this.filmService.getFilms().subscribe(response => {
      this.peliculas = response;
    });
  }


}
