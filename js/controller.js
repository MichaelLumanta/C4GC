angular.module('starter.controllers',['ionic','ngCordova','ngCordova.plugins.camera','ngCordova.plugins'])
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
.factory('$cordovaCamera', ['$q', function ($q) {

    return {
      getPicture: function (options) {
        var q = $q.defer();

        if (!navigator.camera) {
          q.resolve(null);
          return q.promise;
        }

        navigator.camera.getPicture(function (imageData) {
          q.resolve(imageData);
        }, function (err) {
          q.reject(err);
        }, options);

        return q.promise;
      },

      cleanup: function () {
        var q = $q.defer();

        navigator.camera.cleanup(function () {
          q.resolve();
        }, function (err) {
          q.reject(err);
        });

        return q.promise;
      }
    };
  }])

//Pages Controller


.controller('Search',function($scope,$http)
{$scope.saved=localStorage.getItem('reports');
	$scope.items=(localStorage.getItem('reports')!=null)?JSON.parse($scope.saved):[{title:'',done:false}];
done();

function done(){setTimeout(function()
	{updates();
	done();},100);
	}

function updates(){$scope.saved=localStorage.getItem('reports');
	$scope.items=(localStorage.getItem('reports')!=null)?JSON.parse($scope.saved):[{title:'',done:false}];
};
})
.controller('Search1',function($scope,$http)
{ $scope.items=(localStorage.getItem('accounts'));
$scope.item=JSON.parse($scope.items)[0].account;

	 var url="http://www.michaellumantac4gc.esy.es/db/select.php?report&account="+$scope.item+"";
$http.get(url).success(function(response){
	$scope.items=response;

}).error(function(response){$scope.items=null;});


})
.controller('TodoController',function($scope,$http,$state, $ionicHistory, $cordovaCamera){
  $scope.cameraimage = "img/pic.png";

  $scope.saved=localStorage.getItem('reports');
	$scope.reports=(localStorage.getItem('reports')!=null)?JSON.parse($scope.saved):[];
	localStorage.setItem('reports',JSON.stringify($scope.reports));

  $scope.takePicture = function () {
    var options = {
      quality: 50,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.CAMERA
    };

    // udpate camera image directive
    $cordovaCamera.getPicture(options).then(function (imageData) {
      $scope.cameraimage = "data:image/jpeg;base64," + imageData;

    }, function (err) {
      console.log('Failed because: ');
  console.log(err);
    });
  };



  	$scope.addReport1=function(){

			$scope.saved=localStorage.getItem('accounts');
				$scope.account=(localStorage.getItem('accounts')!=null)?JSON.parse($scope.saved):[{accounts:'',done:false}];

		 $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
var base64=document.getElementById('userimg').src;
		$http({
			url:"http://www.michaellumantac4gc.esy.es/db/insert.php?report",
			method: "POST",
			data:{
			'report': $scope.report,
			'studentId': $scope.account[0].account,
			'category': $scope.Category,
			'location': $scope.location,
      'imageinput' :base64
      //'image': document.getElementById('userimg').value;
			}
		})
.success(function(response){

					if(response.match("fail"))
					{alert("Storing your report");
						 $scope.addToLocal();
					}
					else{
            alert("Your Report is sent to the admin")
					$scope.report='';
					$scope.Category='';
					$scope.location='';
var reload=document.getElementById('userimg');
reload.src="img/pic.png";
					}
        }).error(function(response){
          alert("Storing your report");
          $scope.addToLocal();
        });

	};
		$scope.addReport=function(){
		var report=$scope.report;
		var loc=$scope.location;
		if(report==null||report=="")
		{alert("No Description");}
    else if(loc==null||loc=="")
    {
      alert("No Location");
    }
	else{

    $scope.addReport1();}
	};



	$scope.addToLocal=function(){
    alert("There are no connection\nYour report is stored")
	$scope.saved=localStorage.getItem('reports');
	$scope.reports=(localStorage.getItem('reports')!=null)?JSON.parse($scope.saved):[];
	localStorage.setItem('reports',JSON.stringify($scope.reports));
	$scope.saved=localStorage.getItem('accounts');
		$scope.account=(localStorage.getItem('accounts')!=null)?JSON.parse($scope.saved):[{accounts:'',done:false}];
var base64=document.getElementById('userimg').src;


		var report= $scope.report;
			$scope.reports.push({
        image:base64,
				category:$scope.Category,
				description:$scope.report,
				location:$scope.location,
				StudentId:$scope.account[0].account,

				done:false
			});
	    $scope.Category='';
			$scope.report='';
      var reload=document.getElementById('userimg');
      reload.src="img/pic.png";
			$scope.location='';
			localStorage.setItem('reports',JSON.stringify($scope.reports));




	};

	$scope.remove=function(item){

	 $scope.reports.splice(item,1);
	localStorage.setItem('reports', JSON.stringify($scope.reports));
$state.go('app.Local');

	};
	$scope.add=function(item,index){

$scope.desc=item.description;

$scope.category=item.category;
$scope.location=item.location;
var base64 = item.image;
$scope.saved=localStorage.getItem('accounts');
	$scope.account=(localStorage.getItem('accounts')!=null)?JSON.parse($scope.saved):[{accounts:'',done:false}];

$http({
	url:"http://www.michaellumantac4gc.esy.es/db/insert.php?report",
	method: "POST",
	data:{
    'imageinput' : base64,
	'report': $scope.desc,
	'studentId': $scope.account[0].account,
'category': $scope.category,
'location': $scope.location
	}
}).success(function(response){
	if(response.match("Worked"))
	{
		$scope.reports.splice(index,1);
	 localStorage.setItem('reports', JSON.stringify($scope.reports));
   $state.go('app.Local');
	}


})

//		$scope.reports.splice(item),1);
//   localStorage.setItem('reports', JSON.stringify($scope.reports));
	};
}).controller('SignIn',function($scope,$http,$state)
{

 $scope.submit= function(){

		var url="http://www.michaellumantac4gc.esy.es/db/select.php?studentaccounts&username="+$scope.username+"&password="+$scope.password+"";
		$http.post(url).success(function(response){
			$scope.accounts=response;


					if($scope.username == $scope.accounts[0].StudentID && $scope.password == $scope.accounts[0].Password)
					{
						$scope.saved=localStorage.getItem('accounts');
						$scope.reports=(localStorage.getItem('accounts')!=null)?[{account:$scope.username,Name:$scope.accounts[0].StudentName,guest:false}]:[{account:$scope.username,done:false}];
						localStorage.setItem('accounts',JSON.stringify($scope.reports));
		$state.go('Landing');

		}



	});
  var url="http://www.michaellumantac4gc.esy.es/db/select.php?guest&username="+$scope.username+"&password="+$scope.password+"";
$http.get(url).success(function(response){
  $scope.accounts=response;

  if($scope.accounts!=undefined)
  {
    $scope.saved=localStorage.getItem('accounts');
    $scope.reports=(localStorage.getItem('accounts')!=null)?[{account:$scope.username,Name:$scope.accounts[0].StudentName,guest:true}]:[{account:$scope.username,done:false}];
    localStorage.setItem('accounts',JSON.stringify($scope.reports));
$state.go('Landing');

  }
  });
}

$scope.Register=function(){

	$scope.username=$scope.User;
	$scope.password=$scope.password;
	var url="http://www.michaellumantac4gc.esy.es/db/select.php?guests&username="+$scope.username+"";
	$http.get(url).success(function(response){
	$scope.accounts=response;
if($scope.accounts[0]==undefined){
}
else{
  if ($scope.User==$scope.accounts[0].Username) {
  alert("Username already taken");


}
}
	});


	var url="http://www.michaellumantac4gc.esy.es/db/select.php?guestsname&username="+$scope.Name+"";
	$http.get(url).success(function(response){
	$scope.account=response;

  if($scope.account[0]==undefined){
  }
  else{
	 if ($scope.Name==$scope.account[0].FullName) {
	alert("Full Name already taken");

}}
	});
if($scope.Name==null ||$scope.User==null||$scope.Pass==null){
alert("One of the field is blank");

}
else if ($scope.User.length<=5) {
	alert("Your Username is too short");

}
else if ($scope.Pass.length<=5) {
	alert("Your Password is too short");

}
else if ($scope.Pass!=$scope.Password) {
	alert("Incorrect Confirmation");

}


else {
  $http({
    url:"http://www.michaellumantac4gc.esy.es/db/insert.php?register",
    method: "POST",
    data:{
    'Name':$scope.Name,
    'User':$scope.User,
    'Pass':$scope.Pass
    }
  }).success(function(response){
alert("You are registered");
$scope.Name="";
$scope.User="";
$scope.Pass="";
$scope.Password="";
$state.go('LogIn');
  })
}


}
})
.controller('SignOut',function($scope,$http,$state)
{
	$scope.out = function(){
	localStorage.setItem('accounts',JSON.stringify([]));
	$state.go('LogIn');
	}
  $scope.profile = function(){

	$state.go('app.UserProfile');
	}
})
.controller('session',function($scope,$http,$state)
{$scope.saved=localStorage.getItem('accounts');
try{

if(JSON.parse($scope.saved)[0].account!=null){
	$scope.items=(localStorage.getItem('accounts')!="[]")?$state.go('app.search'):$state.go('LogIn');

}
}
catch(e)
{
	$state.go('LogIn');
}


})
.controller('session1',function($scope,$http,$state)
{$scope.saved=localStorage.getItem('accounts');
$scope.One=true;
try{

if(JSON.parse($scope.saved)[0]!=null){
$scope.item=(JSON.parse($scope.saved)[0]);

if($scope.item.guest)
{

$scope.One=false;
}
else {
  var url="http://www.michaellumantac4gc.esy.es/db/select.php?profileuser&username="+$scope.item.account+"";
  $http.post(url).success(function(response){
    $scope.accounts=response;
    var profilepic=document.getElementById('accountimg');
    profilepic.src=$scope.accounts[0].img;
  }).error(function(response){
    alert("No connection");
  });


}
}
else {
  $state.go('LogIn');
}
}
catch(e)
{
	$state.go('LogIn');
}

$scope.takePicture = function () {

  var options = {
    quality: 50,
    destinationType: Camera.DestinationType.DATA_URL,
    sourceType: Camera.PictureSourceType.CAMERA
  };

  // udpate camera image directive
  $cordovaCamera.getPicture(options).then(function (imageData) {

    $scope.cameraimages = "data:image/jpeg;base64," + imageData;
    var url="http://www.michaellumantac4gc.esy.es/db/updatepicture.php?updatepic&img=data:image/jpeg;base64,"+imageData+ "&account="+$scope.item.account+" ";
    $http.post(url).success(function(response){
      $scope.accounts=response;
      var profilepic=document.getElementById('accountimg');
      profilepic.src=$scope.accounts[0].img;
    });
  }, function (err) {
    console.log('Failed because: ');
console.log(err);
  });


};
$scope.updatepic=function()
{
var base64=document.getElementById('accountimg').src;

  // var url="db/updatepicture.php?updatepic&img="+base64+ "&account="+$scope.item.account+" ";
  // $http.post(url).success(function(response){
  //   $scope.accounts=response;
  //
  // });
  $http({
  	url:"http://www.michaellumantac4gc.esy.es/db/updatepicture.php?updatepic",
  	method: "POST",
  	data:{
      'imageinput' : base64,

  	'studentId':$scope.item.account
  	}
  }).success(function(response){
alert("Updating Picture");
  }).error(function(response){
    alert("Not Connected to server")
  })
};
})
.controller('slide',function($scope,$http)
{

 $scope.one=false;
 $scope.two=true;
 $scope.three=true;
 $scope.introduction=function()
 {
	 $scope.one=true;
	 $scope.two=false;
	 $scope.three=false;
 };


})

.controller('WeatherCtrl', function ($scope, $http) {
var url="http://api.openweathermap.org/data/2.5/weather?APPID=f5af0170692e394adb6673fb0679cf10&lat=14.836620&lon=120.294113";
$http.get(url).success(function(response){
$scope.data=response;
$scope.weather=$scope.data.weather;
$scope.class="Class is NOT Suspended";
}).error(function(response){
  alert("No Connection");

})
  })
;
