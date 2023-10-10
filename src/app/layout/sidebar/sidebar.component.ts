import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  filteredMovies = [];
  filteredSpices = []
  speciesList = []
  data = [];
  newData: any[] = [];
  selectedMovies: string[] = [];
  selectedSpices: string[] = [];
  combinedCharacters: string[] = [];
  allMovies = [];
  selecteVehicleNames = []
  filteredVehicle = []
  selecteStarShipsNames = []
  filteredStarShipsNames = []
  vehicleList = []
  starShipsList = []
  birthYearList = []



  isLoading: boolean = false

  constructor(private dataService: DataService) { };


  ngOnInit() {
    this.getData();
  }



  async getData() {
    this.data = []
    const url = `https://swapi.dev/api/people`;
    this.isLoading = true
    await this.dataService.getData(url).subscribe((response) => {
      if (response != undefined) {
        this.allMovies = response?.results.reduce((accumulator, character) => {
          return accumulator.concat(character.films);
        }, []);
        const uniqueMovies = [...new Set(this.allMovies)];

        this.allMovies = uniqueMovies;
        this.fetchFilmDataForMovies(this.allMovies)


      }
      this.isLoading = false

    });
  }


  async fetchFilmDataForMovies(movieDataUrls): Promise<void> {
    this.newData = []
    for (const movieUrl of movieDataUrls) {
      this.isLoading = true
      const movieData = await this.dataService.getFilmData(movieUrl).toPromise();
      if (movieData) {
        const movieInfo = {
          movieName: movieData.title,
          characters: movieData.characters,
          starships: movieData.starships,
          vehicles: movieData.vehicles,
          species: movieData.species
        };
        this.newData.push(movieInfo);
      }
      this.isLoading = false
    }

  }


  combineCharacters() {
    for (const movie of this.filteredMovies) {
      movie.charactersName = [];
      movie.birthYear = []
      for (const character of movie.characters) {
        this.isLoading = true

        this.dataService.getCharacterName(character).subscribe((data: any) => {
          if (data.name) {
            movie.charactersName.push({ name: data.name, movieName: data.movieName, birthYear: data.birth_year, species: data.species });
            movie.birthYear.push(data.birth_year);
          }
        });
        this.isLoading = false

      }
    }
    this.combineBirthYear();
  }


  combineSpices() {
    for (const movie of this.filteredMovies) {
      movie.spicesNames = [];
      for (const sp of movie.species) {
        this.isLoading = true

        this.dataService.getCharacterName(sp).subscribe((data: any) => {
          if (data.name) {
            movie.spicesNames.push(data.name);
          }
        });
        this.isLoading = false

      }
    }
  }
  combineVehicle() {
    for (const movie of this.filteredMovies) {
      movie.vehicleNames = [];
      for (const vehicle of movie.vehicles) {
        this.isLoading = true
        this.dataService.getCharacterName(vehicle).subscribe((data: any) => {
          if (data.name) {
            movie.vehicleNames.push(data.name);
          }
        });
        this.isLoading = false
      }
    }
  }

  combineStarships() {
    for (const movie of this.filteredMovies) {
      movie.startShipsNames = [];
      for (const ss of movie.starships) {
        this.isLoading = true

        this.dataService.getCharacterName(ss).subscribe((data: any) => {
          if (data.name) {
            movie.startShipsNames.push(data.name);
          }
        });
      }
      this.isLoading = false

    }
  }

  combineBirthYear() {

  }



  onChangeMovie(movieName: string) {
    if (!this.selectedMovies.includes(movieName)) {
      this.selectedMovies.push(movieName);
      this.selectedSpices = [];
      this.selecteVehicleNames = [];
      this.selecteStarShipsNames = [];
      this.speciesList = []
      this.vehicleList = []
      this.starShipsList = []
    } else {
      this.selectedMovies = this.selectedMovies.filter(name => name !== movieName);
      this.selectedSpices = [];
      this.selecteVehicleNames = [];
      this.selecteStarShipsNames = [];
      this.speciesList = []
      this.vehicleList = []
      this.starShipsList = []
    }
    this.filteredMovies = this.newData.filter(movie => this.selectedMovies.includes(movie.movieName));
    this.combineCharacters();
    this.combineSpices();
    this.combineVehicle();
    this.combineStarships();



    let allSpecies = this.filteredMovies.map(movie => movie.species).reduce((acc, val) => acc.concat(val), []);
    let allVehicles = this.filteredMovies.map(movie => movie.vehicles).reduce((acc, val) => acc.concat(val), []);
    let allStartShips = this.filteredMovies.map(movie => movie.starships).reduce((acc, val) => acc.concat(val), []);

    const uniqueSpecies = [...new Set(allSpecies)];
    const uniqueVehicles = [...new Set(allVehicles)];
    const uniqueStartShips = [...new Set(allStartShips)];


    this.fetchMovieSpices(uniqueSpecies);
    this.fetchMovieVehicles(uniqueVehicles);
    this.fetchMovieStarShips(uniqueStartShips);
    this.fetchBirthYears(this.filteredMovies)
  }

  onChangeSpice(spiceName: string) {
    if (!this.selectedSpices.includes(spiceName)) {
      this.selectedSpices.push(spiceName);
    } else {
      this.selectedSpices = this.selectedSpices.filter(name => name !== spiceName);
    }
    this.filteredSpices = this.speciesList.filter(movie => this.selectedSpices.includes(movie.spiceName));
  }



  onChangeVehicleList(vehicleName: string) {
    if (!this.selecteVehicleNames.includes(vehicleName)) {
      this.selecteVehicleNames.push(vehicleName);
    } else {
      this.selecteVehicleNames = this.selecteVehicleNames.filter(name => name !== vehicleName);
    }
    this.filteredVehicle = this.vehicleList.filter(movie => this.selecteVehicleNames.includes(movie.vehicleName));

  }



  onChangeStarShipsList(ssName: string) {
    if (!this.selecteStarShipsNames.includes(ssName)) {
      this.selecteStarShipsNames.push(ssName);
    } else {
      this.selecteStarShipsNames = this.selecteStarShipsNames.filter(name => name !== ssName);


    }
    console.log("selecteStarShipsNames", this.selecteStarShipsNames)
    this.filteredStarShipsNames = this.starShipsList.filter(movie => this.selecteVehicleNames.includes(movie.starShipName));
  }

  async fetchMovieSpices(movieDataUrls): Promise<void> {
    this.speciesList = []
    for (const movieUrl of movieDataUrls) {
      this.isLoading = true

      const spicesData = await this.dataService.getFilmData(movieUrl).toPromise();
      if (spicesData) {
        const spiceInfo = {
          spiceName: spicesData.name,
          spiceUrl: movieUrl
        };
        this.speciesList.push(spiceInfo);
        this.isLoading = false

      }
    }
  }


  async fetchMovieVehicles(movieDataUrls): Promise<void> {
    this.vehicleList = []
    for (const movieUrl of movieDataUrls) {
      this.isLoading = true

      const vehiclaData = await this.dataService.getFilmData(movieUrl).toPromise();
      if (vehiclaData) {
        const vehicleInfo = {
          vehicleName: vehiclaData.name,
          vehicleUrl: movieUrl
        };
        this.vehicleList.push(vehicleInfo);
        this.isLoading = false

      }
    }
  }


  async fetchMovieStarShips(movieDataUrls): Promise<void> {
    this.starShipsList = []
    for (const movieUrl of movieDataUrls) {
      this.isLoading = true

      const startShipsData = await this.dataService.getFilmData(movieUrl).toPromise();
      if (startShipsData) {
        const starShipsInfo = {
          starShipName: startShipsData.name,
          starShipUrl: movieUrl
        };
        this.starShipsList.push(starShipsInfo);
        this.isLoading = false

      }
    }
  }

  fetchBirthYears(years) {
    console.log("year11", years)
    for (const movie of years) {
      console.log("year", movie.birthYear)
      for (const birthYear of movie.birthYear) {
        console.log("birthYear", birthYear)
        if (!this.birthYearList.includes(birthYear)) {
          this.birthYearList.push(birthYear);
        }
      }
    }
  }

  applyFilter() {
    const filterData = this.filteredMovies.filter(movie => {
      if (this.selectedMovies.length > 0 && !this.selectedMovies.includes(movie.movieName)) {
        return false;
      }

      if (
        this.selectedSpices.length > 0 &&
        !this.selectedSpices.some(species => movie.spicesNames.includes(species))
      ) {
        return false;
      }

      if (
        this.selecteVehicleNames.length > 0 &&
        !this.selecteVehicleNames.some(vehicle => movie.vehicleNames.includes(vehicle))
      ) {
        return false;
      }

      if (
        this.selecteStarShipsNames.length > 0 &&
        !this.selecteStarShipsNames.some(starship => movie.startShipsNames.includes(starship))
      ) {
        return false;
      }

      return true;
    });

    console.log("filterData", filterData)
    const newData = { count: 11, name: 'New Item' };
    this.dataService.setData(filterData);
  }






}
