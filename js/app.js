angular.module('starter',['ionic','starter.controllers'])
.config(function($stateProvider,$urlRouterProvider)
{$stateProvider
.state('app',{url:'/app',abstract:true,
templateUrl:'templates/Menu.html'})
.state('app.search',
	{url:'/Report',views:{'menuContent':
	{templateUrl:'templates/Report.html'
	,controller:'TodoController'}}})


.state('app.Local',{url:'/Local',views:{'menuContent':{templateUrl:'templates/StoredReport.html',controller:'Search'}}})

.state('app.Profile',{url:'/Profile',views:{'menuContent':{templateUrl:'templates/Profile.html',controller:'Search'}}})

.state('What', {
    url: '/What',

    templateUrl: 'templates/C4GC.html'})
.state('LogIn', {
		    url: '/LogIn',

		    templateUrl: 'templates/LogIn.html'})
.state('register', {
						    url: '/register',

						    templateUrl: 'templates/register.html'})
$urlRouterProvider.otherwise('/LogIn'); });
