import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <div className="">
        {/* Footer */}
        <footer
          className="text-center text-lg-start text-white"
          style={{ backgroundColor: "#1c2331" }}
        >
          {/* Section: Social media */}
          <section
            className="d-flex justify-content-between p-4"
            style={{ backgroundColor: "rgb(255, 159, 103)" }}
          >
            {/* Left */}
            <div className="me-5">
              <span>Liên hệ với chúng tôi qua:</span>
            </div>
            {/* Left */}
            {/* Right */}
            <div>
              <a href className="text-white me-4">
                <i className="fab fa-facebook-f" />
              </a>
              <a href className="text-white me-4">
                <i className="fab fa-twitter" />
              </a>
              <a href className="text-white me-4">
                <i className="fab fa-google" />
              </a>
              <a href className="text-white me-4">
                <i className="fab fa-instagram" />
              </a>
              <a href className="text-white me-4">
                <i className="fab fa-linkedin" />
              </a>
              <a href className="text-white me-4">
                <i className="fab fa-github" />
              </a>
            </div>
            {/* Right */}
          </section>
          {/* Section: Social media */}
          {/* Section: Links  */}
          <section className>
            <div className="container text-center text-md-start mt-5">
              {/* Grid row */}
              <div className="row mt-3">
                {/* Grid column */}
                <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                  {/* Content */}
                  <h6 className="text-uppercase fw-bold">SKILL FORGE</h6>
                  <hr
                    className="mb-4 mt-0 d-inline-block mx-auto"
                    style={{ width: 60, backgroundColor: "#7c4dff", height: 2 }}
                  />
                  <p>
                    "Khám phá và phát triển bản thân với các khóa học kỹ năng
                    mềm: nền tảng vững chắc cho sự nghiệp rực rỡ - Hãy khơi dậy
                    tiềm năng bên trong bạn, mở ra cánh cửa cơ hội vàng, và vươn
                    tới đỉnh cao thành công."
                  </p>
                </div>
                {/* Grid column */}
                {/* Grid column */}
                <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                  {/* Links */}
                  <h6 className="text-uppercase fw-bold">Liên kết</h6>
                  <hr
                    className="mb-4 mt-0 d-inline-block mx-auto"
                    style={{ width: 60, backgroundColor: "#7c4dff", height: 2 }}
                  />
                  <p>
                    <Link to="/" className="text-white">
                      Trang chủ
                    </Link>
                  </p>
                  <p>
                    <Link to="/course" className="text-white">
                      Các khóa học
                    </Link>
                  </p>
                  <p>
                    <Link to="/enrolled" className="text-white">
                      Khóa học của tôi
                    </Link>
                  </p>
                </div>

                <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                  <h6 className="text-uppercase fw-bold">Liên hệ </h6>
                  <hr
                    className="mb-4 mt-0 d-inline-block mx-auto"
                    style={{ width: 60, backgroundColor: "#7c4dff", height: 2 }}
                  />
                  <p>
                    <i className="fas fa-home mr-3" />
                    Thu Duc, Ho Chi Minh City
                  </p>
                  <p>
                    <i className="fas fa-envelope mr-3" />{" "}
                    skillforgeedu@gmail.com
                  </p>
                  <p>
                    <i className="fas fa-phone mr-3" /> + 01 234 567 88
                  </p>
                  <p>
                    <i className="fas fa-print mr-3" /> + 01 234 567 89
                  </p>
                </div>
              </div>
            </div>
          </section>

          <div
            className="text-center p-3"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
          >
            © 2024 Copyright:
            <a
              className=" mx-2 text-white text-decoration-none"
              href="http://skillforge.website"
            >
              skillforge.website
            </a>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Footer;
