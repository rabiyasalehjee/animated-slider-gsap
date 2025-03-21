import React, { useEffect } from 'react';
import gsap from 'gsap';
import './main.css';
import img1 from '../assets/img1.jpg';
import img2 from '../assets/img2.jpg';
import img3 from '../assets/img3.jpg';
import img4 from '../assets/img4.jpg';
import img5 from '../assets/img5.jpg';

const data = [
  {
    place: 'Yellowstone Park',
    title: 'BLACK SAND',
    title2: 'BASIN',
    description: 'Black Sand Basin in Yellowstone National Park, Wyoming, is a stunning geothermal area known for its vibrant hot springs, geysers, and steaming pools. The contrast of dark volcanic sand with the colorful thermal waters creates a mesmerizing landscape.',
    image: img1,
  },
  {
    place: 'Yosemite Park',
    title: 'SENTINEL',
    title2: 'DOME',
    description: 'Sentinel Dome in Yosemite National Park offers breathtaking panoramic views of the surrounding valley, including El Capitan and Half Dome. A relatively short hike rewards visitors with one of the most iconic vistas in the park.',
    image: img2,
  },
  {
    place: 'Bryce Canyon Park',
    title: 'STONE',
    title2: 'GATE',
    description: 'The Stone Gate in Bryce Canyon National Park stands as a natural rock formation, framing the breathtaking hoodoos and red rock amphitheaters that make this park a geological wonder.',
    image: img3,
  },
  {
    place: 'Dorset, England',
    title: 'DURDLE',
    title2: 'DOOR',
    description: 'Durdle Door, a magnificent limestone arch on the Jurassic Coast of Dorset, England, is one of the most photographed and iconic coastal landmarks in the UK. Its scenic beauty and clear blue waters make it a favorite destination for visitors.',
    image: img4,
  },
  {
    place: 'Piha Beach',
    title: 'LION',
    title2: 'ROCK',
    description: 'Piha Beach, home to the striking Lion Rock, is a rugged black sand beach on New Zealand’s west coast. Popular among surfers and nature lovers, it offers dramatic coastal scenery and a deep cultural significance to the Māori people.',
    image: img5,
  },
];

