angular.module('starter.controllers',['ionic','ngCordova'])
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

	 var url="db/select.php?report&account='"+$scope.item+"'";
$http.get(url).success(function(response){
	$scope.items=response;

});


})
.controller('TodoController',function($scope,$http,$state, $ionicHistory){
	$scope.saved=localStorage.getItem('reports');
	$scope.reports=(localStorage.getItem('reports')!=null)?JSON.parse($scope.saved):[];
	localStorage.setItem('reports',JSON.stringify($scope.reports));
		$scope.addReport1=function(){

			$scope.saved=localStorage.getItem('accounts');
				$scope.account=(localStorage.getItem('accounts')!=null)?JSON.parse($scope.saved):[{accounts:'',done:false}];

		 $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';

		$http({
			url:"http://localhost/c4gc/db/insert.php?report",
			method: "POST",
			data:{
			'report': $scope.report,
			'studentId': $scope.account[0].account,
			'category': $scope.Category,
			'location': $scope.location
			}
		})
.success(function(response){

					if(response.match("fail"))
					{
						 $scope.addToLocal();
					}
					else{
					$scope.report='';
					$scope.Category='';
					$scope.location='';
					}
                });

	};
		$scope.addReport=function(){
		var report=$scope.report;
		var studId=$scope.studentId;
		if(report==null)
		{console.log("No Description");}
	else{$scope.addReport1();}
	};



	$scope.addToLocal=function(){
	$scope.saved=localStorage.getItem('reports');
	$scope.reports=(localStorage.getItem('reports')!=null)?JSON.parse($scope.saved):JSON.parse($scope.saved);
	localStorage.setItem('reports',JSON.stringify($scope.reports));
	$scope.saved=localStorage.getItem('accounts');
		$scope.account=(localStorage.getItem('accounts')!=null)?JSON.parse($scope.saved):[{accounts:'',done:false}];



		var report= $scope.report;
			$scope.reports.push({
				category:$scope.Category,
				description:$scope.report,
				location:$scope.location,
				StudentId:$scope.account[0].account,
				done:false
			});
	    $scope.Category='';
			$scope.report='';

			$scope.location='';
			localStorage.setItem('reports',JSON.stringify($scope.reports));




	};

	$scope.remove=function(item){

	 $scope.reports.splice(item,1);
	localStorage.setItem('reports', JSON.stringify($scope.reports));


	};
	$scope.add=function(item){
$scope.desc=item.description;

$scope.category=item.category;
$scope.location=item.location;
$scope.saved=localStorage.getItem('accounts');
	$scope.account=(localStorage.getItem('accounts')!=null)?JSON.parse($scope.saved):[{accounts:'',done:false}];

$http({
	url:"http://localhost/c4gc/db/insert.php?report",
	method: "POST",
	data:{
	'report': $scope.desc,
	'studentId': $scope.account[0].account,
'category': $scope.category,
'location': $scope.location
	}
}).success(function(response){
	if(response.match("Worked"))
	{
		$scope.reports.splice(item,1);
	 localStorage.setItem('reports', JSON.stringify($scope.reports));
	}


})

//		$scope.reports.splice(item),1);
//   localStorage.setItem('reports', JSON.stringify($scope.reports));
	};
}).controller('SignIn',function($scope,$http,$state)
{

 $scope.submit= function(){

		var url="db/select.php?studentaccounts&username="+$scope.username+"&password="+$scope.password+"";
		$http.get(url).success(function(response){
			$scope.accounts=response;

 			if($scope.accounts=="Error: Data not Found..")
			{var url="db/select.php?guest&username='"+$scope.username+"'&password='"+$scope.password+"'";
		$http.get(url).success(function(response){
			$scope.accounts=response;

			if($scope.accounts.length>0)
			{
				$scope.saved=localStorage.getItem('accounts');
				$scope.reports=(localStorage.getItem('accounts')!=null)?[{account:$scope.username,done:false}]:[{account:$scope.username,done:false}];
				localStorage.setItem('accounts',JSON.stringify($scope.reports));
$state.go('Landing');

			}
			});
			}
			else{

					if($scope.username == $scope.accounts[0].StudentID && $scope.password == $scope.accounts[0].Password)
					{
						$scope.saved=localStorage.getItem('accounts');
						$scope.reports=(localStorage.getItem('accounts')!=null)?[{account:$scope.username,done:false}]:[{account:$scope.username,done:false}];
						localStorage.setItem('accounts',JSON.stringify($scope.reports));
		$state.go('Landing');
					}
		}



	});

}

$scope.Register=function(){

	$scope.username=$scope.User;
	$scope.password=$scope.password;
	var url="db/select.php?guests&username='"+$scope.username+"'";
	$http.get(url).success(function(response){
	$scope.accounts=response;

	if ($scope.User==$scope.accounts[0].Username) {
	alert("Username already taken");


	}
	});


	var url="db/select.php?guestsname&username='"+$scope.Name+"'";
	$http.get(url).success(function(response){
	$scope.account=response;

	 if ($scope.Name==$scope.account[0].FullName) {
	alert("Full Name already taken");

}
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
		url:"http://localhost/c4gc/db/insert.php?register",
		method: "POST",
		data:{
		'Name': $scope.Name,
		'User': $scope.User,
		'Pass': $scope.Pass

		}
	})
.success(function(response){


				if(response.match("Worked")){
$state.go('LogIn')
alert("You are Registerd \nLog In below");
}
else{

}

							});
}


}
})
.controller('SignOut',function($scope,$http,$state)
{
	$scope.out = function(){
	localStorage.setItem('accounts',JSON.stringify([]));
	$state.go('LogIn');
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
try{

if(JSON.parse($scope.saved)[0].account!=null){
	$scope.items=(localStorage.getItem('accounts')!="[]")?$state.go('app.Profile'):$state.go('LogIn');
$scope.item=(JSON.parse($scope.saved)[0].account);
}
}
catch(e)
{
	$state.go('LogIn');
}


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
.controller('PictureCtrl', function($scope, $cordovaCamera,$cordovaFile) {
	$scope.images = [];

	$scope.addImage = function() {
		// 2
		var options = {
			destinationType : Camera.DestinationType.FILE_URI,
			sourceType : Camera.PictureSourceType.CAMERA, // Camera.PictureSourceType.PHOTOLIBRARY
			allowEdit : false,
			encodingType: Camera.EncodingType.JPEG,
			popoverOptions: CameraPopoverOptions,
		};

		// 3
		$cordovaCamera.getPicture(options).then(function(imageData) {

			// 4
			onImageSuccess(imageData);

			function onImageSuccess(fileURI) {
				createFileEntry(fileURI);
			}

			function createFileEntry(fileURI) {
				window.resolveLocalFileSystemURL(fileURI, copyFile, fail);
			}

			// 5
			function copyFile(fileEntry) {
				var name = fileEntry.fullPath.substr(fileEntry.fullPath.lastIndexOf('/') + 1);
				var newName = makeid() + name;

				window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function(fileSystem2) {
					fileEntry.copyTo(
						fileSystem2,
						newName,
						onCopySuccess,
						fail
					);
				},
				fail);
			}

			// 6
			function onCopySuccess(entry) {
				$scope.$apply(function () {
					$scope.images.push(entry.nativeURL);
					console.log($scope.images);
				});
			}

			function fail(error) {
				console.log("fail: " + error.code);
			}

			function makeid() {
				var text = "";
				var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

				for (var i=0; i < 5; i++) {
					text += possible.charAt(Math.floor(Math.random() * possible.length));
				}
				return text;
			}

		}, function(err) {
			console.log(err);
		});
	}
	$scope.urlForImage = function(imageName) {
	  var name = imageName.substr(imageName.lastIndexOf('/') + 1);
	  var trueOrigin = cordova.file.dataDirectory + name;
	  return trueOrigin;
	}
});
;
