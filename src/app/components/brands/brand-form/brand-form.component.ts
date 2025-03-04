import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import Brand from '../../../../types/brand';
import { ActivatedRoute, Router } from '@angular/router';
import { BrandService } from '../../../services/brand.service';

@Component({
  selector: 'app-brand-form',
  imports: [MatInputModule,MatButtonModule,FormsModule,MatFormFieldModule],
  templateUrl: './brand-form.component.html',
  styleUrl: './brand-form.component.scss'
})
export class BrandFormComponent {
  name!: string;
  brandService=inject(BrandService);
  router = inject(Router);
  route=inject(ActivatedRoute);
  brand!:Brand;
  ngOnInit(){
    const id = this.route.snapshot.params['id'];
    console.log(id);
    if (id) {
      this.brandService.getBrand(id).subscribe((result) => {
        this.brand= result;
        this.name =  result.name;
      });

    }

  }
  addBrand() {
    console.log(this.name);
    if(!this.name){
      alert("please enter brand name");
      return;
    }
    let brand: Brand={
      name:this.name,
    }
    this.brandService.addBrand(brand).subscribe((result) =>{
      alert('Brand added Successfully');
      this.router.navigateByUrl('/brands');

    });
  }
    updateBrand() {
    console.log(this.name);
    if(!this.name){
      alert("please enter brand name");
      return;
    }
    let brand : Brand={
      id:this.brand.id,
      name: this.name
    };
    this.brandService.updateBrand(brand).subscribe((result) =>{
      alert('Brand updated Successfully');
      this.router.navigateByUrl('/brands');

    });

   }

  }
