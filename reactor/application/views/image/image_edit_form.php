<div id="editmast">
	<strong>EDIT ITEM</strong>
	<h2><?=$record->imageUrl?></h2>
</div>
<? $hidden = array('ID' => $record->imageId); ?>
<?=form_open($this->uri->segment(1).'/edit/'.$record->imageId, '', $hidden)?>
<fieldset>
	<ul>
		<li>
			<label>Image URL <span>(Required)</span></label>
			<?=form_input('imageUrl', set_value('imageUrl', $record->imageUrl))?>
			<?=form_error('imageUrl')?>
		</li>
		<li>
			<label>Restaurant Id</label>
			<?=form_input('restaurantId', set_value('restaurantId', $record->restaurantId))?>
			<?=form_error('restaurantId')?>
		</li>
		<li>
			<label>Active</label>
			<?=form_input('imageActive', set_value('imageActive', $record->imageActive))?>
			<?=form_error('imageActive')?>
		</li>
		<li>
			<input type="submit" value="Save" name="" class="button">
		</li>
	</ul>
	<ul>
	</ul>
</fieldset>
<?=form_close()?>