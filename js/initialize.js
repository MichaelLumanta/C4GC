var loadFile= function(event){
var file=document.getElementById('fileholder');

if(file.files[0].size>5000000000)
{alert("Only 5Mb of image is allowed");}
  else{
  var reader= new FileReader();
  reader.onload =function(){
    var output=document.getElementById('userimg');
    output.src=reader.result;
  };
  reader.readAsDataURL(event.target.files[0]);}
};
