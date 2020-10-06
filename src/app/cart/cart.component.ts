import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../_models/user';
import { AlertifyService } from '../_services/alertify.service';
import { UserService } from '../_services/user.service';
import { SharedcartService } from '../_services/sharedcart.service';
import { tblMovie } from '../_models/tblMovie';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  user: User;
  typeArray: Map<number, string> = new Map<number, string>();
  //defaultQuantity: number = 1;
  moviesAddedTocart: any =[];
  cartItemCount: number;
  //allTotal: number;
  constructor(private http:HttpClient, private userService: UserService,private sharedService: SharedcartService,
    private alertify: AlertifyService,private route: ActivatedRoute ) { }

  ngOnInit() {
    this.route.data.subscribe(data=>{
      this.user=data['user'];
    });
    this.moviesAddedTocart=this.sharedService.getMoviesFromCart();
    this.cartItemCount = this.sharedService.getMoviesFromCart().length;
    this.sharedService.updateCartCount(this.cartItemCount);
    // this.calculteAllTotal(this.moviesAddedTocart);
        // this.sharedService.removeAllMovieFromCart();
    // for (let index = 0; index < this.moviesAddedTocart.length; index++) {
    //   const element = this.moviesAddedTocart[index];
    //   this.sharedService.addMovieToCart(element);
    // }
  }

  onRemoveQuantity(movieId : number)
  {
    this.sharedService.removeMovieFromCart(movieId);
    this.moviesAddedTocart=this.sharedService.getMoviesFromCart();
    if(this.moviesAddedTocart == null){
      this.sharedService.updateCartCount(0);
    }
    else{
      this.cartItemCount = this.moviesAddedTocart.length;
      console.log(this.cartItemCount);
      this.sharedService.updateCartCount(this.cartItemCount);
    }
  }

  // calculteAllTotal(allItems:any)
  // {
  //   let total = 0;
  //   for (let i in allItems) {
  //     total= total+(allItems[i].Quantity *allItems[i].aPrice);
  //  }
  //  this.allTotal=total;
  // }

  clearCart(){
    this.sharedService.removeAllMovieFromCart();
    this.moviesAddedTocart=this.sharedService.getMoviesFromCart();
    if(this.moviesAddedTocart == null){
      this.sharedService.updateCartCount(0);
    }
  }

  Rent(movieId: number){
    this.typeArray.set(movieId,"Rental");
    console.log(this.typeArray.get(movieId));
  }
  Purchase(movieId: number){
    this.typeArray.set(movieId,"Purchased");
    console.log(this.typeArray.get(movieId));
  }

}
