import { Injectable } from '@angular/core';
import {  CanDeactivate, Router } from '@angular/router';
import { UserEditComponent } from '../user-edit/user-edit.component';


@Injectable({
  providedIn: 'root'
})
export class PreventUnsavedChanges implements CanDeactivate<UserEditComponent> {
    canDeactivate(component : UserEditComponent){
        if(component.editForm.dirty){
            return confirm('Are you sure you want to continue? Unsaved Changes will be lost');
        }
        return true;
    }
} 