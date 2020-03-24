jQuery(document).ready(function($) {
	
checkStatus();
sessionInfo();

// * Functioing Section

	//Check Status

	function checkStatus(){
		$.ajax({
			url : 'assets/back/php/status.php',
			method : 'POST',
			success: function(data){
				if(data == 0)
				{
					window.location = "signin.html";	
				}
				
			}
		})
	}


	//session info

	function sessionInfo(){
		$.ajax({
				url : "assets/back/php/user-profile.php",
				method : "POST",
				dataType : "JSON",
				//contentType:false,
				//processData:false,
				success:function(data){
				
					console.log(data.id);
					//alert(data);
				}

			});
	}
	
});