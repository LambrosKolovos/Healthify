import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../css/news.css";
import "../css/card.css";
import HomeNav from "../components/HomeNav";
import { CardImage } from "../components/CardImage";
import { CardNews } from "../components/CardNews";
import Footer from "../components/Footer";
import BackdropHome from "../components/Backdrop/BackdropHome";
import SideDrawerHome from "../components/SideDrawer/SideDrawerHome";

import { Link } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";

export class news extends Component {
  state = {
    sideDrawerOpen: false,
    news: [],
    isLoaded: false,
    error: null,
  };

  drawerToggleClickHandler = () => {
    this.setState((prevState) => {
      return { sideDrawerOpen: !prevState.sideDrawerOpen };
    });
  };

  backdropClickHandler = () => {
    this.setState({ sideDrawerOpen: false });
  };

  componentDidMount() {
    this.showNews();
  }

  //requests posts and filters only the news
  showNews = () => {
    fetch("http://localhost:3100/api/postsPerCategory/" + 6, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        this.setState({ news: response });
        setTimeout(() => {
          this.setState({ isLoaded: true });
        }, 200);
      })
      .catch((err) => {
        console.log(err);
        this.setState({ isLoaded: true, error: err });
      });
  };

  //converts date according to prefs
  dateConvertion(date) {
    return new Intl.DateTimeFormat("en-GB", {
      year: "numeric",
      month: "long",
      day: "2-digit",
    }).format(new Date(date));
  }

  render() {
    let backdrop;
    const { news, isLoaded, error } = this.state;
    let allNews, featured, featuredRight, featuredDown;

    if (this.state.sideDrawerOpen) {
      backdrop = <BackdropHome click={this.backdropClickHandler} />;
    }

    if (error) {
      allNews = <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      allNews = (
        <div
          style={{
            textAlign: "center",
            paddingTop: "50px",
            paddingBottom: "100px",
          }}
        >
          <Spinner
            animation="border"
            style={{ color: "cornflowerblue", width: "100px", height: "100px" }}
          />
        </div>
      );

      featured = (
        <div
          style={{
            textAlign: "center",
            paddingTop: "50px",
            paddingBottom: "100px",
          }}
        >
          <Spinner
            animation="border"
            style={{ color: "cornflowerblue", width: "100px", height: "100px" }}
          />
        </div>
      );
    } else {
      allNews = news.map((item) => (
        <CardNews
          key={item.post_id}
          className="featured-post"
          img={item.imgUrl}
          date={this.dateConvertion(item.createdAt)}
          category={item.category}
          body={item.body}
          title={
            <Link to={`/home/news/viewnews/${item.post_id}`}>{item.title}</Link>
          }
        ></CardNews>
      ));

      featured = (
        <CardImage
          className="featured-post"
          img={news[0].imgUrl}
          category={news[0].category}
          date={this.dateConvertion(news[0].createdAt)}
          title={
            <Link to={`/home/news/viewnews/${news[0].post_id}`}>
              {news[0].title}
            </Link>
          }
        ></CardImage>
      );

      featuredRight = (
        <CardImage
          className="single-top-post"
          img={news[1].imgUrl}
          category={news[1].category}
          date={this.dateConvertion(news[1].createdAt)}
          title={
            <Link to={`/home/news/viewnews/${news[1].post_id}`}>
              {news[1].title}
            </Link>
          }
        ></CardImage>
      );

      featuredDown = (
        <CardImage
          className="single-top-post sp-10"
          img={news[2].imgUrl}
          category={news[2].category}
          date={this.dateConvertion(news[2].createdAt)}
          title={
            <Link to={`/home/news/viewnews/${news[2].post_id}`}>
              {news[2].title}
            </Link>
          }
        ></CardImage>
      );
    }

    return (
      <div>
        <HomeNav drawerClickHandler={this.drawerToggleClickHandler}></HomeNav>
        <SideDrawerHome show={this.state.sideDrawerOpen} />
        {backdrop}
        <Container fluid className="news">
          <section className="top-post-area">
            <div className="container no-padding">
              <section className="section-heading top-posts">
                <h6>Most Recent</h6>
              </section>
              <div className="row small-gutters">
                <Col lg={8} className="top-post-left">
                  {featured}
                </Col>
                <Col lg={4} className="top-post-right">
                  {featuredRight}
                  {featuredDown}
                </Col>
              </div>
            </div>
          </section>
          <section className="latest-post-area pb-120">
            <div className="container no-padding">
              <Row>
                <Col lg={8} className="post-list">
                  <section className="section-heading">
                    <h6>All news</h6>
                  </section>
                  {allNews}
                </Col>
                <Col lg={4} className="">
                  {/*<section className="section-heading">
                  <h6>Editor's pick</h6>
    </section>*/}
                </Col>
              </Row>
            </div>
          </section>
        </Container>
        <Footer />
      </div>
    );
  }
}

export default news;
