import { Component, OnInit } from '@angular/core';
import { ExchangerateService } from '../service/exchangerate.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private exchangerate: ExchangerateService) { }
  base: string | undefined;
  date: string | undefined;
  result: any[] = [];

  ngOnInit(): void {
    try {
      this.exchangerate.fetchDetails().subscribe((data) => {
        if (data) {
          for (let i in data.rates)
            this.result.push([i, data.rates[i]]);
          this.base = data.base;
          this.date = data.date;
        }
      })
    }
    catch (error) {
      console.log(error);
    }

  }
  changeCurrecny() {

    try {
      if (this.base) {
        this.exchangerate.changeCurrecny(this.base).subscribe((data) => {
          if (data) {
            for (let i in data.rates)
              this.result.push([i, data.rates[i]]);
            this.base = data.base;
            this.date = data.date;
          }
        })
      }
      else {
        alert('Please select Currecny');
      }
    }
    catch (error) {
      alert('Error! Occured');
    }


  }
  changedate() {
    try {
      if (this.date) {
        this.exchangerate.fetchhistoryDeatils(this.date).subscribe((data) => {
          if (data) {
            for (let i in data.rates)
              this.result.push([i, data.rates[i]]);
            this.base = data.base;
            this.date = data.date;
          }
        })
      }
      else {
        alert('Please select date');
      }
    }
    catch (error) {
      alert('Error! Occured');
    }

  }

}
