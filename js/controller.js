angular.module('starter.controllers',['ngAnimate'])
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
{  var url="db/select.php";
$http.get(url).success(function(response){
	$scope.items=response;
});
done();

function done(){setTimeout(function()
	{update1();
	done();},100);
	}

function update1(){ var url="db/select.php";
$http.get(url).success(function(response){
	$scope.items=response;
});
}

})
.controller('TodoController',function($scope,$http,$state, $ionicHistory){
	$scope.saved=localStorage.getItem('reports');
	$scope.reports=(localStorage.getItem('reports')!=null)?JSON.parse($scope.saved):[{title:'',done:false}];
	localStorage.setItem('reports',JSON.stringify($scope.reports));
		$scope.addReport1=function(){

		 $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';

		$http({
			url:"http://localhost/c4gc/db/insert.php",
			method: "POST",
			data:{
			'report': $scope.report,
			'studentId': $scope.studentId,
			'category': $scope.Category,
			'location': $scope.location
			}
		})
.success(function(response){

					var som=response;
					console.log(response);
					if(som!=""&& som!=null)
					{
						 $scope.addToLocal();
					}
					else{
					$scope.report='';
					$scope.studentId='';
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

		console.log("its here");

		var report= $scope.report;
			$scope.reports.push({
				category:$scope.Category,
				description:$scope.report,
				location:$scope.location,
				StudentId:$scope.studentId,
				done:false
			});
	    $scope.Category='';
			$scope.report='';
			$scope.studentId='';
			$scope.location='';
			localStorage.setItem('reports',JSON.stringify($scope.reports));




	};

	$scope.remove=function(item){

	 $scope.reports.splice(item,1);
	localStorage.setItem('reports', JSON.stringify($scope.reports));


	};
	$scope.add=function(item){
$scope.desc=item.description;
$scope.num=item.StudentId;
$scope.category=item.category;
$scope.location=item.location;
$http({
	url:"http://localhost/c4gc/db/insert.php",
	method: "POST",
	data:{
	'report': $scope.desc,
	'studentId': $scope.num,
'category': $scope.category,
'location': $scope.location
	}
}).success(function(response){

	$scope.reports.splice(item,1);
 localStorage.setItem('reports', JSON.stringify($scope.reports));

})

//		$scope.reports.splice(item),1);
//   localStorage.setItem('reports', JSON.stringify($scope.reports));
	};
})
.controller('SliderController', function($scope) {
  $scope.images = [{
    src: 'img/1.png',
    title: 'Pic 1'
  }, {
    src: 'img/2.jpg',
    title: 'Pic 2'
  }, {
    src: 'img/3.jpg',
    title: 'Pic 3'
  }, {
    src: 'img/4.png',
    title: 'Pic 4'
  }, {
    src: 'img/5.png',
    title: 'Pic 5'
  }];
})

.directive('slider', function ($timeout) {
  return {
    restrict: 'AE',
	replace: true,
	scope:{
		images: '='
	},
    link: function (scope, elem, attrs) {

		scope.currentIndex=0;

		scope.next=function(){
			scope.currentIndex<scope.images.length-1?scope.currentIndex++:scope.currentIndex=0;
		};

		scope.prev=function(){
			scope.currentIndex>0?scope.currentIndex--:scope.currentIndex=scope.images.length-1;
		};

		scope.$watch('currentIndex',function(){
			scope.images.forEach(function(image){
				image.visible=false;
			});
			scope.images[scope.currentIndex].visible=true;
		});

		/* Start: For Automatic slideshow*/

		var timer;

		var sliderFunc=function(){
			timer=$timeout(function(){
				scope.next();
				timer=$timeout(sliderFunc,5000);
			},5000);
		};

		sliderFunc();

		scope.$on('$destroy',function(){
			$timeout.cancel(timer);
		});

		/* End : For Automatic slideshow*/

    },
	templateUrl:''
  }
});
;
