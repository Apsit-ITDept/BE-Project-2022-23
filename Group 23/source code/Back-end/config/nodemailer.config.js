const nodemailer = require("nodemailer");
const api_keys = require('./env.config');

/**
 * @param  {String} email Email of Reciever
 * @param  {String} url URL with Validity Token
 */
const sendEmail = async (email, url) => {
  try {
    // msg details
    const message = `<!DOCTYPE html>

<html lang="en" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:v="urn:schemas-microsoft-com:vml">

<head>
	<title></title>
	<meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
	<meta content="width=device-width, initial-scale=1.0" name="viewport" />
	<style>
		* {
			box-sizing: border-box;
		}

		body {
			margin: 0;
			padding: 0;
		}

		a[x-apple-data-detectors] {
			color: inherit !important;
			text-decoration: inherit !important;
		}

		#MessageViewBody a {
			color: inherit;
			text-decoration: none;
		}

		p {
			line-height: inherit
		}

		.desktop_hide,
		.desktop_hide table {
			mso-hide: all;
			display: none;
			max-height: 0px;
			overflow: hidden;
		}

		@media (max-width:690px) {

			.desktop_hide table.icons-inner,
			.social_block.desktop_hide .social-table {
				display: inline-block !important;
			}

			.icons-inner {
				text-align: center;
			}

			.icons-inner td {
				margin: 0 auto;
			}

			.fullMobileWidth,
			.row-content {
				width: 100% !important;
			}

			.mobile_hide {
				display: none;
			}

			.stack .column {
				width: 100%;
				display: block;
			}

			.mobile_hide {
				min-height: 0;
				max-height: 0;
				max-width: 0;
				overflow: hidden;
				font-size: 0px;
			}

			.desktop_hide,
			.desktop_hide table {
				display: table !important;
				max-height: none !important;
			}
		}
	</style>
</head>

<body style="background-color: #f9f9f9; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
	<table border="0" cellpadding="0" cellspacing="0" class="nl-container" role="presentation"
		style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f9f9f9;" width="100%">
		<tbody>
			<tr>
				<td>
					<table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-1" role="presentation"
						style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff;" width="100%">
						<tbody>
							<tr>
								<td>
									<table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack"
										role="presentation"
										style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-position: top center; background-color: #ffffff; color: #000000; width: 670px;"
										width="670">
										<tbody>
											<tr>
												<td class="column column-1"
													style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
													width="50%">
													<table border="0" cellpadding="0" cellspacing="0" class="text_block block-3"
														role="presentation"
														style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
														<tr>
															<td class="pad"
																style="padding-bottom:10px;padding-left:25px;padding-right:25px;padding-top:45px;">
																<div style="font-family: sans-serif">
																	<div class=""
																		style="font-size: 12px; mso-line-height-alt: 14.399999999999999px; color: #1f0b0b; line-height: 1.2; font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;">
																		<p style="margin: 0; font-size: 14px; mso-line-height-alt: 16.8px;"><strong><span
																					style="font-size:46px;">Welcome Aboard!</span></strong></p>
																	</div>
																</div>
															</td>
														</tr>
													</table>
													<table border="0" cellpadding="0" cellspacing="0" class="text_block block-4"
														role="presentation"
														style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
														<tr>
															<td class="pad"
																style="padding-bottom:25px;padding-left:25px;padding-right:25px;padding-top:10px;">
																<div style="font-family: sans-serif">
																	<div class=""
																		style="font-size: 12px; mso-line-height-alt: 18px; color: #393d47; line-height: 1.5; font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;">
																		<h2 style="margin: 0; font-size: 18px; mso-line-height-alt: 21px;">Hello User,</h2>
																		<p>You registered an account on By-Expertise Portal, before being able to use your
																			account you need to verify that this is
																			your email address by clicking below button.</p>
																		<p> Regards, By-Expertise</p>
																	</div>
																</div>
															</td>
														</tr>
													</table>
													<table border="0" cellpadding="0" cellspacing="0" class="button_block block-5"
														role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
														<tr>
															<td class="pad"
																style="padding-bottom:15px;padding-left:20px;padding-right:10px;padding-top:10px;text-align:left;">
																<div align="left" class="alignment">
																	<div
																		style="text-decoration:none;display:inline-block;color:#ffffff;background-color:#5855bd;border-radius:4px;width:auto;border-top:0px solid #8a3b8f;font-weight:400;border-right:0px solid #8a3b8f;border-bottom:0px solid #8a3b8f;border-left:0px solid #8a3b8f;padding-top:10px;padding-bottom:10px;font-family:Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;text-align:center;mso-border-alt:none;word-break:keep-all;">
																		<span
																			style="padding-left:50px;padding-right:45px;font-size:16px;display:inline-block;letter-spacing:normal;"><span
																				dir="ltr" style="word-break: break-word; line-height: 32px;"><a href="${url}"
																					style="text-decoration:none;color:white">Confirm
																					your Email</a></span></span>
																	</div>
																</div>
															</td>
														</tr>
													</table>
												</td>
												<td class="column column-2"
													style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
													width="50%">
													<div class="spacer_block" style="height:55px;line-height:50px;font-size:1px;"> </div>
													<div class="spacer_block mobile_hide" style="height:50px;line-height:50px;font-size:1px;"> 
													</div>
													<div class="spacer_block mobile_hide" style="height:50px;line-height:50px;font-size:1px;"> 
													</div>
													<table border="0" cellpadding="0" cellspacing="0" class="image_block block-5"
														role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
														<tr>
															<td class="pad"
																style="padding-right:5px;width:100%;padding-left:0px;padding-bottom:55px;">
																<div align="center" class="alignment" style="line-height:10px"><img alt="Alternate text"
																		src="https://img.freepik.com/free-vector/web-development-programmer-engineering-coding-website-augmented-reality-interface-screens-developer-project-engineer-programming-software-application-design-cartoon-illustration_107791-3863.jpg?w=996&t=st=1668347425~exp=1668348025~hmac=fb9947f013e242d09471c663ced7bb94c1332ce9a4eafc22bd9d57b883290f47"
																		style="display: block; height: auto; border: 0; width: 330px; max-width: 100%;"
																		title="Alternate text" width="330" /></div>
															</td>
														</tr>
													</table>
												</td>
											</tr>
										</tbody>
									</table>
								</td>
							</tr>
						</tbody>
					</table>
				</td>
			</tr>
		</tbody>
	</table><!-- End -->
</body>

</html>`


    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: api_keys.MAIL_ID,
        pass: api_keys.MAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: api_keys.MAIL_ID,
      to: email,
      subject: 'Email Verification',
      html: message,
    });
    console.log("email sent sucessfully");
  } catch (error) {
    console.log("email not sent");
    console.log(error);
  }
};

module.exports = sendEmail;