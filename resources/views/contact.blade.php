<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <title>Vue Js Form</title>

    <!-- bulma css -->
    <!-- <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.4.4/css/bulma.css"> -->
    <!-- Bootstrap -->
    <link href="{{ asset('/css/bootstrap.css') }}" rel="stylesheet">



    <!-- Google Lato Font -->
    <link href="https://fonts.googleapis.com/css?family=Lato:300,400,700,900" rel="stylesheet">

		<!-- animate in css -->
		<link rel="stylesheet" href="{{ asset('/css/animate.css') }}">

    <!--  Sweet Alert Css -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/sweetalert/1.1.3/sweetalert.css">

    <!-- Custom Style -->
    <link rel="stylesheet" href= "{{ asset('/css/custom.css') }}">


    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>
  <body >



    <!-- section Intro -->
    <section id="intro">
        <div class="container text-center centering">


                <h1 class="header wow fadeIn" data-wow-duration="2s" data-wow-delay=".5s">Contact Us Form Using <strong   class="wow fadeInUpBig highlightStrong"  data-wow-duration=".8s"  data-wow-iteration="infinite">Vue</strong></h1>
                <p class="description wow fadeInUp" data-wow-duration="2.5s" data-wow-delay=".1s">Contact us form that uses vue js ( the future of js frameworks )</p>


        </div>
    </section>
    <!-- end section intro -->

    <!-- contact form -->
    <section id="contact" >
      <div class="container" id="app">
        <div class="row">
          <div class="col-md-6 col-sm-6 col-xs-12 contact-form">
              <h3 class="section-heading wow pulse  " data-wow-duration="2.5s" data-wow-delay="1s"  data-wow-offset="200" >Get In <strong> Touch</strong></h3>
              <form   id="contact_form" @submit.prevent="onSubmit" @keydown="form.errors.clear($event.target.id)">
                <div class="row">
                  <div class="col-md-6 col-sm-12">
                    <div class="form-group">
                      <input type="text" class="form-control field" id="first_name" name="first_name"    placeholder="first name" v-model="form.first_name" >
											<span class="help p-error  "  v-text="form.errors.get('first_name')"> </span>

                    </div>
                  </div>
                  <div class="col-md-6 col-sm-12">
                    <div class="form-group">
                      <input type="text" class="form-control field" id="last_name" name="last_name"    placeholder="last name" v-model="form.last_name">
											<span class="help p-error" v-text="form.errors.get('last_name')"> </span>
                    </div>
                  </div>
                  <div class="col-md-6 col-sm-12">
                    <div class="form-group">
                      <input type="text" class="form-control field" id="email" name="email"   placeholder="email" v-model="form.email">
												<span class="help p-error" v-text="form.errors.get('email')"> </span>

                    </div>
                  </div>
                  <div class="col-md-6 col-sm-12">
                    <div class="form-group">
                      <input type="text" class="form-control field" id="subject" name="subject"      placeholder="subject" v-model="form.subject">
											<span class="help p-error" v-text="form.errors.get('subject')"> </span>

                    </div>
                  </div>
                  <div class="col-md-12 col-sm-12">
                    <div class="form-group">
                      <textarea     placeholder="message " id="message" name="message"   class="form-control field"  v-model="form.message"></textarea>
												<span class="help p-error" v-text="form.errors.get('message')"> </span>

                    </div>
                  </div>
                  <div class="col-md-12 col-sm-12">
                    <div class="form-group">
                      <input type="submit" id="btn-submit"   :disabled="form.errors.any()"  class="form-button btn  btn-block"  >
                    </div>
                  </div>
                  <div class="col-md-12 col-sm-12">
                    <div class="form-group">
                      <p class="alert alert-success " v-bind:class="{'wow':wowActive , 'pulse':pulseActive , 'hide':hideDisabled}" data-wow-duration="2s"><strong>Congratulations</strong> for delivering you message </p>
                    </div>
                  </div>
                </div>
              </form>
          </div>
          <div class="col-md-6 col-sm-6 col-xs-12" >

              <!-- google map goes here -->
              <iframe class="google-map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6907.3158284664205!2d31.237038583338016!3d30.04667051570155!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xeb759d732c09f189!2sTahrir+Square!5e0!3m2!1sen!2seg!4v1501694112541"   frameborder="0" style="border:0" allowfullscreen></iframe>

          </div>
        </div>
      </div>
    </section>
      <!--   contact end -->


      <!-- Footer Start -->
      <footer id="footer">
          <div class="container text-center ">

            <div class="copyright text-center">
              &copy; My <strong>Contact</strong> all rights reserved
            </div>
          </div>
      </footer>
      <!-- Footer End -->


    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="js/bootstrap.js"></script>


    <!-- Vue js script File -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.4.2/vue.js"></script>
    <!-- Axios js File  -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.16.2/axios.js"></script>

    <!-- Sweet Alert js -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/sweetalert/1.1.3/sweetalert.min.js"></script>

		<script src="{{ asset('/js/wow.js') }}"></script>
		<script>
				new WOW().init();
		</script>

    <!-- custom script -->
    <script src="js/custom.js"></script>
  </body>
</html>
