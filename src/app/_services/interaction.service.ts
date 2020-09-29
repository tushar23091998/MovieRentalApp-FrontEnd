import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InteractionService {

  private isSignedIn = new BehaviorSubject(true);
  sharedMessage = this.isSignedIn.asObservable();

  constructor() { }

  nextMessage(isSignedIn: boolean) {
    this.isSignedIn.next(isSignedIn);
  }

}
