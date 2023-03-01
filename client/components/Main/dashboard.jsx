import React, { useState, useEffect } from "react";
import "../../src/index.css";
import api from "../../config/axiosInstance";
import AboutLeft from '../../assets/images/about-left-image.png'
import bannerright from '../../assets/images/banner-right-image.png'
import contacticon01 from '../../assets/images/contact-icon-01.png'
import contacticon02 from '../../assets/images/contact-icon-02.png'
import contacticon03 from '../../assets/images/contact-icon-03.png'
import portfolio01 from '../../assets/images/portfolio-01.jpg'
import portfolio02 from '../../assets/images/portfolio-02.jpg'
import portfolio03 from '../../assets/images/portfolio-03.jpg'
import portfolio04 from '../../assets/images/portfolio-04.jpg'
import portfolio05 from '../../assets/images/portfolio-05.jpg'
import portfolio06 from '../../assets/images/portfolio-06.jpg'

const Main = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    api
      .get("/admin")
      .then((response) => {
        setData(response.data.result);
        console.log(response.data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const title = data && data.length > 0 ? data[0].title : "";

  return (
    <>
      <div
        className="main-banner wow fadeIn"
        id="top"
        data-wow-duration="1s"
        data-wow-delay="0.5s"
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="row">
                <div className="col-lg-6 align-self-center">
                  <div
                    className="left-content header-text wow fadeInLeft"
                    data-wow-duration="1s"
                    data-wow-delay="1s"
                  >
                    <div className="row">
                      <div className="col-lg-4 col-sm-4">
                        <div className="info-stat">
                          <h6>Status:</h6>
                          <h4>Pronto</h4>
                        </div>
                      </div>
                      <div className="col-lg-4 col-sm-4">
                        <div className="info-stat">
                          <h6>Preço:</h6>
                          <h4>Completamente gratuito</h4>
                        </div>
                      </div>
                      <div className="col-lg-4 col-sm-4">
                        <div className="info-stat">
                          <h6>Temas</h6>
                          <h4>+ 50</h4>
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <h2>Desenvolvedor, planeje sua vida em um só lugar</h2>
                      </div>
                      <div className="col-lg-12">
                        <div className="main-green-button scroll-to-section">
                          <a href="#contact">Cadastre-se</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div
                    className="right-image wow fadeInRight"
                    data-wow-duration="1s"
                    data-wow-delay="0.5s"
                  >
                    <img
                      src={bannerright}
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="features" className="features section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="features-content">
                <div className="row">
                  <div className="col-lg-3">
                    <div
                      className="features-item first-feature wow fadeInUp"
                      data-wow-duration="1s"
                      data-wow-delay="0s"
                    >
                      <div className="first-number number">
                        <h6>01</h6>
                      </div>
                      <div className="icon"></div>
                      <h4>Planeje-se</h4>
                      <div className="line-dec"></div>
                      <p>
                        Marque no calendário todos os seus compromissos do mês.
                        Tenha sempre em mão a data dos seus compromissos
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div
                      className="features-item second-feature wow fadeInUp"
                      data-wow-duration="1s"
                      data-wow-delay="0.2s"
                    >
                      <div className="second-number number">
                        <h6>02</h6>
                      </div>
                      <div className="icon"></div>
                      <h4>Produtividade e disciplina</h4>
                      <div className="line-dec"></div>
                      <p>
                        Lorem ipsum dolor sit ameter consectetur adipiscing li
                        elit sed do eiusmod.
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div
                      className="features-item first-feature wow fadeInUp"
                      data-wow-duration="1s"
                      data-wow-delay="0.4s"
                    >
                      <div className="third-number number">
                        <h6>03</h6>
                      </div>
                      <div className="icon"></div>
                      <h4>Anote suas tarefas</h4>
                      <div className="line-dec"></div>
                      <p>
                        Lorem ipsum dolor sit ameter consectetur adipiscing li
                        elit sed do eiusmod.
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div
                      className="features-item second-feature last-features-item wow fadeInUp"
                      data-wow-duration="1s"
                      data-wow-delay="0.6s"
                    >
                      <div className="fourth-number number">
                        <h6>04</h6>
                      </div>
                      <div className="icon"></div>
                      <h4>Veja os resultados</h4>
                      <div className="line-dec"></div>
                      <p>
                        Veja os resultados em pouco tempo, tendo uma visão
                        mensal de todas as suas tarefas e entregas
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="skills-content">
                <div className="row">
                  <div className="col-lg-3">
                    <div
                      className="skill-item wow fadeIn"
                      data-wow-duration="1s"
                      data-wow-delay="0s"
                    >
                      <div className="progress" data-percentage="80">
                        <span className="progress-left">
                          <span className="progress-bar"></span>
                        </span>
                        <span className="progress-right">
                          <span className="progress-bar"></span>
                        </span>
                        <div className="progress-value">
                          <div>
                            80%
                            <br />
                            <span>Organização</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div
                      className="skill-item wow fadeIn"
                      data-wow-duration="1s"
                      data-wow-delay="0.2s"
                    >
                      <div className="progress" data-percentage="60">
                        <span className="progress-left">
                          <span className="progress-bar"></span>
                        </span>
                        <span className="progress-right">
                          <span className="progress-bar"></span>
                        </span>
                        <div className="progress-value">
                          <div>
                            60%
                            <br />
                            <span>Rotina</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div
                      className="skill-item wow fadeIn"
                      data-wow-duration="1s"
                      data-wow-delay="0.4s"
                    >
                      <div className="progress" data-percentage="90">
                        <span className="progress-left">
                          <span className="progress-bar"></span>
                        </span>
                        <span className="progress-right">
                          <span className="progress-bar"></span>
                        </span>
                        <div className="progress-value">
                          <div>
                            90%
                            <br />
                            <span>Tarefas</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div
                      className="skill-item last-skill-item wow fadeIn"
                      data-wow-duration="1s"
                      data-wow-delay="0.6s"
                    >
                      <div className="progress" data-percentage="70">
                        <span className="progress-left">
                          <span className="progress-bar"></span>
                        </span>
                        <span className="progress-right">
                          <span className="progress-bar"></span>
                        </span>
                        <div className="progress-value">
                          <div>
                            70%
                            <br />
                            <span>Temas</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="about" className="about-us section">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div
                className="left-image wow fadeInLeft"
                data-wow-duration="1s"
                data-wow-delay="0.5s"
              >
                <img src={AboutLeft} alt="" />
              </div>
            </div>
            <div
              className="col-lg-6 align-self-center wow fadeInRight"
              data-wow-duration="1s"
              data-wow-delay="0.5s"
            >
              <div className="section-heading">
                <h6>Nos conheça melhor</h6>
                <h2>
                  Referência em <em>organização e planejamento</em> para{" "}
                  <span>desenvolvedores</span>
                </h2>
              </div>
              <div className="row">
                <div className="col-lg-4 col-sm-4">
                  <div className="about-item">
                    <h4>50+</h4>
                    <h6>temas</h6>
                  </div>
                </div>
                <div className="col-lg-4 col-sm-4">
                  <div className="about-item">
                    <h4>340+</h4>
                    <h6>clientes satisfeitos</h6>
                  </div>
                </div>
                <div className="col-lg-4 col-sm-4">
                  <div className="about-item">
                    <h4>128+</h4>
                    <h6>Prêmios</h6>
                  </div>
                </div>
              </div>
              <p>
                <a rel="nofollow" href="/" target="_parent">
                  DEV Planner
                </a>{" "}
                nasceu para facilitar a sua vida. Houve uma vez uma pequena
                empresa de desenvolvimento de software que percebeu que muitos
                desenvolvedores precisavam de um calendário especializado para
                acompanhar seus projetos. Eles decidiram criar um calendário
                on-line que pudesse ser personalizado de acordo com as
                necessidades de cada usuário. O calendário se tornou um grande
                sucesso entre a comunidade de desenvolvedores, e a empresa
                cresceu rapidamente. Hoje, eles são uma das principais empresas
                de calendários para desenvolvedores do mundo.
              </p>
              <div className="main-green-button">
                <a href="/Register">Acesse gratuitamente agora!</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="services" className="our-services section">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 offset-lg-3">
              <div
                className="section-heading wow bounceIn"
                data-wow-duration="1s"
                data-wow-delay="0.2s"
              >
                <h6>O que falam sobre nós</h6>
                <h2>
                  Descubra o que nossos <span>clientes</span> falam sobre nosso{" "}
                  <em>Planner</em>
                </h2>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-4">
              <div className="service-item wow bounceInUp">
                <div className="">
                  <div className="">
                    <div className="right-content">
                      {data[2] && data.length > 0 && <img className="w-200 h-100 rounded-full" src={data[2].image} />}

                      {data[2] && data.length > 0 && <h4 className="font-bold text-gray-900 pt-4 text-center">{data[2].title}</h4>}

                      {data[2] && data.length > 0 &&
                        <p className="font-medium">
                          {data[2].description}
                        </p>
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="service-item wow bounceInUp">
                <div className="">
                  <div className="">
                    <div className="right-content">
                      {data[1] && data.length > 0 && <img className="w-200 h-100 rounded-full" src={data[1].image} />}

                      {data[1] && data.length > 0 && <h4 className="font-bold text-gray-900 pt-4 text-center">{data[1].title}</h4>}

                      {data[1] && data.length > 0 &&
                        <p className="font-medium">
                          {data[1].description}
                        </p>
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="service-item wow bounceInUp">
                <div className="">
                  <div className="">
                    <div className="right-content">
                      {data[0] && data.length > 0 && <img className="w-200 h-100 rounded-full" src={data[0].image} />}

                      {data[0] && data.length > 0 && <h4 className="font-bold text-gray-900 pt-4 text-center">{data[0].title}</h4>}

                      {data[0] && data.length > 0 &&
                        <p className="font-medium">
                          {data[0].description}
                        </p>
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="service-item wow bounceInUp">
                <div className="">
                  <div className="">
                    <div className="right-content">
                      {data[3] && data.length > 0 && <img className="w-200 h-100 rounded-full" src={data[3].image} />}

                      {data[3] && data.length > 0 && <h4 className="font-bold text-gray-900 pt-4 text-center">{data[3].title}</h4>}

                      {data[3] && data.length > 0 &&
                        <p className="font-medium">
                          {data[3].description}
                        </p>
                      }

                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="service-item wow bounceInUp">
                <div className="">
                  <div className="">
                    <div className="right-content">

                      {data[4] && data.length > 0 && <img className="w-200 h-100 rounded-full" src={data[4].image} />}

                      {data[4] && data.length > 0 && <h4 className="font-bold text-gray-900 pt-4 text-center">{data[4].title}</h4>}

                      {data[4] && data.length > 0 &&
                        <p className="font-medium">
                          {data[4].description}
                        </p>
                      }

                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="service-item wow bounceInUp">
                <div className="">
                  <div className="">
                    <div className="right-content">
                      {data[5] && data.length > 0 && <img className="w-200 h-100 rounded-full" src={data[5].image} />}

                      {data[5] && data.length > 0 && <h4 className="font-bold text-gray-900 pt-4 text-center">{data[5].title}</h4>}

                      {data[5] && data.length > 0 &&
                        <p className="font-medium">
                          {data[5].description}
                        </p>
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="portfolio" className="our-portfolio section">
        <div className="container">
          <div className="row">
            <div className="col-lg-5">
              <div
                className="section-heading wow fadeInLeft"
                data-wow-duration="1s"
                data-wow-delay="0.3s"
              >
                <h6 className="text-center">Nossos Temas</h6>
                <h2 className="text-center">
                  Temos mais de <em>50</em> temas disponíveis ou{" "}
                  <span>crie</span> o seu
                </h2>
              </div>
            </div>
          </div>
        </div>
        <div
          className="container-fluid wow fadeIn"
          data-wow-duration="1s"
          data-wow-delay="0.7s"
        >
          <div className="row">
            <div className="col-lg-12">
              <div className="loop owl-carousel">
                <div className="item">
                  <div className="portfolio-item">
                    <div className="thumb">
                      <img src={portfolio01} alt="" />
                      <div className="hover-content">
                        <div className="inner-content">
                          <a href="#">
                            <h4>Tema legal 1</h4>
                          </a>
                          <span>Rosa</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="portfolio-item">
                    <div className="thumb">
                      <img src={portfolio04} alt="" />
                      <div className="hover-content">
                        <div className="inner-content">
                          <a href="#">
                            <h4>Tema legal 2</h4>
                          </a>
                          <span>moderno</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="item">
                  <div className="portfolio-item">
                    <div className="thumb">
                      <img src={portfolio02} alt="" />
                      <div className="hover-content">
                        <div className="inner-content">
                          <a href="#">
                            <h4>Tema legal3</h4>
                          </a>
                          <span>Dark</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="portfolio-item">
                    <div className="thumb">
                      <img src={portfolio05} alt="" />
                      <div className="hover-content">
                        <div className="inner-content">
                          <a href="#">
                            <h4>Tema legal4</h4>
                          </a>
                          <span>Arte</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="item">
                  <div className="portfolio-item">
                    <div className="thumb">
                      <img src={portfolio03} alt="" />
                      <div className="hover-content">
                        <div className="inner-content">
                          <a href="#">
                            <h4>Tema legal 5</h4>
                          </a>
                          <span>Dark</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="portfolio-item">
                    <div className="thumb">
                      <img src={portfolio06} alt="" />
                      <div className="hover-content">
                        <div className="inner-content">
                          <a href="#">
                            <h4>Tema legal6</h4>
                          </a>
                          <span>Rosa</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="item">
                  <div className="portfolio-item">
                    <div className="thumb">
                      <img src={portfolio04} alt="" />
                      <div className="hover-content">
                        <div className="inner-content">
                          <a href="#">
                            <h4>Tema legal 7</h4>
                          </a>
                          <span>Criativo</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="portfolio-item">
                    <div className="thumb">
                      <img src={portfolio01} alt="" />
                      <div className="hover-content">
                        <div className="inner-content">
                          <a href="#">
                            <h4>Tema legal 8</h4>
                          </a>
                          <span>Light</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="contact" className="contact-us section">
        <div className="container">
          <div className="row">
            <div
              className="col-lg-12 wow fadeInUp"
              data-wow-duration="0.5s"
              data-wow-delay="0.25s"
            >
              <form id="contact" action="" method="post">
                <div className="row">
                  <div className="col-lg-6 offset-lg-3">
                    <div className="section-heading">
                      <h6>Entre em contato</h6>
                      <h2>
                        Preencha o formulário abaixo e <span>entre</span> em{" "}
                        <em>contato</em> conosco
                      </h2>
                    </div>
                  </div>
                  <div className="col-lg-9">
                    <div className="row">
                      <div className="col-lg-6">
                        <fieldset>
                          <input
                            type="name"
                            name="name"
                            id="name"
                            placeholder="Nome"
                            autoComplete="on"
                            required
                          />
                        </fieldset>
                      </div>
                      <div className="col-lg-6">
                        <fieldset>
                          <input
                            type="surname"
                            name="surname"
                            id="surname"
                            placeholder="Sobrenome"
                            autoComplete="on"
                            required
                          />
                        </fieldset>
                      </div>
                      <div className="col-lg-6">
                        <fieldset>
                          <input
                            type="text"
                            name="email"
                            id="email"
                            pattern="[^ @]*@[^ @]*"
                            placeholder="Seu melhor email"
                            required=""
                          />
                        </fieldset>
                      </div>
                      <div className="col-lg-6">
                        <fieldset>
                          <input
                            type="subject"
                            name="subject"
                            id="subject"
                            placeholder="Assunto"
                            autoComplete="on"
                          />
                        </fieldset>
                      </div>
                      <div className="col-lg-12">
                        <fieldset>
                          <textarea
                            name="message"
                            type="text"
                            className="form-control"
                            id="message"
                            placeholder="Mensagem"
                            required=""
                          ></textarea>
                        </fieldset>
                      </div>
                      <div className="col-lg-12">
                        <fieldset>
                          <button
                            type="submit"
                            id="form-submit"
                            className="main-button "
                          >
                            Envie agora
                          </button>
                        </fieldset>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div className="contact-info">
                      <ul>
                        <li>
                          <div className="icon flex justify-center items-center">
                            <img
                              className="self-center"
                              src={contacticon01}
                              alt="email icon"
                            />
                          </div>
                          <a href="#">contato@devplanner.com</a>
                        </li>
                        <li>
                        <div className="icon flex justify-center items-center">
                            <img
                              src={contacticon02}
                              alt="phone"
                            />
                          </div>
                          <a href="#">(21) 98569-3025</a>
                        </li>
                        <li>
                        <div className="icon flex justify-center items-center">
                            <img
                              src={contacticon03}
                              alt="location"
                            />
                          </div>
                          <a href="#">
                            R. Barcelos Domingos, 58 - Campo Grande, Rio de
                            Janeiro
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
