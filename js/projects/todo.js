$(document).ready(function () {
	$('#new-list-item').keypress(function (e) {
		if (e.which === 13) {
			$('#list').append(
				'<li style="margin-bottom: -20px">' +
					'<div class="input-group">' +
						'<input type="text" class="form-control list-group-item list-group-item-info" value="' +
						$('#new-list-item').val() + '" style="background-color: #fff; color: #000; height: 44px" onfocus="this.blur()" readonly/>' +
						'<span class="input-group-btn">' +
							'<button class="btn btn-default remove"><i class="fa fa-times"></i></button>' +
						'</span>' +
					'</div>' +
				'</li>'
			);
			
			$('#example-list').remove();
			$('.remove').on('click', function() { $(this).closest('li').remove(); });
		}
	});
});