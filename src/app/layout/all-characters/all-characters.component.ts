import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin, of } from 'rxjs';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-all-characters',
  templateUrl: './all-characters.component.html',
  styleUrls: ['./all-characters.component.scss']
})
export class AllCharactersComponent implements OnInit {
  apiData: any[] = [];
  moviesData: any[] = [
  ];
  combinedCharacters: any[] = [];
  totalCount: number;
  private isDataFetched = false;
  page = 1;
  itemsPerPage = 10;
  tableData: any;
  filteredData: any[] = []
  tableHeader = [
    {
      label: 'Sl.no',
      key: 'Sl.no',
    },
    {
      label: 'Character Name',
      key: 'characterName',
    }, {
      label: 'Species',
      key: 'species',
    }, {
      label: 'Birth Year',
      key: 'Birth Year',
    }
  ]

  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit() {
    this.getDatattt();
  }

  getDatattt() {
    this.dataService.getData('https://swapi.dev/api/people/1').subscribe((res) => {
      console.log("yathi all", res);
      let characterId = 1;
      const characterInfoMap = {};
      for (const movie of res) {
        for (const character of movie.charactersName) {
          const characterKey = `${character.name}_${character.birthYear}_${character.species}`;
          characterInfoMap[characterKey] = {
            id: characterId,
            name: character.name,
            moviName: character.moviName,
            birthYear: character.birthYear,
            species: character.species ? [character.species.join(', ')] : ''
          };
          characterId++;
        }
      }

      this.combinedCharacters = Object.values(characterInfoMap);
      this.totalCount = this.combinedCharacters.length;

      for (const movie of this.combinedCharacters) {
        movie.spicesNames = [];
        for (const sp of movie.species) {
          this.dataService.getCharacterName(sp).subscribe((data: any) => {
            if (data.name) {
              movie.spicesNames.push(data.name);
            }
          });
        }
      }
      console.log(" this.combinedCharacters", this.combinedCharacters)

    })
  }

  async fetchFilmDataForMovies(movieDataUrls): Promise<void> {
    // this.newData = []
    // for (const movieUrl of movieDataUrls) {
    //   const movieData = await this.dataService.getFilmData(movieUrl).toPromise();
    //   if (movieData) {
    //     const movieInfo = {
    //       movieName: movieData.title,
    //       characters: movieData.characters,
    //       starships: movieData.starships,
    //       vehicles: movieData.vehicles,
    //       species: movieData.species
    //     };
    //     this.newData.push(movieInfo);
    //     // this.getCharecterNames()
    //   }
    // }
  }

  dataLimitChange(e) {
    this.page = e;
    this.getDatattt();
  }

  // async getData() {
  //   this.apiData = []
  //   const url = `https://swapi.dev/api/people/?page=${this.page}`
  //   await this.dataService.getData(url).subscribe((response) => {
  //     console.log("rrrrrrrrrr", response);
  //     this.apiData.push(response?.results[0]);
  //     this.getFilms()
  //     this.totalCount = response['count'];
  //     console.log("hhhhh", this.apiData)
  //   });
  // }


  navigateToCharacter(id: number, charVal: any) {
    this.router.navigate(['/characters', id]);
    this.dataService.setData(this.combinedCharacters);
  }
}
