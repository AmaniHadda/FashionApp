
const Newsletter = require("../models/newsletter.model");
const nodemailer = require("nodemailer");
const { google } = require("googleapis");


exports.SendNewsletter=async(contenu)=> {
  
  const smtpTransport = nodemailer.createTransport({
    host: process.env.HOST,
    service: process.env.SERVICE,
    port: Number(process.env.EMAIL_PORT),
    secure: Boolean(process.env.SECURE),
    auth: {
      user: process.env.SENDER_MAIL,
      pass: process.env.SENDER_PASS,
    },
  });
  const users = await Newsletter.find();
  console.log(users)
  users.forEach(async (user) => {
  const mailOptions = {
    from: process.env.SENDER_MAIL,
    to: user.email,
    subject: "News", attachments: [
      {
        filename: 'facebook2x.png',
        path: './public/images/facebook2x.png',
        cid: 'unique@facebook2x.png'
      },
      {
        filename: 'header_img_yellow.png',
        path: './public/images/header_img_yellow.png',
        cid: 'unique@header_img_yellow.png'
      },
      {
        filename: 'instagram2x.png',
        path: './public/images/instagram2x.png',
        cid: 'unique@instagram2x.png'
      },
      {
        filename: 'linkedin2x.png',
        path: './public/images/linkedin2x.png',
        cid: 'unique@linkedin2x.png'
      },
      {
        filename: 'new-product-section-img1.png',
        path: './public/images/new-product-section-img1.png',
        cid: 'unique@new-product-section-img1.png'
      },
      {
        filename: 'new-product-section-img2.png',
        path: './public/images/new-product-section-img2.png',
        cid: 'unique@new-product-section-img2.png'
      },
      {
        filename: 'new-product-section-img3.png',
        path: './public/images/new-product-section-img3.png',
        cid: 'unique@new-product-section-img3.png'
      },
      {
        filename: 'Rectangle_yellow.png',
        path: './public/images/Rectangle_yellow.png',
        cid: 'unique@Rectangle_yellow.png'
      },
      {
        filename: 'red_dress_woman_right.png',
        path: './public/images/red_dress_woman_right.png',
        cid: 'unique@red_dress_woman_right.png'
      },
      {
        filename: 'romb_line.png',
        path: './public/images/romb_line.png',
        cid: 'unique@romb_line.png'
      },
      {
        filename: 'shape-13_1.png',
        path: './public/images/shape-13_1.png',
        cid: 'unique@shape-13_1.png'
      },
      {
        filename: 'Tavyissa.png',
        path: './public/images/Tavyissa.png',
        cid: 'unique@Tavyissa.png'
      },
      
      {
        filename: 'twitter2x.png',
        path: './public/images/twitter2x.png',
        cid: 'unique@twitter2x.png'
      },
     

    ],
        html: `<!DOCTYPE html>

        <html lang="en" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:v="urn:schemas-microsoft-com:vml">
        <head>
        <title></title>
        <meta content="text/html; charset=utf-8" http-equiv="Content-Type"/>
        <meta content="width=device-width, initial-scale=1.0" name="viewport"/><!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml><![endif]--><!--[if !mso]><!-->
        <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet" type="text/css"/><!--<![endif]-->
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
        
            .image_block img+div {
              display: none;
            }
        
            @media (max-width:700px) {
        
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
        <body style="background-color: #fffbee; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
        <table border="0" cellpadding="0" cellspacing="0" class="nl-container" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #fffbee;" width="100%">
        <tbody>
        <tr>
        <td>
        <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
        <tbody>
        <tr>
        <td>
        <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #fff1dd; color: #000000; width: 680px;" width="680">
        <tbody>
        <tr>
        <td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
        <div class="spacer_block block-1" style="height:20px;line-height:20px;font-size:1px;"> </div>
        <table border="0" cellpadding="0" cellspacing="0" class="image_block block-2" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
        <tr>
        <td class="pad" style="width:100%;padding-right:0px;padding-left:0px;">
        <div align="center" class="alignment" style="line-height:10px"><img src="cid:unique@Tavyissa.png" style="display: block; height: auto; border: 0; width: 249px; max-width: 100%;" width="249"/></div>
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
        <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-2" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
        <tbody>
        <tr>
        <td>
        <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #fff1dd; color: #000000; width: 680px;" width="680">
        <tbody>
        <tr>
        <td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="50%">
        <div class="spacer_block block-1" style="height:20px;line-height:20px;font-size:1px;"> </div>
        <table border="0" cellpadding="0" cellspacing="0" class="heading_block block-2" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
        <tr>
        <td class="pad" style="padding-left:20px;padding-right:20px;text-align:center;width:100%;">
        <h1 style="margin: 0; color: #ee8c00; direction: ltr; font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 44px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0;"><span class="tinyMce-placeholder">WELCOME TO </span></h1>
        </td>
        </tr>
        </table>
        <table border="0" cellpadding="0" cellspacing="0" class="paragraph_block block-3" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
        <tr>
        <td class="pad" style="padding-bottom:10px;padding-left:20px;padding-right:20px;padding-top:10px;">
        <div style="color:#ffffff;direction:ltr;font-family:'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;font-size:32px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:center;mso-line-height-alt:38.4px;">
        <p style="margin: 0;"><span style="background-color: #030222;">TAVYISSA</span></p>
        </div>
        </td>
        </tr>
        </table>
        <table border="0" cellpadding="0" cellspacing="0" class="heading_block block-4" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
        <tr>
        <td class="pad" style="padding-left:20px;padding-right:20px;text-align:center;width:100%;">
        <h1 style="margin: 0; color: #000000; direction: ltr; font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 56px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0;"><span class="tinyMce-placeholder"></span></h1>
        </td>
        </tr>
        </table>
        <table border="0" cellpadding="0" cellspacing="0" class="button_block block-5" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
        <tr>
        <td class="pad" style="padding-bottom:10px;padding-left:20px;padding-right:20px;padding-top:10px;text-align:center;">
        <div align="center" class="alignment"><!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="www.example.com" style="height:43px;width:132px;v-text-anchor:middle;" arcsize="0%" strokeweight="0.75pt" strokecolor="#000000" fill="false"><w:anchorlock/><v:textbox inset="0px,0px,0px,0px"><center style="color:#000000; font-family:Arial, sans-serif; font-size:16px"><![endif]--><a href="www.example.com" style="text-decoration:none;display:inline-block;color:#000000;background-color:transparent;border-radius:0px;width:auto;border-top:1px solid #000000;font-weight:400;border-right:1px solid #000000;border-bottom:1px solid #000000;border-left:1px solid #000000;padding-top:5px;padding-bottom:5px;font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;font-size:16px;text-align:center;mso-border-alt:none;word-break:keep-all;" target="_blank"><span style="padding-left:20px;padding-right:20px;font-size:16px;display:inline-block;letter-spacing:normal;"><span style="word-break: break-word; line-height: 32px;">SHOP NOW</span></span></a><!--[if mso]></center></v:textbox></v:roundrect><![endif]--></div>
        </td>
        </tr>
        </table>
        <div class="spacer_block block-6" style="height:50px;line-height:50px;font-size:1px;"> </div>
        <table border="0" cellpadding="0" cellspacing="0" class="image_block block-7" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
        <tr>
        <td class="pad" style="width:100%;padding-right:0px;padding-left:0px;">
        <div align="center" class="alignment" style="line-height:10px"><img src="cid:unique@shape-13_1.png" style="display: block; height: auto; border: 0; width: 53px; max-width: 100%;" width="53"/></div>
        </td>
        </tr>
        </table>
        <div class="spacer_block block-8" style="height:20px;line-height:20px;font-size:1px;"> </div>
        </td>
        <td class="column column-2" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="50%">
        <table border="0" cellpadding="0" cellspacing="0" class="image_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
        <tr>
        <td class="pad" style="width:100%;padding-right:0px;padding-left:0px;">
        <div align="center" class="alignment" style="line-height:10px"><img alt="woman_stand_dress" src="cid:unique@header_img_yellow.png" style="display: block; height: auto; border: 0; width: 272px; max-width: 100%;" title="woman_stand_dress" width="272"/></div>
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
        <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-3" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
        <tbody>
        <tr>
        <td>
        <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; color: #000000; width: 680px;" width="680">
        <tbody>
        <tr>
        <td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
        <div class="spacer_block block-1" style="height:60px;line-height:60px;font-size:1px;"> </div>
        <table border="0" cellpadding="0" cellspacing="0" class="heading_block block-2" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
        <tr>
        <td class="pad" style="padding-left:20px;padding-right:20px;text-align:center;width:100%;">
        <h1 style="margin: 0; color: #ee8c00; direction: ltr; font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 44px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0;"><span class="tinyMce-placeholder">HURRY UP!</span></h1>
        </td>
        </tr>
        </table>
        <div class="spacer_block block-3" style="height:15px;line-height:15px;font-size:1px;"> </div>
        </td>
        </tr>
        </tbody>
        </table>
        </td>
        </tr>
        </tbody>
        </table>
        <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-4" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
        <tbody>
        <tr>
        <td>
        <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; color: #000000; width: 680px;" width="680">
        <tbody>
        <tr>
        <td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-left: 20px; padding-right: 20px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="16.666666666666668%">
        <div class="spacer_block block-1" style="height:30px;line-height:30px;font-size:1px;"> </div>
        <table border="0" cellpadding="0" cellspacing="0" class="image_block block-2" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
        <tr>
        <td class="pad" style="width:100%;padding-right:0px;padding-left:0px;">
        <div align="center" class="alignment" style="line-height:10px"><img src="cid:unique@Rectangle_yellow.png" style="display: block; height: auto; border: 0; width: 59px; max-width: 100%;" width="59"/></div>
        </td>
        </tr>
        </table>
        </td>
        <td class="column column-2" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="66.66666666666667%">
        <table border="0" cellpadding="0" cellspacing="0" class="heading_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
        <tr>
        <td class="pad" style="padding-left:20px;padding-right:20px;text-align:center;width:100%;">
        <h1 style="margin: 0; color: #000000; direction: ltr; font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 22px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0;"><span class="tinyMce-placeholder">NEW PRODUCT</span></h1>
        </td>
        </tr>
        </table>
        </td>
        <td class="column column-3" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="16.666666666666668%">
        <div class="spacer_block block-1" style="height:30px;line-height:30px;font-size:1px;"> </div>
        <table border="0" cellpadding="0" cellspacing="0" class="image_block block-2" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
        <tr>
        <td class="pad" style="width:100%;padding-right:0px;padding-left:0px;">
        <div align="center" class="alignment" style="line-height:10px"><img src="cid:unique@Rectangle_yellow.png" style="display: block; height: auto; border: 0; width: 59px; max-width: 100%;" width="59"/></div>
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
        <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-5" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
        <tbody>
        <tr>
        <td>
        <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; color: #000000; width: 680px;" width="680">
        <tbody>
        <tr>
        <td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="33.333333333333336%">
        <div class="spacer_block block-1" style="height:20px;line-height:20px;font-size:1px;"> </div>
        <div class="spacer_block block-2" style="height:20px;line-height:20px;font-size:1px;"> </div>
        </td>
        <td class="column column-2" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="33.333333333333336%">
        <div class="spacer_block block-1" style="height:20px;line-height:20px;font-size:1px;"> </div>
        <table border="0" cellpadding="0" cellspacing="0" class="image_block block-2" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
        <tr>
        <td class="pad" style="width:100%;padding-right:0px;padding-left:0px;">
        <div align="center" class="alignment" style="line-height:10px">
        <p>Description : ${contenu.description}</p>
        </div>
        </td>
        </tr>
        </table>
        <table border="0" cellpadding="0" cellspacing="0" class="heading_block block-3" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
        <tr>
        <td class="pad" style="text-align:center;width:100%;">
        <h1 style="margin: 0; color: #000000; direction: ltr; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0;"><span class="tinyMce-placeholder">${contenu.name}</span></h1>
        </td>
        </tr>
        </table>
        <div class="spacer_block block-4" style="height:20px;line-height:20px;font-size:1px;"> </div>
        <table border="0" cellpadding="0" cellspacing="0" class="paragraph_block block-5" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
        <tr>
        <td class="pad" style="padding-bottom:10px;padding-left:20px;padding-right:20px;padding-top:10px;">
        <div style="color:#000000;direction:ltr;font-family:'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;font-size:16px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:center;mso-line-height-alt:19.2px;">
        <p style="margin: 0;"><strong><span style="color: #df7004;">${contenu.price} TND </span></strong></p>
        </div>
        </td>
        </tr>
        </table>
        </td>
        <td class="column column-3" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="33.333333333333336%">
        <div class="spacer_block block-1" style="height:20px;line-height:20px;font-size:1px;"> </div>
        <div class="spacer_block block-2" style="height:20px;line-height:20px;font-size:1px;"> </div>
        </td>
        </tr>
        </tbody>
        </table>
        </td>
        </tr>
        </tbody>
        </table>
        <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-6" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
        <tbody>
        <tr>
        <td>
        <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; color: #000000; width: 680px;" width="680">
        <tbody>
        <tr>
        <td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-left: 20px; padding-right: 20px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="16.666666666666668%">
        <div class="spacer_block block-1" style="height:30px;line-height:30px;font-size:1px;"> </div>
        <table border="0" cellpadding="0" cellspacing="0" class="image_block block-2" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
        <tr>
        <td class="pad" style="width:100%;padding-right:0px;padding-left:0px;">
        <div align="center" class="alignment" style="line-height:10px"><img src="cid:unique@Rectangle_yellow.png" style="display: block; height: auto; border: 0; width: 59px; max-width: 100%;" width="59"/></div>
        </td>
        </tr>
        </table>
        </td>
        <td class="column column-2" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="66.66666666666667%">
        <div class="spacer_block block-1" style="height:20px;line-height:20px;font-size:1px;"> </div>
        <table border="0" cellpadding="0" cellspacing="0" class="heading_block block-2" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
        <tr>
        <td class="pad" style="padding-left:20px;padding-right:20px;text-align:center;width:100%;">
        <h1 style="margin: 0; color: #000000; direction: ltr; font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 22px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0;"><span class="tinyMce-placeholder">INSTANT UPDATES</span></h1>
        </td>
        </tr>
        </table>
        </td>
        <td class="column column-3" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="16.666666666666668%">
        <div class="spacer_block block-1" style="height:30px;line-height:30px;font-size:1px;"> </div>
        <table border="0" cellpadding="0" cellspacing="0" class="image_block block-2" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
        <tr>
        <td class="pad" style="width:100%;padding-right:0px;padding-left:0px;">
        <div align="center" class="alignment" style="line-height:10px"><img src="cid:unique@Rectangle_yellow.png" style="display: block; height: auto; border: 0; width: 59px; max-width: 100%;" width="59"/></div>
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
        <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-7" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
        <tbody>
        <tr>
        <td>
        <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; color: #000000; width: 680px;" width="680">
        <tbody>
        <tr>
        <td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
        <div class="spacer_block block-1" style="height:20px;line-height:20px;font-size:1px;"> </div>
        </td>
        </tr>
        </tbody>
        </table>
        </td>
        </tr>
        </tbody>
        </table>
        <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-8" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
        <tbody>
        <tr>
        <td>
        <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; color: #000000; background-image: url('cid:unique@red_dress_woman_right.png'); background-position: top center; background-repeat: no-repeat; width: 680px;" width="680">
        <tbody>
        <tr>
        <td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="83.33333333333333%">
        <div class="spacer_block block-1" style="height:20px;line-height:20px;font-size:1px;"> </div>
        <table border="0" cellpadding="0" cellspacing="0" class="icons_block block-2" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
        <tr>
        <td class="pad" style="vertical-align: middle; color: #000000; font-family: inherit; font-size: 14px; text-align: left;">
        <table align="left" cellpadding="0" cellspacing="0" class="alignment" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
        <tr>
        <td style="vertical-align: middle; text-align: center; padding-top: 5px; padding-bottom: 5px; padding-left: 20px; padding-right: 20px;"><img align="center" class="icon" height="32" src="cid:unique@new-product-section-img1.png" style="display: block; height: auto; margin: 0 auto; border: 0;" width="41"/></td>
        </tr>
        </table>
        </td>
        </tr>
        </table>
        <table border="0" cellpadding="0" cellspacing="0" class="heading_block block-3" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
        <tr>
        <td class="pad" style="padding-left:20px;padding-right:20px;text-align:center;width:100%;">
        <h1 style="margin: 0; color: #000000; direction: ltr; font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: left; margin-top: 0; margin-bottom: 0;"><span class="tinyMce-placeholder" style="background-color: #fefeff;">BAGS</span></h1>
        </td>
        </tr>
        </table>
        <table border="0" cellpadding="0" cellspacing="0" class="icons_block block-4" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
        <tr>
        <td class="pad" style="vertical-align: middle; color: #000000; font-family: inherit; font-size: 14px; padding-left: 20px; padding-right: 20px; text-align: left;">
        <table align="left" cellpadding="0" cellspacing="0" class="alignment" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
        <tr>
        <td style="vertical-align: middle; text-align: center; padding-top: 5px; padding-bottom: 5px; padding-left: 5px; padding-right: 5px;"><img align="center" class="icon" height="16" src="cid:unique@romb_line.png" style="display: block; height: auto; margin: 0 auto; border: 0;" width="76"/></td>
        </tr>
        </table>
        </td>
        </tr>
        </table>
        <table border="0" cellpadding="0" cellspacing="0" class="icons_block block-5" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
        <tr>
        <td class="pad" style="vertical-align: middle; color: #000000; font-family: inherit; font-size: 14px; padding-left: 20px; padding-right: 20px; text-align: left;">
        <table align="left" cellpadding="0" cellspacing="0" class="alignment" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
        <tr>
        <td style="vertical-align: middle; text-align: center; padding-top: 5px; padding-bottom: 5px; padding-left: 5px; padding-right: 5px;"><img align="center" class="icon" height="32" src="cid:unique@new-product-section-img2.png" style="display: block; height: auto; margin: 0 auto; border: 0;" width="45"/></td>
        </tr>
        </table>
        </td>
        </tr>
        </table>
        <table border="0" cellpadding="0" cellspacing="0" class="heading_block block-6" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
        <tr>
        <td class="pad" style="padding-left:20px;padding-right:20px;text-align:center;width:100%;">
        <h1 style="margin: 0; color: #000000; direction: ltr; font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: left; margin-top: 0; margin-bottom: 0;"><span class="tinyMce-placeholder">FOOTWEAR</span></h1>
        </td>
        </tr>
        </table>
        <table border="0" cellpadding="0" cellspacing="0" class="icons_block block-7" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
        <tr>
        <td class="pad" style="vertical-align: middle; color: #000000; font-family: inherit; font-size: 14px; padding-left: 20px; padding-right: 20px; text-align: left;">
        <table align="left" cellpadding="0" cellspacing="0" class="alignment" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
        <tr>
        <td style="vertical-align: middle; text-align: center; padding-top: 5px; padding-bottom: 5px; padding-left: 5px; padding-right: 5px;"><img align="center" class="icon" height="16" src="cid:unique@romb_line.png" style="display: block; height: auto; margin: 0 auto; border: 0;" width="76"/></td>
        </tr>
        </table>
        </td>
        </tr>
        </table>
        <div class="spacer_block block-8" style="height:150px;line-height:150px;font-size:1px;"> </div>
        </td>
        <td class="column column-2" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="16.666666666666668%">
        <div class="spacer_block block-1" style="height:20px;line-height:20px;font-size:1px;"> </div>
        <table border="0" cellpadding="0" cellspacing="0" class="icons_block block-2" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
        <tr>
        <td class="pad" style="vertical-align: middle; color: #000000; font-family: inherit; font-size: 14px; padding-left: 20px; padding-right: 20px; text-align: left;">
        <table align="left" cellpadding="0" cellspacing="0" class="alignment" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
        <tr>
        <td style="vertical-align: middle; text-align: center; padding-top: 5px; padding-bottom: 5px; padding-left: 5px; padding-right: 5px;"><img align="center" class="icon" height="32" src="cid:unique@new-product-section-img3.png" style="display: block; height: auto; margin: 0 auto; border: 0;" width="26"/></td>
        </tr>
        </table>
        </td>
        </tr>
        </table>
        <table border="0" cellpadding="0" cellspacing="0" class="heading_block block-3" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
        <tr>
        <td class="pad" style="padding-left:20px;padding-right:20px;text-align:center;width:100%;">
        <h1 style="margin: 0; color: #000000; direction: ltr; font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: left; margin-top: 0; margin-bottom: 0;"><span class="tinyMce-placeholder" style="background-color: #fefeff;">WATCH</span></h1>
        </td>
        </tr>
        </table>
        <table border="0" cellpadding="0" cellspacing="0" class="icons_block block-4" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
        <tr>
        <td class="pad" style="vertical-align: middle; color: #000000; font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 14px; padding-left: 20px; padding-right: 20px; text-align: left;">
        <table align="left" cellpadding="0" cellspacing="0" class="alignment" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
        <tr>
        <td style="vertical-align: middle; text-align: center; padding-top: 0px; padding-bottom: 0px; padding-left: 0px; padding-right: 0px;"><img align="center" class="icon" height="16" src="cid:unique@romb_line.png" style="display: block; height: auto; margin: 0 auto; border: 0;" width="76"/></td>
        </tr>
        </table>
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
        <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-9" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
        <tbody>
        <tr>
        <td>
        <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; color: #000000; width: 680px;" width="680">
        <tbody>
        <tr>
        <td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
        <div class="spacer_block block-1" style="height:20px;line-height:20px;font-size:1px;"> </div>
        </td>
        </tr>
        </tbody>
        </table>
        </td>
        </tr>
        </tbody>
        </table>
        <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-10" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
        <tbody>
        <tr>
        <td>
        <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; color: #000000; width: 680px;" width="680">
        <tbody>
        <tr>
        <td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
        <div class="spacer_block block-1" style="height:20px;line-height:20px;font-size:1px;"> </div>
        <table border="0" cellpadding="10" cellspacing="0" class="social_block block-2" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
        <tr>
        <td class="pad">
        <div align="center" class="alignment">
        <table border="0" cellpadding="0" cellspacing="0" class="social-table" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; display: inline-block;" width="144px">
        <tr>
        <td style="padding:0 2px 0 2px;"><a href="https://www.facebook.com/" target="_blank"><img alt="Facebook" height="32" src="cid:unique@facebook2x.png" style="display: block; height: auto; border: 0;" title="facebook" width="32"/></a></td>
        <td style="padding:0 2px 0 2px;"><a href="https://www.twitter.com/" target="_blank"><img alt="Twitter" height="32" src="cid:unique@twitter2x.png" style="display: block; height: auto; border: 0;" title="twitter" width="32"/></a></td>
        <td style="padding:0 2px 0 2px;"><a href="https://www.linkedin.com/" target="_blank"><img alt="Linkedin" height="32" src="cid:unique@linkedin2x.png" style="display: block; height: auto; border: 0;" title="linkedin" width="32"/></a></td>
        <td style="padding:0 2px 0 2px;"><a href="https://www.instagram.com/" target="_blank"><img alt="Instagram" height="32" src="cid:unique@instagram2x.png" style="display: block; height: auto; border: 0;" title="instagram" width="32"/></a></td>
        </tr>
        </table>
        </div>
        </td>
        </tr>
        </table>
        <div class="spacer_block block-3" style="height:20px;line-height:20px;font-size:1px;"> </div>
        <table border="0" cellpadding="10" cellspacing="0" class="paragraph_block block-4" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
        <tr>
        <td class="pad">
        <div style="color:#393d47;direction:ltr;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;font-size:16px;font-weight:700;letter-spacing:0px;line-height:120%;text-align:center;mso-line-height-alt:19.2px;">
        <p style="margin: 0;"> Copyright 2023 Tavyissa. All Rights Reserved.</p>
        </div>
        </td>
        </tr>
        </table>
        <div class="spacer_block block-5" style="height:20px;line-height:20px;font-size:1px;"> </div>
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
      };
  smtpTransport.sendMail(mailOptions, (err, infor) => {
        if (err) return err;   
        return infor;
      });});
      console.log("sended")
}
exports.subscribeNewsletter = async (req, res) => {
  const { email } = req.body;

  try {
    const existingEmail = await Newsletter.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already subscribed!" });  
    }

    const newSubscription = new Newsletter({ email });
    await newSubscription.save();
    res.json({ message: "Subscription successful!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
