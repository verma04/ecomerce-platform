import sendEmail from "../../utils/sendEmail";

const VerifyEmail = async ({ name, url, email }: any) => {
  const content = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<html lang="en">

  <head data-id="__react-email-head"></head>
  <div id="__react-email-preview" style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0">Verify Email ${name}<div> ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿</div>
  </div>

  <body data-id="__react-email-body" style="background-color:rgb(255,255,255);margin-top:auto;margin-bottom:auto;margin-left:auto;margin-right:auto;font-family:ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji">
    <table align="center" width="100%" data-id="__react-email-container" role="presentation" cellSpacing="0" cellPadding="0" border="0" style="max-width:37.5em;border-width:1px;border-style:solid;border-color:rgb(234,234,234);border-radius:0.25rem;margin-top:20px;margin-bottom:20px;margin-left:auto;margin-right:auto;padding:20px;width:465px">
      <tbody>
        <tr style="width:100%">
          <td>
            <table align="center" width="100%" data-id="react-email-section" border="0" cellPadding="0" cellSpacing="0" role="presentation">
              <tbody>
                <tr>
                  <td><img data-id="react-email-img" alt="Vercel" src="https://pulseplaydigital.sgp1.cdn.digitaloceanspaces.com/urbanbazaar-logo.png" width="150" height="150" style="display:block;outline:none;border:none;text-decoration:none;object-fit:contain;margin-top:0px;margin-bottom:0px;margin-left:auto;margin-right:auto" /></td>
                </tr>
              </tbody>
            </table>
            <p data-id="react-email-text" style="font-size:14px;line-height:.75rem;margin:16px 0;color:rgb(0,0,0)">Hello ${name}</p>
            <p data-id="react-email-text" style="font-size:14px;line-height:.75rem;margin:16px 0;color:rgb(0,0,0)">Follow this link to verify your email address.</p>
            <table align="center" width="100%" data-id="react-email-section" border="0" cellPadding="0" cellSpacing="0" role="presentation">
              <tbody>
                <tr>
                  <td></td>
                </tr>
              </tbody>
            </table>
            <table align="center" width="100%" data-id="react-email-section" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="text-align:center">
              <tbody>
                <tr>
                  <td><a href=${url} data-id="react-email-button" target="_blank" style="line-height:100%;text-decoration:none;display:inline-block;max-width:100%;padding:12px 20px;background-color:rgb(57,131,120);border-radius:0.25rem;color:rgb(255,255,255);font-size:12px;font-weight:600;text-decoration-line:none;text-align:center"><span></span><span style="max-width:100%;display:inline-block;line-height:120%;mso-padding-alt:0px;mso-text-raise:9px">Verify Email</span><span></span></a></td>
                </tr>
              </tbody>
            </table>
            <p data-id="react-email-text" style="font-size:14px;line-height:24px;margin:16px 0;color:rgb(0,0,0)">or copy and paste this URL into your browser: <a href=${url} data-id="react-email-link" target="_blank" style="color:rgb(37,99,235);text-decoration:none;text-decoration-line:none">${url}</a></p>
            <hr data-id="react-email-hr" style="width:100%;border:none;border-top:1px solid #eaeaea;border-width:1px;border-style:solid;border-color:rgb(234,234,234);margin-top:26px;margin-bottom:26px;margin-left:0px;margin-right:0px" />
            <p data-id="react-email-text" style="font-size:12px;line-height:24px;margin:16px 0;color:rgb(102,102,102)">If you didn’t ask to verify this address, you can ignore this email. <br /> Thanks, <br /> Team UrbanBazar</p>
          </td>
        </tr>
      </tbody>
    </table>
  </body>

</html>`;

  await sendEmail({
    email,
    subject: "verify email",
    content,
  });
};

export default VerifyEmail;
