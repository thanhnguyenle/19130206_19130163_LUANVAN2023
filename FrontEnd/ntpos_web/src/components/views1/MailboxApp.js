import React, { useState, useEffect, useRef } from "react";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBContainer,
  MDBIcon,
  MDBDatatable,
  MDBSideNavMenu,
  MDBSideNavItem,
  MDBSideNavLink,
  MDBSideNav,
} from "mdb-react-ui-kit";

const basicData = {
  columns: ["Sender", "Title", "Message", "Date"],
  rows: [
    [
      "Vernon",
      "libero. Proin mi. Aliquam",
      "et ipsum cursus vestibulum. Mauris magna. Duis dignissim tempor arcu.",
      "10.29.20",
    ],
    [
      "Ashton",
      "Donec porttitor tellus non",
      "augue, eu tempor erat neque non quam. Pellentesque habitant morbi",
      "11.19.20",
    ],
    [
      "Amal",
      "Nunc mauris elit, dictum",
      "elementum at, egestas a, scelerisque sed, sapien. Nunc pulvinar arcu",
      "03.14.21",
    ],
    [
      "Rogan",
      "magna. Duis dignissim tempor",
      "penatibus et magnis dis parturient montes, nascetur ridiculus mus. Proin",
      "12.13.20",
    ],
    [
      "Vladimir",
      "Donec nibh. Quisque nonummy",
      "neque. In ornare sagittis felis. Donec tempor, est ac mattis",
      "03.25.21",
    ],
    [
      "Ulric",
      "est. Nunc ullamcorper, velit",
      "dui augue eu tellus. Phasellus elit pede, malesuada vel, venenatis",
      "12.06.20",
    ],
    [
      "Hammett",
      "netus et malesuada fames",
      "eget metus eu erat semper rutrum. Fusce dolor quam, elementum",
      "07.17.21",
    ],
    [
      "Gage",
      "lectus pede et risus.",
      "at fringilla purus mauris a nunc. In at pede. Cras",
      "11.24.20",
    ],
    [
      "Damon",
      "nec tempus scelerisque, lorem",
      "Suspendisse non leo. Vivamus nibh dolor, nonummy ac, feugiat non,",
      "02.17.21",
    ],
    [
      "Travis",
      "nisl elementum purus, accumsan",
      "euismod mauris eu elit. Nulla facilisi. Sed neque. Sed eget",
      "09.12.20",
    ],
    [
      "Drake",
      "in consectetuer ipsum nunc",
      "neque. In ornare sagittis felis. Donec tempor, est ac mattis",
      "12.08.20",
    ],
    [
      "Finn",
      "morbi tristique senectus et",
      "dolor, nonummy ac, feugiat non, lobortis quis, pede. Suspendisse dui.",
      "06.27.21",
    ],
    [
      "Hedley",
      "nisl arcu iaculis enim,",
      "Etiam laoreet, libero et tristique pellentesque, tellus sem mollis dui,",
      "02.10.21",
    ],
    [
      "Ross",
      "odio a purus. Duis",
      "diam dictum sapien. Aenean massa. Integer vitae nibh. Donec est",
      "03.14.21",
    ],
    [
      "William",
      "ut mi. Duis risus",
      "mus. Aenean eget magna. Suspendisse tristique neque venenatis lacus. Etiam",
      "04.16.21",
    ],
    [
      "Brennan",
      "per conubia nostra, per",
      "Nulla dignissim. Maecenas ornare egestas ligula. Nullam feugiat placerat velit.",
      "06.07.21",
    ],
    [
      "Deacon",
      "Nunc ullamcorper, velit in",
      "Ut semper pretium neque. Morbi quis urna. Nunc quis arcu",
      "05.10.21",
    ],
    [
      "Jameson",
      "parturient montes, nascetur ridiculus",
      "Quisque libero lacus, varius et, euismod et, commodo at, libero.",
      "10.24.20",
    ],
    [
      "Gareth",
      "lobortis risus. In mi",
      "Aliquam ultrices iaculis odio. Nam interdum enim non nisi. Aenean",
      "08.15.21",
    ],
    [
      "David",
      "gravida sit amet, dapibus",
      "non nisi. Aenean eget metus. In nec orci. Donec nibh.",
      "04.19.21",
    ],
    [
      "Byron",
      "metus. Aenean sed pede",
      "ante. Vivamus non lorem vitae odio sagittis semper. Nam tempor",
      "11.18.20",
    ],
    [
      "Ciaran",
      "consectetuer euismod est arcu",
      "pellentesque a, facilisis non, bibendum sed, est. Nunc laoreet lectus",
      "07.22.21",
    ],
    [
      "Gary",
      "sem. Nulla interdum. Curabitur",
      "consequat enim diam vel arcu. Curabitur ut odio vel est",
      "07.15.21",
    ],
    [
      "Clark",
      "Suspendisse sed dolor. Fusce",
      "lorem ipsum sodales purus, in molestie tortor nibh sit amet",
      "06.09.21",
    ],
    [
      "Lee",
      "sed leo. Cras vehicula",
      "Phasellus at augue id ante dictum cursus. Nunc mauris elit,",
      "06.24.21",
    ],
    [
      "Isaiah",
      "at fringilla purus mauris",
      "dolor. Nulla semper tellus id nunc interdum feugiat. Sed nec",
      "05.28.21",
    ],
    [
      "Todd",
      "eu nibh vulputate mauris",
      "ultricies adipiscing, enim mi tempor lorem, eget mollis lectus pede",
      "08.17.21",
    ],
    [
      "Nicholas",
      "mollis lectus pede et",
      "dictum cursus. Nunc mauris elit, dictum eu, eleifend nec, malesuada",
      "03.02.21",
    ],
    [
      "Wyatt",
      "sodales elit erat vitae",
      "tincidunt dui augue eu tellus. Phasellus elit pede, malesuada vel,",
      "05.20.21",
    ],
    [
      "Callum",
      "ut, molestie in, tempus",
      "eros turpis non enim. Mauris quis turpis vitae purus gravida",
      "03.24.21",
    ],
    [
      "Neville",
      "Aliquam erat volutpat. Nulla",
      "nec enim. Nunc ut erat. Sed nunc est, mollis non,",
      "12.31.20",
    ],
    [
      "Silas",
      "congue. In scelerisque scelerisque",
      "tellus, imperdiet non, vestibulum nec, euismod in, dolor. Fusce feugiat.",
      "10.20.20",
    ],
    [
      "Brenden",
      "velit justo nec ante.",
      "ante. Vivamus non lorem vitae odio sagittis semper. Nam tempor",
      "11.25.20",
    ],
    [
      "Perry",
      "Donec tempus, lorem fringilla",
      "cursus. Integer mollis. Integer tincidunt aliquam arcu. Aliquam ultrices iaculis",
      "09.23.20",
    ],
    [
      "Gil",
      "ac tellus. Suspendisse sed",
      "sodales at, velit. Pellentesque ultricies dignissim lacus. Aliquam rutrum lorem",
      "08.19.21",
    ],
    [
      "Lester",
      "aliquet lobortis, nisi nibh",
      "Proin eget odio. Aliquam vulputate ullamcorper magna. Sed eu eros.",
      "12.05.20",
    ],
    [
      "Judah",
      "aliquet. Phasellus fermentum convallis",
      "interdum. Curabitur dictum. Phasellus in felis. Nulla tempor augue ac",
      "10.20.20",
    ],
    [
      "Xavier",
      "ultrices. Duis volutpat nunc",
      "ornare, libero at auctor ullamcorper, nisl arcu iaculis enim, sit",
      "09.04.21",
    ],
    [
      "Carson",
      "mus. Aenean eget magna.",
      "id risus quis diam luctus lobortis. Class aptent taciti sociosqu",
      "04.07.21",
    ],
    [
      "Kenyon",
      "mauris a nunc. In",
      "lacinia vitae, sodales at, velit. Pellentesque ultricies dignissim lacus. Aliquam",
      "11.01.20",
    ],
    [
      "Callum",
      "neque venenatis lacus. Etiam",
      "amet ante. Vivamus non lorem vitae odio sagittis semper. Nam",
      "08.25.21",
    ],
    [
      "Judah",
      "sed dui. Fusce aliquam,",
      "dis parturient montes, nascetur ridiculus mus. Proin vel nisl. Quisque",
      "12.03.20",
    ],
    [
      "Gray",
      "ligula. Nullam enim. Sed",
      "sit amet, consectetuer adipiscing elit. Aliquam auctor, velit eget laoreet",
      "10.05.20",
    ],
    [
      "Arden",
      "auctor. Mauris vel turpis.",
      "gravida. Praesent eu nulla at sem molestie sodales. Mauris blandit",
      "02.13.21",
    ],
    [
      "Brody",
      "justo. Praesent luctus. Curabitur",
      "pharetra, felis eget varius ultrices, mauris ipsum porta elit, a",
      "08.09.21",
    ],
    [
      "Addison",
      "interdum feugiat. Sed nec",
      "eros. Proin ultrices. Duis volutpat nunc sit amet metus. Aliquam",
      "09.19.20",
    ],
    [
      "Price",
      "luctus ut, pellentesque eget,",
      "Sed malesuada augue ut lacus. Nulla tincidunt, neque vitae semper",
      "12.17.20",
    ],
    [
      "Merrill",
      "amet ultricies sem magna",
      "Phasellus ornare. Fusce mollis. Duis sit amet diam eu dolor",
      "04.28.21",
    ],
    [
      "Brendan",
      "odio, auctor vitae, aliquet",
      "ante blandit viverra. Donec tempus, lorem fringilla ornare placerat, orci",
      "02.26.21",
    ],
    [
      "Stone",
      "lacus pede sagittis augue,",
      "mauris elit, dictum eu, eleifend nec, malesuada ut, sem. Nulla",
      "04.25.21",
    ],
    [
      "Damian",
      "a, facilisis non, bibendum",
      "eget metus eu erat semper rutrum. Fusce dolor quam, elementum",
      "04.16.21",
    ],
    [
      "Chandler",
      "adipiscing. Mauris molestie pharetra",
      "a, scelerisque sed, sapien. Nunc pulvinar arcu et pede. Nunc",
      "10.22.20",
    ],
    [
      "Jonah",
      "neque non quam. Pellentesque",
      "Fusce diam nunc, ullamcorper eu, euismod ac, fermentum vel, mauris.",
      "06.23.21",
    ],
    [
      "Henry",
      "fermentum convallis ligula. Donec",
      "habitant morbi tristique senectus et netus et malesuada fames ac",
      "04.21.21",
    ],
    [
      "Zeus",
      "Sed dictum. Proin eget",
      "arcu. Morbi sit amet massa. Quisque porttitor eros nec tellus.",
      "09.03.20",
    ],
    [
      "Eaton",
      "Sed neque. Sed eget",
      "auctor ullamcorper, nisl arcu iaculis enim, sit amet ornare lectus",
      "05.26.21",
    ],
    [
      "Tarik",
      "ultrices a, auctor non,",
      "tristique senectus et netus et malesuada fames ac turpis egestas.",
      "11.19.20",
    ],
    [
      "Carl",
      "sem elit, pharetra ut,",
      "scelerisque scelerisque dui. Suspendisse ac metus vitae velit egestas lacinia.",
      "01.31.21",
    ],
    [
      "Nathaniel",
      "lacus. Quisque imperdiet, erat",
      "luctus sit amet, faucibus ut, nulla. Cras eu tellus eu",
      "08.10.21",
    ],
    [
      "Walker",
      "dolor, tempus non, lacinia",
      "Cum sociis natoque penatibus et magnis dis parturient montes, nascetur",
      "01.17.21",
    ],
    [
      "Hilel",
      "sapien. Nunc pulvinar arcu",
      "ut cursus luctus, ipsum leo elementum sem, vitae aliquam eros",
      "09.27.20",
    ],
    [
      "Trevor",
      "Maecenas iaculis aliquet diam.",
      "nunc. Quisque ornare tortor at risus. Nunc ac sem ut",
      "06.27.21",
    ],
    [
      "Scott",
      "Aliquam fringilla cursus purus.",
      "nunc, ullamcorper eu, euismod ac, fermentum vel, mauris. Integer sem",
      "07.12.21",
    ],
    [
      "Knox",
      "Lorem ipsum dolor sit",
      "sodales. Mauris blandit enim consequat purus. Maecenas libero est, congue",
      "09.26.20",
    ],
    [
      "Kuame",
      "eu, accumsan sed, facilisis",
      "non, egestas a, dui. Cras pellentesque. Sed dictum. Proin eget",
      "03.05.21",
    ],
    [
      "Stone",
      "In condimentum. Donec at",
      "ac facilisis facilisis, magna tellus faucibus leo, in lobortis tellus",
      "05.04.21",
    ],
    [
      "Curran",
      "eu neque pellentesque massa",
      "penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec",
      "05.27.21",
    ],
    [
      "Kennan",
      "cursus luctus, ipsum leo",
      "posuere, enim nisl elementum purus, accumsan interdum libero dui nec",
      "06.14.21",
    ],
    [
      "Kadeem",
      "iaculis enim, sit amet",
      "et, lacinia vitae, sodales at, velit. Pellentesque ultricies dignissim lacus.",
      "03.27.21",
    ],
    [
      "Carl",
      "Aenean gravida nunc sed",
      "eget varius ultrices, mauris ipsum porta elit, a feugiat tellus",
      "10.26.20",
    ],
    [
      "Nigel",
      "consectetuer mauris id sapien.",
      "Fusce aliquam, enim nec tempus scelerisque, lorem ipsum sodales purus,",
      "10.20.20",
    ],
    [
      "Alfonso",
      "Cum sociis natoque penatibus",
      "dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer",
      "12.09.20",
    ],
    [
      "Raja",
      "neque vitae semper egestas,",
      "augue id ante dictum cursus. Nunc mauris elit, dictum eu,",
      "11.26.20",
    ],
    [
      "Axel",
      "penatibus et magnis dis",
      "felis eget varius ultrices, mauris ipsum porta elit, a feugiat",
      "11.02.20",
    ],
    [
      "Kirk",
      "risus. Donec egestas. Aliquam",
      "Suspendisse aliquet molestie tellus. Aenean egestas hendrerit neque. In ornare",
      "10.14.20",
    ],
    [
      "Zachery",
      "consectetuer adipiscing elit. Etiam",
      "Vivamus nisi. Mauris nulla. Integer urna. Vivamus molestie dapibus ligula.",
      "10.01.20",
    ],
    [
      "Byron",
      "dolor, nonummy ac, feugiat",
      "sem elit, pharetra ut, pharetra sed, hendrerit a, arcu. Sed",
      "04.06.21",
    ],
    [
      "Odysseus",
      "in sodales elit erat",
      "iaculis enim, sit amet ornare lectus justo eu arcu. Morbi",
      "12.08.20",
    ],
    [
      "Stone",
      "consectetuer adipiscing elit. Aliquam",
      "convallis, ante lectus convallis est, vitae sodales nisi magna sed",
      "04.13.21",
    ],
    [
      "Bert",
      "nec ante. Maecenas mi",
      "ultricies ornare, elit elit fermentum risus, at fringilla purus mauris",
      "11.29.20",
    ],
    [
      "Reece",
      "dictum sapien. Aenean massa.",
      "eget metus eu erat semper rutrum. Fusce dolor quam, elementum",
      "09.05.20",
    ],
    [
      "Bert",
      "feugiat non, lobortis quis,",
      "lorem eu metus. In lorem. Donec elementum, lorem ut aliquam",
      "08.23.21",
    ],
    [
      "Nolan",
      "aliquam adipiscing lacus. Ut",
      "mauris sapien, cursus in, hendrerit consectetuer, cursus et, magna. Praesent",
      "01.28.21",
    ],
    [
      "Wesley",
      "velit eget laoreet posuere,",
      "Integer aliquam adipiscing lacus. Ut nec urna et arcu imperdiet",
      "09.11.20",
    ],
    [
      "Baker",
      "arcu. Vestibulum ut eros",
      "nulla. In tincidunt congue turpis. In condimentum. Donec at arcu.",
      "08.16.21",
    ],
    [
      "Gannon",
      "dictum mi, ac mattis",
      "Fusce aliquam, enim nec tempus scelerisque, lorem ipsum sodales purus,",
      "04.25.21",
    ],
    [
      "Eric",
      "Maecenas iaculis aliquet diam.",
      "aliquam iaculis, lacus pede sagittis augue, eu tempor erat neque",
      "03.26.21",
    ],
    [
      "Moses",
      "commodo auctor velit. Aliquam",
      "lorem ut aliquam iaculis, lacus pede sagittis augue, eu tempor",
      "04.18.21",
    ],
    [
      "Erasmus",
      "Fusce feugiat. Lorem ipsum",
      "nec, cursus a, enim. Suspendisse aliquet, sem ut cursus luctus,",
      "08.26.21",
    ],
    [
      "Stephen",
      "nunc, ullamcorper eu, euismod",
      "Mauris ut quam vel sapien imperdiet ornare. In faucibus. Morbi",
      "10.06.20",
    ],
    [
      "Gary",
      "In nec orci. Donec",
      "orci lobortis augue scelerisque mollis. Phasellus libero mauris, aliquam eu,",
      "04.25.21",
    ],
    [
      "Herrod",
      "diam. Proin dolor. Nulla",
      "ultricies ornare, elit elit fermentum risus, at fringilla purus mauris",
      "08.17.21",
    ],
    [
      "Dustin",
      "neque pellentesque massa lobortis",
      "luctus felis purus ac tellus. Suspendisse sed dolor. Fusce mi",
      "03.27.21",
    ],
    [
      "Melvin",
      "semper erat, in consectetuer",
      "parturient montes, nascetur ridiculus mus. Donec dignissim magna a tortor.",
      "03.23.21",
    ],
    [
      "Rajah",
      "et, euismod et, commodo",
      "ut odio vel est tempor bibendum. Donec felis orci, adipiscing",
      "04.21.21",
    ],
    [
      "Chaney",
      "sagittis. Nullam vitae diam.",
      "nibh dolor, nonummy ac, feugiat non, lobortis quis, pede. Suspendisse",
      "08.10.21",
    ],
    [
      "Walker",
      "a neque. Nullam ut",
      "a tortor. Nunc commodo auctor velit. Aliquam nisl. Nulla eu",
      "11.22.20",
    ],
    [
      "Silas",
      "vitae, erat. Vivamus nisi.",
      "sit amet metus. Aliquam erat volutpat. Nulla facilisis. Suspendisse commodo",
      "12.15.20",
    ],
    [
      "Colin",
      "ac urna. Ut tincidunt",
      "fringilla est. Mauris eu turpis. Nulla aliquet. Proin velit. Sed",
      "03.22.21",
    ],
    [
      "Jonah",
      "lorem ac risus. Morbi",
      "Curae; Phasellus ornare. Fusce mollis. Duis sit amet diam eu",
      "10.22.20",
    ],
  ],
};

