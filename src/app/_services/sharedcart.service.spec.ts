/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SharedcartService } from './sharedcart.service';

describe('Service: Sharedcart', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SharedcartService]
    });
  });

  it('should ...', inject([SharedcartService], (service: SharedcartService) => {
    expect(service).toBeTruthy();
  }));
});
