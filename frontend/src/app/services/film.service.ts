import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

export class Film {
  _id: number;
  titulo: string;
  duracion: string;
  filename: string;
}


@Injectable({
  providedIn: 'root'
})
export class FilmService {

  endpoint = 'http://localhost:8080/api/peliculas';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  
  constructor(private httpCliente: HttpClient) { }

  // createUser(film: Film): Observable<any> {
  //   return this.httpCliente.post<Film>(this.endpoint, JSON.stringify(film), this.httpOptions)
  //   // .pipe(
  //   //   catchError(this.handleError<User>('Error occured'))
  //   // );
  // }
  


  createFilm(film, blob){
    let formData = new FormData();
    formData.append("titulo", film.titulo);
    formData.append("duracion", film.duracion);
    // formData.append("filename", blob);
    formData.append("file", blob);

    return this.httpCliente.post(this.endpoint, formData);
  }



  getFilm(id): Observable<Film[]> {
    return this.httpCliente.get<Film[]>(this.endpoint + '/' + id)

  }

  getFilms() {
    return this.httpCliente.get(this.endpoint);
  }

  deleteFilm(id) {
    return this.httpCliente.delete(this.endpoint + "/" + id);
  }

  updateFilm(id, film: Film): Observable<any> {
    console.log("el id seleccionado es:i" + id);

    return this.httpCliente.put(this.endpoint + '/' + id, JSON.stringify(film), this.httpOptions)
    // .pipe(
    //    tap(_ => console.log(`Film updated: ${id}`)),
    //    catchError(this.handleError<FilmService[]>('Update film'))
    // );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
 x
}
