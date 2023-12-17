import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FilmService } from '../shared/film.service'; // Assurez-vous de remplacer cela par le chemin réel vers votre service
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotationService } from '../shared/notation.service';

@Component({
  selector: 'app-notation',
  templateUrl: './notation.component.html',
  styleUrls: ['./notation.component.css'],
})
export class NotationComponent implements OnInit {
  filmId: any;
  film: any; // Assurez-vous d'utiliser le type approprié pour vos données de film
  notationForm: FormGroup;
  selectedRating: number = 0;
  stars: number[] = [1, 2, 3, 4, 5];
  notations: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private filmService: FilmService, // Assurez-vous d'importer votre service de films
    private formBuilder: FormBuilder,
    private notationService: NotationService
  ) {
    this.notationForm = this.formBuilder.group({
      rating: [Number, Validators.required],
      comment: [''],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.filmId = +params['id'];
      this.loadFilmDetails();
    });

    this.notationService.getNotesByIdFilm(this.filmId).subscribe(
      (notations) => {
        this.notations = notations;
        console.log(
          'Notations du film avec IdFilm=',
          this.filmId,
          ':',
          notations
        );
      },
      (error) => {
        console.error(
          'Erreur lors de la récupération des notations du film:',
          error
        );
      }
    );
  }

  loadFilmDetails() {
    this.film = this.filmService.getFilmById(this.filmId);
  }

  setRating(rating: number) {
    this.selectedRating = rating;
  }

  submitNotation() {
    if (this.notationForm.valid) {
      const notationData = {
        IdFilm: this.filmId,
        //idUser : //id du user
        note: this.selectedRating,
        commentaire: this.notationForm.get('comment')?.value,
      };

      this.notationService.addNotation(notationData).subscribe(
        (response) => {
          console.log('Notation ajoutée avec succès:', response);
          window.location.href = `http://localhost:4200/film/${this.filmId}`;
        },
        (error) => {
          console.error("Erreur lors de l'ajout de la notation:", error);
        }
      );
    }
  }
}
