angular.module('starter.controllers',[])
.controller('Search',function($scope,$http)
{
done();

function done(){setTimeout(function()
	{updates();
	done();},1000);
	}

function updates(){$scope.saved=localStorage.getItem('reports');
	$scope.items=(localStorage.getItem('reports')!=null)?JSON.parse($scope.saved):[{title:'',done:false}];
};
})
.controller('TodoController',function($scope,$http,$state, $ionicHistory){

		$scope.addReport1=function(){

		 $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';

		$http({
			url:"http://localhost/c4gc/db/insert.php",
			method: "POST",
			data:{
			'report': $scope.report,
			'studentId': $scope.studentId

			}
		})
.success(function(response){
                    console.log(response);
					var som=response;
					if(som!=null)
					{
						 $scope.addToLocal();
					}
					else{
					$scope.report='';
					$scope.studentId='';
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
	$scope.reports=(localStorage.getItem('reports')!=null)?JSON.parse($scope.saved):[];
	localStorage.setItem('reports',JSON.stringify($scope.report));

		console.log("its here");

		var report= $scope.report;
			$scope.reports.push({
				description:$scope.report,
				StudentId:$scope.studentId,
				done:false
			});

			$scope.report='';
			$scope.studentId='';
			localStorage.setItem('reports',JSON.stringify($scope.reports));




	};

	$scope.remove=function(item){
		var index = $scope.reports.indexOf(item);
	 $scope.reports.splice(index,1);
	localStorage.setItem('reports', JSON.stringify($scope.reports));

	};
	$scope.add=function(item){
		 var index = $scope.reports.indexOf(item);
		$scope.reports.splice(index,1);
   localStorage.setItem('reports', JSON.stringify($scope.reports));
	};
})

;
