import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/services/Loader.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit {

  constructor(public loader: LoaderService) { }

  ngOnInit() {
  }

}
