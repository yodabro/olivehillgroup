<?php

if(!$_POST) exit;

$errors = array();  	// array to hold validation errors
$data	= array(); 		// array to pass back data

// Email address verification, do not edit.
function isEmail($email) {
	return(preg_match("/^[-_.[:alnum:]]+@((([[:alnum:]]|[[:alnum:]][[:alnum:]-]*[[:alnum:]])\.)+(ad|ae|aero|af|ag|ai|al|am|an|ao|aq|ar|arpa|as|at|au|aw|az|ba|bb|bd|be|bf|bg|bh|bi|biz|bj|bm|bn|bo|br|bs|bt|bv|bw|by|bz|ca|cc|cd|cf|cg|ch|ci|ck|cl|cm|cn|co|com|coop|cr|cs|cu|cv|cx|cy|cz|de|dj|dk|dm|do|dz|ec|edu|ee|eg|eh|er|es|et|eu|fi|fj|fk|fm|fo|fr|ga|gb|gd|ge|gf|gh|gi|gl|gm|gn|gov|gp|gq|gr|gs|gt|gu|gw|gy|hk|hm|hn|hr|ht|hu|id|ie|il|in|info|int|io|iq|ir|is|it|jm|jo|jp|ke|kg|kh|ki|km|kn|kp|kr|kw|ky|kz|la|lb|lc|li|lk|lr|ls|lt|lu|lv|ly|ma|mc|md|me|mg|mh|mil|mk|ml|mm|mn|mo|mp|mq|mr|ms|mt|mu|museum|mv|mw|mx|my|mz|na|name|nc|ne|net|nf|ng|ni|nl|no|np|nr|nt|nu|nz|om|org|pa|pe|pf|pg|ph|pk|pl|pm|pn|pr|pro|ps|pt|pw|py|qa|re|ro|ru|rw|sa|sb|sc|sd|se|sg|sh|si|sj|sk|sl|sm|sn|so|sr|st|su|sv|sy|sz|tc|td|tf|tg|th|tj|tk|tm|tn|to|tp|tr|tt|tv|tw|tz|ua|ug|uk|um|us|uy|uz|va|vc|ve|vg|vi|vn|vu|wf|ws|ye|yt|yu|za|zm|zw)$|(([0-9][0-9]?|[0-1][0-9][0-9]|[2][0-4][0-9]|[2][5][0-5])\.){3}([0-9][0-9]?|[0-1][0-9][0-9]|[2][0-4][0-9]|[2][5][0-5]))$/i",$email));
}

if (!defined("PHP_EOL")) define("PHP_EOL", "\r\n");

$name     = $_POST['name'];
$email    = $_POST['email'];
$phone   = $_POST['phone'];
$subject   = $_POST['subject'];
$comments = $_POST['comments'];


if(trim($name) == '') {
	$errors['name'] = 'Attention! You must enter your name.';	
} else if(trim($email) == '') {
	$errors['email'] = 'Attention! Please enter a valid email address.';	
} else if(!isEmail($email)) {
	$errors['email'] = 'Attention! You have enter an invalid e-mail address, try again.';	
} else if(trim($phone) == '') {
	$errors['phone'] = 'Attention! Please enter a valid phone number.';	
} else if(!is_numeric($phone)) {
	$errors['phone'] = 'Attention! Phone number can only contain digits.';	
}  else if(trim($comments) == '') {
	$errors['comments'] = 'Attention! Please enter your message.';	
} 

if(get_magic_quotes_gpc()) {
	$comments = stripslashes($comments);
}

// if there are any errors in our errors array, return a success boolean of false
	if ( ! empty($errors)) {

		// if there are items in our errors array, return those errors
		$data['success'] = false;
		$data['errors']  = $errors;
	} else {


            // Configuration option.
            // Enter the email address that you want to emails to be sent to.
            // Example $your_email_address = "joe.doe@yourdomain.com";

            //$your_email_address = "example@themeforest.net";
            $your_email_address = "enter_your_email_address";


            // Configuration option.
            // i.e. The standard subject will appear as, You've been contacted by John Doe."

            // Example, $e_subject = '$name . ' has contacted you via Your Website.';

            $e_subject = 'You\'ve been contacted by ' . $name . '.';


            // Configuration option.
            // You can change this if you feel that you need to.
            // Developers, you may wish to add more fields to the form, in which case you must be sure to add them here.

            $e_body = "You have been contacted by: $name" . PHP_EOL . PHP_EOL;
            $e_reply = "E-mail: $email\r\nPhone: $phone";
            $e_content = "Message:\r\n$comments" . PHP_EOL . PHP_EOL;


            $msg = wordwrap( $e_body . $e_content . $e_reply, 70 );

            $headers = "From: $email" . PHP_EOL;
            $headers .= "Reply-To: $email" . PHP_EOL;
            $headers .= "MIME-Version: 1.0" . PHP_EOL;
            $headers .= "Content-type: text/plain; charset=utf-8" . PHP_EOL;
            $headers .= "Content-Transfer-Encoding: quoted-printable" . PHP_EOL;

            if(mail($your_email_address, $e_subject, $msg, $headers)) {

                // Email has sent successfully, echo a success page.                    
               // show a message of success and provide a true success variable
                $data['success'] = true;
                $data['message'] = "Thank you <strong>$name</strong>, your message has been submitted to us.";                   

            } else {

                $data['success'] = false;
                $errors['error'] = "Please try again.";               
		$data['errors']  = $errors;
            }

}
// return all our data to an AJAX call
	echo json_encode($data);