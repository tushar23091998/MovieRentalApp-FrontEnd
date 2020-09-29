/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { InteractionService } from './interaction.service';

describe('Service: Interaction', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InteractionService]
    });
  });

  it('should ...', inject([InteractionService], (service: InteractionService) => {
    expect(service).toBeTruthy();
  }));
});