const MailboxApp = () => {
  const [basicOpen, setBasicOpen] = useState(true);
  const [backdrop, setBackdrop] = useState(false);

  const [selected, setSelected] = useState([]);

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
            <section>
              <MDBSideNav
                absolute
                isOpen={basicOpen}
                backdrop={backdrop}
                getOpenState={(e) => setBasicOpen(e)}
                style={{ zIndex: 1000 }}
              >
                <div className="p-3">
                  <MDBBtn type="button" block>
                    <MDBIcon fas icon="plus" className="me-2" />
                    Compose
                  </MDBBtn>
                </div>

                <MDBSideNavMenu>
                  <MDBSideNavItem>
                    <MDBSideNavLink className="sidenav-link" tabIndex={1}>
                      <MDBIcon fas icon="inbox" className="me-2 fa-fw" />
                      <span>Inbox</span>
                    </MDBSideNavLink>
                  </MDBSideNavItem>
                  <MDBSideNavItem>
                    <MDBSideNavLink className="sidenav-link" tabIndex={1}>
                      <MDBIcon fas icon="clock" className="me-2 fa-fw" />
                      <span>Snoozed</span>
                    </MDBSideNavLink>
                  </MDBSideNavItem>
                  <MDBSideNavItem>
                    <MDBSideNavLink className="sidenav-link" tabIndex={1}>
                      <MDBIcon fas icon="paper-plane" className="me-2 fa-fw" />
                      <span>Sent</span>
                    </MDBSideNavLink>
                  </MDBSideNavItem>
                  <MDBSideNavItem>
                    <MDBSideNavLink
                      className="sidenav-link ripple-surface"
                      tabIndex={1}
                    >
                      <MDBIcon fas icon="file" className="me-2 fa-fw" />
                      <span>Drafts</span>
                    </MDBSideNavLink>
                  </MDBSideNavItem>
                  <MDBSideNavItem>
                    <MDBSideNavLink
                      className="sidenav-link ripple-surface"
                      tabIndex={1}
                    >
                      <MDBIcon fas icon="envelope" className="me-2 fa-fw" />
                      <span>All mail</span>
                    </MDBSideNavLink>
                  </MDBSideNavItem>
                  <MDBSideNavItem>
                    <MDBSideNavLink
                      className="sidenav-link ripple-surface"
                      tabIndex={1}
                    >
                      <MDBIcon fas icon="trash" className="me-2 fa-fw" />
                      <span>Trash</span>
                    </MDBSideNavLink>
                  </MDBSideNavItem>
                  <MDBSideNavItem>
                    <MDBSideNavLink
                      className="sidenav-link ripple-surface"
                      tabIndex={1}
                    >
                      <MDBIcon
                        fas
                        icon="exclamation-circle"
                        className="me-2 fa-fw"
                      />
                      <span>Spam</span>
                    </MDBSideNavLink>
                  </MDBSideNavItem>
                </MDBSideNavMenu>

                <hr />

                <p className="text-center mb-1">
                  <strong>Contacts</strong>
                </p>

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
              <MDBDatatable
                selectedRows={selected}
                setSelectedRows={setSelected}
                multi
                selectable
                data={basicData}
              />
            </section>

            <section id="message-input" className="fixed-bottom card bg-light">
              <MDBCardBody>
                <form className="d-flex">
                  <MDBBtn type="button" className="px-3">
                    <MDBIcon fas icon="plus-circle" />
                  </MDBBtn>

                  <div className="w-100 mx-2">
                    <textarea
                      className="form-control"
                      rows="1"
                      placeholder="Type a message"
                    ></textarea>
                  </div>

                  <MDBBtn type="button" className="px-3">
                    <MDBIcon fas icon="thumbs-up" />
                  </MDBBtn>
                </form>
              </MDBCardBody>
            </section>
          </MDBCardBody>
        </MDBCard>
      </section>
    </MDBContainer>
  );
};

export default MailboxApp;
