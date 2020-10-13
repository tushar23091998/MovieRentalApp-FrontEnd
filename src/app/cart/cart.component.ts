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
  totalPrice: number=0;
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
    this.calculateTotal();
    this.cartItemCount = this.sharedService.getMoviesFromCart().length;
    this.sharedService.updateCartCount(this.cartItemCount);
    // this.calculteAllTotal(this.moviesAddedTocart);
        // this.sharedService.removeAllMovieFromCart();
    // for (let index = 0; index < this.moviesAddedTocart.length; index++) {
    //   const element = this.moviesAddedTocart[index];
    //   this.sharedService.addMovieToCart(element);
    // }
  }

  onRemoveQuantity(movie : any)
  {
    this.moviesAddedTocart=this.sharedService.getMoviesFromCart();
    if(this.moviesAddedTocart.length === 1 || this.moviesAddedTocart.length === 0){
      this.clearCart();
    }
    else{
      this.sharedService.removeMovieFromCart(movie.aMovieId);
      this.calculateTotal();
      this.moviesAddedTocart=this.sharedService.getMoviesFromCart();
      if(this.moviesAddedTocart === null){
        this.cartItemCount = 0;
        console.log(this.cartItemCount);
        this.sharedService.updateCartCount(this.cartItemCount);
      }
      else{
        this.cartItemCount = this.moviesAddedTocart.length;
        console.log(this.cartItemCount);
        this.sharedService.updateCartCount(this.cartItemCount);
      }
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

  checkOut(){

    this.moviesAddedTocart = this.sharedService.getMoviesFromCart();
    if(this.moviesAddedTocart === null){
      this.cartItemCount = 0;
    }
    else{
      this.cartItemCount = this.moviesAddedTocart.length;
    }
    for (let index = 0; index < this.cartItemCount; index++) {
      let movie = this.moviesAddedTocart[index];
      if(this.typeArray.get(movie.aMovieId) === "Rental"){
        let date= new Date();
        let date1 = new Date();
        this.http.post('http://localhost:5000/api/orders',{
          aCustomerId : this.user.aCustomerId,
          aMovieId : movie.aMovieId,
          aRentalOrNot : true,
          aOrderedDate : date,
          aDueDate : new Date(date1.setDate(date1.getDate() + 7))
        }).subscribe(()=>{
          this.alertify.success('Order placed successfully');
          this.clearCart();
        }, error => {
          console.log(error);
          this.alertify.error(error);
      });
      }
      else if(this.typeArray.get(movie.aMovieId) === "Purchased")
      {
        let date= new Date();
        let date1 = new Date();
        this.http.post('http://localhost:5000/api/orders',{
          aCustomerId : this.user.aCustomerId,
          aMovieId : movie.aMovieId,
          aRentalOrNot : false,
          aOrderedDate : date,
        }).subscribe(() => {
          this.alertify.success('Order placed successfully');
          this.clearCart();
        }, error => {
          console.log(error);
          this.alertify.error(error);
      });
      }
      else if(this.typeArray.get(movie.aMovieId) === null)
      {
        this.alertify.warning("Please choose rental or purchase");
      }
    }

  }
  
  clearCart(){
    this.sharedService.removeAllMovieFromCart();
    this.moviesAddedTocart=this.sharedService.getMoviesFromCart();
    if(this.moviesAddedTocart == null){
      this.sharedService.updateCartCount(0);
    }
    this.calculateTotal();
  }

  Rent(movieId: number, price: number){
    this.typeArray.set(movieId,"Rental");
    this.calculateTotal();
    console.log(this.typeArray.get(movieId));
  }
  Purchase(movieId: number, price: number){
    this.typeArray.set(movieId,"Purchased");
    this.calculateTotal();
    console.log(this.typeArray.get(movieId));
  }
  addPrice(price : number){
    this.totalPrice +=  price;
    console.log(this.totalPrice);
  }
  calculateTotal()
  {
    this.moviesAddedTocart=this.sharedService.getMoviesFromCart();
    if(this.moviesAddedTocart === null){
      this.cartItemCount =0;
      this.totalPrice = 0;
    }
    else{
      this.cartItemCount= this.moviesAddedTocart.length;
      this.totalPrice = 0;
    for (let index = 0; index < this.cartItemCount; index++) {
      const element = this.moviesAddedTocart[index];
      if(this.typeArray.get(element.aMovieId) === "Rental"){
        this.totalPrice += Number(element.aPrice);
      }
      else if(this.typeArray.get(element.aMovieId) === "Purchased")
      {
        this.totalPrice += Number(element.aPurchasePrice);
      }
    }
    }    
  }

  checkOutValid()
  {
    let flag = false;
    this.moviesAddedTocart=this.sharedService.getMoviesFromCart();
    if(this.moviesAddedTocart === null){
      this.cartItemCount =0;
      this.totalPrice = 0;
    }
    else{
      this.cartItemCount= this.moviesAddedTocart.length;
      this.totalPrice = 0;
    for (let index = 0; index < this.cartItemCount; index++) {
      const element = this.moviesAddedTocart[index];
      if(this.typeArray.get(element.aMovieId) !== "Rental" && this.typeArray.get(element.aMovieId) !== "Purchased"){
        flag = true;
      }
    }

    if(flag === false && this.cartItemCount > 0){
      return true;
    }
    else{
      return false;
    }
    }
    
  }
}
