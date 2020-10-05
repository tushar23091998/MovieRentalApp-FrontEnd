import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../_models/user';
import { AlertifyService } from '../_services/alertify.service';
import { UserService } from '../_services/user.service';
import { SharedcartService } from '../_services/sharedcart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  user: User;
  defaultQuantity: number = 1;
  movieAddedTocart: any;
  allTotal: number;
  constructor(private http:HttpClient, private userService: UserService,private sharedService: SharedcartService,
    private alertify: AlertifyService,private route: ActivatedRoute ) { }

  ngOnInit() {
    this.route.data.subscribe(data=>{
      this.user=data['user'];
    });
    this.movieAddedTocart=this.sharedService.getMovieFromCart();
    for (let i in this.movieAddedTocart) {
      this.movieAddedTocart[i].Quantity = 1;
    }
    this.sharedService.removeAllMovieFromCart();
    this.sharedService.addMovieToCart(this.movieAddedTocart);
    this.calculteAllTotal(this.movieAddedTocart);
  }

  onRemoveQuantity(movie: any)
  {
    this.movieAddedTocart=this.sharedService.getMovieFromCart();
    this.movieAddedTocart.find(p=>p.aMovieId == movie.aMovieId).Quantity = movie.Quantity-1;
    this.sharedService.removeAllMovieFromCart();
    this.sharedService.addMovieToCart(this.movieAddedTocart);
    this.calculteAllTotal(this.movieAddedTocart);
  }

  calculteAllTotal(allItems:any)
  {
    let total = 0;
    for (let i in allItems) {
      total= total+(allItems[i].Quantity *allItems[i].aPrice);
   }
   this.allTotal=total;
  }

  

}
