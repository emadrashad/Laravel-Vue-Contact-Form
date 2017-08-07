/**
 * Name : Vue Js Contact Form With laravel javascript file
 * Author : Emad Rashad
 * Author Email : emadtab97@gmail.com
 * Description : Custom Script for our contact Form
 * Date : 09/08/2017
 */



/**
 * Ecmascript 6 Class
 * Description :
 * some functions to handle errors dynamic way
 */
class Errors{

    /**
     * Accept Errors
     * @return {[type]} [description]
     */
    constructor(){

      this.errors = {} ;

    }

    /**
     * get errors if found
     * @param  {string} field [input name maybe]
     * @return {string}       [error]
     */
    get(field){

        if(this.errors[field]){

              return this.errors[field][0];

        }

    }


    /**
     * Function to record errors
     * @param  {error} errors [fills errors object with errors ]
     * @return {none}
     */
    record(errors){

        this.errors = errors

    }


    /**
     * Clear Error Function
     * @param  {field} field [remove error for field from this object ]
     * @return {delete}       [description]
     */
    clear(field){

        // this.errors[field][0] = '' ;  -- thats one way

        // i can use delete
        // delete this.errors[field];
        //
        // so after updates in Form class
        // we can check if errors found in specific field

        if(field){
          delete this.errors[field];
        }else{


          this.errors = {} ; // or make it empty


        }






    }


    /**
     * Check if element has an error
     * @param  {[type]}  field [description]
     * @return {Boolean}       [description]
     */
    has(field){

        // we wanna say if this.errros has its own property
        return this.errors.hasOwnProperty(field);

    }

    /**
     * Check if there are any error found in our form
     * @return {[type]} [description]
     */
    any(){


        // we wanna check our errors object if it is empty
        // Object.keys will give us first_name , last_name etc
        // if the lenght of keys returned > zero
        // then our errors object is not empty
        // then it will return true and disabled will be active
        return Object.keys(this.errors).length > 0 ;

    }



}



/**
 * Ecmascript 6 Class
 * Description :
 * some functions to handle Form it self in a dynamic way
 */
class Form {

    // now we need a constructor


    /**
     * Form constructor that accepts form elements
     * as well as initialize new errors instance
     * @param  {[type]} data [description]
     * @return {[type]}      [description]
     */

    constructor(data){

        // 1- i can say that
        // but in this case i will say this.data.first_name and i wanna it like that this.first_name etc
        // this.data = data ;
        this.originalData = data ;

        // so we will filter through data  and get our fields
        for(let field in data){

            this[field] = data[field] ;

        }



        // may be form can be responsible for errors
        // so we can say
        this.errors = new Errors();

    }


    /**
     * Fetch all relavent data for the form
     * @return {[type]} [description]
     */
    data(){


      let data = {} ;
      for( let property in this.originalData){

        data[property] = this[property];

      }


      // then we return our clean data elements

      return data ;



    }



    /**
     * Reset Form Fields
     */
    reset(){

        // we can't just say this.data = {empty object }
        // cause in fact this this.data is a pointer to the original data
        // so may what we can do is filter through the originalData and then update the properties in the form

        for(let field in this.originalData){

            // find the field and then update it to empty string
            this[field] = '' ;
        }

        // if we reset the form its logical that our errors are cleared !
        this.errors.clear();


    }




    /**
     * make a post request
     * @param  {[type]} url [description]
     * @return {[type]}     [description]
     */
    post(url){
        return this.submit('post' , url);
    }

    /**
     * make a delete request
     * @param  {[type]} url [description]
     * @return {[type]}     [description]
     */
    delete(url){
      return this.submit('delete', url)
    }


    /**
     * make a patch request
     * @param  {[type]} url [description]
     * @return {[type]}     [description]
     */
    patch(url){
      return this.submit('put' , url);
    }


    /**
     * Handle Submission of our Form
     * @param  {[type]} requestType [type of request  - post -get  etc ]
     * @param  {[type]} endPoint    [endpoint url ]
     * @return {[type]}             [description]
     */
    submit(requestType,endPoint){



      /**
       * Short notices
       * when we call form.submit
       * we will return new promise
       * so everything will be triggered immediately
       *
       */


       /**
        * New Promise
        * @param resolve => if anything went in good we will call resolve
        * @param reject  => if anything fails we will call reject
        */
       return new Promise((resolve , reject) => {


           axios[requestType](endPoint , this.data() )
           .then(response => {

              // then we delegate onSuccess() function
              this.onSuccess(response.data);

              // and then we will call resolve
              // just like hey i got the information and here is the data associated
              resolve(response.data);

           })
           .catch(error => {

              this.onFail(error.response.data);


              reject(error.response.data);

           })

       });





    }


    // so after edits in axios inside promise
    // onSuccess methods accepts data object

    onSuccess(data){

        /**
         * Sweet Alert library
         * initialize a sweet alert box
         * @param  {[type]} title    [title of alert]
         * @param  {[type]} text     [text in body of alert]
         * @param  {[type]} imageUrl [image url for image displayed ]
         * @return {[type]}          [description]
         */
        swal({
          title: "Congratulations!",
          text: "Your Message Has been Delivered.",
          imageUrl: "../images/thumbs-up.jpg"
        });

        // and after alerting we have to clear our errors
        // we can say
        // this.errors.clear();

        // we take this.errors.clear() out from here and put it in reset() function

        // please reset our nicely form :-D
        this.reset();

    }


    /**
     * [onFail description] handle a failed form submission
     * @param  {object} errors [description]
     * @return {[type]}        [description]
     */
    onFail(errors){

      sweetAlert("Oops...", "Something went wrong!", "error");

      this.errors.record(errors);


    }


}


/**
 * Vue Instance
 * @version 2.4.2
 * @type {Vue framework}
 */
new Vue({


    el:'#app',

    data:{

      // to reach back the form elements
      // data elements should be stored inside new form object
      form: new Form({


        // to make things clear
        // these below elements are the originalData
        first_name:'',
        last_name:'',
        email:'',
        subject:'',
        message:''

      }),
      hideDisabled:true,
      wowActive:false ,
      pulseActive:false




    },

    methods:{


        onSubmit(){

          // after adding our post() function we could say  like this

          this.form.post('/contact')
          .then(data =>{
              // actually you can do any other stuff here
              console.log(data);

          })
          .catch(errors => console.log(errors))

        }



    }



});
