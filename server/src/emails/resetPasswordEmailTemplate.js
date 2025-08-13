const resetPasswordEmailTemplate = (name, link) => {
  return `
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html dir="ltr" lang="en">
      <head>
        <link rel="preload" as="image" href="https://c52b.hyf.dev/memix-logo.svg" />
        <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
        <meta name="x-apple-disable-message-reformatting" />
      </head>
      <body style="background-color: #fff">
        <table
          border="0"
          width="100%"
          cellpadding="0"
          cellspacing="0"
          role="presentation"
          align="center"
        >
          <tbody>
            <tr>
              <td style="background-color: #fff; color: #212121">
                <div
                  style="
                    display: none;
                    overflow: hidden;
                    line-height: 1px;
                    opacity: 0;
                    max-height: 0;
                    max-width: 0;
                  "
                  data-skip-in-text="true"
                >
                  Memix - Password Reset Request
                </div>
                <table
                  align="center"
                  width="100%"
                  border="0"
                  cellpadding="0"
                  cellspacing="0"
                  role="presentation"
                  style="
                    max-width: 37.5em;
                    padding: 20px;
                    margin: 0 auto;
                    background-color: #eee;
                    border-radius: 35px;
                  "
                >
                  <tbody>
                    <tr style="width: 100%">
                      <td>
                        <table
                          align="center"
                          width="100%"
                          border="0"
                          cellpadding="0"
                          cellspacing="0"
                          role="presentation"
                          style="background-color: #fff; border-radius: 35px;"
                        >
                          <tbody>
                            <tr>
                              <td>
                                <table
                                  align="center"
                                  width="100%"
                                  border="0"
                                  cellpadding="0"
                                  cellspacing="0"
                                  role="presentation"
                                  style="
                                    background-color: #e7fe55;
                                    display: flex;
                                    padding: 20px 0;
                                    align-items: center;
                                    justify-content: center;
                                    border-radius: 35px 35px 0 0;
                                  "
                                >
                                  <tbody>
                                    <tr>
                                      <td>
                                        <img
                                          alt="Memix&#x27;s Logo"
                                          height="45"
                                          src="https://c52b.hyf.dev/memix-logo.svg"
                                          style="
                                            display: block;
                                            outline: none;
                                            border: none;
                                            text-decoration: none;
                                          "
                                          width="150"
                                        />
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                                <table
                                  align="center"
                                  width="100%"
                                  border="0"
                                  cellpadding="0"
                                  cellspacing="0"
                                  role="presentation"
                                  style="padding: 25px 35px"
                                >
                                  <tbody>
                                    <tr>
                                      <td>
                                        <h1
                                          style="color:#333;font-family:-apple-system, BlinkMacSystemFont, &#x27;Segoe UI&#x27;, &#x27;Roboto&#x27;, &#x27;Oxygen&#x27;, &#x27;Ubuntu&#x27;, &#x27;Cantarell&#x27;, &#x27;Fira Sans&#x27;, &#x27;Droid Sans&#x27;, &#x27;Helvetica Neue&#x27;, sans-serif;font-size:20px;font-weight:bold;margin-bottom:15px"
                                        >
                                          Password Reset Request
                                        </h1>
                                        <p
                                          style="font-size:14px;line-height:24px;color:#333;font-family:-apple-system, BlinkMacSystemFont, &#x27;Segoe UI&#x27;, &#x27;Roboto&#x27;, &#x27;Oxygen&#x27;, &#x27;Ubuntu&#x27;, &#x27;Cantarell&#x27;, &#x27;Fira Sans&#x27;, &#x27;Droid Sans&#x27;, &#x27;Helvetica Neue&#x27;, sans-serif;margin:24px 0;margin-bottom:14px;margin-top:24px;margin-right:0;margin-left:0"
                                        >
                                          Hello <b>${name}</b>,<br />Someone
                                          recently requested a password change for
                                          your Memix account. If this was you, you
                                          can set a new password here:
                                        </p>
                                        <p
                                          style="font-size:14px;line-height:24px;color:#333;font-family:-apple-system, BlinkMacSystemFont, &#x27;Segoe UI&#x27;, &#x27;Roboto&#x27;, &#x27;Oxygen&#x27;, &#x27;Ubuntu&#x27;, &#x27;Cantarell&#x27;, &#x27;Fira Sans&#x27;, &#x27;Droid Sans&#x27;, &#x27;Helvetica Neue&#x27;, sans-serif;margin:24px 0;margin-bottom:14px;margin-top:24px;margin-right:0;margin-left:0"
                                        <table
                                          align="center"
                                          width="100%"
                                          border="0"
                                          cellpadding="0"
                                          cellspacing="0"
                                          role="presentation"
                                          style="
                                            display: flex;
                                            align-items: center;
                                            justify-content: center;
                                          "
                                        >
                                          <tbody>
                                            <tr>
                                              <td>
                                                <p
                                                  style="font-size:14px;line-height:24px;color:#333;padding-bottom:20px;font-family:-apple-system, BlinkMacSystemFont, &#x27;Segoe UI&#x27;, &#x27;Roboto&#x27;, &#x27;Oxygen&#x27;, &#x27;Ubuntu&#x27;, &#x27;Cantarell&#x27;, &#x27;Fira Sans&#x27;, &#x27;Droid Sans&#x27;, &#x27;Helvetica Neue&#x27;, sans-serif;margin:0;font-weight:bold;text-align:center;margin-top:0;margin-bottom:0;margin-left:0;margin-right:0"
                                                >
                                                  <a
                                                    href="${link}"
                                                    style="
                                                      color: #333;
                                                      text-decoration: underline;
                                                      font-size: 14px;
                                                      text-decoration-line: none;
                                                      background-color: #e7fe55;
                                                      padding: 10px 30px;
                                                      border-radius: 35px;
                                                    "
                                                    >Password Reset</a
                                                  >
                                                </p>
                                                <p
                                                  style="font-size:14px;line-height:24px;color:#333;font-family:-apple-system, BlinkMacSystemFont, &#x27;Segoe UI&#x27;, &#x27;Roboto&#x27;, &#x27;Oxygen&#x27;, &#x27;Ubuntu&#x27;, &#x27;Cantarell&#x27;, &#x27;Fira Sans&#x27;, &#x27;Droid Sans&#x27;, &#x27;Helvetica Neue&#x27;, sans-serif;margin:0px;text-align:center;margin-top:0px;margin-bottom:0px;margin-left:0px;margin-right:0px"
                                                >
                                                  (This link is valid for 1 hour)
                                                </p>
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                                <hr
                                  style="
                                    width: 100%;
                                    border: none;
                                    border-top: 1px solid #eaeaea;
                                  "
                                />
                                <table
                                  align="center"
                                  width="100%"
                                  border="0"
                                  cellpadding="0"
                                  cellspacing="0"
                                  role="presentation"
                                  style="padding: 25px 35px"
                                >
                                  <tbody>
                                    <tr>
                                      <td>
                                        <p
                                          style="font-size:14px;line-height:24px;color:#333;font-family:-apple-system, BlinkMacSystemFont, &#x27;Segoe UI&#x27;, &#x27;Roboto&#x27;, &#x27;Oxygen&#x27;, &#x27;Ubuntu&#x27;, &#x27;Cantarell&#x27;, &#x27;Fira Sans&#x27;, &#x27;Droid Sans&#x27;, &#x27;Helvetica Neue&#x27;, sans-serif;margin:0px;margin-top:0px;margin-bottom:0px;margin-left:0px;margin-right:0px"
                                        >
                                          If you don't want to change your password
                                          or didn't request this, just ignore and
                                          delete this message.
                                        </p>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <p
                          style="font-size:12px;line-height:24px;color:#333;font-family:-apple-system, BlinkMacSystemFont, &#x27;Segoe UI&#x27;, &#x27;Roboto&#x27;, &#x27;Oxygen&#x27;, &#x27;Ubuntu&#x27;, &#x27;Cantarell&#x27;, &#x27;Fira Sans&#x27;, &#x27;Droid Sans&#x27;, &#x27;Helvetica Neue&#x27;, sans-serif;padding:0 20px;margin-top:10px;margin-right:0;margin-bottom:0px;margin-left:0"
                        >
                          This email was sent to you by Memix. If you have any
                          questions, please contact us at
                          <a
                            href="mailto:Memix.HYF@gmail.com"
                            style="color:#2754C5;text-decoration-line:none;font-family:-apple-system, BlinkMacSystemFont, &#x27;Segoe UI&#x27;, &#x27;Roboto&#x27;, &#x27;Oxygen&#x27;, &#x27;Ubuntu&#x27;, &#x27;Cantarell&#x27;, &#x27;Fira Sans&#x27;, &#x27;Droid Sans&#x27;, &#x27;Helvetica Neue&#x27;, sans-serif;font-size:14px;text-decoration:underline"
                            target="_blank"
                            >Memix.HYF@gmail.com</a
                          >
                        </p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </body>
    </html>
  `;
};

export default resetPasswordEmailTemplate;
