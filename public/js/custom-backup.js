/**
 *  Contact Form Script With Vue And Laravel
 *
 *  Author : Emad Rashad
 *
 *  Year : 2017 @ August
 *
 *  Description : simple script with amazing little framework for handling errors on
 *  ecmascript way through our beautiful Errors and Form Class
 *
 *
 *
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


    any(){


        // we wanna check our errors object if it is empty
        // Object.keys will give us first_name , last_name etc
        // if the lenght of keys returned > zero
        // then our errors object is not empty
        // then it will return true and disabled will be active
        return Object.keys(this.errors).length > 0 ;

    }



}




class Form {

    // now we need a constructor

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

      // a function that responsible for figuring out what the data payload should be
      // we have to figure what is the data it will be tricky cause the data is
      // this.first_name , etc .... but this needs to be dynamic we can't make it specific right
      // then we need to clone this object

      // let data = Object.assign({} , this);

      /**
       * result of cloning the object will bw
       * {all fields , but we will still have originalData , errors }
       * and all what i need is my elements only
       * so we can delete other stuff cool right
       */
      // delete data.originalData ;
      // delete data.errors ;


      // another way to fetch relevant form elements
      // is to filter through the original data

      let data = {} ;
      for( let property in this.originalData){

        data[property] = this[property];

      }


      // then we return our clean data elements

      return data ;



    }




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



      // its reasonable that our axios call goes here
      // we no longer use this.$data
      // we gonna use some kind of data() methond in this class
      //
      // our javacript axios here does give us a promise
      // so may be we can handle it inside our new promise

      // axios[requestType](endPoint , this.data() )
      // .then(this.onSuccess.bind(this))
      // .catch(this.onFail.bind(this))


    }


    // so after edits in axios inside promise
    // onSuccess methods accepts data object

    onSuccess(data){


        // one issue when this method and onFail get called it gets rebound
        // so this keyword would no longer refer to our form object
        // what we need to do is to bind this object to these methods

        // alert(data.message);


        // adding sweet alert

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


          // we decided that our form will be processed through form submit function
          //
          // this.form.submit('post','/contact')
          //
          // // axios.post('/contact' , this.$data)
          // // .then(this.onSuccess)
          // // .catch(error => {
          // //
          // //     //  this.errors = error.response.data
          // //     this.form.errors.record(error.response.data);
          // // })
          // //
          // //
          // // we wanna hook our vue instance to add more functionality to it
          // // maybe we wanna to proccess data or relocate somewhere
          // // so we need to use .then() and thats uses promises
          // // promise in short words is an object that we can use in any asynchrohnus request
          // // its like shaking your hands like i don't have information  you need but i promise you that when i do
          // // i will let you know  --- via this .then() method and if we didn't we will inform you via .catch() method
          // // so it looks like we wanna return our new promise in submit() function
          // .then(data => console.log(data))
          // .catch(errors => console.log(errors))






          // after adding our post() function we could say  like this

          this.form.post('/contact')
          .then(data =>{

                // get our vue instance assign it to variable
                var self = this ;
                /**
                 * setTimeout function to make a delay with 3 seconds
                 * @return {[type]} [description]
                 */
                setTimeout(function(){
                  // then after show something
                  self.hideDisabled = false ;
                  self.wowActive = true ;
                  self.pulseActive = true ;
            }, 3000);




          })
          .catch(errors => console.log(errors))

        }



    }



})
