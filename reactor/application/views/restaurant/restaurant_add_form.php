<h2>Add Item</h2>
<?=form_open_multipart($this->uri->segment(1).'/add/'.$format)?>
<fieldset>
	<ul>
		<li>
			<label>Alias <span>(Required)</span></label>
			<?=form_input('restaurantAlias', set_value('restaurantAlias'))?>
			<?=form_error('restaurantAlias')?>
		</li>
		<li>
			<label>Title</label>
			<?=form_input('restaurantTitle', set_value('restaurantTitle'))?>
			<?=form_error('restaurantTitle')?>
		</li>
		<li>
			<label>Base Url</label>
			<?=form_input('restaurantBaseUrl', set_value('restaurantBaseUrl'))?>
			<?=form_error('restaurantBaseUrl')?>
		</li>
		<li>
			<label>Data Url</label>
			<?=form_input('restaurantDataUrl', set_value('restaurantDataUrl'))?>
			<?=form_error('restaurantDataUrl')?>
		</li>
		<li>
			<input type="submit" value="Save" name="" class="button">
		</li>
	</ul>
	<ul>
		<!--<li>
			<label>Photo URL</label>
			<?=form_input('photo_url', set_value('photo_url'))?>
			<?=form_error('photo_url')?>
		</li>
		<li>
			<label>Thumb URL</label>
			<?=form_input('thumb_url', set_value('thumb_url'))?>
			<?=form_error('thumb_url')?>
		</li>-->

		
	</ul>
</fieldset>
<?=form_close()?>