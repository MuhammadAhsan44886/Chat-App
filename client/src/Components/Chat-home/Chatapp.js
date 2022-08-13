import React,{useState} from "react";
import "../Chat-home/chatapp.css";
import signup from "../images/signup.gif";
import log from "../images/log.jpeg";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import EmailModal from "./EmailModal";


const Chatapp = () => {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  React.useEffect(() => {
    const getToken = localStorage.getItem("token");
    if (getToken !== null) {
      navigate("/welcome");
    }
  }, []);

  return (
    <>
      <div className="main_home_wrapper">
        {/* //Navigation  */}
        <nav className="navbar navbar-expand-sm text-center">
          <div className="container-fluid">
            <button
              type="button"
              className="navbar-toggler"
              data-bs--target="#collapse"
              data-bs-toggle="collapse"
            >
              <span className="nabar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse">
              <ul className="navbar-nav desktop_nav">
                <li>
                  <a href="News.html">
                    <button
                      className="btn btn-outline-primary rounded-circle btn-dark "
                      style={{ width: "100px" }}
                    >
                      Logoo
                    </button>
                  </a>
                </li>

                <li>
                  <a href="#Price-Cards">
                    <button
                      className="btn-sign btn btn-outline-primary btn-warning "
                      onClick={() => navigate("/signup")}
                    >
                      SIGN UP NOW
                    </button>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="header">
          <div className="mobile_navbar">
            <div>
              <a href="News.html">
                <button
                  className="btn btn-outline-primary rounded-circle btn-dark"
                  style={{ width: "100px" }}
                >
                  Logo
                </button>
              </a>
            </div>

            <div>
              <a href="#Price-Cards">
                <button
                  className="btn-sign btn btn-outline-primary btn-warning "
                  onClick={() => navigate("/signup")}
                >
                  SIGN UP NOW
                </button>
              </a>
            </div>
          </div>
          <h1>
            "WE HELP{" "}
            <b>
              <span className="target">REAL ESTATE PROFESSIONALS</span>
            </b>{" "}
            AVOID <span className="target">WASTING TIME</span> ON NOISY SOCIAL
            NETWORK PLATFORMS BY USING A{" "}
            <span className="target">REAL ESTATE-ONLY</span> NETWORKING
            PLATFORM."
          </h1>
        </div>

        <img src={log} />

        <button
          id="sign-2"
          className=" btn btn-outline-primary btn-warning"
          onClick={() => navigate("/signup")}
        >
          SIGN-UP NOW
        </button>

        <div className="pdf-section rounded">
          <h3>
            <span className="pdf-head">
              GET YOURSELF THE 15 UNBEATABLE TIPS FOR EFFECTIVE PROFESSIONAL
              NETWORKING NOW!!
            </span>
          </h3>

          <button className="btn btn-outline-primary btn-success" onClick={handleOpen}>
            DOWNLOAD <b>FREE</b> PDF
          </button>
        </div>

        <div className="stakes">
          <h3>THE STAKES ARE HIGH!!</h3>

          <p>
            How much does wasting time on social media cost you? How many
            hours,days go away just like that? How much time are you suppose to
            invest in relationships that matter--but end up wasting it on
            unrelatable crap that shows up on your feed constantly? If you
            you've been wondering what causes you frustration,now you know--it's
            a lack of an industry-specific platform that serves your needs.NOW
            it's time to get rid of that frustration.COMPLETELY!!!
          </p>
        </div>

        <div className="bright rounded">
          <h3>The brighter side:</h3>
          We help you save about 2 hours of your valuable time each day.That is
          what you get.
        </div>

        <div className="care">
          <h3>Why do we even care?</h3>

          <p>
            We understand how frustating it is to find yourself at the end of
            the day not able to tell excatly where your time acually went.We
            know how it feels to worry you are not doing the right thing.
          </p>
        </div>

        <div className="get-Set">
          <h3>Getting started with our service is super easy:</h3>

          <div className="row table_wrapper">
            <div className="card col">
              <div className="card-header">1.SIGNUP</div>

              <div className="card-body">
                <p>
                  Register for an account by submitting a filled signup form.
                </p>
              </div>

              <div className="card-footer">
                <button
                  className="btn btn-outline-primary btn-warning"
                  onClick={() => navigate("/signup")}
                >
                  SIGNUP NOW
                </button>
              </div>
            </div>

            <div className="card col">
              <div className="card-header">DOWNLOAD PDF</div>

              <div className="card-body">
                <p>Download your FREE pdf to learn netwoking tips.</p>
              </div>

              <div className="card-footer">
                <button className="btn btn-outline-primary btn-success" onClick={handleOpen}>
                  DOWNLOAD PDF
                </button>
              </div>
            </div>

            <div className="card col">
              <div className="card-header">BUILD YOUR TEAM</div>

              <div className="card-body">
                <p>
                  Start building your team of property professionals.Search
                  those who are active users and invite non-users to join you.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="service-exp rounded">
          <h3>Service explanation:</h3>

          <p className="service-exp-par">
            At PROPERTY CHEF we understand you are the kind of person who want
            to have control over your time and work In order for that to happen,
            you need a professional networking platform that does not waste your
            time with unnecessary content and adverts.The problem with available
            social networking sites is that they have those unecessary ads and
            broad content that frustrate you.We believe you derserve a
            better,special platform that works for you so that you can have
            control over your life.
          </p>
          <br />
          <p className="service-exp-par">
            WE understant how it feels watching your time go away because you
            have slim choice.That is why we created a Real Estate Industry-Only
            platform to solve the problem and fuel your career.We save yours of
            yuor day.Here's how it works: 1.Signup for an account. 2.Download
            your networkinking PDF. 3.Start to experience a stress-free way of
            building a career team online. So,Go SignUp for account NOW so you
            can benefit RIGHT AWAY.
          </p>
        </div>

        <div className="confuse">
          <h3>Are you confused?</h3>

          <p>
            Our platform is designed to work for every real estate professional
            globally and we offer 100% refund guarantee if you happen to be
            unsatisfied.Our service is based on a monthly membership fee of just
            $10 so that we can best serve you continuously.
          </p>
        </div>
        <div className="act-div rounded">
          <h3>
            {" "}
            <span id="actNow">Act NOW</span> and avoid wasting your life!
          </h3>

          <div className="rounded" id="benefits">
            <h2>Our clients no longer struggle with:</h2>

            <ul>
              <li>Frustations due to endless distractions.</li>
              <li>
                difficulty in finding the right people to do business with.
              </li>
              <li>
                networking with oter real estate professionals on remote
                regions.
              </li>
            </ul>
          </div>
        </div>

        <div className="pricing rounded">
          <h3>Pricing and benefits:</h3>

          <p>
            With just $10 p/m,membership fee to access the platform ,you get:
          </p>

          <ul>
            Access to real estate professionals from all parts of the world.
          </ul>

          <li>Property-Industry related content only</li>

          <li>No annoying ads.</li>

          <li>see projects others are currently working on. </li>
        </div>

        <div className="rounded junk-drawer row">
          <div className="card col">
            <div className="card-header">About Us</div>
          </div>

          <div className="card col">
            <div className="card-header">Contact Us</div>
          </div>

          <div className="card col">
            <div className="card-header">Services</div>
          </div>
        </div>
      </div>
    



    {
      open && <EmailModal open={open} handleClose={handleClose}/> 
    }
      

    </>
  );
};

export default Chatapp;
