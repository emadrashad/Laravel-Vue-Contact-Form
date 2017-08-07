<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

/**
 * Contact Controller Class
 */
class ContactController extends Controller
{
  /**
   * Fetch and display contact form
   * @return [view] [description]
   */
   public function create()
   {

      return view("contact");

   }


   /**
    * Handle the response of data sent via axios and vue js
    * to our server filter it and see if there are any errors
    * @return [type] [description]
    */
   public function contact(){


   		// Validate request based on form inputs
   		// you  can choose what element to be validate
   		// it's all up to you all things are clreared now  !
   		$this->validate(request() , [

   			'first_name'=>'required',
   			'last_name'=>'required',
   			'email'=>'required',
   			'subject'=>'required',
   			'message'=>'required',

   		]);




      // the next step here is to actually send an email to some end point email
      // maybe you wanna send a copy to website admin -- moderator  whatever you get the idea

      


   		// finally tell us that you are succeeded
   		return ['message'=>'project created'];

   }
}
