import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormBuilder } from "@angular/forms";
import { FilmService } from './../services/film.service';



@Component({
  selector: 'app-update',
  templateUrl: './update.page.html',
  styleUrls: ['./update.page.scss'],
})

export class UpdatePage implements OnInit {

  updateFilmFg: FormGroup;
  id: any;

  constructor(
    private filmService: FilmService,
    private activatedRoute: ActivatedRoute,
    public formBuilder: FormBuilder,
    private router: Router
  ) {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.fetchUser(this.id);
    this.updateFilmFg = this.formBuilder.group({
      titulo: [''],
      duracion: ['']
     // username: ['']
    })
  }

  fetchUser(id) {
    this.filmService.getFilm(id).subscribe((data) => {
      this.updateFilmFg.setValue({
        titulo: data['titulo'],
        duracion: data['duracion']
       
      });
    });
  }

  onSubmit() {
    if (!this.updateFilmFg.valid) {
      return false;
    } else {
      this.filmService.updateFilm(this.id, this.updateFilmFg.value)
        .subscribe(() => {
          this.updateFilmFg.reset();
          this.router.navigate(['/list']);
        })
    }
  }

}