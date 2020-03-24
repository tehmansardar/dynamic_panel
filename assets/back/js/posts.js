jQuery(document).ready(function($){


var action = null;	

// * Execution Section
checkStatus();
sessionInfo();
searchResults();
addPost();
loadPosts();
statusPost();
updatePost();
removePost();



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
					return false;
				}
				
			}
		})
	}

	//session info

	function sessionInfo(){
		$.ajax({
				url : "assets/back/php/session_info.php",
				method : "POST",
				dataType : 'JSON',
				contentType:false,
				processData:false,
				success:function(data){
					//sidebar Menu
					$('.side-user-img, .session-image').attr('src', 'data/user/'+data.image);
					$('.side-user-name , .user-title').text(data.firstName +' '+data.lastName );
					$('.user-subtitle').text(data.email);
				}

			});
	}

	//search results
	function searchResults(){
		$('.post-search').keyup(function(e){
			e.preventDefault();
			var search =  $('.post-search').val();
			if(search != '')
			{
				$.ajax({
				url : "assets/back/php/search_post.php",
				method : "POST",
				dataType : 'JSON',
				data : { search : search },
				contentType:false,
				processData:false,
				success:function(data){
					console.log(data);
				}

			});			
			}
		})
	}

	//AddPost

	function addPost(){
		$('#form-submit').on('submit', function(e){
			e.preventDefault();

			$.ajax({
				url : "assets/back/php/add_post.php",
				method : "POST",
				data : new FormData(this),
				dataType : 'JSON',
				contentType:false,
				processData:false,
				success:function(data)
				{	
					if(data.msgTitle != '' || data.msgImage != '' || data.msgCategory != '' || data.msgDesc != '')
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
					if(data.msgTitle == '' && data.msgImage == '' && data.msgCategory == '' && data.msgDesc == '')
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
 								msg: 'Post Added'
 							});
 						}
 						loadPosts();
 						round_success_noti();

 					}
 					
 				}
 			});
		});

	}


	// Post loading
	function loadPosts(){
		$.ajax({
			url:'assets/back/php/posts.php',
			method:'POST',
			dataType : 'JSON',
			//contentType:false,
			//processData:false,
			success:function(data){
				//console.log(data);

				var html = '';
				var checkedd = '';

				data.forEach(function(o){
					
					checkedd = (o.status=='A' ? 'checked' : '');
					html+=`<tr>
					<td>
					<img alt="Image placeholder" src="data/${o.image}" class="product-img">
					</td>
					<td>${o.title}</td>
					<td>${o.day} - ${o.month} - ${o.year}</td>
					<td><img  src="data/user/${o.authorImage}" class="product-img"><span> ${o.author}</span></td>
					<td><i aria-hidden="true" class="fa fa-eye"></i> ${o.views}</td>
					<td>
					<input type="checkbox" `+checkedd+` data-id="${o.id}" class="js-switch radio-switch post-status" data-color="#02ba5a" data-size="small"/>
					</td>
					<td>
					<div class="btn-group m-1" role="group">
					<button type="button" class="btn btn-outline-success waves-effect waves-light dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
					Action
					</button>
					<div class="dropdown-menu">
					<a href="javaScript:void();" class="dropdown-item postEdit" data-toggle="modal" data-target="#Mymodal" data-id="${o.id}">Edit</a>
					<div class="dropdown-divider"></div>
					<a href="javaScript:void();" class="dropdown-item postDel" data-id="${o.id}">Remove</a>
					</div>
					</div>
					</td>
					</tr>`

				});

				/*data.forEach(function (o) {
  checkedd = o.status == 'A' ? 'checked' : '';
  html += "<tr>\n\t\t\t\t\t<td>\n\t\t\t\t\t<img alt=\"Image placeholder\" src=\"data/".concat(o.image, "\" class=\"product-img\">\n\t\t\t\t\t</td>\n\t\t\t\t\t<td>").concat(o.title, "</td>\n\t\t\t\t\t<td>").concat(o.date, "</td>\n\t\t\t\t\t<td><img  src=\"data/user/").concat(o.authorImage, "\" class=\"product-img\"><span> ").concat(o.author, "</span></td>\n\t\t\t\t\t<td><i aria-hidden=\"true\" class=\"fa fa-eye\"></i> ").concat(o.views, "</td>\n\t\t\t\t\t<td>\n\t\t\t\t\t<input type=\"checkbox\" ") + checkedd + " data-id=\"".concat(o.id, "\" class=\"js-switch radio-switch post-status\" data-color=\"#02ba5a\" data-size=\"small\"/>\n\t\t\t\t\t</td>\n\t\t\t\t\t<td>\n\t\t\t\t\t<div class=\"btn-group m-1\" role=\"group\">\n\t\t\t\t\t<button type=\"button\" class=\"btn btn-outline-success waves-effect waves-light dropdown-toggle\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">\n\t\t\t\t\tAction\n\t\t\t\t\t</button>\n\t\t\t\t\t<div class=\"dropdown-menu\">\n\t\t\t\t\t<a href=\"javaScript:void();\" class=\"dropdown-item postEdit\" data-id=\"").concat(o.id, "\">Edit</a>\n\t\t\t\t\t<div class=\"dropdown-divider\"></div>\n\t\t\t\t\t<a href=\"javaScript:void();\" class=\"dropdown-item postDel\" data-id=\"").concat(o.id, "\">Remove</a>\n\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t</td>\n\t\t\t\t\t</tr>");
});*/
	
				$(".posts-load").html(html);

				




				$('.js-switch').each(function() {

					new Switchery($(this)[0], $(this).data());
					
					
				});
			}
		});
	}

	//Status Post
	function statusPost(){
		$(document).on('change', '.post-status', function(){
			var getcheck = $(this).is(':checked');
			var id = $(this).data('id');
			var status = '';
			status = (getcheck == true ? 'A' : 'P');

			$.ajax({
				url : 'assets/back/php/post-status.php',
				method : 'POST',
				data : { id : id , status : status  } 
			});
		});
	}

	
	//Update Post
	function updatePost(){
		//load data post
		$(document).on('click', '.postEdit', function(e){
			e.preventDefault();
			action = 1;
			var id = $(this).data('id');
		//$('.post-title').val(id);
		$.ajax({
			url : 'assets/back/php/update_post.php',
			method : 'POST',
			data : { action : action, id : id },
			dataType : 'JSON',
			success : function(data){
				
		$('.update-id').attr('value', data.id);
		$('.update-title').val(data.title);

       //Category Select
        $('.update-category option').each(function(){
        	if ($(this).attr('value') == data.categories)
    			$(this).attr("selected","selected");
        });
        //Status Select
        $('.update-status option').each(function(){
        	if ($(this).attr('value') == data.status)
    			$(this).attr("selected","selected");
        });

        $('.update-description').val(data.postDesc);


			}
		});
		
	});

	//submit update post
	$(document).on('submit','#update-submit',function(e){
		e.preventDefault();
		$.ajax({
				url : "assets/back/php/post_update_post.php",
				method : "POST",
				data : new FormData(this),
				dataType : 'JSON',
				contentType:false,
				processData:false,
				success:function(data){
					
					if(data.msgTitle != '' || data.msgImage != '' || data.msgCategory != '' || data.msgDesc != '')
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


					if(data.msgTitle == '' && data.msgImage == '' && data.msgCategory == '' && data.msgDesc == '')
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
 								msg: 'Post Updated Successfully'
 							});
 						}
 						loadPosts();
 						round_success_noti();

 					}
			}
		});
	});

  }


	//Remove POST
		function removePost(){
			$(document).on('click', '.postDel', function(e){
				e.preventDefault();
				var id = $(this).data('id');
				$.ajax({
					url: 'assets/back/php/remove-post.php',
					method : 'POST',
					data : {id:id},
					success : function(data){
							setTimeout(function(){
								loadPosts();
							}, 300);
					}
				})
			});
		}




//Fields Alerts

	$(document).on('focusout','.post-title',function(){
		var postTitle = $(this).val();
		if(postTitle == '')
		{
			$('.post-title').addClass('fieldAlertBorder');
		}
		else
		{
			$('.post-title').removeClass('fieldAlertBorder');
		}
	});

	$('.post-image').focusout(function(){
		var postImage = $(this).attr('src');
		if(postImage == '')
		{
			$('.post-image').addClass('fieldAlertBorder');
		}
		else
		{
			$('.post-image').removeClass('fieldAlertBorder');
		}
	});

	$('.post-category').focusout(function(){
		var postCategory = $(this).val();
		if(postCategory == '')
		{
			$('.post-category').addClass('fieldAlertBorder');
		}
		else
		{
			$('.post-category').removeClass('fieldAlertBorder');
		}
	});

	$('.post-description').focusout(function(){
		var postDescription = $(this).val();
		if(postDescription == '')
		{
			$('.post-description').addClass('fieldAlertBorder');
		}
		else
		{
			$('.post-description').removeClass('fieldAlertBorder');
		}
	});

});