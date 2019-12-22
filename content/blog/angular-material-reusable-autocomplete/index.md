---
title: Custom Angular Material Input Autocomplete form control
date: "2019-12-22"
description: "In this example I will use an Angular Material Autocomplete form control and show how to implement <strong>@angular/forms ControlValueAccessor</strong> interface to build a custom form control. The form control will display a message (like an option) while it waits for results and a message when no results were found, finally it will render any template for options found using <strong>TemplateRefs</strong>."
---

Today I am going to build a reusable Angular Material Autocomplete form control component and show how to implement the `ControlValueAccessor` interface from **_@angular/forms_** package. Besides that, in order to be able to display any layout for the autocomplete result options I am going to use a **Dynamic Template Creation** with the `ngTemplateOutlet` directive.

This implementation comes from a real use case I had at my current job. The component works in Angular v8.

Let's scaffold a component using `angular-cli`:

```bash
ng generate component input-autocomplete
```

If you have not added Angular Material to your project you can do it with the next command:

```bash
ng add @angular/material
```

To build the component you will need to import into your angular module the following modules: `ReactiveFormsModule`, `MatInputModule`, `MatAutocompleteModule`, `MatOptionModule`, `MatIconModule`.
When I build reusable components I like to take the approach of creating an Angular Module to self-contain its dependencies and gain the ability of importing it anywhere I want. This is my component's module:

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

Now, let's work in the component.

### Template:

```html {numberLines:true}{25-32}
<mat-form-field>
  <input
    matInput
    type="text"
    [matAutocomplete]="auto"
    matAutocompletePosition="below"
    [formControl]="inputControl"
    [placeholder]="placeholder"
    required
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
    <mat-option *ngFor="let option of options" [value]="option">
      <ng-container
        *ngTemplateOutlet="layoutTemplate; context: { option: option }"
      >
      </ng-container>
    </mat-option>
  </ng-template>

  <mat-option *ngIf="!isSearching && noResults" value="" disabled="true">
    No results found
  </mat-option>
</mat-autocomplete>
```

To call your attention I highlighted the lines of code where the `ngTemplateOutlet` is used. The inner `ng-container` will render the template you want to project inside the component with the context passed, in this case each option object.

### Controller

```javascript {numberLines:true}{56,60-61,69,92-102,118-138}
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  Input,
  OnChanges,
  OnInit,
  Optional,
  Self,
  SimpleChanges,
  TemplateRef,
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

  @ContentChild(TemplateRef, { static: false })
  layoutTemplate: TemplateRef<any>;

  // Inner form control to link input text changes to mat autocomplete
  inputControl = new FormControl('', this.validators);
  searchResults: Observable<any>;
  noResults = false;
  isSearching = false;

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
    return value.length > 2;
  }

  private get validators(): ValidatorFn[] {
    return [Validators.required, containsIdValidation];
  }
}
```

I try to write code to be self-explanatory and I hope you understand it.
Key takeaways:

1. On line **56** the interface `ControlValueAccessor` is declared to be implemented by the component.
2. On line **60** the component captures the template you want to project as the autocomplete option's layout.
3. On line **69** the component constructor gets the instance of a `NgControl`. This means you can use `ngModel`
   or a `[formControl]` | `formControlName`, template driven or reactive form respectively.
4. On line **92** `ngOnChanges` turn off `isSearching` state if the component receives options to display.
   `isSearching` state is triggered when the user types a string with a length greater than 2 characters.
5. On line **117** the `inputControl` object (which is a `FormControl` and receives updates from the input text)
   communicates with the `NgControl` instance mentioned before. The following cases use cases are handled here:
   1. When the user types the value is a `string` and after length validation the value is passed
      (what to do with the text? the component does not know, he does not care). Outside the component
      you have to react to this value, fetch, and filter the values. Since this options are received as
      a component input then they will be rendered.
   2. When the component renders some options to click and the user chooses one then the value is passed
      to the outer `NgControl` instance. The value selected will remain unless the user cleans or removes
      a character (that action will make the component to emit a `string` value which then will provide
      options to select).

Now, it is time show how to use the component.

```html {numberLines:true}
<form class="example-form" [formGroup]="form" (ngSubmit)="submit()">
  <input-autocomplete
    formControlName="pokemon"
    placeholder="Pokemon name"
    [options]="pokemons$ | async"
  >
    <ng-template let-option="option">
      <div class="pokemon-option">
        <img [src]="option.sprite" /> {{ option.label }}
      </div>
    </ng-template>
  </input-autocomplete>
  <input-autocomplete
    formControlName="swCharacter"
    placeholder="SW character name"
    [options]="swCharacters$ | async"
  >
    <ng-template let-option="option">
      {{ option.label }} ({{option.gender}})
    </ng-template>
  </input-autocomplete>
  <div>
    <button mat-raised-button color="primary">submit</button>
  </div>
</form>
```

Check this [Stackblitz](https://stackblitz.com/edit/angular-sbcm7h) to see how it works.

#### Future improvements

This component can be improved if:

1. You add an `@Input` to set the text's minimum length before triggering the search event.
2. You add an `@Input` to set the text you want to display while options arrived, or the no results found text.
   Use this hint if your app is multi-language, do not pollute the component adding a translate dependency.
   The less the component knows the better.

I did not code this improvements in this example because I wanted to keep it simple.
