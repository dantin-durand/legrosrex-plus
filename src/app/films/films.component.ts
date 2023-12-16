import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FilmService } from '../shared/film.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-film',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.css'],
})
export class FilmComponent implements OnInit {
  film: any;

  constructor(
    private route: ActivatedRoute,
    private filmService: FilmService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const filmId = +params['id'];
      this.loadFilmDetails(filmId);
    });
  }

  loadFilmDetails(filmId: number): void {
    this.filmService.getFilmById(filmId).subscribe((film) => {
      this.film = film;
    });
  }

  getSafeYoutubeUrl(videoId: string): SafeResourceUrl {
    const url = `https://www.youtube.com/embed/${videoId}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
