import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
@Component({
  selector: 'app-single-characters',
  templateUrl: './single-characters.component.html',
  styleUrls: ['./single-characters.component.scss']
})
export class SingleCharactersComponent implements OnInit {

  characterId: any;
  singleCharacter: any;

  selecteCharacter: any;
  constructor(private route: ActivatedRoute, private dataService: DataService) { }

  ngOnInit() {
    this.characterId = this.route.snapshot.paramMap.get('id');
    this.getData()
  }

  async getData() {
    const url = ``
    await this.dataService.getData(url).subscribe((response) => {
      this.selecteCharacter = response.filter((ele) => ele.id == this.characterId)
    });
  }

}
