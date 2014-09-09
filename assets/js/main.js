// create the module and name it scotchApp
var app = angular.module('toolsApp',  ['ngRoute','ngResource']);


app.factory("User", function($resource) {
    return $resource("backend/apitwitter.php?id=:id");
});


// configure our routes
app.config(function($routeProvider) {
    $routeProvider
    // route for the home page
    .when('/', {
        templateUrl : 'pages/home.html',
        controller  : 'mainController'
    })
    // route for the twitterid page
    .when('/twitterId', {
        templateUrl : 'pages/twitterid.html',
        controller  : 'twitterIdController'
    }).
    otherwise({
        redirectTo: '/'
    });   
});

// create the controller and inject Angular's $scope
app.controller('mainController', function($scope) {
    // create a message to display in our view
    $scope.message = 'Everyone come and see how good I look!';
});

app.controller('twitterIdController', function($scope, User) {
    $scope.loading = false;
    $scope.counter = 0;   
    $scope.error = false;
    $scope.usuarios = [];
    $scope.getResult = function(id){   
        $scope.loading = true;
        User.get({
            id: id
        }, function(user) {
            console.log(user);  
            if(user.error) {
                $scope.error = true;
                $scope.message = "Validation Error please fill the user_id or screen_name field";
            }else{
                if(!user.errors){
                    $scope.counter += 1;
                    user.position = $scope.counter;
                    $scope.usuarios.push(user);
                    $scope.error = false;
                }else{            
                    $scope.error = true;
                    $scope.message = user.errors[0]['message']+" - "+user.errors[0]['code'] ;
                }               
            }                      
        }); 
        $scope.loading = false;
    };
    
    $scope.removeUser = function(index){
        $scope.usuarios.splice(index, 1);
    }; 
});