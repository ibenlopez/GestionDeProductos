const Banner = () => {
    return (
      <div id="bannerCarousel" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="/src/assets/banner-slide1.png" className="d-block w-100 h-90" alt="Slide 1" />
          </div>
          <div className="carousel-item">
            <img src="/src/assets/banner-slide2.png" className="d-block w-100" alt="Slide 2" />
          </div>
          <div className="carousel-item">
            <a href="/register"><img src="/src/assets/banner-slide3.png" className="d-block w-100" alt="Slide 3" /></a>
          </div>
        </div>
  
        {/* Controles del carrusel */}
        <button className="carousel-control-prev" type="button" data-bs-target="#bannerCarousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#bannerCarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
        </button>
      </div>
    );
  };
  
  export default Banner;
  