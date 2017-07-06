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

.state('app.Online',{url:'/Online',views:{'menuContent':{templateUrl:'templates/OnlineReport.html',controller:'Search'}}})

.state('app.What',{url:'/What',views:{'menuContent':{templateUrl:'templates/C4GC.html',controller:'Search'}}})

$urlRouterProvider.otherwise('/app/What'); });
