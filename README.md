# Mask-Input


## Installation

#### via Bower

```
bower install --save angular-safe.mask-input
```

## Description

Mask-Input is an [AngularJS](https://https://github.com/angular/angular.js) directive for applying mask to your inputs, you just need put the `mask` attribute in your input and specify the desire mask format


## Usage

> Full working example inside the _"demo"_ folder in this repo

app.js

```javascript
  angular.module('masktest',['safe.mask-text'])
  .controller('mask', mask);

  mask.$inject = ['$scope'];
  function mask($scope){
    $scope.txtId= "M334999774447"; //@000-000-00-000-0
    $scope.txtPhone = "4075674433"; //(000) 000-0000
    $scope.txtPassport = "SCMM8833";//@@-@@-0000
  }


})(window.angular);
```

index.html

```html

<!DOCTYPE html>
<html ng-app="masktest">

<head>
    <meta charset="utf-8">
    <title>Mask-Text</title>
</head>

<body ng-controller="mask">

    <div class="container">

      <div class="form-group">
        <input type="text" class="form-control" mask="@000-000-00-000-0" ng-model="txtId" />
      </div>
      <div class="form-group">
        <input type="text" class="form-control" mask="(000) 000-0000" ng-model="txtPhone" />
      </div>
      <div class="form-group">
          <input type="text" class="form-control" mask="@@-@@-0000" ng-model="txtPassport" />
      </div>
    </div>

    <script src="bower_components/jquery/dist/jquery.min.js" charset="utf-8"></script>
    <script src="bower_components/angular/angular.min.js"></script>
    <script src="bower_components/safe-masktext/safe.mask-text.min.js" charset="utf-8"></script>
    <script src="app/app.js" charset="utf-8"></script>
</body>

</html>

```

## Mask Characters

When defining the mask yo need to specify witch characters are allowed to be used and the format you want to display in your text

* `#` : Means it will allow any AlphaNumeric char at the desired position
* `@` : Means it will allow any char at the desired position
* `0` : Means only numbers are allowed at the desired position

Using the previous example
```html
<input type="text" class="form-control" mask="@000-000-00-000-0" ng-model="txtId" />
```
```javascript
$scope.txtId= "M334999774447"; //@000-000-00-000-0
```

will produce
> M334-999-77-444-7
