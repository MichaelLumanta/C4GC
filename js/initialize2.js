var loadIt= function(event){
var file1=document.getElementById('fileholder');

if(file1.files[0].size>5000000000)
{alert("Only 5Mb of image is allowed");}
  else{
  var reader1= new FileReader();
  reader1.onload =function(){
    var output1=document.getElementById('accountimg');
    output1.src=reader1.result;

  };
  reader1.readAsDataURL(event.target.files[0]);}
};
