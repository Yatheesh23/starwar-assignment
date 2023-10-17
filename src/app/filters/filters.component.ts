

import { Component, OnInit } from '@angular/core';
import { StartwarService } from '../services/startwar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {
  charArray = [];
  apiData = [];
  filterArr = [];
  allMovies = [];
  newData = [];
  selectedMovies = [];
  selectedBirthYear = [];
  filteredMovies = []
  page = 1;
  isLoading = false
  itemsPerPage = 10;
  totalCount: number;

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
  constructor(private startwarService: StartwarService, private router: Router) { }
  ngOnInit() {
    this.getAllData()
  }
  starShip = [];
  title = 'star-wars';

  getAllData() {
    const api = `https://swapi.dev/api/people?page=${this.page}`
    this.isLoading = true
    this.startwarService.getData(api).subscribe((responce) => {
      this.apiData = responce?.results;
      this.mapCharArr()
      this.filterArr = responce?.results;
      this.totalCount = responce.count;
      this.isLoading = false
    })
  }

  async fetchFilmDataForMovies(movieDataUrls): Promise<void> {
    this.newData = []
    for (const movieUrl of movieDataUrls) {
      this.isLoading = true
      const movieData = await this.startwarService.getFilmData(movieUrl).toPromise();
      if (movieData) {
        const movieInfo = {
          movieName: movieData.title,
          characters: movieData.characters,
          starships: movieData.starships,
          vehicles: movieData.vehicles,
          species: movieData.species
        };
        this.newData.push(movieInfo);
        this.isLoading = false
      }
    }

  }

  starList = [];
  vehicles = [];
  vehicleList = []

  mapCharArr() {
    this.charArray = [];
    this.apiData.map((m, i) => {
      this.charArray.push({
        slNo: i + 1,
        name: m.name,
        species: this.getSpecis(m.species),
        birth_year: m.birth_year,
        url: m.url,
      });
      this.starShip.push({
        name: m.name,
        strtShipARR: this.getStarShipAyyar(m)
      });
      this.vehicles.push({
        name: m.name,
        vehiclesListARR: this.getStarVehiclAyyar(m)
      });
    });
    let newArr = []
    this.starShip.forEach((ele) => {
      if (ele.strtShipARR.length >= 1) {
        ele.strtShipARR.forEach((item) => {
          newArr.push(item)
        })
      }
    })
    const uniqueStarships = new Set(newArr);
    this.starList = Array.from(uniqueStarships);

    let vehicleArr = [];
    this.vehicles.forEach((ele) => {
      if (ele.vehiclesListARR.length >= 1) {
        ele.vehiclesListARR.forEach((item) => {
          vehicleArr.push(item)
        })
      }
    })
    const uniqueVehicleList = new Set(vehicleArr);
    this.vehicleList = Array.from(uniqueVehicleList);
    this.finalFilteredData = this.charArray;
    this.totalCount = this.charArray.length;
    const uniqueSpecies = new Set();

    this.speciesList = this.charArray.filter((item) => {
      const species = item.species === '--' ? '' : item.species;
      if (!uniqueSpecies.has(species)) {
        uniqueSpecies.add(species);
        return true;
      }

      return false;
    });



  }

  getStarShipAyyar(item) {
    let arr = [];
    if (item.starships.length > 0) {
      item.starships.map((s) => {
        arr.push(`Starships ${s.split("/")[s.split("/").length - 2]}`);
      })
    }
    return arr;
  }

  getStarVehiclAyyar(item) {
    let arr = [];
    if (item.vehicles.length > 0) {
      item.vehicles.map((s) => {
        arr.push(`Vehicles ${s.split("/")[s.split("/").length - 2]}`);
      })
    }
    return arr;
  }

  getSpecis(data) {
    let res = "";
    if (data.length === 0) {
      res = "--";
    } else {
      const parts = data[0].split('/');
      const speciesNumber = parts[parts.length - 2];
      const result = `Species ${speciesNumber}`;
      res = result
    }
    return res;
  }

  dataLimitChange(e) {
    this.page = e;
    this.getAllData()
  }
  navigateToCharacter(v1, v2) {
    this.router.navigate(['/characters', v1]);
  }
  finalFilteredData = []
  applyFilter() {
    const starshipsDict = {};
    this.starShip.forEach((item) => {
      starshipsDict[item.name] = item.strtShipARR;
    });
    const vehiclesDict = {};
    this.vehicles.forEach((item) => {
      vehiclesDict[item.name] = item.vehiclesListARR;
    });

    const combinedData = this.charArray.map((item) => ({
      ...item,
      strtShipARR: starshipsDict[item.name] || [],
      vehiclesListARR: vehiclesDict[item.name] || [],
    }));

    const filteredData = combinedData.filter((item) => {
      if (this.selectedMovies.length > 0 && !this.selectedMovies.includes(item.name)) {
        return false;
      }
      if (this.selectedBirthYear.length > 0 && !this.selectedBirthYear.includes(item.birth_year)) {
        return false;
      }
      if (this.selectedStarList.length > 0 && !this.selectedStarList.some(ship => item.strtShipARR.includes(ship))) {
        return false;
      }
      if (this.selectedVehicleList.length > 0 && !this.selectedVehicleList.some(vehicle => item.vehiclesListARR.includes(vehicle))) {
        return false;
      }

      return true;
    });
    this.finalFilteredData = filteredData
  }

  onChangeMovie(movieName: string) {
    if (!this.selectedMovies.includes(movieName)) {
      this.selectedMovies.push(movieName);
    } else {
      this.selectedMovies = this.selectedMovies.filter(name => name !== movieName);
    }
  }

  onChangeBirthYear(birth_year: string) {
    if (!this.selectedBirthYear.includes(birth_year)) {
      this.selectedBirthYear.push(birth_year);
    } else {
      this.selectedBirthYear = this.selectedBirthYear.filter(name => name !== birth_year);
    }
  }

  selectedSpices = []
  onChangeSpice(sp) {
    if (!this.selectedSpices.includes(sp)) {
      this.selectedSpices.push(sp);
    } else {
      this.selectedSpices = this.selectedSpices.filter(name => name !== sp);
    }
  }
  selectedStarList = []
  onChangeStarList(ssl) {
    if (!this.selectedStarList.includes(ssl)) {
      this.selectedStarList.push(ssl);
    } else {
      this.selectedStarList = this.selectedStarList.filter(name => name !== ssl);
    }
  }
  speciesList = [];
  selectedVehicleList = []
  onChangeVehicleList(vh) {
    if (!this.selectedVehicleList.includes(vh)) {
      this.selectedVehicleList.push(vh);
    } else {
      this.selectedVehicleList = this.selectedVehicleList.filter(name => name !== vh);
    }
  }


}
