import nodemailer from "nodemailer"

export const emailRegistro = async(datos) => {
   const {nombre,email,token} = datos
   const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "b58aedb5f9103b",
      pass: "25b34e8e2ebdfe"
    }
  });
  //Información del email
  const info = await transport.sendMail({
    from:'"Uptask - Administrador de proyectos" <cuentas@uptask.com/>',
    to: email,
    subject: "Uptask - comprueba tu cuenta",
    text: "Comprueba tu cuenta en Uptask",
    html: ` <img src="https://alumnosunir-my.sharepoint.com/:i:/g/personal/simonjose_lopez136_comunidadunir_net/Ebs1Riok43ZFuJuQJAP17vgBpcMAN91XyxQU3oCE1voULw?e=oa5oF8"/>
            <p>Hola ${nombre} comprueba tu cuenta en Uptask</p>
            
            <p>Tu cuenta ya esta casi lista, solo debes comprobarla en el siguiente enlace:
            <a href="${process.env.FRONTEND_URL}/confirmar/${token}">Comprobar Cuenta</a>
            </p>
            <p>Si tu no creaste esta cuenta, puedes ignorar el mensaje</p>
    `
  })
}