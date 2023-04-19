const sections = document.querySelectorAll("section");
sections.forEach((section) => {
  const imgs = section.querySelectorAll(".front_img");
  const imgCount = imgs.length; // 추가된 변수
  const content00 = section.querySelector(".content00");
  const content01 = section.querySelector(".content01");
  const text = section.querySelector(".front_title");

  //   intro 로딩창
  function hideLoading() {
    const loading = document.getElementById("loading");
    // 로딩창 요소 가져오기
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    // body 요소에 overflow: hidden 스타일을 추가하여 스크롤을 막습니다.

    // 로딩창 요소 애니메이션 효과 추가
    gsap.to(loading, {
      opacity: 0,
      delay: 3, //로딩 딜레이 3초
      duration: 0.5,
      onComplete: function () {
        // 애니메이션 완료 후 로딩창 요소 제거
        if (loading && loading.parentNode) {
          loading.parentNode.removeChild(loading);
        }

        // 배경 애니메이션 시작
        const loadingWrap = document.getElementById("loading_wrap");
        if (loadingWrap) {
          const loadingLeft = document.querySelector(".loading-left");
          const loadingRight = document.querySelector(".loading-right");

          loadingWrap.addEventListener("animationend", function () {
            // 애니메이션 완료 후 로딩창 배경 요소 제거
            if (loadingWrap.parentNode) {
              loadingWrap.parentNode.removeChild(loadingWrap);
            }
          });

          loadingLeft.addEventListener("animationend", function () {
            // 왼쪽 배경 애니메이션이 끝난 후 오른쪽 배경 애니메이션 시작
            loadingRight.style.animationDelay = "0s";
          });

          // 로딩창이 완전히 사라진 후 body 요소의 overflow 값을 원래대로 돌려놓습니다.
        }
        document.body.style.overflow = "visible"; // overflow 스타일 값 변경
      },
    });
  }

  // 모든 리소스가 로드된 후 로딩창 숨기는 코드
  window.addEventListener("load", hideLoading);

  //인트로 이후 메인 인삿말
  setInterval(function () {
    if (content00) {
      // content00가 존재할 경우에만 gsap.to() 실행
      gsap.to(content00, {
        y: 0,
        opacity: 0,
        duration: 2,
      });
    }

    if (content01) {
      // content01이 존재할 경우에만 gsap.to() 실행
      gsap.to(content01, {
        y: 0,
        opacity: 1,
        duration: 2,
      });
    }
  }, 4500 /* 인트로,로딩 끝나고 4.5초로 딜레이 맞춤 실행 */);

  // section08 하단 텍스트
  gsap.fromTo(
    text,
    {
      x: "-100%",
    },
    {
      x: "20%",
      duration: 2,
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    }
  );

  // 이미지 스크롤 트리거 시작
  imgs.forEach((img, index) => {
    // 각 이미지의 위치를 중앙으로 맞추기 위해 사용됩니다.
    const offset = ((index - (imgCount - 1) / 2) / imgCount) * window.innerWidth * 0.2;

    // Section03, Section05, Section07은 왼쪽으로 이동합니다.
    if (section.id === "section03" || section.id === "section05" || section.id === "section07") {
      ScrollTrigger.create({
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          imgs.forEach((img, index) => {
            const offset = (3 / imgCount) * window.innerWidth * 0.6;
            gsap.set(img, {
              x: -self.progress * offset, // x 좌표값에 음수를 취해 이미지를 왼쪽으로 이동합니다.
            });
          });
        },
      });
    } else {
      // 나머지는 오른쪽으로 이동합니다.
      ScrollTrigger.create({
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          imgs.forEach((img, index) => {
            const offset = (3 / imgCount) * window.innerWidth * 0.6;
            gsap.set(img, {
              x: self.progress * offset, // x 좌표값에 양수를 취해 이미지를 오른쪽으로 이동합니다.
            });
          });
        },
      });
    }
  });
});
// 스크롤이 section02에 도달하면 애니메이션을 실행합니다.
const content02 = document.querySelector(".content02");
const typing = document.querySelector(".typing");

function playAnimation() {
  typing.classList.add("playing");
}

function pauseAnimation() {
  typing.classList.remove("playing");
}

function handleScroll() {
  const contentRect = content02.getBoundingClientRect();
  const isContentVisible = contentRect.top < window.innerHeight && contentRect.bottom > 0;

  if (isContentVisible) {
    playAnimation();
  } else {
    pauseAnimation();
  }
}

window.addEventListener("scroll", handleScroll);

// 메뉴를 클릭하면 해당 section으로 이동합니다.
function scrollToSection1() {
  const section02 = document.getElementById("section02");
  window.scrollTo({
    top: section02.offsetTop,
    behavior: "smooth",
  });
}
function scrollToSection2() {
  const section03 = document.getElementById("section03");
  window.scrollTo({
    top: section03.offsetTop,
    behavior: "smooth",
  });
}
function scrollToSection3() {
  const contact__wrap = document.getElementById("contact__wrap");
  window.scrollTo({
    top: contact__wrap.offsetTop,
    behavior: "smooth",
  });
}
