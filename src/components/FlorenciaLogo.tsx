import florenciaLogo from '../img/logo-florencia-negro.png'

export const FlorenciaLogo = () => {
  return (
    <img src={ florenciaLogo } 
         alt="Logo Florencia Sanabria"
         style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            width: '100px',
            color: '#000'
         }} 
    />
  )
}
