import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StartwarService } from '../services/startwar.service';
@Component({
  selector: 'app-sinle-character',
  templateUrl: './sinle-character.component.html',
  styleUrls: ['./sinle-character.component.scss'],

})
export class SinleCharacterComponent implements OnInit {
  id: any;
  charResponse = []
  constructor(private route: ActivatedRoute, private startwarService: StartwarService) { }
  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.startwarService.getData(`https://swapi.dev/api/people/${this.id}/`).subscribe((res) => {
      this.charResponse = res
      this.getMovie()
    })
  }

  movies = [];
  isLoading = false;
  starShipsArr = []
  getMovie() {

    this.charResponse['films'].forEach(element => {
      this.isLoading = true
      this.startwarService.getData(element).subscribe((res) => {
        this.movies.push(res.title)
        this.isLoading = false
      })
    });
    this.charResponse['starships'].forEach(element => {
      this.isLoading = true
      this.startwarService.getData(element).subscribe((res) => {
        this.starShipsArr.push(res.title)
        this.isLoading = false
      })
    });
  }

}
