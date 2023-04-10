import React, { useState, useEffect, useRef } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBBtn,
  MDBIcon,
  MDBSideNav,
  MDBSideNavMenu,
  MDBSideNavItem,
  MDBSideNavLink,
  MDBContainer,
} from "mdb-react-ui-kit";

const ChatApp = () => {
  const [basicOpen, setBasicOpen] = useState(true);
  const [backdrop, setBackdrop] = useState(false);

  const innerWidth = useRef(null);

  useEffect(() => {
    const checkResize = () => {
      if (window.innerWidth === innerWidth.current) {
        return;
      }

      innerWidth.current = window.innerWidth;

      if (window.innerWidth < 1000) {
        setBasicOpen(false);
        setBackdrop(true);
      } else {
        setBasicOpen(true);
        setBackdrop(false);
      }
    };
    checkResize();

    window.addEventListener("resize", checkResize);

    return () => {
      window.removeEventListener("resize", checkResize);
    };
  }, []);

  return (
    <MDBContainer className="py-5">
      <section>
        <MDBCard>
          <MDBCardBody style={{ position: "relative", overflow: "hidden" }}>
            <section className="inner-sidenav">
              <MDBSideNav
                absolute
                isOpen={basicOpen}
                backdrop={backdrop}
                getOpenState={(e) => setBasicOpen(e)}
                style={{ zIndex: 1000 }}
              >
                <div className="p-3">
                  <input
                    type="search"
                    className="form-control rounded"
                    placeholder="Search"
                    aria-label="Search"
                    aria-describedby="search-addon"
                  />
                </div>

                <MDBSideNavMenu>
                  <MDBSideNavItem>
                    <MDBSideNavLink>
                      <img
                        src="https://mdbootstrap.com/img/Photos/Avatars/img%20(24).jpg"
                        className="rounded-circle me-2"
                        style={{ width: "30px", height: "30px" }}
                        alt=""
                      />
                      <span className="d-block">Anna Doe</span>
                    </MDBSideNavLink>
                  </MDBSideNavItem>
                  <MDBSideNavItem>
                    <MDBSideNavLink>
                      <img
                        src="https://mdbootstrap.com/img/Photos/Avatars/img%20(9).jpg"
                        className="rounded-circle me-2"
                        style={{ width: "30px", height: "30px" }}
                        alt=""
                      />
                      <span className="d-block">Alan Turing</span>
                    </MDBSideNavLink>
                  </MDBSideNavItem>
                  <MDBSideNavItem>
                    <MDBSideNavLink>
                      <img
                        src="https://mdbootstrap.com/img/Photos/Avatars/img%20(4).jpg"
                        className="rounded-circle me-2"
                        style={{ width: "30px", height: "30px" }}
                        alt=""
                      />
                      <span className="d-block">Veronica Smith</span>
                    </MDBSideNavLink>
                  </MDBSideNavItem>
                  <MDBSideNavItem>
                    <MDBSideNavLink>
                      <img
                        src="https://mdbootstrap.com/img/Photos/Avatars/img%20(32).jpg"
                        className="rounded-circle me-2"
                        style={{ width: "30px", height: "30px" }}
                        alt=""
                      />
                      <span className="d-block">Tom Johnson</span>
                    </MDBSideNavLink>
                  </MDBSideNavItem>
                </MDBSideNavMenu>
              </MDBSideNav>
            </section>
            <section className="inner-content">
              <div className="d-flex">
                <MDBBtn
                  color="light"
                  className="shadow-0 p-0 me-3 d-block d-lg-none "
                  style={{ minWidth: "14px" }}
                  onClick={() => setBasicOpen(!basicOpen)}
                >
                  <MDBIcon fas icon="bars" size="lg" />
                </MDBBtn>
                <img
                  src="https://mdbootstrap.com/img/Photos/Avatars/img%20(24).jpg"
                  className="rounded-circle me-2"
                  style={{ width: "30px", height: "30px" }}
                  alt=""
                />

                <span>Anna Doe</span>
              </div>

              <hr />

              <div className="d-flex justify-content-start w-100">
                <img
                  src="https://mdbootstrap.com/img/Photos/Avatars/img%20(24).jpg"
                  className="rounded-circle me-2"
                  style={{ width: "30px", height: "30px" }}
                  alt=""
                />
                <p
                  className="p-3 bg-light  shadow-1 shadow-1"
                  style={{ maxWidth: "533px" }}
                >
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Unde
                  praesentium ad, dolores quaerat maxime architecto dolore,
                  necessitatibus rem possimus quam ratione sit neque quidem
                  officia dolorum nostrum enim dignissimos eum.
                  <small className="float-end text-dark mt-4">14:52</small>
                </p>
              </div>

              <div className="d-flex justify-content-end ms-auto">
                <p
                  className="p-3 bg-primary shadow-1-strong text-white "
                  style={{ maxWidth: "533px" }}
                >
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Unde
                  praesentium ad, dolores quaerat maxime architecto dolore,
                  necessitatibus rem possimus quam ratione sit neque quidem
                  officia dolorum nostrum enim dignissimos eum.
                  <small className="float-end mt-4">14:53</small>
                </p>
                <img
                  src="https://mdbootstrap.com/img/Photos/Avatars/img%20(26).jpg"
                  className="rounded-circle ms-2"
                  style={{ width: "30px", height: "30px" }}
                  alt=""
                />
              </div>

              <div className="d-flex justify-content-start w-100">
                <img
                  src="https://mdbootstrap.com/img/Photos/Avatars/img%20(24).jpg"
                  className="rounded-circle me-2"
                  style={{ width: "30px", height: "30px" }}
                  alt=""
                />
                <p
                  className="p-3 bg-light  shadow-1"
                  style={{ maxWidth: "533px" }}
                >
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Unde
                  praesentium ad, dolores quaerat maxime architecto dolore.
                  <small className="float-end text-dark mt-4">14:54</small>
                </p>
              </div>

              <div className="d-flex justify-content-end ms-auto">
                <p
                  className="p-3 bg-primary shadow-1-strong text-white "
                  style={{ maxWidth: "533px" }}
                >
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea
                  illo accusantium quibusdam quidem veniam inventore, libero
                  distinctio eaque, qui molestiae architecto aspernatur.
                  Praesentium natus maxime suscipit dolorem delectus, doloremque
                  reprehenderit numquam distinctio quas repudiandae veritatis
                  incidunt quo, consequatur quod laborum laboriosam. Quos
                  ducimus, ad veritatis illo minus molestiae omnis pariatur.
                  <small className="float-end mt-4">14:55</small>
                </p>
                <img
                  src="https://mdbootstrap.com/img/Photos/Avatars/img%20(26).jpg"
                  className="rounded-circle ms-2"
                  style={{ width: "30px", height: "30px" }}
                  alt=""
                />
              </div>

              <div className="d-flex justify-content-start w-100">
                <img
                  src="https://mdbootstrap.com/img/Photos/Avatars/img%20(24).jpg"
                  className="rounded-circle me-2"
                  style={{ width: "30px", height: "30px" }}
                  alt=""
                />
                <p
                  className="p-3 bg-light  shadow-1"
                  style={{ maxWidth: "533px" }}
                >
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Unde
                  praesentium ad, dolores quaerat maxime architecto dolore,
                  necessitatibus rem possimus quam ratione sit neque quidem
                  officia dolorum nostrum enim dignissimos eum.
                  <small className="float-end text-dark mt-4">14:52</small>
                </p>
              </div>

              <div className="d-flex justify-content-end ms-auto">
                <p
                  className="p-3 bg-primary shadow-1-strong text-white "
                  style={{ maxWidth: "533px" }}
                >
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Unde
                  praesentium ad, dolores quaerat maxime architecto dolore,
                  necessitatibus rem possimus quam ratione sit neque quidem
                  officia dolorum nostrum enim dignissimos eum.
                  <small className="float-end mt-4">14:53</small>
                </p>
                <img
                  src="https://mdbootstrap.com/img/Photos/Avatars/img%20(26).jpg"
                  className="rounded-circle ms-2"
                  style={{ width: "30px", height: "30px" }}
                  alt=""
                />
              </div>

              <div className="d-flex justify-content-start w-100">
                <img
                  src="https://mdbootstrap.com/img/Photos/Avatars/img%20(24).jpg"
                  className="rounded-circle me-2"
                  style={{ width: "30px", height: "30px" }}
                  alt=""
                />
                <p
                  className="p-3 bg-light  shadow-1"
                  style={{ maxWidth: "533px" }}
                >
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Unde
                  praesentium ad, dolores quaerat maxime architecto dolore.
                  <small className="float-end text-dark mt-4">14:54</small>
                </p>
              </div>

              <div className="d-flex justify-content-end ms-auto">
                <p
                  className="p-3 bg-primary shadow-1-strong text-white "
                  style={{ maxWidth: "533px" }}
                >
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea
                  illo accusantium quibusdam quidem veniam inventore, libero
                  distinctio eaque, qui molestiae architecto aspernatur.
                  Praesentium natus maxime suscipit dolorem delectus, doloremque
                  reprehenderit numquam distinctio quas repudiandae veritatis
                  incidunt quo, consequatur quod laborum laboriosam. Quos
                  ducimus, ad veritatis illo minus molestiae omnis pariatur.
                  <small className="float-end mt-4">14:55</small>
                </p>
                <img
                  src="https://mdbootstrap.com/img/Photos/Avatars/img%20(26).jpg"
                  className="rounded-circle ms-2"
                  style={{ width: "30px", height: "30px" }}
                  alt=""
                />
              </div>
            </section>

            <section id="message-input" className="fixed-bottom card bg-light">
              <MDBCardBody>
                <form className="d-flex">
                  <MDBBtn noRipple className="px-3">
                    <i className="fas fa-plus-circle"></i>
                  </MDBBtn>

                  <div className="w-100 mx-2">
                    <textarea
                      className="form-control"
                      id="textAreaExample"
                      rows="1"
                      placeholder="Type a message"
                    ></textarea>
                  </div>

                  <button type="button" className="btn btn-primary px-3">
                    <MDBIcon fas icon="thumbs-up" />
                  </button>
                </form>
              </MDBCardBody>
            </section>
          </MDBCardBody>
        </MDBCard>
      </section>
    </MDBContainer>
  );
};

export default ChatApp;
