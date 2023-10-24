const nodemailer = require("nodemailer");

const sendMailContact = (to, reponse, subject) => {
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
    const mailOptions = {
      from: process.env.SENDER_MAIL,
      to: to,
      subject: subject,
      attachments: [
        {
          filename: "facebook2x.png",
          path: "./public/images/facebook2x.png",
          cid: "unique@facebook2x.png",
        },
        {
          filename: "instagram2x.png",
          path: "./public/images/instagram2x.png",
          cid: "unique@instagram2x.png",
        },
        {
          filename: "robe.png",
          path: "./public/images/robe.png",
          cid: "unique@robe.png",
        },
        {
          filename: "PFW_BG_DM.png",
          path: "./public/images/PFW_BG_DM.png",
          cid: "unique@PFW_BG_DM.png",
        },
        {
          filename: "ab.png",
          path: "./public/images/ab.png",
          cid: "unique@ab.png",
        },
        {
          filename: "Tavyissa.png",
          path: "./public/images/Tavyissa.png",
          cid: "unique@Tavyissa.png",
        },
      ],
      html: `
      <!DOCTYPE html>
  
  <html lang="en" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:v="urn:schemas-microsoft-com:vml">
  <head>
  <title></title>
  <meta content="text/html; charset=utf-8" http-equiv="Content-Type"/>
  <meta content="width=device-width, initial-scale=1.0" name="viewport"/><!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml><![endif]--><!--[if !mso]><!-->
  <link href="https://fonts.googleapis.com/css?family=Playfair+Display" rel="stylesheet" type="text/css"/>
  <link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet" type="text/css"/><!--<![endif]-->
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
  <body style="margin: 0; background-color: #e2cebb; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
  <table border="0" cellpadding="0" cellspacing="0" class="nl-container" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #e2cebb;" width="100%">
  <tbody>
  <tr>
  <td>
  <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #e2cebb;" width="100%">
  <tbody>
  <tr>
  <td>
  <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #e2cebb; background-repeat: no-repeat; color: #000000; width: 680px;" width="680">
  <tbody>
  <tr>
  <td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
  <div class="spacer_block block-1" style="height:90px;line-height:90px;font-size:1px;"> </div>
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
  <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; background-position: top center; color: #000000; width: 680px;" width="680">
  <tbody>
  <tr>
  <td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 10px; padding-top: 20px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
  <table border="0" cellpadding="0" cellspacing="0" class="image_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
  <tr>
  <td class="pad" style="padding-bottom:20px;padding-top:20px;width:100%;padding-right:0px;padding-left:0px;">
  <div align="center" class="alignment" style="line-height:10px"><img alt="Logo Placeholder" src="cid:unique@Tavyissa.png" style="display: block; height: auto; border: 0; width: 136px; max-width: 100%;" title="Logo Placeholder" width="136"/></div>
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
  <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-3" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #e2cebb;" width="100%">
  <tbody>
  <tr>
  <td>
  <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-repeat: no-repeat; color: #000000; background-color: #e2cebb; background-image: url('cid:unique@PFW_BG_DM.png'); background-position: center top; width: 680px;" width="680">
  <tbody>
  <tr>
  <td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
  <div class="spacer_block block-1" style="height:20px;line-height:20px;font-size:1px;"> </div>
  <table border="0" cellpadding="0" cellspacing="0" class="image_block block-2" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
  <tr>
  <td class="pad" style="padding-bottom:5px;width:100%;padding-right:0px;padding-left:0px;">
  <div align="center" class="alignment" style="line-height:10px"><img alt="Dress Icon" src="cid:unique@robe.png" style="display: block; height: auto; border: 0; width: 136px; max-width: 100%;" title="Dress Icon" width="136"/></div>
  </td>
  </tr>
  </table>
  <table border="0" cellpadding="0" cellspacing="0" class="divider_block block-3" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
  <tr>
  <td class="pad" style="padding-bottom:10px;padding-top:10px;">
  <div align="center" class="alignment">
  <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="10%">
  <tr>
  <td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 2px solid #000000;"><span> </span></td>
  </tr>
  </table>
  </div>
  </td>
  </tr>
  </table>
  <table border="0" cellpadding="0" cellspacing="0" class="image_block block-4" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
  <tr>
  <td class="pad" style="width:100%;padding-right:0px;padding-left:0px;">
  <div align="center" class="alignment" style="line-height:10px"></div>
  </td>
  </tr>
  </table>
  <table border="0" cellpadding="0" cellspacing="0" class="text_block block-5" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
  <tr>
  <td class="pad" style="padding-bottom:5px;">
  <div style="font-family: sans-serif">
  <div class="" style="font-size: 12px; font-family: Playfair Display, Georgia, serif; mso-line-height-alt: 14.399999999999999px; color: #555555; line-height: 1.2;">
  <p style="margin: 0; font-size: 38px; text-align: center; mso-line-height-alt: 45.6px;"><span style="font-size:50px;color:#000000;">TO SEEK LUXURY</span></p>
  </div>
  </div>
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
  <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-4" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #e2cebb;" width="100%">
  <tbody>
  <tr>
  <td>
  <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; color: #000000; width: 680px;" width="680">
  <tbody>
  <tr>
  <td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
  <table border="0" cellpadding="0" cellspacing="0" class="image_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
  <tr>
  <td class="pad" style="width:100%;padding-right:0px;padding-left:0px;">
  <div align="center" class="alignment" style="line-height:10px"><img alt="Divider" src="cid:unique@ab.png" style="display: block; height: auto; border: 0; width: 238px; max-width: 100%;" title="Divider" width="238"/></div>
  </td>
  </tr>
  </table>
  <table border="0" cellpadding="0" cellspacing="0" class="text_block block-2" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
  <tr>
  <td class="pad" style="padding-bottom:35px;padding-left:40px;padding-right:40px;padding-top:25px;">
  <div style="font-family: sans-serif">
  <div class="" style="font-size: 12px; font-family: Playfair Display, Georgia, serif; mso-line-height-alt: 14.399999999999999px; color: #000000; line-height: 1.2;">
  <p style="margin: 0; font-size: 14px; text-align: center; mso-line-height-alt: 16.8px;"><span style="font-size:24px;color:#000000;">${reponse}</span></p>
  </div>
  </div>
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
  <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-5" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #e2cebb;" width="100%">
  <tbody>
  <tr>
  <td>
  <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; color: #000000; width: 680px;" width="680">
  <tbody>
  <tr>
  <td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
  <table border="0" cellpadding="20" cellspacing="0" class="social_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
  <tr>
  <td class="pad">
  <div align="center" class="alignment">
  <table border="0" cellpadding="0" cellspacing="0" class="social-table" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; display: inline-block;" width="108px">
  <tr>
  <td style="padding:0 2px 0 2px;"><a href="https://www.facebook.com/" target="_blank"><img alt="Facebook" height="32" src="cid:unique@facebook2x.png" style="display: block; height: auto; border: 0;" title="facebook" width="32"/></a></td>
  <td style="padding:0 2px 0 2px;"><a href="https://www.instagram.com/" target="_blank"><img alt="Instagram" height="32" src="cid:unique@instagram2x.png" style="display: block; height: auto; border: 0;" title="instagram" width="32"/></a></td>
  </tr>
  </table>
  </div>
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
  </html>`,
    };
    smtpTransport.sendMail(mailOptions, (err, infor) => {
      if (err) return err;
  
      return infor;
    });
  };


module.exports = sendMailContact;
