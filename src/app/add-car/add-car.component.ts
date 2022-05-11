import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Car } from 'src/app/models/car';
import Swal from 'sweetalert2';
import { CarService } from '../services/car.service';
import { CommonAllert } from '../shared/common-alert';

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.css']
})
export class AddCarComponent implements OnInit {

  titlePage: string = "Add New Car"
  car = new Car()

  constructor(private carService: CarService, private router: Router, private commonAlert: CommonAllert) { }

  ngOnInit(): void {
    if ( history.state) {
      const s = history.state
      if ( s.data != undefined) {
        this.car = s.data
        this.titlePage = "Edit Data Car"
      }
    }
  }

  save(){
    console.log(this.car)

      if(this.car.carName == undefined) {
        this.commonAlert.ShowWarningAlert("car name wajib diisi")
      } else if(this.car.number == undefined) {
        this.commonAlert.ShowWarningAlert("number wajib diisi")
      } else if(this.car.color == undefined) {
        this.commonAlert.ShowWarningAlert("color wajib diisi")
      } else if(this.car.type == undefined) {
        this.commonAlert.ShowWarningAlert("type wajib diisi")
      } else {
        this.carService.addNewCar(this.car).subscribe(
          data=> {
            // console.log(data);
            // this.router.navigate(['car-list'])
            // Swal.fire(
            //   'Good job!',
            //   'You clicked the button!',
            //   'success'
            // )
            // this.router.navigate(['car-list'])

            this.commonAlert.showSuccesAlert(this.titlePage, "car-list")
          }, error => {
            this.commonAlert.showErrorAlert(error.message)
          }
        );
      }
  }

  goBack() {
    this.router.navigate(['car-list'])
  }

}
