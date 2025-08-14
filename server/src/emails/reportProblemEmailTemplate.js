const reportProblemEmailTemplate = (problemType, moreInfo, source) => {
  return `
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html dir="ltr" lang="en">
      <head>
        <link rel="preload" as="image" href="https://c52b.hyf.dev/memix-logo.png" />
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
                  Memix - Problem Report
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
                          style="background-color: #fff; border-radius: 35px"
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
                                          src="https://c52b.hyf.dev/memix-logo.png"
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
                                          Problem Report
                                        </h1>
                                        <p
                                          style="font-size:14px;line-height:24px;color:#333;font-family:-apple-system, BlinkMacSystemFont, &#x27;Segoe UI&#x27;, &#x27;Roboto&#x27;, &#x27;Oxygen&#x27;, &#x27;Ubuntu&#x27;, &#x27;Cantarell&#x27;, &#x27;Fira Sans&#x27;, &#x27;Droid Sans&#x27;, &#x27;Helvetica Neue&#x27;, sans-serif;margin:24px 0;margin-bottom:14px;margin-top:24px;margin-right:0;margin-left:0"
                                        >
                                          Someone has submitted a problem report on
                                          Memix. Here are the details:
                                        </p>
                                        <table
                                          width="100%"
                                          border="0"
                                          cellpadding="0"
                                          cellspacing="0"
                                          role="presentation"
                                        >
                                          <tbody>
                                            <tr>
                                              <td>
                                                <p
                                                  style="font-size:14px;line-height:24px;color:#333;font-family:-apple-system, BlinkMacSystemFont, &#x27;Segoe UI&#x27;, &#x27;Roboto&#x27;, &#x27;Oxygen&#x27;, &#x27;Ubuntu&#x27;, &#x27;Cantarell&#x27;, &#x27;Fira Sans&#x27;, &#x27;Droid Sans&#x27;, &#x27;Helvetica Neue&#x27;, sans-serif;margin:0px;margin-top:0px;margin-bottom:0px;margin-left:0px;margin-right:0px"
                                                >
                                                  <strong style="color: #a9b941">
                                                    Deck Title:
                                                  </strong>
                                                   <a href="https://c52b.hyf.dev/deck/${source.deckId}" target="_blank">${source.deckTitle}</a><br />
                                                  <strong style="color: #a9b941">
                                                    Deck ID:
                                                  </strong>
                                                  ${source.deckId}<br />
                                                  <strong style="color: #a9b941">
                                                    Card ID:
                                                  </strong>${source.cardId}
                                                </p>
                                                <p
                                                  style="font-size:14px;line-height:24px;color:#333;font-family:-apple-system, BlinkMacSystemFont, &#x27;Segoe UI&#x27;, &#x27;Roboto&#x27;, &#x27;Oxygen&#x27;, &#x27;Ubuntu&#x27;, &#x27;Cantarell&#x27;, &#x27;Fira Sans&#x27;, &#x27;Droid Sans&#x27;, &#x27;Helvetica Neue&#x27;, sans-serif;margin:0px;margin-top:0px;margin-bottom:0px;margin-left:0px;margin-right:0px"
                                                >
                                                  <strong style="color: #a9b941">
                                                    Report Type:
                                                  </strong>
                                                  ${problemType}
                                                </p>
                                                ${
                                                  moreInfo &&
                                                  `<p
                                                  style="font-size:14px;line-height:24px;color:#333;font-family:-apple-system, BlinkMacSystemFont, &#x27;Segoe UI&#x27;, &#x27;Roboto&#x27;, &#x27;Oxygen&#x27;, &#x27;Ubuntu&#x27;, &#x27;Cantarell&#x27;, &#x27;Fira Sans&#x27;, &#x27;Droid Sans&#x27;, &#x27;Helvetica Neue&#x27;, sans-serif;margin:0px;margin-top:0px;margin-bottom:0px;margin-left:0px;margin-right:0px"
                                                >
                                                  <strong style="color: #a9b941">
                                                    More Information:
                                                  </strong>
                                                  ${moreInfo}
                                                </p>
                                                `
                                                }
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

export default reportProblemEmailTemplate;
