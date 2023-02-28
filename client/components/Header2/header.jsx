const Header2 = () => {

    return (
      <>
  
        <header class="header-area header-sticky wow slideInDown" data-wow-duration="0.75s" data-wow-delay="0s">
          <div class="container">
            <div class="row">
              <div class="col-12">
                <nav class="main-nav">
                 
  
                  <a href="index.html" class="logo">
                    <img src="assets/images/Logo" alt="Logo" width="200px"></img>
                  </a>
                 
  
                  
                  <ul class="nav">
                    <li class="scroll-to-section"><a href="#top" class="active">Home</a></li>
                    <li class="scroll-to-section"><a href="#features">Benefícios</a></li>
                    <li class="scroll-to-section"><a href="#about">Sobre Nós</a></li>
                    <li class="scroll-to-section"><a href="#services">Clientes</a></li>
                    <li class="scroll-to-section"><a href="#portfolio">Portfólio</a></li>
                    <li class="scroll-to-section"><a href="#contact">Contato</a></li>
                    <li class="scroll-to-section"><a href="/Login">Login</a></li>
                    <li class="scroll-to-section"><div class="main-blue-button"><a href="/Register">CADASTRE-SE</a></div></li>
                  </ul>
                  <a class='menu-trigger'>
                    <span>Menu</span>
                  </a>
                
  
                </nav>
              </div>
            </div>
          </div>
        </header>
  
      </>
  
    )
  }
  
  export default Header2