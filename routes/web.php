<?php

// Get Request to end point to fetch contact form view
Route::get('/' , 'ContactController@create');

// Post Request to end point contact to handle the response of our form server 
Route::post('contact' , 'ContactController@contact');
