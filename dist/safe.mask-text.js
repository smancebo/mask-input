(function(angular) {


    angular.module('safe.mask-text', [])
        .directive('mask', maskText);

    maskText.$inject = ['$timeout'];

    function maskText($timeout) {
        function linkFunc($scope, $element, $attr, $ngModel) {

            var mask = $attr.mask;
            var input = $($element);

            function formatter(value) {
                var fmt = format(value, $attr.mask);
                if (fmt === undefined) {
                    $(input).attr('valida-control', false);
                    return value;
                } else {
                    $(input).attr('valida-control', true);
                    return fmt;
                }
            }

            function parser(value) {
              var parsed = parse(value, $attr.mask);
                return parsed;
            }

            $ngModel.$formatters.push(formatter);
            $ngModel.$parsers.push(parser);

            $(input).unbind('keydown');
            $(input).unbind('change');

            $(input).on('change', function(event){
              var data = $(this).val();
              var f = format(data, $attr.mask);
              $(input).val(f);
              $scope.ngModel = parse($(this).val(), $attr.mask);
            });
            $(input).on('keydown', function(event) {
                $(input).attr('valida-control', true);
                var charLength = $(this).val().length;

                var match = /[a-zA-Z0-9-_ ]/;
                var char = String.fromCharCode(event.keyCode);
                if (event.keyCode != 8 && event.keyCode != 9 && event.keyCode != 17 && event.keyCode != 91) {

                    event.preventDefault();

                    var maskResult = evalMask(mask, charLength, char);
                    if (maskResult === undefined) return;
                    if (maskResult === true) {
                      $scope.$apply(function(){
                        input.val((input.val() + char).trim());
                        $scope.ngModel = parse(input.val(), $attr.mask);
                      });

                    } else if (maskResult !== false) {
                        $scope.$apply(function(){
                          input.val((input.val() + maskResult).trim());
                          $scope.ngModel = parse(input.val(), $attr.mask);
                        });
                    } else {
                        $(input).attr('valida-control', false);
                        $scope.ngModel = parse(input.val(), $attr.mask);
                    }

                }
            });
        }

        function format(value, mask) {
            var formatted = '';
            if (value !== undefined) {
                for (var i = 0; i <= value.length - 1; i++) {
                    var maskResult = evalMask(mask, formatted.length, value[i]);
                    if (maskResult === undefined) return;
                    if (maskResult === true) {
                        formatted = (formatted + value[i]).trim();
                    } else if (maskResult !== false) {
                        formatted = (formatted + maskResult).trim();
                    } else {
                        //invalid value for the mask
                        return undefined;
                    }
                }
            }
            return formatted;
        }

        function parse(value, mask) {
            var parsed = '';
            if (value !== undefined) {

                parsed = value;

                for (var i = 0; i <= value.length; i++) {
                    var maskType = mask[i];

                    if (maskType !== '#' && maskType !== '@' && maskType !== '0' && maskType !== 0) {
                        parsed = parsed.replace(maskType, '');
                    }
                }
            }

            return parsed.trim();
        }


        var maskMatch = {
            alphaNumber: /[a-zA-Z0-9-_ ]/,
            numbers: /[0-9]/,
            letter: /[a-zA-Z]/
        };

        function matchType(maskType, char) {
            //Check if a character match a desired mask type

            if (maskType === '#') {
                //match Alphanumerics
                return maskMatch.alphaNumber.test(char);
            } else if (maskType === '@') {
                //Match Letters
                return maskMatch.letter.test(char);
            } else if (maskType === '0' || maskType === 0) {
                return maskMatch.numbers.test(char);
            } else {
                return true;
            }
        }

        function evalMask(mask, charLength, char) {

            //Get the mask char at the input text position
            var maskChar = mask[charLength];
            //Get The string letter of the char code

            if (maskChar === undefined) return undefined;

            if (maskChar == '#') { //Accepts Numbers and Letters
                //match the keycode char with alphanumeric characters
                return maskMatch.alphaNumber.test(char);
            } else if (maskChar === '@') { //Accepts Only Letters
                //match the keycode char with Letters characters
                return maskMatch.letter.test(char);
            } else if (maskChar === 0 || maskChar === '0') { //Accepts Only Numbers
                //match the keycode char with numbers
                return maskMatch.numbers.test(char);
            } else {
                //If the char does not match any pattern then is a special caracter in the mask
                var i = 1;
                //Get the next char in the mask; this is used for get all the special characters in the mask pattern
                var nextChar = mask[charLength + i];
                //check whatever the keycode match the next mask character
                if (matchType(nextChar, char)) {

                    var retChar = maskChar;
                    //loop through special caracters concatenate with the keyCode
                    while (nextChar !== '#' && nextChar !== 0 && nextChar !== '0' && nextChar !== '@') {
                        retChar += nextChar;
                        i += 1;
                        nextChar = mask[charLength + i];
                    }

                    return retChar + char;
                } else {
                    //keycode dosent match the next character return undefined and no text is entered
                    return undefined;
                }
            }
        }

        return {
            restrict: 'A',
            require: 'ngModel',
            link: linkFunc,
            scope:{
              ngModel :'='
            }
        };
    }


})(window.angular);
