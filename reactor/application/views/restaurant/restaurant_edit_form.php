<div id="editmast">
	<strong>EDIT ITEM</strong>
	<h2><?=$record->restaurantTitle?></h2>
</div>
<? $hidden = array('ID' => $record->restaurantId); ?>
<?=form_open($this->uri->segment(1).'/edit/'.$record->restaurantId, '', $hidden)?>
<fieldset>
	<ul>
		<li>
			<label>Alias <span>(Required)</span></label>
			<?=form_input('restaurantAlias', set_value('restaurantAlias', $record->restaurantAlias))?>
			<?=form_error('restaurantAlias')?>
		</li>
		<li>
			<label>Title</label>
			<?=form_input('restaurantTitle', set_value('restaurantTitle', $record->restaurantTitle))?>
			<?=form_error('restaurantTitle')?>
		</li>
		<li>
			<label>Base Url</label>
			<?=form_input('restaurantBaseUrl', set_value('restaurantBaseUrl', $record->restaurantBaseUrl))?>
			<?=form_error('restaurantBaseUrl')?>
		</li>
		<li>
			<label>Data Url</label>
			<?=form_input('restaurantDataUrl', set_value('restaurantDataUrl', $record->restaurantDataUrl))?>
			<?=form_error('restaurantDataUrl')?>
		</li>
		<li>
			<input type="submit" value="Save" name="" class="button">
		</li>
	</ul>
	<ul>

	</ul>
</fieldset>
<?=form_close()?>