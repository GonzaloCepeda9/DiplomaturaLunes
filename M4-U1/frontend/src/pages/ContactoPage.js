import React from 'react';

const ContactoPage = (props) => {
    return (
        <main>
            <div className="holder">
                <h2>Complete el siguiente formulario</h2>
                <form action="" method="" className="formulario">
                    <p>
                        <label>Nombre</label>
                        <input type="text" name="nombre"/>
                    </p>
                    <p>
                        <label>Email</label>
                        <input type="text" name="email"/>
                    </p>
                    <p>
                        <label>Teléfono</label>
                        <input type="text" name="telefono"/>
                    </p>
                    <p>
                        <label>Comentario</label>
                        <textarea name="mensaje"></textarea>
                    </p>
                    <p className="centrar"><input type="submit" value="Enviar"/></p>
                </form>
            </div>
            <div>
                <h2>Otras vías de contacto</h2>
                <p>También puede contactarse con nosotros usando los siguientes medios:</p>
                <ul>
                    <li>Teléfono: 123456789</li>
                    <li>Email:</li>
                    <li>Facebook</li>
                    <li>Twiter</li>
                    <li>Skype</li>
                    <li>Instagram</li>
                </ul>
            </div>
        </main>
    );
}

export default ContactoPage;