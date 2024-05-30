import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import {
  BecomePartner,
  BecomePartnerLeft,
  BecomePartnerRight,
  BecomePartnerText,
} from "../BecomePartnerSlider/becomepartner.styles";

export default function BecomePartnerSlider() {
  const [isShow, setIsShow] = useState(true);

  const handleClose = (e) => {
    e.preventDefault();
    setIsShow(false);
  };

  var PartnerSlider = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: false,
    pauseOnHover: true,
  };

  return (
    <>
      {isShow && (
        <Slider {...PartnerSlider} className="become_partner_slider">
          <div>
            <BecomePartner className="d-flex position-relative">
              <BecomePartnerLeft>
                <span className="pr-15 d-inline-flex">
                  <img
                    src="/assets/images/PromoIconGroup.png"
                    alt="PromoIconGroup"
                  />
                </span>
                <BecomePartnerText>
                  <label>Become a partner</label>
                  <p>
                    Invite a friend and earn <span>up to 40%</span> of our
                    revenue.
                  </p>
                </BecomePartnerText>
              </BecomePartnerLeft>
              <BecomePartnerRight>
                <button variant="alink" className="btn btn-blue">
                  Join
                </button>
              </BecomePartnerRight>
              <button
                type="button"
                className="close-become btn"
                onClick={handleClose}
              >
                <img src="/assets/images/remove-icon.svg" alt="remove-icon" />
              </button>
            </BecomePartner>
          </div>
          <div>
            <BecomePartner className="d-flex position-relative">
              <BecomePartnerLeft>
                <span className="pr-15 d-inline-flex">
                  <img
                    src="/assets/images/PromoIconGroup.png"
                    alt="PromoIconGroup"
                  />
                </span>
                <BecomePartnerText>
                  <label>Become a partner</label>
                  <p>
                    Invite a friend and earn <span>up to 40%</span> of our
                    revenue.
                  </p>
                </BecomePartnerText>
              </BecomePartnerLeft>
              <BecomePartnerRight>
                <button variant="alink" className="btn btn-blue">
                  Join
                </button>
              </BecomePartnerRight>
              <button
                type="button"
                className="close-become btn"
                onClick={handleClose}
              >
                <img src="/assets/images/remove-icon.svg" alt="remove-icon" />
              </button>
            </BecomePartner>
          </div>
        </Slider>
      )}
    </>
  );
}
