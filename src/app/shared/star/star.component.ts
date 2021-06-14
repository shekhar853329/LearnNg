import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.scss']
})
export class StarComponent implements OnInit, OnChanges {
  @Input() rating: number = 0;

  @Output() notify: EventEmitter<string> = new EventEmitter<string>();

  cropWidth = 75;
  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    this.cropWidth = this.rating * 75 / 5;
  }

  ngOnInit(): void {
  }

  onClick() {    
    this.notify.emit(this.rating.toString());
  }
}
