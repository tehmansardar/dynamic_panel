jQuery(document).ready(function($){
	
 var action = null;
// * Execution Section
	checkStatus();
	loadUsers();	
	removeUser();
	addUser();
	updateUser();

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


	// User loading
	
	function loadUsers(){
		$.ajax({
			url : 'assets/back/php/users.php',
			method : 'POST',
			dataType : 'JSON',
			success : function(data){

				var html = '';
				data.forEach(function(o){
					
					html+=`<tr>
					<td>
					<img src="data/user/${o.image}" class="product-img">
					</td>
					<td>${o.name}</td>
					<td>${o.username}</td>
					<td>${o.email}</td>
					<td>${o.role}</td>
					<td>${o.day} - ${o.month} - ${o.year}</td>
					<td>
					<div class="btn-group m-1" role="group">
					<button type="button" class="btn btn-outline-success waves-effect waves-light dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
					Action
					</button>
					<div class="dropdown-menu">
					<a href="javaScript:void();" class="dropdown-item userEdit" data-toggle="modal" data-target="#Mymodal" data-id="${o.id}">Edit</a>
					<div class="dropdown-divider"></div>
					<a href="javaScript:void();" class="dropdown-item userDel" data-id="${o.id}">Remove</a>
					</div>
					</div>
					</td>
					</tr>` 

				});

				/*data.forEach(function (o) {
  checkedd = o.status == 'A' ? 'checked' : '';
  html += "<tr>\n\t\t\t\t\t<td>\n\t\t\t\t\t<img alt=\"Image placeholder\" src=\"data/".concat(o.image, "\" class=\"product-img\">\n\t\t\t\t\t</td>\n\t\t\t\t\t<td>").concat(o.title, "</td>\n\t\t\t\t\t<td>").concat(o.date, "</td>\n\t\t\t\t\t<td><img  src=\"data/user/").concat(o.authorImage, "\" class=\"product-img\"><span> ").concat(o.author, "</span></td>\n\t\t\t\t\t<td><i aria-hidden=\"true\" class=\"fa fa-eye\"></i> ").concat(o.views, "</td>\n\t\t\t\t\t<td>\n\t\t\t\t\t<input type=\"checkbox\" ") + checkedd + " data-id=\"".concat(o.id, "\" class=\"js-switch radio-switch post-status\" data-color=\"#02ba5a\" data-size=\"small\"/>\n\t\t\t\t\t</td>\n\t\t\t\t\t<td>\n\t\t\t\t\t<div class=\"btn-group m-1\" role=\"group\">\n\t\t\t\t\t<button type=\"button\" class=\"btn btn-outline-success waves-effect waves-light dropdown-toggle\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">\n\t\t\t\t\tAction\n\t\t\t\t\t</button>\n\t\t\t\t\t<div class=\"dropdown-menu\">\n\t\t\t\t\t<a href=\"javaScript:void();\" class=\"dropdown-item postEdit\" data-id=\"").concat(o.id, "\">Edit</a>\n\t\t\t\t\t<div class=\"dropdown-divider\"></div>\n\t\t\t\t\t<a href=\"javaScript:void();\" class=\"dropdown-item postDel\" data-id=\"").concat(o.id, "\">Remove</a>\n\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t</td>\n\t\t\t\t\t</tr>");
});*/
	
				$(".users-loads").html(html);

			}
		});
	}


//Remove User
	function removeUser(){
		$(document).on('click', '.userDel', function(e){
			e.preventDefault();
			var id = $(this).data('id');
			$.ajax({
				url: 'assets/back/php/remove_user.php',
				method : 'POST',
				data : {id:id},
				success : function(data){
						setTimeout(function(){
							loadUsers();
						}, 300);
				}
			})
		});
	}




	// Add User
	function addUser(){
		$('#form-submit').on('submit', function(e){
			e.preventDefault();

			$.ajax({
 				url : "assets/back/php/add_user.php",
 				method : "POST",
 				data : new FormData(this),
 				dataType : 'JSON',
				contentType:false,
				processData:false,
 				success : function(data){
 					//console.log(data);
 					if(data.msgFname != '' || data.msgLname != '' || data.msgUsername != '' || data.msgEmail != '' || data.msgPassword != '' || data.msgImage != '' || data.msgRole != '' || data.msgDesc != '')
					{
					 var errorMessages = '';


						if(data.msgFname){
							$('.userFirstName').addClass('fieldAlertBorder');
							errorMessages +=data.msgFname + ' <br>';
						}
						if(data.msgLname){
							$('.userLastName').addClass('fieldAlertBorder');
							errorMessages+=data.msgLname + ' <br>';

						}
						if(data.msgUsername){
							$('.userUserName').addClass('fieldAlertBorder');
							errorMessages+=data.msgUsername +'<br>'
						}
						if(data.msgEmail){
							$('.userEmail').addClass('fieldAlertBorder');
							errorMessages+=data.msgEmail + '<br>'
						}
						if(data.msgPassword){
							$('.userPassword').addClass('fieldAlertBorder');
							errorMessages+=data.msgPassword + '<br>'
						}
						if(data.msgImage){
							$('.userImage').addClass('fieldAlertBorder');
							errorMessages+=data.msgImage + '<br>'
						}
						if(data.msgRole){
							$('.userRole').addClass('fieldAlertBorder');
							errorMessages+=data.msgRole + '<br>'
						}
						if(data.msgDesc){
							$('.userDescription').addClass('fieldAlertBorder');
							errorMessages+=data.msgDesc + '<br>'
						}

						function rounds_error_noti(){
							Lobibox.notify('error', {
								pauseDelayOnHover: true,
								size: 'mini',
						    //rounded: true,
						    delayIndicator: false,
						    continueDelayOnInactiveTab: false,
						    height : 'auto',
						    position: 'top right',
						    messageHeight: 300, 
						    sound : true,
						    msg: errorMessages
						});
						}	

						rounds_error_noti();
					}

					if(data.msgFname == '' && data.msgLname == '' && data.msgUsername == '' && data.msgEmail == '' && data.msgPassword == '' && data.msgImage == '' && data.msgRole == '' && data.msgDesc == '')
					{
						$('#form-submit').trigger('reset');
						setTimeout(function(){
							$('#cardmodal').modal('hide');
						}, 300)
						
 						//alert(data.msgTitle + )
 						function round_success_noti(){
 							Lobibox.notify('success', {
 								pauseDelayOnHover: true,
 								size: 'mini',
 								rounded: true,
 								icon: 'fa fa-check-circle',
 								delayIndicator: false,
 								continueDelayOnInactiveTab: false,
 								position: 'top right',
 								msg: 'User Added'
 							});
 						}
 						loadUsers();
 						round_success_noti();

 					}
 				}

 			});
		});

	}

function updateUser(){
	//load data user
		$(document).on('click', '.userEdit', function(e){
			e.preventDefault();
			action = 1;
			var id = $(this).data('id');
		//$('.post-title').val(id);
		$.ajax({
			url : 'assets/back/php/update_user.php',
			method : 'POST',
			data : { action : action, id : id },
			dataType : 'JSON',
			success : function(data){
		
		$('.update-id').attr('value', data.id);
		$('.updateFirstName').val(data.fname);
		$('.updateLastName').val(data.lname);
		$('.updateUserName').val(data.username);
		$('.updateEmail').val(data.email);

       
        //Status Role
        $('.updateRole option').each(function(){
        	if ($(this).attr('value') == data.role)
    			$(this).attr("selected","selected");
        });

        $('.updateDescription').val(data.desc);


			}
		});
		
	});

	//submit update post
	$(document).on('submit','#update-submit',function(e){
		e.preventDefault();
		$.ajax({
				url : "assets/back/php/user_update_user.php",
				method : "POST",
				data : new FormData(this),
				dataType : 'JSON',
				contentType:false,
				processData:false,
				success:function(data){ console.log(data);
					
					if(data.msgFname != '' || data.msgLname != '' || data.msgUsername != '' || data.msgEmail != '' || data.msgPassword != '' || data.msgImage != '' || data.msgRole != '' || data.msgDesc != '')
					{
						var errorMessages = '';


						if(data.msgTitle){
							$('.post-title').addClass('fieldAlertBorder');
							errorMessages +=data.msgTitle + ' <br>';
						}
						if(data.msgImage){
							$('.post-image').addClass('fieldAlertBorder');
							errorMessages+=data.msgImage + ' <br>';

						}
						if(data.msgCategory){
							$('.post-category').addClass('fieldAlertBorder');
							errorMessages+=data.msgCategory +'<br>'
						}
						if(data.msgDesc){
							$('.post-description').addClass('fieldAlertBorder');
							errorMessages+=data.msgDesc + '<br>'
						}

						function rounds_error_noti(){
							Lobibox.notify('error', {
								pauseDelayOnHover: true,
								size: 'mini',
						    //rounded: true,
						    delayIndicator: false,
						    icon: 'fa fa-times-circle',
						    continueDelayOnInactiveTab: false,
						    height : 'auto',
						    position: 'top right',
						    messageHeight: 300, 
						    sound : true,
						    msg: errorMessages
						});
						}	

						rounds_error_noti();
					}


					if(data.msgFname == '' && data.msgLname == '' && data.msgUsername == '' && data.msgEmail == '' && data.msgPassword == '' && data.msgImage == '' && data.msgRole == '' && data.msgDesc == '')
					{
						$('#update-submit').trigger('reset');
						setTimeout(function(){
							$('#Mymodal').modal('hide');
						}, 300)
						
 						//alert(data.msgTitle + )
 						function round_success_noti(){
 							Lobibox.notify('success', {
 								pauseDelayOnHover: true,
 								size: 'mini',
 								rounded: true,
 								icon: 'fa fa-check-circle',
 								delayIndicator: false,
 								continueDelayOnInactiveTab: false,
 								position: 'top right',
 								msg: 'User Updated Successfully'
 							});
 						}
 						loadUsers();
 						round_success_noti();

 					}
			}
		});
	});
}






//Alerts
$(document).on('focusout','.userFirstName',function(){
		var firstName = $(this).val();
		if(firstName == '')
		{
			$('.userFirstName').addClass('fieldAlertBorder');
		}
		else
		{
			$('.userFirstName').removeClass('fieldAlertBorder');
		}
	});

$(document).on('focusout','.userLastName',function(){
		var lastName = $(this).val();
		if(lastName == '')
		{
			$('.userLastName').addClass('fieldAlertBorder');
		}
		else
		{
			$('.userLastName').removeClass('fieldAlertBorder');
		}
	});

$(document).on('focusout','.userUserName',function(){
		var userName = $(this).val();
		if(userName == '')
		{
			$('.userUserName').addClass('fieldAlertBorder');
		}
		else
		{
			$('.userUserName').removeClass('fieldAlertBorder');
		}
	});

$(document).on('focusout','.userEmail',function(){
		var userEmail = $(this).val();
		if(userEmail == '')
		{
			$('.userEmail').addClass('fieldAlertBorder');
		}
		else
		{
			$('.userEmail').removeClass('fieldAlertBorder');
		}
	});
$(document).on('focusout','.userPassword',function(){
		var userPassword = $(this).val();
		if(userPassword == '')
		{
			$('.userPassword').addClass('fieldAlertBorder');
		}
		else
		{
			$('.userPassword').removeClass('fieldAlertBorder');
		}
	});

	$('.userImage').focusout(function(){
		var userImage = $(this).attr('src');
		if(userImage == '')
		{
			$('.userImage').addClass('fieldAlertBorder');
		}
		else
		{
			$('.userImage').removeClass('fieldAlertBorder');
		}
	});

	$('.userRole').focusout(function(){
		var postCategory = $(this).val();
		if(postCategory == '')
		{
			$('.userRole').addClass('fieldAlertBorder');
		}
		else
		{
			$('.userRole').removeClass('fieldAlertBorder');
		}
	});

	$('.userDescription').focusout(function(){
		var userDescription = $(this).val();
		if(userDescription == '')
		{
			$('.userDescription').addClass('fieldAlertBorder');
		}
		else
		{
			$('.userDescription').removeClass('fieldAlertBorder');
		}
	});



});