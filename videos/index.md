---
layout: default
title: Videos
---

<div class='modal fade' id='youtubeModal' tabindex='-1' role='dialog' aria-labelledby='modalLabel'>
	<div class='modal-dialog' role='document'>
		<div class='modal-content'>
			<div class='modal-body'>
				<div id='videoModal'>
					
				</div>
			</div>
			<div class='modal-footer'>
				<button id='closeModal' type='button' class='btn btn-default' data-dismiss='modal'>Close</button>
			</div>
		</div>
	</div>
</div>
<div class="videoContainer">
	<div class="img">
		<div id='51umZuwk74E' class='video'>
		</div>
		<div class="description">Introdução ao Canal</div>
	</div>
</div>
<div class="videoContainer">
	<div class="img">
		<div id='fkG6Kxh-mWQ' class='video'>
		</div>
		<div class="description">Programar em Python #01 - Instalação</div>
	</div>
</div>
<div class="videoContainer">
	<div class="img">
		<div id='6_nEyXIayA0' class='video'>
		</div>
		<div class="description">Programar em Python #02 - Função print() e Strings</div>
	</div>
</div>
<div class="videoContainer">
	<div class="img">
		<div id='Gj_IiwOOVSs' class='video'>
		</div>
		<div class="description">Programar em Python #03 - Operadores Aritméticos</div>
	</div>
</div>
<div class="videoContainer">
	<div class="img">
		<div id='LIBRw9IO1sk' class='video'>
		</div>
		<div class="description">Programar em Python #04 - Variáveis</div>
	</div>
</div>
<div class="videoContainer">
	<div class="img">
		<div id='ASC94zP4oY4' class='video'>
		</div>
		<div class="description">Programar em Python #05 - Operadores de Atribuição</div>
	</div>
</div>
<div class="videoContainer">
	<div class="img">
		<div id='2a2XVYyRjhY' class='video'>
		</div>
		<div class="description">Programar em Python #06 - Mais sobre as Strings</div>
	</div>
</div>
<div class="videoContainer">
	<div class="img">
		<div id='KBGHi3IV7t8' class='video'>
		</div>
		<div class="description">Programar em Python #07 - Comentários</div>
	</div>
</div>

<script>
	var tag = document.createElement('script');
	var player, firstScriptTag;

	tag.src = 'https://www.youtube.com/iframe_api';
	firstScriptTag = document.getElementsByTagName('script')[0];
	firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

	function onYouTubeIframeAPIReady() { }

	$('.video').each(function() {
		$(this).css('background-image', 'url(//i.ytimg.com/vi/' + this.id + '/hqdefault.jpg)');
		
		$(document).delegate('#' + this.id, 'click', function() {
			player = new YT.Player('videoModal', {
				videoId: this.id,
				events: {
					'onReady': openModal
				}
			});

			function openModal() {
				$('#youtubeModal').modal({backdrop: 'static'});
				player.setPlaybackQuality('highres');
				player.playVideo();
			};
		});
	});

	$('#closeModal').click(function(){
		player.destroy();
	});
</script>