jQuery(document).ready(function($){

	checkStatus();

	function checkStatus(){
		$.ajax({
			url : 'assets/back/php/status.php',
			method : 'POST',
			success: function(data){
				if(data == 1)
				{
					window.location = "posts.html";	
				}
			}
		})
	}

	
	$('.sign-submit').click(function(e){
		e.preventDefault();
	var username = $('.sign-username').val();
	var password = $('.sign-password').val();
	if(username != '' && password != ''){
		$.ajax({
			url : 'assets/back/php/sign-in.php',
			method : 'POST',
			data : { username:username, password:password },
			//contentType:false,
			//processData:false,
			success : function(data){
				
				if(data == 1)
				{
					window.location = "posts.html";

				}
				else
				{
					$('.msg-sign').text('invalid');
				}
			}
		});

	}
	});
});