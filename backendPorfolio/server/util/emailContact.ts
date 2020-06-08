export const newContactHtml = `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html lang="en">
  <head>
    <title>Novo Contato</title>
    <meta charset="UTF-8" />
    <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
    <link
      rel="stylesheet"
      href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
      integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
      crossorigin="anonymous"
    />

    <link
      href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap"
      rel="stylesheet"
    />

    <style>
      * {
        margin: 0px;
        padding: 0px;
        box-sizing: border-box;
      }

      body,
      html {
        height: 100%;
        font-family: Poppins-Regular, sans-serif;
      }

      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        margin: 0px;
      }

      /*---------------------------------------------*/
      input {
        outline: none;
        border: none;
      }

      input[type='number'] {
        -moz-appearance: textfield;
        appearance: none;
        -webkit-appearance: none;
      }

      input[type='number']::-webkit-outer-spin-button,
      input[type='number']::-webkit-inner-spin-button {
        -webkit-appearance: none;
      }

      textarea {
        outline: none;
        border: none;
      }

      textarea:focus,
      input:focus {
        border-color: transparent !important;
      }

      input:focus::-webkit-input-placeholder {
        color: transparent;
      }
      input:focus:-moz-placeholder {
        color: transparent;
      }
      input:focus::-moz-placeholder {
        color: transparent;
      }
      input:focus:-ms-input-placeholder {
        color: transparent;
      }

      textarea:focus::-webkit-input-placeholder {
        color: transparent;
      }
      textarea:focus:-moz-placeholder {
        color: transparent;
      }
      textarea:focus::-moz-placeholder {
        color: transparent;
      }
      textarea:focus:-ms-input-placeholder {
        color: transparent;
      }

      input::-webkit-input-placeholder {
        color: #adadad;
      }
      input:-moz-placeholder {
        color: #adadad;
      }
      input::-moz-placeholder {
        color: #adadad;
      }
      input:-ms-input-placeholder {
        color: #adadad;
      }

      textarea::-webkit-input-placeholder {
        color: #adadad;
      }
      textarea:-moz-placeholder {
        color: #adadad;
      }
      textarea::-moz-placeholder {
        color: #adadad;
      }
      textarea:-ms-input-placeholder {
        color: #adadad;
      }

      .container {
        max-width: 1200px;
      }

      .bg0 {
        background-color: #fff;
      }
      .bg1 {
        background-color: #f7f7f7;
      }

      .container-contact100 {
        width: 100%;
        min-height: 100vh;
        display: -webkit-box;
        display: -webkit-flex;
        display: -moz-box;
        display: -ms-flexbox;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        padding: 15px;
        background: #e6e6e6;
      }

      .wrap-contact100 {
        width: 920px;
        background: #fff;
        border-radius: 10px;
        overflow: hidden;
        padding: 62px 55px 90px 55px;
      }

      .contact100-form {
        width: 100%;
        display: -webkit-box;
        display: -webkit-flex;
        display: -moz-box;
        display: -ms-flexbox;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
      }

      .contact100-form-title {
        display: block;
        width: 100%;
        font-family: Montserrat-Black;
        font-size: 39px;
        color: #333333;
        line-height: 1.2;
        text-align: center;
        padding-bottom: 59px;
      }

      .wrap-input100 {
        width: 100%;
        position: relative;
        border: 1px solid #e6e6e6;
        border-radius: 13px;
        padding: 10px 30px 9px 22px;
        margin-bottom: 20px;
      }

      .rs1-wrap-input100 {
        width: calc((100% - 30px) / 2);
      }

      .label-input100 {
        font-family: Montserrat-SemiBold;
        font-size: 10px;
        color: #393939;
        line-height: 1.5;
        text-transform: uppercase;
      }

      .input100 {
        display: block;
        width: 100%;
        background: transparent;
        font-family: Montserrat-SemiBold;
        font-size: 18px;
        color: #555555;
        line-height: 1.2;
        padding-right: 15px;
      }

      /*---------------------------------------------*/
      input.input100 {
        height: 40px;
      }

      textarea.input100 {
        min-height: 250px;
        padding-top: 9px;
        padding-bottom: 13px;
      }

      .input100:focus + .focus-input100::before {
        width: 100%;
      }

      .center-absolute {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translateX(-50%) translateY(-50%);
        background-color: red;
        z-index: 10;
      }

      @media (max-width: 768px) {
        .rs1-wrap-input100 {
          width: 100%;
        }
      }

      @media (max-width: 576px) {
        .wrap-contact100 {
          padding: 62px 15px 90px 15px;
        }

        .wrap-input100 {
          padding: 10px 10px 9px 10px;
        }
      }
    </style>
  </head>
  <body>
    <div class="container-contact100 position-relative">
      <div class="wrap-contact100 position-absolute">
        <div class="contact100-form-title">
          Novo Contato Recebido!
        </div>
        <div class="row">
          <div class="col">
            <div class="wrap-input100 bg1">
              <span class="label-input100">Assunto</span>
              <input
                class="input100"
                type="text"
                name="name"
                placeholder="Assunto"
                value="[SUBJECT]"
                readonly
              />
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col">
            <div class="wrap-input100 bg1">
              <span class="label-input100">Nome Completo</span>
              <input
                class="input100"
                type="text"
                name="name"
                placeholder="Nome do Cliente"
                value="[NAME]"
                readonly
              />
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col">
            <div class="wrap-input100 bg1">
              <span class="label-input100">Email</span>
              <input
                class="input100"
                type="email"
                name="email"
                placeholder="Email"
                value="[EMAIL]"
                readonly
              />
            </div>
          </div>
        </div>

        <div class="wrap-input100 bg0">
          <span class="label-input100">Mensagem</span>
          <textarea
            class="input100"
            name="message"
            placeholder="Mensagem"
            readonly
          >
[MESSAGE]</textarea
          >
        </div>
      </div>
    </div>
  </body>
</html>

`;
