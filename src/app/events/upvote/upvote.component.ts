import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as emptyHeart } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-upvote',
  templateUrl: './upvote.component.html',
  styleUrls: ['./upvote.component.scss']
})
export class UpvoteComponent implements OnInit {
  @Input() count: number;
  @Input() voted: boolean;
  @Output() vote = new EventEmitter();
  solidHeart = solidHeart;
  emptyHeart = emptyHeart;

  constructor() {}

  ngOnInit() {}

  toggleVote() {}
}
