---
title: Reusable Angular Material Input Autocomplete form control
date: "2019-12-22"
description: "In this example I will use an Angular Material Autocomplete form control and show how to implement <strong>@angular/forms ControlValueAccessor</strong> interface to build a reusable form control. The form control will display a message (like an option) while it waits for results and a message when no results were found."
---

In this example I want to show you how to implement the `ControlValueAccessor` interface from **_`@angular/forms`_** package in order to build a reusable Form Control.

Before starting I will ask you to open the following link > [Stackblitz - Reusable Angular Material Input Autocomplete form control](https://stackblitz.com/edit/angular-sbcm7h-oibfvx) where you will find the working example. Along this post I will describe briefly the approach I took and my reasoning about some decisions.

## User Story

As User I want to be able to search X article by its name and select it.

#### Conditions:

1. When: I type 3 or more characters matching the article's name I want to see a list of options to select one of them.
2. When: The search is being carried out I want know it.
3. When: The search has no results I want to know it.

## Developer's decisions

1. Each option must have an Identifier (with that value I will know when a provided option was selected) and a label/text (which will replace the written text by the user after selecting an option).
2. The form control must not know how to perform the options' search. I would like to use the same component to search for Y, Z or W article (being Y, Z and W of different categories). The input's placeholder and the number of characters to trigger the search action must be configurable.
3. Since I pretend to use this component to execute other searches I will make the minimum characters' length to trigger the search a component parameter.

## Prerequisites

1. An Angular project v8+ with [Angular Material installed](https://material.angular.io/guide/getting-started#install-angular-material).
2. Knowledge on how to use [Angular Reactive Forms](https://angular.io/guide/reactive-forms).
3. Knowledge about the `ControlValueAccessor` interface. What is its purpose? In case you do not know about this here is a good video where [@karaforthewin](https://twitter.com/karaforthewin) explains advance topics on Angular Forms and 2 different approaches to implement the interface. Also you can find some other examples (I found most of them use the approach of providing `NG_VALUE_ACCESSOR`, here I do not).

## Let's Do It

I will create an Angular Module to export the component. Since I want to use it in other places this will give some portability. Remember this module will require to have installed Angular Material.

Let's scaffold a component using `angular-cli`:

```bash
ng generate component input-autocomplete
```

To build the component you will need to import into your Angular Module the following modules: `ReactiveFormsModule`, `MatInputModule`, `MatAutocompleteModule`, `MatOptionModule`, `MatIconModule`.

#### Component's module

```javascript {numberLines:true}
import { CommonModule } from "@angular/common"
import { NgModule } from "@angular/core"
import { ReactiveFormsModule } from "@angular/forms"
import {
  MatAutocompleteModule,
  MatIconModule,
  MatInputModule,
  MatOptionModule,
} from "@angular/material"

import { InputAutocompleteComponent } from "./input-autocomplete.component"

@NgModule({
  declarations: [InputAutocompleteComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatAutocompleteModule,
    MatOptionModule,
    MatIconModule,
  ],
  exports: [InputAutocompleteComponent],
})
export class InputAutocompleteModule {}
```

> Now, let's work in the component.

#### Template:

```html {numberLines:true}
<mat-form-field>
  <input
    matInput
    type="text"
    [matAutocomplete]="auto"
    matAutocompletePosition="below"
    [formControl]="inputControl"
    [placeholder]="placeholder"
    required
    (blur)="onTouched()"
  />
  <mat-icon matSuffix>search</mat-icon>
  <mat-error *ngIf="!inputControl.valid && inputControl.errors?.required">
    This field is required
  </mat-error>
</mat-form-field>
<mat-autocomplete
  #auto="matAutocomplete"
  autoActiveFirstOption="true"
  [displayWith]="displayFn"
>
  <mat-option *ngIf="isSearching; else optionsTemplate" disabled="true">
    <em>Searching...</em>
  </mat-option>

  <ng-template #optionsTemplate>
    <mat-option
      *ngFor="let option of options"
      [value]="option"
      class="provided"
    >
      {{ option.label }}
    </mat-option>
  </ng-template>

  <mat-option *ngIf="!isSearching && noResults" value="" disabled="true">
    <b>No results found</b>
  </mat-option>
</mat-autocomplete>
```

Basically the template uses:

- A `MatFormField` with a `MatInput` type text, and a `MatAutocomplete` as is described in the [component's guide](https://material.angular.io/components/autocomplete/overview#simple-autocomplete).
- It uses 3 `MatOption` elements inside the `MatAutocomplete`:
  - The 1st `MatOption` is to display a message while the search is running.
  - The 2nd `MatOption` has a `*ngFor` directive and works IF results are found.
  - The last `MatOption` is to display a message when no results are found.

#### Controller

```javascript {numberLines:true}{55,72-75,94-106,121-141}
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnInit,
  Optional,
  Self,
  SimpleChanges,
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormControl,
  NgControl,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { coerceNumberProperty } from '@angular/cdk/coercion';

import { Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

export interface Identifiable {
  id: string | number;
  label: string;
}

/**
 * Validates if the value passed has a code in order to be declared as an
 * object provided by material autocomplete options
 */
function isAutocompleteOption(value: Identifiable): boolean {
  if (!value || typeof value === 'string') return false;
  return value.id > 0;
}

/**
 * Validates the control value to have an `id` attribute. It is expected
 * control value to be an object.
 */
function containsIdValidation(control: AbstractControl): ValidationErrors {
  return isAutocompleteOption(control.value) ? null : { required: true };
}

@Component({
  selector: 'input-autocomplete',
  templateUrl: './input-autocomplete.component.html',
  styleUrls: ['./input-autocomplete.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputAutocompleteComponent
  implements OnInit, ControlValueAccessor, OnChanges {
  @Input() placeholder: string;
  @Input() options: Identifiable[];

  // Inner form control to link input text changes to mat autocomplete
  inputControl = new FormControl('', this.validators);
  searchResults: Observable<any>;
  noResults = false;
  isSearching = false;

  private _lengthToTriggerSearch = 3;

  @Input()
  set lengthToTriggerSearch(value: number) {
    this._lengthToTriggerSearch = coerceNumberProperty(value, 0);
  }

  constructor(
    @Optional() @Self() private controlDir: NgControl,
    private changeDetectorRef: ChangeDetectorRef,
  ) {
    if (this.controlDir) {
      this.controlDir.valueAccessor = this;
    }
  }

  ngOnInit() {
    if (this.controlDir) {
      // Set validators for the outer ngControl equals to the inner
      const control = this.controlDir.control;
      const validators = control.validator
        ? [control.validator, this.inputControl.validator]
        : this.inputControl.validator;
      control.setValidators(validators);
      // Update outer ngControl status
      control.updateValueAndValidity({ emitEvent: false });
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.options) {
      if (this.isSearching) {
        this.isSearching = false;

        if (!changes.options.firstChange && !changes.options.currentValue.length) {
          this.noResults = true;
        } else {
          this.noResults = false;
        }
      }
    }
  }

  /**
   * Allows Angular to update the inputControl.
   * Update the model and changes needed for the view here.
   */
  writeValue(obj: any): void {
    obj && this.inputControl.setValue(obj);
  }

  /**
   * Allows Angular to register a function to call when the inputControl changes.
   */
  registerOnChange(fn: any): void {
    // Pass the value to the outer ngControl if it has an id otherwise pass null
    this.inputControl.valueChanges.pipe(debounceTime(300)).subscribe({
      next: value => {
        if (typeof value === 'string') {
          if (this.isMinLength(value)) {
            this.isSearching = true;
            /**
             * Fire change detection to display the searching status option
             */
            this.changeDetectorRef.detectChanges();
            fn(value.toUpperCase());
          } else {
            this.isSearching = false;
            this.noResults = false;

            fn(null);
          }
        } else {
          fn(value);
        }
      },
    });
  }

  /**
   * Allows Angular to register a function to call when the input has been touched.
   * Save the function as a property to call later here.
   */
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  /**
   * Allows Angular to disable the input.
   */
  setDisabledState?(isDisabled: boolean): void {
    isDisabled ? this.inputControl.disable() : this.inputControl.enable();
  }

  /**
   * Function to call when the input is touched.
   */
  onTouched() {}

  /**
   * Method linked to the mat-autocomplete `[displayWith]` input.
   * This is how result name is printed in the input box.
   */
  displayFn(result: Identifiable): string | undefined {
    return result ? result.label : undefined;
  }

  isMinLength(value: string) {
    return value.length >= this._lengthToTriggerSearch;
  }

  private get validators(): ValidatorFn[] {
    return [Validators.required, containsIdValidation];
  }
}
```

I wrote code to be self-explanatory and I hope you understand it.
Even though, here are some key takeaways:

1. On line **55** the interface `ControlValueAccessor` is declared to be implemented by the component.
2. On line **72** the component constructor gets the instance of a `NgControl`. This means you can use `ngModel`
   or a `[formControl]` | `formControlName`, template driven or reactive form respectively.
3. On line **94** `ngOnChanges` turn off `isSearching` state if the component receives options to display.
   `isSearching` state is triggered when the user types a string with a length greater/equals than 3 characters (default).
4. On line **120** the `inputControl` object (which is a `FormControl` and receives updates from the input text)
   communicates with the `NgControl` instance mentioned before. The following cases use cases are handled here:
   1. When the user types the value is a `string` and after length validation the value is passed
      (what to do with the text? the component does not know, he does not care). Outside the component
      you have to react to this value, fetch, and filter the values. Since this options are received as
      a component input then they will be rendered.
   2. When the component renders some options to click and the user chooses one then the value is passed
      to the outer `NgControl` instance. The value selected will remain unless the user cleans or removes
      a character (that action will make the component to emit a `string` value which then will provide
      options to select).

Observe it is not necessary to provide explicitly `NG_VALUE_ACCESSOR` dependency in the component and it is because `NgControl` dependency is declared (it is optional to avoid an error if is not present). The `NgControl` dependency connects the `ngModel` or `FormControl` directive you declare when using the component to the inner `FormControl` previously described which means this component will work with Angular Template Driven and Reactive Forms, but I encourage you to use the later one. Reactive forms seems to be a bit more complex conceptually speaking but are [more predictable](https://angular.io/guide/reactive-forms#introduction-to-reactive-forms).

## Component's Usage

Now, it is time show how to use the component. Do not forget to import the `InputAutocompleteModule` in your main module.

#### Template

```html {numberLines:true}
<form class="example-form" [formGroup]="form" (ngSubmit)="submit()">
  <input-autocomplete
    formControlName="pokemon"
    placeholder="Pokemon's name"
    [options]="pokemons$ | async"
  >
  </input-autocomplete>
  <input-autocomplete
    formControlName="swCharacter"
    placeholder="SW character's name"
    lengthToTriggerSearch="2"
    [options]="swCharacters$ | async"
  >
  </input-autocomplete>
  <div>
    <button mat-raised-button color="primary">submit</button>
  </div>
</form>
```

#### Controller

```javascript {numberLines:true}
import { Component, OnInit } from "@angular/core"
import { FormControl, FormGroup } from "@angular/forms"
import { of } from "rxjs"
import { map, startWith, delay, switchMap } from "rxjs/operators"

import { Identifiable } from "./input-autocomplete"

import { pokemons, swCharacters } from "./data"

/**
 * @title Filter autocomplete
 */
@Component({
  selector: "autocomplete-filter-example",
  templateUrl: "autocomplete-filter-example.html",
  styleUrls: ["autocomplete-filter-example.css"],
})
export class AutocompleteFilterExample implements OnInit {
  form = new FormGroup({
    pokemon: new FormControl(),
    swCharacter: new FormControl(),
  })

  pokemons$ = this.form.get("pokemon").valueChanges.pipe(
    startWith(null),
    switchMap(name => {
      if (typeof name === "string") {
        return of(pokemons).pipe(
          delay(800),
          map(response =>
            response.filter(p => p.label.toUpperCase().includes(name))
          )
        )
      }
      return of([])
    })
  )

  swCharacters$ = this.form.get("swCharacter").valueChanges.pipe(
    startWith(null),
    switchMap(name => {
      if (typeof name === "string") {
        return of(swCharacters).pipe(
          delay(800),
          map(response =>
            response.filter(p => p.label.toUpperCase().includes(name))
          )
        )
      }
      return of([])
    })
  )

  ngOnInit() {}

  submit() {
    console.log(this.form.value)
  }
}
```

> I hope you liked it.
