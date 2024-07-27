import React from "react";
import styles from "./Landing.module.css";
import formbot from "../../assets/images/formbot.png";
import landing1 from "../../assets/images/landing1.png";
import landing2 from "../../assets/images/landing2.png";
import leftblur from "../../assets/images/leftBlur.png";
import rightblur from "../../assets/images/rightBlur.png";
import blurOverlap from "../../assets/images/blurOverlap.png";
import Container23right from "../../assets/images/Container23right.png";
import Container31 from "../../assets/images/Container31.png";
import Container32 from "../../assets/images/Container32.png";
import email from "../../assets/images/email.png";
import img2 from "../../assets/images/img2.png";
import img3 from "../../assets/images/img3.png";
import img4 from "../../assets/images/img44.png";
import img5 from "../../assets/images/img5.png";
import img6 from "../../assets/images/img6.png";
import img7 from "../../assets/images/img7.png";
import img8 from "../../assets/images/img8.png";
import img9 from "../../assets/images/1.png";
import img10 from "../../assets/images/2.png";
import img11 from "../../assets/images/3.png";
import img12 from "../../assets/images/4.png";
import img13 from "../../assets/images/5.png";
import img14 from "../../assets/images/6.png";
import img15 from "../../assets/images/7.png";
import img16 from "../../assets/images/img9.png";
import img17 from "../../assets/images/img10.png";
import image18 from "../../assets/images/img11.png";
import image19 from "../../assets/images/img12.png";
import image20 from "../../assets/images/img13.png";
import image21 from "../../assets/images/img14.png";
import image22 from "../../assets/images/img15.png";
import image23 from "../../assets/images/img16.png";
import image24 from "../../assets/images/img17.png";
import image25 from "../../assets/images/img18.png";
import image26 from "../../assets/images/img19.png";
import image27 from "../../assets/images/img20.png";
import image28 from "../../assets/images/img21.png";
import image29 from "../../assets/images/img22.png";
import image30 from "../../assets/images/img23.png";
import image31 from "../../assets/images/img24.png";
import image32 from "../../assets/images/SVG.png";
import image33 from "../../assets/images/Container.png";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className={styles.mainbody}>
      <div className={styles.header}>
        <div className={styles.leftHeader}>
          <div className={styles.div1}>
            <img src={formbot}></img> <p className={styles.p1}> FormBot</p>
          </div>
        </div>
        <div className={styles.rightHeader}>
          <span
            onClick={() => {
              navigate("/login");
            }}
          >
            <button className={styles.signIn}>Sign In</button>
          </span>
          <button
            className={styles.create}
            onClick={() => {
              navigate("/register");
            }}
          >
            Create a FormBot
          </button>
        </div>
      </div>

      <div className={styles.container1}>
        <div className={styles.subcontainer11}>
          <img src={landing1}></img>
          <div className={styles.text1}>
            <div className={styles.heading1}>
              Build advanced chatbots visually
            </div>
            <div className={styles.description1}>
              Typebot gives you powerful blocks to create unique chat
              experiences. Embed them anywhere on your web/mobile apps and start
              collecting results like magic.
            </div>
            <div
              className={styles.button1}
              onClick={() => {
                navigate("/register");
              }}
            >
              Create a FormBot for free
            </div>
          </div>
          <img src={landing2}></img>
        </div>
        <div className={styles.subcontainer12}>
          <img src={leftblur} className={styles.img1}></img>

          <img src={rightblur} className={styles.img3}></img>
        </div>
        <img src={blurOverlap} className={styles.img2}></img>
      </div>
      <div className={styles.container2}>
        <div className={styles.container21}>
          Replace your old school forms <br /> with
          <br /> chatbots
        </div>
        <div className={styles.container22}>
          Typebot is a better way to ask for information. It leads to an
          increase in customer satisfaction and retention and multiply by <br />
          3 <br /> your conversion rate compared to classical forms.
        </div>

        <div className={styles.container23}>
          <div className={styles.leftcontainer23}>
            {/* <div className={styles.text2}> */}
            <img src={image33}></img>
            {/* </div> */}
            {/* <div className={styles.button2}>Learn more</div> */}
          </div>

          <div className={styles.rightcontainer23}>
            <img src={Container23right}></img>
          </div>
        </div>
      </div>
      <div className={styles.container30}>
        <div className={styles.container3}>
          <div className={styles.img4}>
            <img src={Container31}></img>
          </div>
          <div>
            <p className={styles.p2}>Easy building experience</p>
            <p className={styles.p3}>
              All you have to do is drag and drop blocks to create your app.
              Even if you have custom needs, you can always add custom code.
            </p>
          </div>
        </div>
        <div className={styles.container4}>
          <div>
            <p className={styles.p4}>Embed it in a click</p>
            <p className={styles.p5}>
              Embedding your typebot in your applications is a walk in the park.
              Typebot gives you several step-by-step platform- specific
              instructions. Your typebot will always feel "native".
            </p>
          </div>

          <div className={styles.img5}>
            <img src={Container32}></img>
          </div>
        </div>
      </div>

      <div className={styles.container5}>
        <div className={styles.container50}>
          <div className={styles.container51}>
            {/* <div className={styles.img6}></div> */}
            <span className={styles.img7}>
              <img src={email}></img>
            </span>
            <span className={styles.img8}>
              <img src={img2}></img>
            </span>
            <span className={styles.img9}>
              <img src={img3}></img>
            </span>
            <span className={styles.img10}>
              <img src={img4}></img>
            </span>
            <span className={styles.img11}>
              <img src={img5}></img>
            </span>
            <span className={styles.img12}>
              <img src={img6}></img>
            </span>
            <span className={styles.img13}>
              <img src={img7}></img>
            </span>
            <span className={styles.img14}>
              <img src={img8}></img>
            </span>
          </div>
          <div className={styles.con52}>
            <span className={styles.img15}>
              <img src={img9}></img>
            </span>
            <span className={styles.img16}>
              <img src={img10}></img>
            </span>
            <span className={styles.img17}>
              <img src={img11}></img>
            </span>
            <span className={styles.img18}>
              <img src={img12}></img>
            </span>
            <span className={styles.img19}>
              <img src={img13}></img>
            </span>
            <span className={styles.img20}>
              <img src={img14}></img>
            </span>
            <span className={styles.img21}>
              <img src={img15}></img>
            </span>
          </div>
        </div>
        <div className={styles.con53}>
          <p className={styles.p6}>Integrate with any platform</p>
          <p className={styles.p7}>
            Typebot offers several native integrations blocks as well as
            instructions on how to embed typebot on particular platforms
          </p>
        </div>
      </div>
      <div className={styles.container6}>
        <p className={styles.p8}>Collect results in real-time</p>
        <p className={styles.p9}>
          One of the main advantage of a chat application is that you collect
          the user's responses on each question.
        </p>
        <p className={styles.p10}>You won't lose any valuable data.</p>
        <div className={styles.img22}>
          <img src={img16} style={{ margin: "5px" }}></img>
        </div>
      </div>
      <div className={styles.container7}>
        <p className={styles.p11}>And many more features</p>
        <p className={styles.p12}>
          Typebot makes form building easy and comes with powerful features
        </p>
        <div className={styles.container71}>
          <div className={styles.container711}>
            <div className={styles.img23}>
              <img src={img17}></img>
            </div>
            <p className={styles.p13}>Hidden fields</p>
            <p className={styles.p14}>
              Include data in your form URL to segment your user and use its
              data directly in your form.
            </p>
          </div>
          <div className={styles.container712}>
            <div className={styles.img24}>
              <img src={image18}></img>
            </div>
            <p className={styles.p15}>Team collaboration</p>
            <p className={styles.p16}>
              Invite your teammates to work on your typebots with you
            </p>
          </div>
          <div className={styles.container713}>
            <div className={styles.img25}>
              <img src={image19}></img>
            </div>
            <p className={styles.p17}>Link to sub typebots</p>
            <p className={styles.p18}>
              Reuse your typebots in different parent bots.
            </p>
          </div>
        </div>
        <div className={styles.container72}>
          <div className={styles.container721}>
            <div className={styles.img26}>
              <img src={image20}></img>
            </div>
            <p className={styles.p19}>Custom code</p>
            <p className={styles.p20}>
              Customize everything with your own Javascript & CSS code
            </p>
          </div>

          <div className={styles.container722}>
            <div className={styles.img27}>
              <img src={image21}></img>
            </div>
            <p className={styles.p21}>Custom domain</p>
            <p className={styles.p22}>
              Connect your typebot to the custom URL of your choice
            </p>
          </div>

          <div className={styles.container723}>
            <div className={styles.img28}>
              <img src={image22}></img>
            </div>
            <p className={styles.p23}>Folder management</p>
            <p className={styles.p24}>
              Organize your typebots in specific folders to keep it clean and
              work with multiple clients
            </p>
          </div>
        </div>
        <div className={styles.container73}>
          <p className={styles.p25}>
            Loved by teams and creators from all around the world
          </p>
          <div className={styles.imagesList1}>
            <img src={image23}></img>
            <img src={image24}></img>
            <img src={image25}></img>
            <img src={image26}></img>
          </div>
          <div className={styles.imagesList2}>
            <img src={image27}></img>
            <img src={image28}></img>
            <img src={image29}></img>
            <img src={image30}></img>
          </div>
        </div>
      </div>

      <div className={styles.container8}>
        <div className={styles.container81}>
          <img src={landing1}></img>
        </div>
        <div className={styles.container82}>
          <p className={styles.p26}>
            Improve conversion and user engagement with FormBots{" "}
          </p>
          <div
            className={styles.container821}
            onClick={() => {
              navigate("/register");
            }}
          >
            Create a FormBot
          </div>
          <p className={styles.p27}>
            No trial. Generous <span className={styles.span1}>free</span> plan.
          </p>
        </div>
        <div className={styles.container83}>
          <img src={landing2}></img>
        </div>
      </div>
      <div className={styles.container9}>
        <div className={styles.container91}>
          Made with ❤️ by
          <div className={styles.span2}> @cuvette</div>
        </div>
        <div className={styles.container92}>
          <div className={styles.container921}>
            Status <img src={image31}></img>
          </div>
          <div className={styles.container921}>
            Documentation <img src={image31}></img>
          </div>
          <div className={styles.container921}>
            Roadmap <img src={image32}></img>
          </div>
          <div className={styles.container921}>Pricing </div>
        </div>
        <div className={styles.container93}>
          <div className={styles.container921}>
            Discord <img src={image32}></img>
          </div>
          <div className={styles.container921}>
            GitHub repository <img src={image32}></img>
          </div>
          <div className={styles.container921}>
            Twitter <img src={image32}></img>
          </div>
          <div className={styles.container921}>
            LinkedIn <img src={image32}></img>
          </div>
          <div className={styles.container921}>OSS Friends</div>
        </div>
        <div className={styles.container94}>
          <div className={styles.container921}>About</div>
          <div className={styles.container921}>Contact</div>
          <div className={styles.container921}>Terms of Service</div>
          <div className={styles.container921}>Privacy Policy</div>
        </div>
      </div>
    </div>
  );
}
