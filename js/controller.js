angular.module('starter.controllers',[])
.controller('Search',function($scope,$http)
{
done();

function done(){setTimeout(function()
	{updates();
	done();},100);
	}

function updates(){$scope.saved=localStorage.getItem('reports');
	$scope.items=(localStorage.getItem('reports')!=null)?JSON.parse($scope.saved):[{title:'',done:false}];
};
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
			'category': $scope.Category
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
				StudentId:$scope.studentId,
				done:false
			});
	    $scope.Category='';
			$scope.report='';
			$scope.studentId='';
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
$http({
	url:"http://localhost/c4gc/db/insert.php",
	method: "POST",
	data:{
	'report': $scope.desc,
	'studentId': $scope.num,
'category': $scope.category
	}
}).success(function(response){

	$scope.reports.splice(item,1);
 localStorage.setItem('reports', JSON.stringify($scope.reports));

})

//		$scope.reports.splice(item),1);
//   localStorage.setItem('reports', JSON.stringify($scope.reports));
	};
})

;
