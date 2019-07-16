import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-historypost',
  templateUrl: './historypost.component.html',
  styleUrls: ['./historypost.component.scss'],
})
export class HistorypostComponent implements OnInit {
  @Input() post : any;
  
  constructor() { }

  ngOnInit() {}

}
