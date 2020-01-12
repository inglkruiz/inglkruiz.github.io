---
title: TemplateRef projection with Context in an Angular Component
date: "2020-01-12"
description: "Based on a reusable Component I wrote before, I had the idea of improving its layout with an embedded template which will be instantiated inside the component with an attached context."
---

In a [previous post](/angular-material-reusable-autocomplete/), I wrote a reusable Component which uses an Angular Material Autocomplete and an Input. In this component, when the user types at least 3 characters (by default) a search is triggered to retrieve some options (options where their labels match the typed text), the options displayed are force to fit the option's layout I wrote in the component. I found interesting the idea of using an embedded template to render a custom layout that uses other option's attributes (not only the label text).

> Basically, the benefits of this is to provide a way of customizing the option's layout displayed by the Autocomplete Component which can be translated as better UX.

Before starting I will ask you to open the following link > [Stackblitz - Reusable Angular Material Input Autocomplete form control with custom Option's layout](https://stackblitz.com/edit/angular-sbcm7h-emqpgf) where you will find the working example. Along this post I will describe briefly the approach I took and my reasoning about some decisions.

## User Story

As User
When I search X product by its name
I want see other attributes regarding to the product.

> Consider that the User story I wrote is very very generic, this is just an example.

## Developer's decisions

1. The template to be consume can be passed as a component's parameter but also can be capture from its content when is being used. I will take the later approach since I feel it is less confusing for developers, as a developer when I see that an element is written as projected content inside a component I expect it to be used only inside of it.

   #### Option 1

   ```html
   <ng-template #myTemplate> </ng-template>
   <component-a [optionTemplate]="myTemplate"> </component-a>
   ```


    #### Option 2

    ```html
    <component-a>
      <ng-template> </ng-template>
    </component-a>
    ```

## Prerequisites

1. Might come handy to have read the [previous post](/angular-material-reusable-autocomplete/).
2. Knowledge on [`TemplateRef`](https://angular.io/api/core/TemplateRef) and [`ContentChild`](https://angular.io/api/core/ContentChild).

## Let's Do It

Due to this post is based on a former post I will present only the small changes I did.

#### Controller

```javascript {numberLines:59}{8-10}
// Inner form control to link input text changes to mat autocomplete
inputControl = new FormControl('', this.validators);
noResults = false;
isSearching = false;

private _lengthToTriggerSearch = 3;

@ContentChild(TemplateRef, { static: false })
optionTemplate: TemplateRef<any>;


@Input()
set lengthToTriggerSearch(value: number) {
 this._lengthToTriggerSearch = coerceNumberProperty(value, 0);
}
```

1. On line **66** the component gets the `TemplateRef` declared inside its content.

#### Template

```html {numberLines:26}{3-11}
<ng-template #optionsTemplate>
  <mat-option *ngFor="let option of options" [value]="option" class="provided">
    <ng-container *ngIf="optionTemplate">
      <ng-container
        *ngTemplateOutlet="optionTemplate; context: { option: option }"
      >
      </ng-container>
    </ng-container>
    <ng-container *ngIf="!optionTemplate">
      {{ option.label }}
    </ng-container>
  </mat-option>
</ng-template>
```

1. On line **28** a conditional verifies if `optionTemplate` exists. If it exists then it is projected inside a container with a given context object using the directive [NgTemplateOutlet
   ](https://angular.io/api/common/NgTemplateOutlet). The given context contains the option object.
2. On line **34** there is still the default layout which address the case when the template is not present.

## Component's Usage

The usage does not change much. As described before the template must be declared inside the component and by using the `let` declaration it has access to the context attached.

#### Template

```html {numberLines:2}{6-10,18-20}
<input-autocomplete
  formControlName="pokemon"
  placeholder="Pokemon's name"
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
  placeholder="SW character's name"
  lengthToTriggerSearch="2"
  [options]="swCharacters$ | async"
>
  <ng-template let-option="option">
    {{ option.label }} ({{option.gender}})
  </ng-template>
</input-autocomplete>
```

> I hope you liked it.
