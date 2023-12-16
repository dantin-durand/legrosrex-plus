// navbar.component.ts
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements AfterViewInit {
  @Input() activeSearch: boolean = false;
  @Output() searchEvent: EventEmitter<string> = new EventEmitter<string>();
  @ViewChild('searchInput') searchInput: ElementRef | undefined;

  isScrolled = false;
  search: string = '';
  private searchTimeout: any;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 0;
  }

  ngAfterViewInit(): void {
    if (this.searchInput && this.activeSearch)
      this.searchInput.nativeElement.focus();
  }

  onSearch(): void {
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }

    this.searchTimeout = setTimeout(() => {
      this.searchEvent.emit(this.search);
    }, 300);
  }
}
