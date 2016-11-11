(function(angular){

  angular.module('masktest',['safe.mask-text'])
  .controller('mask', mask);

  mask.$inject = ['$scope'];
  function mask($scope){
    $scope.txtCedula = "22300843590";
    $scope.txtTelefono = "8096195982";
    $scope.txtPasaporte = "ww4567r6t";
    $scope.txtNumerico = 48.0;

    $scope.txtNumerico4Digitos = -100.55;

  }


})(window.angular);
