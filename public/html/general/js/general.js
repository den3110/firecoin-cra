function open_popup(id, focusid) {
	$('#' + id).bPopup();
	if (focusid)
		$('#' + focusid).focus();
}

function close_popup(id)
{
	$('#' + id).bPopup().close();
}