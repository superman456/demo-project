import { Component, OnInit } from '@angular/core';
import { ExchangerateService } from '../service/exchangerate.service'

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  courses: any[] = [];
  erroMessage: string = '';
  curr: '' | undefined;
  currencies: any = [];
  date: string = '';
  constructor(private exchangerate: ExchangerateService) { }

  ngOnInit(): void {
    this.courses = this.exchangerate.fetchCoursedeatils();
    try {
      this.exchangerate.fetchDetails().subscribe((data) => {
        this.curr = data.base;
        this.date = data.date;
        if (data) {
          for (let i in data.rates)
            this.currencies.push({ 'name': i, 'rate': data.rates[i] });
        }
      })
    }
    catch (error) {
      alert('Error! Occured');
    }
  }

  onChangeCurrency() {
    let currecny = this.curr;
    if (this.curr) {
      const result = this.currencies.filter((rates: any) => rates.name == this.curr);
      if (result[0]?.rate) {
        this.courses.forEach(function (item, i) {
          item.prices = (item.prices * result[0].rate).toFixed(2);
          item.code = currecny;
        });
      }
    }
    else {
      alert('Please select currency');
    }
  }

  updatePrice() {
    try {
      if (this.date) {
        this.exchangerate.fetchhistoryDeatils(this.date).subscribe((data) => {
          if (data) {
            this.curr = data.base;
          }
          this.onChangeCurrency();
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