const Main = () => {
  useEffect(() => {
    const _ = (id) => document.getElementById(id);

    let order = [0, 1, 2, 3, 4];
    let detailsEven = true;
    let offsetTop;
    let offsetLeft;
    let cardWidth;
    let cardHeight;
    let gap = 40;
    let numberSize = 50;
    const ease = "sine.inOut";

    const isMobile = () => window.innerWidth <= 768;

    const getCard = (index) => `#card${index}`;
    const getCardContent = (index) => `#card-content-${index}`;
    const getSliderItem = (index) => `#slide-item-${index}`;

    const animate = (target, duration, properties) => {
      return new Promise((resolve) => {
        gsap.to(target, {
          ...properties,
          duration: duration,
          onComplete: resolve,
        });
      });
    };

    const init = () => {
      const [active, ...rest] = order;
      const detailsActive = detailsEven ? "#details-even" : "#details-odd";
      const detailsInactive = detailsEven ? "#details-odd" : "#details-even";
      const { innerHeight: height, innerWidth: width } = window;

      if (isMobile()) {
        offsetTop = height * 0.5;
        offsetLeft = width * 0.065;
        cardWidth = width * 0.37;
        cardHeight = height * 0.3;
        gap = 10;
        numberSize = 30;

        gsap.set("#pagination", {
          top: height * 0.85,
          left: offsetLeft,
          y: 0,
          opacity: 1,
          zIndex: 60,
        });

        gsap.set(detailsActive, { opacity: 0, zIndex: 22, x: -50 });
      } else {
        offsetTop = height - 430;
        offsetLeft = width - 830;
        cardWidth = 200;
        cardHeight = 300;

        gsap.set("#pagination", {
          top: offsetTop + 330,
          left: offsetLeft,
          y: 200,
          opacity: 0,
          zIndex: 60,
        });

        gsap.set(detailsActive, { opacity: 0, zIndex: 22, x: -200 });
      }

      gsap.set(getCard(active), {
        x: 0,
        y: 0,
        width: width,
        height: height,
      });
      gsap.set(getCardContent(active), { x: 0, y: 0, opacity: 0 });
      gsap.set(detailsInactive, { opacity: 0, zIndex: 12 });
      gsap.set(`${detailsInactive} .text`, { y: 100 });
      gsap.set(`${detailsInactive} .title-1`, { y: 100 });
      gsap.set(`${detailsInactive} .title-2`, { y: 100 });
      gsap.set(`${detailsInactive} .desc`, { y: 50 });
      gsap.set(`${detailsInactive} .cta`, { y: 60 });

      gsap.set(".progress-sub-foreground", {
        width: (isMobile() ? width * 0.4 : 500) * (1 / order.length) * (active + 1),
      });

      rest.forEach((i, index) => {
        gsap.set(getCard(i), {
          x: offsetLeft + (isMobile() ? index * (cardWidth + gap) : 400 + index * (cardWidth + gap)),
          y: offsetTop,
          width: cardWidth,
          height: cardHeight,
          zIndex: 30,
          borderRadius: isMobile() ? 5 : 10,
        });
        gsap.set(getCardContent(i), {
          x: offsetLeft + (isMobile() ? index * (cardWidth + gap) : 400 + index * (cardWidth + gap)),
          zIndex: 40,
          y: offsetTop + cardHeight - (isMobile() ? 30 : 100),
        });
        gsap.set(getSliderItem(i), { x: (index + 1) * numberSize });
      });

      gsap.set(".indicator", { x: -width });

      const startDelay = 0.6;

      gsap.to(".cover", {
        x: width + (isMobile() ? 100 : 400),
        delay: 0.5,
        ease,
        onComplete: () => {
          setTimeout(() => {
            loop();
          }, 500);
        },
      });
      rest.forEach((i, index) => {
        gsap.to(getCard(i), {
          x: offsetLeft + index * (cardWidth + gap),
          zIndex: 30,
          delay: 0.05 * index,
          ease,
          delay: startDelay,
        });
        gsap.to(getCardContent(i), {
          x: offsetLeft + index * (cardWidth + gap),
          zIndex: 40,
          delay: 0.05 * index,
          ease,
          delay: startDelay,
        });
      });
      gsap.to("#pagination", { y: 0, opacity: 1, ease, delay: startDelay });
      gsap.to(detailsActive, { opacity: 1, x: 0, ease, delay: startDelay });
    };

    let clicks = 0;

    const step = (direction = 'next') => {
      return new Promise((resolve) => {
        if (direction === 'next') {
          order.push(order.shift());
        } else {
          order.unshift(order.pop());
        }
        detailsEven = !detailsEven;

        const detailsActive = detailsEven ? "#details-even" : "#details-odd";
        const detailsInactive = detailsEven ? "#details-odd" : "#details-even";

        document.querySelector(`${detailsActive} .place-box .text`).textContent = data[order[0]].place;
        document.querySelector(`${detailsActive} .title-1`).textContent = data[order[0]].title;
        document.querySelector(`${detailsActive} .title-2`).textContent = data[order[0]].title2;
        document.querySelector(`${detailsActive} .desc`).textContent = data[order[0]].description;

        gsap.set(detailsActive, { zIndex: 22 });
        gsap.to(detailsActive, { opacity: 1, delay: 0.4, ease });
        gsap.to(`${detailsActive} .text`, { y: 0, delay: 0.1, duration: 0.7, ease });
        gsap.to(`${detailsActive} .title-1`, { y: 0, delay: 0.15, duration: 0.7, ease });
        gsap.to(`${detailsActive} .title-2`, { y: 0, delay: 0.15, duration: 0.7, ease });
        gsap.to(`${detailsActive} .desc`, { y: 0, delay: 0.3, duration: 0.4, ease });
        gsap.to(`${detailsActive} .cta`, { y: 0, delay: 0.35, duration: 0.4, onComplete: resolve, ease });

        gsap.set(detailsInactive, { opacity: 0, zIndex: 12 });

        const [active, ...rest] = order;
        const prv = rest[rest.length - 1];
        const { innerWidth: width } = window;

        gsap.set(getCard(prv), { zIndex: 10 });
        gsap.set(getCard(active), { zIndex: 20 });
        gsap.to(getCard(prv), { scale: isMobile() ? 1.2 : 1.5, ease });

        gsap.to(getCardContent(active), { y: offsetTop + cardHeight - 10, opacity: 0, duration: 0.3, ease });
        gsap.to(getSliderItem(active), { x: 0, ease });
        gsap.to(getSliderItem(prv), { x: -numberSize, ease });
        gsap.to(".progress-sub-foreground", { width: (isMobile() ? width * 0.4 : 500) * (1 / order.length) * (active + 1), ease });

        gsap.to(getCard(active), {
          x: 0,
          y: 0,
          ease,
          width: window.innerWidth,
          height: window.innerHeight,
          borderRadius: 0,
          onComplete: () => {
            const xNew = offsetLeft + (rest.length - 1) * (cardWidth + gap);
            gsap.set(getCard(prv), { x: xNew, y: offsetTop, width: cardWidth, height: cardHeight, zIndex: 30, borderRadius: isMobile() ? 5 : 10, scale: 1 });
            gsap.set(getCardContent(prv), { x: xNew, y: offsetTop + cardHeight - (isMobile() ? 30 : 100), opacity: 1, zIndex: 40 });
            gsap.set(getSliderItem(prv), { x: rest.length * numberSize });

            gsap.set(detailsInactive, { opacity: 0 });
            gsap.set(`${detailsInactive} .text`, { y: 100 });
            gsap.set(`${detailsInactive} .title-1`, { y: 100 });
            gsap.set(`${detailsInactive} .title-2`, { y: 100 });
            gsap.set(`${detailsInactive} .desc`, { y: 50 });
            gsap.set(`${detailsInactive} .cta`, { y: 60 });
            clicks -= 1;
            if (clicks > 0) step(direction);
          },
        });

        rest.forEach((i, index) => {
          if (i !== prv) {
            const xNew = offsetLeft + index * (cardWidth + gap);
            gsap.set(getCard(i), { zIndex: 30 });
            gsap.to(getCard(i), { x: xNew, y: offsetTop, width: cardWidth, height: cardHeight, ease, delay: 0.1 * (index + 1) });
            gsap.to(getCardContent(i), { x: xNew, y: offsetTop + cardHeight - (isMobile() ? 30 : 100), opacity: 1, zIndex: 40, ease, delay: 0.1 * (index + 1) });
            gsap.to(getSliderItem(i), { x: (index + 1) * numberSize, ease });
          }
        });
      });
    };

    const loop = async () => {
      await animate(".indicator", 2, { x: 0 });
      await animate(".indicator", 0.8, { x: window.innerWidth, delay: 0.3 });
      gsap.set(".indicator", { x: -window.innerWidth });
      await step();
      loop();
    };

    const loadImage = (src) => {
      return new Promise((resolve, reject) => {
        let img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = src;
      });
    };

    const loadImages = async () => {
      const promises = data.map(({ image }) => loadImage(image));
      return Promise.all(promises);
    };

    const start = async () => {
      try {
        await loadImages();
        init();
        window.addEventListener('resize', init);
      } catch (error) {
        console.error("One or more images failed to load", error);
      }
    };

    start();

    const handleArrowClick = (direction) => {
      clicks += 1;
      step(direction);
    };

    document.querySelector('.arrow-left').addEventListener('click', () => handleArrowClick('prev'));
    document.querySelector('.arrow-right').addEventListener('click', () => handleArrowClick('next'));

    return () => {
      window.removeEventListener('resize', init);
      document.querySelector('.arrow-left').removeEventListener('click', () => handleArrowClick('prev'));
      document.querySelector('.arrow-right').removeEventListener('click', () => handleArrowClick('next'));
    };
  }, []);

  return (
    <>
      <div className="indicator"></div>
      <div id="demo">
        {data.map((item, index) => (
          <React.Fragment key={index}>
            <div className="card" id={`card${index}`} style={{ backgroundImage: `url(${item.image})` }}></div>
            <div className="card-content" id={`card-content-${index}`}>
              <div className="content-start"></div>
              <div className="content-place">{item.place}</div>
              <div className="content-title-1">{item.title}</div>
              <div className="content-title-2">{item.title2}</div>
            </div>
          </React.Fragment>
        ))}
      </div>

      <div className="details" id="details-even">
        <div className="place-box">
          <div className="text">Yellowstone National Park</div>
        </div>
        <div className="title-box-1"><div className="title-1">BLACK SAND</div></div>
        <div className="title-box-2"><div className="title-2">BASIN</div></div>
        <div className="desc">
          Black Sand Basin in Yellowstone National Park, Wyoming, is a stunning geothermal area known for its vibrant hot springs, geysers, and steaming pools. The contrast of dark volcanic sand with the colorful thermal waters creates a mesmerizing landscape.
        </div>
        <div className="cta">
          <button className="discover">Discover Location</button>
        </div>
      </div>

      <div className="details" id="details-odd">
        <div className="place-box">
          <div className="text">Yellowstone National Park</div>
        </div>
        <div className="title-box-1"><div className="title-1">BLACK SAND</div></div>
        <div className="title-box-2"><div className="title-2">BASIN</div></div>
        <div className="desc">
          Black Sand Basin in Yellowstone National Park, Wyoming, is a stunning geothermal area known for its vibrant hot springs, geysers, and steaming pools. The contrast of dark volcanic sand with the colorful thermal waters creates a mesmerizing landscape.
        </div>
        <div className="cta">
          <button className="discover">Discover Location</button>
        </div>
      </div>

      <div className="pagination" id="pagination">
        <div className="arrow arrow-left">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </div>
        <div className="arrow arrow-right">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </div>
        <div className="progress-sub-container">
          <div className="progress-sub-background">
            <div className="progress-sub-foreground"></div>
          </div>
        </div>
        <div className="slide-numbers" id="slide-numbers">
          {data.map((_, index) => (
            <div className="item" id={`slide-item-${index}`} key={index}>{index + 1}</div>
          ))}
        </div>
      </div>

      <div className="cover"></div>
    </>
  );
};

export default Main;